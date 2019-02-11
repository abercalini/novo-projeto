import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';


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

  logar(email: string, senha: string): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${email}&password=${senha}&grant_type=password`;

    return this.httpClient.post(`${this.baseUrl}`, body, {headers})
      .toPromise().then(response => {
        this.tokenPayload = response;
        this.armazenarToken(this.tokenPayload.access_token);
      });
  }

  armazenarToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenDecodificado = this.helper.decodeToken(token);
    this.nomeUsuario = this.tokenDecodificado.user_name;
  }

  carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }



}
