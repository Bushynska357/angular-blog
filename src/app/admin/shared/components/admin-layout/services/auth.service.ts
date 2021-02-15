import { from, Observable, Subject, throwError} from "rxjs";
import { catchError, tap} from "rxjs/operators";
import {Injectable} from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { FbAuthResponse, User } from "../interfaces";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService{

    public error$: Subject<string> = new Subject<string>()

    constructor(private http:HttpClient){}

    get token(){
        const expDate = localStorage.getItem('fb-token-exp')
       
        if(new Date().toString() != expDate){
            this.logout
            return null
        }
        console.log(localStorage.getItem('fb-token-exp'))
        return localStorage.getItem('fb-token')
    }

    login(user:User):Observable<any>{
      user.returnSecureToken = true;
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
          tap(_ => this.setToken),
          catchError((error: HttpErrorResponse) => {
            // const msg = `${error.status} ${error.statusText} ${error.url}`;
            const msg = error.error.error;
            console.log(msg.message)
            switch(msg.message){
                case 'INVALID_EMAil':
                    this.error$.next('Неверный email')
                break
                case 'INVALID_PASSWORD':
                    this.error$.next('Неверный пароль')
                break
                case 'EMAIL_NOT_FOUND':
                    this.error$.next('Такого email нет')
                break
            }
            return throwError(new Error(msg));
          })
            
          )
          console.log(this.token)
    }

    logout(){
        this.setToken(null)
    }

    isAuthenticated():boolean{
        if(this.token){
            return true
            console.log(this.token)
        }else{
            return false
        }
    }

    // private handleError(error:HttpErrorResponse):void{
    //     const {message} = error.error;
    //     console.log(message);
    //     // return throwError(error)
    // }

    private setToken(response:FbAuthResponse | null){
        if(response){
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
            localStorage.setItem('fb-token', response.idToken)
            localStorage.setItem('fb-token-exp', expDate.toString())
        }else{
            localStorage.clear()
        }
       
    }
}