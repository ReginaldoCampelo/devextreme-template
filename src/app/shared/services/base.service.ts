import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";

export abstract class BaseService {

  protected Url: string = environment.baseUrl;

  protected SetHeaderJson() {
    return {
      headers: new HttpHeaders({
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NDkxNTAwNn0.icTwW2bQbwX8Iv3G5izer7Qll59kYDRuJZZiacXW8Tvo-kr5giyesiq4cRj1EKz8aXREMqYhsbnlBsrUSu8DTw",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      })
    };
  }

  protected handleError(response: Response | any) {
    let customError: string[] = [];

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === "Unknown Error") {
        customError.push("Ops!, Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
        response.error.errors = customError;
      }
    }

    console.log(response);
    return throwError(response);
  }
}
