import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";

export abstract class BaseService {

  protected Url: string = environment.baseUrl;

  protected SetHeaderJson() {
    return {
      headers: new HttpHeaders({
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZXMiOiJST0xFX0FETUlOIiwiaWF0IjoxNjU1OTIyODAwLCJleHAiOjE3MTc3MjI4MDB9.wicnUWrRp-I0dk1yzt0nGGBCUketTbT7hUHUVo7nsbY",
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
