import { NextFunction, Response } from 'express';
import HarmonyRequest from '../models/harmony-request';
import { RequestValidationError } from '../util/errors';
import { Conjunction, listToText } from '../util/string';
import { keysToLowerCase } from '../util/object';
import { defaultObjectStore } from '../util/object-store';
import { coverageRangesetGetParams, coverageRangesetPostParams } from '../frontends/ogc-coverages/index';
import env = require('../util/env');
import { getRequestRoot } from '../util/url';

const { awsDefaultRegion } = env;

/**
 * Middleware to execute various parameter validations
 */

const RANGESET_ROUTE_REGEX = /^\/.*\/ogc-api-coverages\/.*\/collections\/.*\/coverage\/rangeset/;

/**
 * The accepted values for the `linkType` parameter for job status requests
 */
const validLinkTypeValues = ['http', 'https', 's3'];

/**
 * Validate that the value provided for the `linkType` parameter is one of 'http', 'https', or 's3'
 *
 * @param req - The client request
 */
function validateLinkTypeParameter(req: HarmonyRequest): void {
  const keys = keysToLowerCase(req.query);
  const linkType = keys.linktype?.toLowerCase();
  if (linkType && !validLinkTypeValues.includes(linkType)) {
    const listString = listToText(validLinkTypeValues, Conjunction.OR);
    throw new RequestValidationError(`Invalid linkType '${linkType}' must be ${listString}`);
  }
}

/**
 * Validate that the bucket name provided is in the same AWS region as the given region
 *
 * @param bucketName - The name of the s3 bucket
 * @param region - The name of the aws region
 */
async function validateBucketIsInRegion(bucketName: string, region: string): Promise<void> {
  try {
    const bucketRegion = await defaultObjectStore().getBucketRegion(bucketName);
    if (bucketRegion != region) {
      // TODO: Add reference to the cross account s3 delivery document in the error message below when working on HARMONY-1218.
      throw new RequestValidationError(`Destination bucket '${bucketName}' must be in the '${region}' region, but was in '${bucketRegion}'.`);
    }
  } catch (e) { 
    if (e.name === 'NoSuchBucket') {
      throw new RequestValidationError(`The specified bucket '${bucketName}' does not exist.`);
    } else if (e.name === 'AccessDenied') {
      throw new RequestValidationError(`Do not have permission to get bucket location of the specified bucket '${bucketName}'.`);
    } else if (e.name === 'InvalidBucketName') {
      throw new RequestValidationError(`The specified bucket '${bucketName}' is not valid.`);
    }
    throw e;
  }
}

/**
 * Validate that the destinationUrl provided is writable
 *
 * @param req - The client request
 * @param destinationUrl - The destinationUrl
 */
async function validateDestinationUrlWritable(req: HarmonyRequest, destinationUrl: string): Promise<void> {
  try {
    const requestId = req.context.id;
    const requestUrl = destinationUrl.endsWith('/') ? destinationUrl + requestId : destinationUrl + '/' + requestId;
    const statusUrl = requestUrl + '/harmony-job-status-link';
    const statusLink = getRequestRoot(req) + '/jobs/' + requestId;
    await defaultObjectStore().upload(statusLink, statusUrl, null, 'text/plain');
  } catch (e) { 
    if (e.name === 'AccessDenied') {
      throw new RequestValidationError(`Do not have write permission to the specified s3 location: '${destinationUrl}'.`);
    } 
    throw e;
  }
}
  
/**
 * Validate that the value provided for the `destinationUrl` parameter is an `s3` url in the format of `s3://<bucket>/<path>` is in the same AWS region
 *
 * @param req - The client request
 */
async function validateDestinationUrlParameter(req: HarmonyRequest): Promise<void> {
  const keys = keysToLowerCase(req.query);
  const destUrl = keys.destinationurl?.toLowerCase();
  if (destUrl) {
    if (!destUrl.startsWith('s3://')) {
      throw new RequestValidationError(`Invalid destinationUrl '${destUrl}', must start with s3://`);
    }
    // this check is added to provide a more user friendly error message when more than one destinationUrl values are provided
    if (destUrl.includes(',s3://')) {
      throw new RequestValidationError(`Invalid destinationUrl '${destUrl}', only one s3 location is allowed.`);
    }
    const bucketName = destUrl.substring(5).split('/')[0];
    if (bucketName === '') {
      throw new RequestValidationError('Invalid destinationUrl, no s3 bucket is provided.');
    }
    await validateBucketIsInRegion(bucketName, awsDefaultRegion);
    await validateDestinationUrlWritable(req, destUrl);
  }
}

/**
 * Validate that the parameter names are correct.
 *  (Performs case insensitive comparison.)
 * 
 * @param requestedParams - names of the parameters provided by the user
 * @param allowedParams - names of the allowed parameters
 * @throws RequestValidationError - if disallowed parameters are detected
 */
export function validateParameterNames(requestedParams: string[], allowedParams: string[]): void {
  const requestedParamsLower = requestedParams.map(param => param.toLowerCase());
  const allowedParamsLower = allowedParams.map(param => param.toLowerCase());
  const invalidParams = [];
  requestedParamsLower.forEach((param, index) => {
    const isNotAllowed = !allowedParamsLower.includes(param);
    if (isNotAllowed) {
      invalidParams.push(requestedParams[index]);
    }
  });
  if (invalidParams.length) {
    const incorrectListString = listToText(invalidParams, Conjunction.AND);
    const allowedListString = listToText(allowedParams, Conjunction.AND);
    throw new RequestValidationError(`Invalid parameter(s): ${incorrectListString}. Allowed parameters are: ${allowedListString}.`);
  }
}

/**
 * Validate that the req query parameter names are correct according to Harmony implementation of OGC spec.
 * 
 * @param req - The client request
 * @throws RequestValidationError - if disallowed parameters are detected
 */
function validateCoverageRangesetParameterNames(req: HarmonyRequest): void {
  const requestedParams = Object.keys(req.query);
  const allowedParams = req.method.toLowerCase() == 'get' ? coverageRangesetGetParams : coverageRangesetPostParams;
  validateParameterNames(requestedParams, allowedParams);
}

/**
 * Express.js middleware to validate parameters. This must be installed after the error handler
 * middleware.
 *
 * @param req - The client request
 * @param res - The client response
 * @param next - The next function in the middleware chain
 */
export default async function parameterValidation(
  req: HarmonyRequest, _res: Response, next: NextFunction,
): Promise<void> {
  try {
    validateLinkTypeParameter(req);
    await validateDestinationUrlParameter(req);
    if (req.url.match(RANGESET_ROUTE_REGEX)) {
      validateCoverageRangesetParameterNames(req);
    }
  } catch (e) {
    return next(e);
  }
  return next();
}
