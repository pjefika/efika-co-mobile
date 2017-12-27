import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Cadastro } from '../../view-model/cadastro/cadastro';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private getCadastroApiUrl = 'http://10.40.195.81:8080/stealerAPI/oss';

  constructor(public http: HttpClient) {
    
  }

  // getCountries(): Observable<{}> {
  //   return this.http.get(this.apiUrl).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError)
  //   );
  // }
  
  getCadastro(instancia:string): Observable<Cadastro> {
    let rqstData = {"instancia":instancia, "executor":"ionicTest"}
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json')
    return this.http.post(this.getCadastroApiUrl, rqstData).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
