import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoAdesao } from './tipoAdesao';

@Injectable({
  providedIn: 'root'
})
export class TipoadesaoService {

  baseUrl = 'http://localhost:8080/tipoadesao';

  constructor(private httpClient: HttpClient) { }

  salvar(tipoAdesao: TipoAdesao): Promise<any> {
    return this.httpClient.post(this.baseUrl, JSON.stringify(tipoAdesao), {headers: this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  editar(tipoAdesao: TipoAdesao): Promise<any> {
    return this.httpClient.put(`${this.baseUrl}/${tipoAdesao.codigo}` ,JSON.stringify(tipoAdesao), {headers: this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  listarTodos(): Promise<any> {
    return this.httpClient.get(this.baseUrl, {headers: this.adicionarHeaders()}).toPromise().then(response => response);
  }

  excluir(codigo: number): Promise<any> {
    return this.httpClient.delete(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()}).toPromise().then(null);
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()}).toPromise().then(response => response);
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
