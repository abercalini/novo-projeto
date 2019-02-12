import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SituacaoMembro } from './situacaomembro';

@Injectable({
  providedIn: 'root'
})
export class SituacaomembroService {

  baseUrl = 'http://localhost:8080/situacaomembro';

  constructor(private httpClient: HttpClient) { }

  salvar(situacaoMembro: SituacaoMembro): Promise<any> {
    return this.httpClient.post(this.baseUrl, JSON.stringify(situacaoMembro), {headers : this.cadastrarHeaders()})
      .toPromise().then(response => response);
  }

  editar(situacaoMembro: SituacaoMembro): Promise<any> {
    return this.httpClient.put(`${this.baseUrl}/${situacaoMembro.codigo}`, JSON.stringify(situacaoMembro), {headers : this.cadastrarHeaders()})
      .toPromise().then(response => response);
  }

  listarTodos(): Promise<any> {
    return this.httpClient.get(this.baseUrl, {headers: this.cabecalho()}).toPromise().then(response => response);
  }

  exluir(codigo: number): Promise<any> {
    return this.httpClient.delete(`${this.baseUrl}/${codigo}`, {headers: this.cabecalho()}).toPromise().then(null);
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${codigo}`, {headers: this.cabecalho()}).toPromise().then(response => response);
  }


  cadastrarHeaders() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
 
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
   }

   cabecalho() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
 
    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
   }
}
