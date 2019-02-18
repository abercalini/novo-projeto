import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { SegurancaService } from './seguranca.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject = new BehaviorSubject<string>(null);

  constructor(public auth: SegurancaService, private router: Router, private messageService: MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return  next.handle(request)
      .catch(error => {
          if (error instanceof HttpErrorResponse) {

              switch ((<HttpErrorResponse>error).status) {
                  case 400:
                      return this.handle400Error(error);
                  case 401:
                      return this.handle401Error(request, next);
              }
          }
          return Observable.throw(error);
        });
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      console.log('401');

    if (!this.isRefreshingToken) {
        this.isRefreshingToken = true;

        // Reset here so that the following requests wait until the token
        // comes back from the refreshToken call.
        this.tokenSubject.next(null);

        return this.auth.novoAccessToken()
            .switchMap((refreshToken: string) => {
                if (refreshToken) {
                    this.tokenSubject.next(refreshToken);
                    return next.handle(this.addRefreshToken(request, refreshToken));
                }

                // If we don't get a new token, we are in trouble so logout.
                return this.logoutUser('Falha ao obter refresh token');
            })
            .catch(error => {
              this.messageService.add({severity: 'error', detail: 'Por favor recarrege a página', summary: 'Por favor recarrege a página'});
              // If there is an exception calling 'refreshToken', bad news so logout.
                return this.logoutUser(error);
            })
            .finally(() => {
                this.isRefreshingToken = false;
            });
    } else {
       if (request.body &&  request.body.toString().includes('refresh_token')) {
          return this.logoutUser('Tempo de sessao expirado, conecte novamente.');
        }

        return this.tokenSubject
            .filter(refreshToken => refreshToken != null)
            .take(1)
            .switchMap(refreshToken => {
                return next.handle(this.addRefreshToken(request, refreshToken));
            });
      }
    }

    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.logoutUser('Tempo de sessao expirado, conecte novamente.');
        }
        return Observable.throw(error);
    }

  addRefreshToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
  }

  logoutUser(error) {
    this.auth.logout();
    return throwError(error);
  }
}
