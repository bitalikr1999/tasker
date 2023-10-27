import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common';

import { CustomException } from '../exeptions';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const result = {
      status: 400,
      json: {},
    };

    if (exception instanceof CustomException) {
      const { key, description } = exception.getParams();
      result.status = 400;
      result.json = {
        statusCode: 400,
        key,
        description,
      };
    } else if (exception instanceof HttpException) {
      result.status = exception.getStatus();
      result.json = exception.getResponse();
    } else {
      result.status = 500;
      result.json = {};
    }

    this.logger.error(
      `${ctx.getRequest().url} Catch exception, status: ${result.status}`,
    );

    if (result.status === 500) {
      console.log(exception);
    }
    return response.status(result.status).json(result.json);
  }
}
