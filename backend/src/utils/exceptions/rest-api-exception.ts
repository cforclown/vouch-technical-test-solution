
import { HttpStatusCode } from 'axios';
import { BaseException, EExceptionCodes } from '.';

export class RestApiException extends BaseException {
  httpCode: number;
  constructor (message: string, httpCode: HttpStatusCode = 400) {
    super(EExceptionCodes.RestAPI, message);
    this.httpCode = httpCode;
  }
}
