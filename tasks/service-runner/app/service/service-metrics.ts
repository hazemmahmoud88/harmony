import { Response, Request, NextFunction } from 'express';
import logger from '../../../../app/util/log';

/**
 * Express.js handler that generates the Prometheus compatible metrics for the associated service
 *
 * @param req - The request sent by the client
 * @param res - The response to send to the client
 * @param next - The next function in the call chain
 * @returns Resolves when the request is complete
 */
export async function generateMetricsForPrometheus(
  req: Request, res: Response, next: NextFunction,
): Promise<void> {

  logger.info('generates the Prometheus compatible metrics');

  const response = {
    dummyKey: 'dummyValue'
  };
  res.json(response);
}