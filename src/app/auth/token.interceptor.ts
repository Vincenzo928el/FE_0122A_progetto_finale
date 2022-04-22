import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authSrv.user$.pipe(take(1),switchMap(user=>{

      //switchMap permette di eseguire una funzione su un observable e poi passare il risultato all'observable successivo, oltre a questo il take(1) permette di eseguire la funzione solo una volta.

      //if (!user)
        //return next.handle(request);
      //}

      const newReq = request.clone({

        //clone permette di creare una nuova istanza dell'oggetto, in questo caso una nuova richiesta con un access token.

        headers:request.headers.set('Authorization',`Bearer ${environment.token}`).set("X-TENANT-ID", environment.ourTenant)
      })
      return next.handle(newReq)
    }))
  }
}
