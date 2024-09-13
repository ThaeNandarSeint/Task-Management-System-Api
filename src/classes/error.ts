import { globalErrors } from '../errors';

export class ApiError extends Error {
  statusCode: number;
  data: unknown;

  constructor(message: string, statusCode: number, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = globalErrors.BAD_REQUEST, data = null) {
    return new ApiError(message, 400, data);
  }

  static notAuthenticated(
    message = globalErrors.NOT_AUTHENTICATED,
    data = null
  ) {
    return new ApiError(message, 401, data);
  }

  static notAuthorized(message = globalErrors.NOT_AUTHORIZED, data = null) {
    return new ApiError(message, 403, data);
  }

  static notFound(message = globalErrors.END_POINT_NOT_FOUND) {
    return new ApiError(message, 404);
  }
}
