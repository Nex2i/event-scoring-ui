export interface HttpConfig {
  params?: object;
}

export interface HttpClientError {
  content: any;
  message: string;
  code: HttpStatusCodes;
}

export enum HttpStatusCodes {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
  Success = 200,
  Unknown = 0,
}

export const GetHttpStatusMessage = (statusCode?: number): HttpStatusCodes => {
  switch (statusCode) {
    case HttpStatusCodes.BadRequest:
      return HttpStatusCodes.BadRequest;
    case HttpStatusCodes.Unauthorized:
      return HttpStatusCodes.Unauthorized;
    case HttpStatusCodes.Forbidden:
      return HttpStatusCodes.Forbidden;
    case HttpStatusCodes.NotFound:
      return HttpStatusCodes.NotFound;
    case HttpStatusCodes.InternalServerError:
      return HttpStatusCodes.InternalServerError;
    case HttpStatusCodes.Success:
      return HttpStatusCodes.Success;
    case HttpStatusCodes.Conflict:
      return HttpStatusCodes.Conflict;
    default:
      return HttpStatusCodes.Unknown;
  }
};
