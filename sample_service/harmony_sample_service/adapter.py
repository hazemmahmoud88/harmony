"""
==================
adapter.py
==================

Service adapter for processing granules
"""
from os import environ
from shutil import rmtree
from tempfile import mkdtemp

from harmony import BaseHarmonyAdapter
from harmony.util import HarmonyException

from .convert import make_localstack_s3fs, make_s3fs
from .download_utilities import download_granules
from .stac_utilities import get_netcdf_urls


NETCDF_MEDIA_TYPES = ['application/x-netcdf', 'application/x-netcdf4']


class SampleException(HarmonyException):
    """ Exception thrown during sample netcdf processing """

    def __init__(self, message=None):
        super().__init__(message, 'harmonyservices/sample-service')


class SampleServiceAdapter(BaseHarmonyAdapter):
    """ Processes NetCDF4 files """

    def __init__(self, message, catalog=None, config=None):
        """
        Constructs the adapter

        Parameters
        ----------
        message : harmony.Message
            The Harmony input which needs acting upon
        catalog : pystac.Catalog
            A STAC catalog containing the files on which to act
        config : harmony.util.Config
            The configuration values for this runtime environment.
        """
        super().__init__(message, catalog=catalog, config=config)

        if environ.get('USE_LOCALSTACK') == 'true':
            self.s3 = make_localstack_s3fs()
        else:
            self.s3 = make_s3fs()

    def invoke(self):
        """ Downloads, processes, then re-uploads granules. The
            `invoke` class method also validates the request.

        """
        self.message.format.process('mime')
        return (self.message, self.process_items_many_to_one())

    def process_items_many_to_one(self):
        """ Performs some operation on an input STAC Item's data, returning an output
            STAC catalog. This is a many-to-one operation by default. For
            one-to-one operations, it is assumed that the `concatenate` query
            parameter is False, and Harmony will invoke this backend service
            once per input granule. Because of this, each backend invocation is
            expected to produce a single output.

        """
        workdir = mkdtemp()
        try:
            items = list(self.get_all_catalog_items(self.catalog))
            netcdf_urls = get_netcdf_urls(items)

            local_file_paths = download_granules(netcdf_urls, workdir,
                                                 self.message.accessToken,
                                                 self.config, self.logger)

            self.logger.info('INPUT FILES:')
            for file_path in local_file_paths:
                self.logger.info(file_path)

            # TODO change this to do something simple s
        
            return self.catalog
        except Exception as service_exception:
            self.logger.error(service_exception, exc_info=1)
            raise SampleException('Could not create output: '
                                f'{str(service_exception)}') from service_exception
        finally:
            rmtree(workdir)
