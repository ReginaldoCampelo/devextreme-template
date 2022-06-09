import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";

export abstract class BaseService {

  protected Url: string = environment.baseUrl;

  protected SetHeaderJson() {
    return {
      headers: new HttpHeaders({
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NDY4NjA3M30.1FigfUh595XoTg94t2XLFLejV6Lpg-x4mm5HbLyX_MWMhGQpBCXIxLUjsAQLRB8Lq0VMj23j940M11eiIpR6cQ",
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
