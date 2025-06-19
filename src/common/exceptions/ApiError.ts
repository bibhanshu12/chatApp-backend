import { HttpStatus, HttpException } from '@nestjs/common';

type ErrorDetails = { [key: string]: string | number | boolean };

export class ApiError extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    code?: string,
    details?: ErrorDetails,
  ) {
    super(
      {
        statusCode: status,
        message,
        ...(code && { code }),
        ...(details && { details }),
      },
      status,
    );
  }
}
