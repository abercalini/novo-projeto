import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Injectable({
  providedIn: 'root'
})
export class SegurancaService {

  helper = new JwtHelperService();
  baseUrl = 'http://localhost:8080/oauth/token';
  tokenPayload: any;
  tokenDecodificado: any;
  nomeUsuario: any;

  constructor(private httpClient: HttpClient) {
    this.carregarToken();
  }

  logar(email: string, senha: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${email}&password=${senha}&grant_type=password`;

    return this.httpClient.post<any>(`${this.baseUrl}`, body, {headers, withCredentials: true})
      .map(response => {
        this.tokenPayload = response;
        this.armazenarToken(this.tokenPayload.access_token);

       // console.log('Response com token payload');
      //  console.log(this.tokenPayload);

      });
  }

  novoAccessToken(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `grant_type=refresh_token`;

    return this.httpClient.post(this.baseUrl, body, {headers, withCredentials: true})
      .map(response => {
        this.tokenPayload = response;
        this.armazenarToken(this.tokenPayload.access_token);
      });
  }

  temPermissao(permissao: string) {
    return this.tokenDecodificado && !this.tokenDecodificado.authorities.includes(permissao);
  }

  armazenarToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenDecodificado = this.helper.decodeToken(token);
    this.nomeUsuario = this.tokenDecodificado.user_name;

    // console.log('Token decoficado');
    // console.log(this.tokenDecodificado);

  //  console.log('Nome do usuario');
    // console.log(this.nomeUsuario);

  }

  carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  logout() {

  }



}
