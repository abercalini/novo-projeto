import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Igreja } from './igreja';
import { IgrejaFilter } from './igrejaFilter';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable({
  providedIn: 'root'
})
export class IgrejaService {

  baseUrl = 'http://localhost:8080/igreja';
  constructor(private httpClient: HttpClient) { }

  salvar(igreja: Igreja): Observable<Igreja> {
    return this.httpClient.post<Igreja>(`${this.baseUrl}`, JSON.stringify(igreja), {headers : this.adicionarHeadersSalvar()})
      .map(response => response);
  }

  editar(igreja: Igreja): Observable<Igreja> {
    return this.httpClient.put<Igreja>(`${this.baseUrl}/${igreja.codigo}`, JSON.stringify(igreja), {headers : this.adicionarHeadersSalvar()})
      .map(response => response);
  }

  excluir(codigo: number): Observable<Igreja> {
    return this.httpClient.delete<Igreja>(`${this.baseUrl}/${codigo}`, {headers : this.adicionarHeaders()});
  }

  buscarPorCodigo(codigo: number): Observable<Igreja> {
    return this.httpClient.get<Igreja>(`${this.baseUrl}/${codigo}`, {headers : this.adicionarHeaders()})
      .map(response => response);
  }

  listarTodosParams(igrejaFilter: IgrejaFilter): Observable<any> {
    let params = new HttpParams();
    if (igrejaFilter.nome) {
      params = params.set('nome', igrejaFilter.nome);
    }

    return this.httpClient.get<any>(`${this.baseUrl}`, {params, headers: this.adicionarHeaders()})
      .map(response => response);
  }

  buscarPorCep(cep: string): Observable<any> {
    return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`).map(response => response);
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

