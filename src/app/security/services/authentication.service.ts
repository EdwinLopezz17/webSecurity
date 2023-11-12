import { Injectable } from '@angular/core';
import {User} from "../model/User";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  basePath: string = "http://localhost:3000/api/v1"
  currentUser!: User

  httpOptions={
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  constructor(private _http:HttpClient) {
  }

  signUp(user:User){
    return this._http.post(`${this.basePath}/sign-up`, user)
      .pipe(retry(2), catchError(this.handleError));
  }
  signIn(user:User){
    return this._http.post(`${this.basePath}/sign-in`, user)
      .pipe(retry(2), catchError(this.handleError));
  }



  handleError(error:HttpErrorResponse){
    if(error.error instanceof  ErrorEvent){
      console.log(`An error occurred: ${error.error.message}`);
    }else{
      console.error(
        `Backend returned code: ${error.status}, body was: ${error.error}`
      )
    }
    return throwError(
      ()=>new Error('Something happened with request, please try again later')
    )
  }
}
