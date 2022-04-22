import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    username: string;
    surname: string;
    type: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private authSub = new BehaviorSubject<AuthData | null>(null); //questa variabile serve per tenere traccia dell'access token

  user$ = this.authSub.asObservable();

  timeoutRef: any;

  isLoggedIn$ = this.user$.pipe(map(user=>!!user));


  constructor(private http: HttpClient, private router: Router) {
    this.restore()
  }


  login(data: { username: string; password: string }) {
    return this.http
      .post<AuthData>(`${environment.apiBaseUrl}/auth/login`, data)
      .pipe(
        tap((data) => {
          console.log('user auth data:', data);
        }),
        tap((data) => {
          this.authSub.next(data);
          localStorage.setItem('user', JSON.stringify(data));

        }),
        catchError(this.errors)
      );
  }


  register(data:any) {
    return this.http
      .post(`${environment.apiBaseUrl}/auth/signup`, data)
      .pipe(
        tap((data) => {
          console.log('result:', data);
        }),
        catchError(this.errors)
      );
  }


  restore(){
    const userJson = localStorage.getItem('user')
    if (!userJson) {
      return
    }
    const user:AuthData = JSON.parse(userJson)
    this.authSub.next(user)

  }


  logout() {
    this.authSub.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
  }



  private errors(err: any) {
      // console.error(err)
      switch (err.error) {
        case "Email and password are required":
          return throwError("Email e password sono obbligatorie");
          break;
        case "Email already exists":
          return throwError("L'utente risulta già registrato");
          break;
        case "Email format is invalid":
          return throwError("Il formato della mail non è valido");
          break;
        case "Cannot find user":
          return throwError("L'utente non esiste");
          break;

        default:
          return throwError("Errore nella chiamata");
          break;
      }
    }
}
