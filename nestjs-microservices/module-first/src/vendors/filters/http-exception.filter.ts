import { ArgumentsHost, HttpException, HttpStatus, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { JoiException } from '../exceptions/joi.exception';
import { isArray, head, isEmpty, size } from 'lodash';
import { getMessageByHttpStatus, getErrorCodeByHttpStatus } from '../../common/messages';
import { decodeErrorMessage, ErrorResponse, getMessageCode, MessageCode } from '../../common/utils/untils';

export interface IErrorResponse {
  statusCode: number,
  message: string,
  errorCode: string,
  data: any,
}

@Catch()
export class CustomHttpException {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      return new HttpExceptionFilter().catch(exception, host);
    } else {
      return new GraphQLExceptionFilter().catch(exception, host);
    }
  }
}
@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);

    // log error info for debug on server (cloudwatch) - do not remove this code here
    const queryInfo = host.getArgByIndex(3)
    console.error(`query error info: \n - path: ${JSON.stringify(queryInfo?.path)} \n - input: ${JSON.stringify(queryInfo?.variableValues?.input)} `);
    console.error('\nerror content: ', exception); //log error for debug

    return this.handleResponse(exception);
  }

  httpExceptionHandler(exception: HttpException): IErrorResponse {
    const listError = exception.getResponse();
    let errorMessage = exception.message;
    if (isArray(listError) && !isEmpty(listError)) {
      const firstItem = head(listError);
      errorMessage = firstItem?.message ?? errorMessage;
    }

    if (isArray((listError as any)?.message) && size((listError as any)?.message) > 0) {
      errorMessage = head((listError as any)?.message)
    }

    let messageResponse: string = errorMessage
    let errorMessageResponse: string = errorMessage

    const errorMsgObj = decodeErrorMessage(errorMessage)
    messageResponse = (errorMsgObj as ErrorResponse)?.message ?? messageResponse
    errorMessageResponse = (errorMsgObj as ErrorResponse)?.errorCode ?? errorMessageResponse

    return {
      statusCode: exception.getStatus(),
      message: messageResponse,
      errorCode: errorMessageResponse,
      data: null,
    };
  }

  joiExceptionHandler(exception: JoiException) {
    throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
  }

  handleResponse(exception: HttpException): IErrorResponse {
    if (exception instanceof HttpException) {
      return this.httpExceptionHandler(exception);
    } else {
      const err: Error = exception;
      let messageResponse: string = err?.message
      let errorMessageResponse: string = err?.message

      const errorMsgObj = decodeErrorMessage(err?.message)
      messageResponse = (errorMsgObj as ErrorResponse)?.message ?? messageResponse
      errorMessageResponse = (errorMsgObj as ErrorResponse)?.errorCode ?? errorMessageResponse

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: messageResponse,
        errorCode: errorMessageResponse,
        data: null,
      };
    }
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() { }

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage: ErrorResponse = decodeErrorMessage(getMessageCode(MessageCode.SYSTEM_ERROR)) as ErrorResponse

    let errorCode = errorMessage.errorCode;
    let errorMsg = errorMessage.message;

    try {
      httpStatus = exception?.getStatus();
      errorCode = getErrorCodeByHttpStatus(httpStatus) || exception?.name;
      errorMsg = exception?.getResponse()[0]?.message || exception?.message || getMessageByHttpStatus(errorCode);
    } catch (error) { }

    const responseBody = {
      statusCode: httpStatus,
      error: errorCode,
      message: errorMsg,
      data: null,
    };

    response.status(httpStatus).json(responseBody);
  }
}
