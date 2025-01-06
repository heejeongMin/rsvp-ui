export class ResponseWrapper {
  errorCode: string;
  errorMessage: string;
  response: IResponse;

  constructor(errorCode: string, errorMessage: string) {
      this.errorCode = errorCode;
      this.errorMessage = errorMessage;
    }
}

export interface IResponse {}
