import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";

export abstract class BaseService {

  protected Url: string = environment.baseUrl;

  protected SetHeaderJson() {
    return {
      headers: new HttpHeaders({
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NTE4NzAzM30.z4VqAap-B-vEFBubbibnOYTgyrosD6_x91FZ3ZQRuGAdIlXLTNDXlm8Le3-FdKZJpfTI8LRm6HWyya35-5SBdA",
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
