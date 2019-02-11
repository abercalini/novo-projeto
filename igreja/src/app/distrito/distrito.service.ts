import { Distrito } from './distrito';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  baseUrl = 'http://localhost:8080/distritos';

  constructor(private httpClient: HttpClient) {}

  salvar(distrito: Distrito): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}`, JSON.stringify(distrito), {headers : this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  editar(distrito: Distrito): Promise<any> {
    return this.httpClient.put(`${this.baseUrl}/${distrito.codigo}`, JSON.stringify(distrito), {headers: this.adicionarHeadersSalvar()})
      .toPromise().then();
  }

  excluir(codigo: number): Promise<any> {
    return this.httpClient.delete(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()})
      .toPromise().then(null);
  }

  listarTodos(): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}`, {headers: this.adicionarHeaders()}).toPromise().then(response => response);
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${codigo}`, {headers : this.adicionarHeaders()})
      .toPromise().then(response => response);
  }


  adicionarHeaders() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }


  adicionarHeadersSalvar() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
