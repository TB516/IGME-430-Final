import badRequestResponse from './badRequest';
import resourceNotFoundResponse, { endpointNotFoundResponse } from './resourceNotFound';
import methodNotAllowedResponse from './methodNotAllowed';
import unsupportedTypeResponse, { postTypeUnsupportedResponse } from './unsuportedType';
import unauthorizedResponse from './unauthorized';

export {
  badRequestResponse,
  endpointNotFoundResponse,
  resourceNotFoundResponse,
  methodNotAllowedResponse,
  unsupportedTypeResponse,
  postTypeUnsupportedResponse,
  unauthorizedResponse,
};
