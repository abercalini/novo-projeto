import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoAdesao } from './tipoAdesao';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Injectable({
  providedIn: 'root'
})
export class TipoadesaoService {

  baseUrl = 'http://localhost:8080/tipoadesao';

  constructor(private httpClient: HttpClient) { }

  salvar(tipoAdesao: TipoAdesao): Observable<TipoAdesao> {
    return this.httpClient.post<TipoAdesao>(this.baseUrl, JSON.stringify(tipoAdesao), {headers: this.adicionarHeadersSalvar()})
      .map(response => response);
  }

  editar(tipoAdesao: TipoAdesao): Observable<TipoAdesao> {
    return this.httpClient.put<TipoAdesao>(`${this.baseUrl}/${tipoAdesao.codigo}`
      , JSON.stringify(tipoAdesao), {headers: this.adicionarHeadersSalvar()}).map(response => response);
  }

  listarTodos(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl, {headers: this.adicionarHeaders()}).map(response => response);
  }

  excluir(codigo: number): Observable<TipoAdesao> {
    return this.httpClient.delete<TipoAdesao>(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()});
  }

  buscarPorCodigo(codigo: number): Observable<TipoAdesao> {
    return this.httpClient.get<TipoAdesao>(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()}).map(response => response);
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
