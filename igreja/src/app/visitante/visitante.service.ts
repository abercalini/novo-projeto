import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visitante } from './visitante';

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {

  baseUrl = 'http://localhost:8080/visitantes';

  constructor(private httpClient: HttpClient) { }


  salvar(visitante: Visitante): Promise<any> {
    return this.httpClient.post(this.baseUrl, JSON.stringify(visitante), {headers: this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  listarTodos(): Promise<any> {
    return this.httpClient.get(this.baseUrl, {headers: this.adicionarHeaders()}).toPromise().then(response => response);
  }

  buscarCep(cep: string): Promise<any> {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`).toPromise().then(response => response);
  }


  adicionarHeadersSalvar() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  adicionarHeaders() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }
}
