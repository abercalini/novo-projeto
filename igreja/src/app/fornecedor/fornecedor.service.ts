import { FornecedorFilter } from './fornecedorFilter';
import { Fornecedor } from './fornecedor';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  urlBase = 'http://localhost:8080/fornecedor';

  constructor(private httpClient: HttpClient) {}

  salvar(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient.post<Fornecedor>(`${this.urlBase}`, JSON.stringify(fornecedor), {headers : this.cadastrarHeadersSalvar()})
      .map(response => response);
  }

  editar(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient.put<Fornecedor>(`${this.urlBase}/${fornecedor.codigo}`, JSON.stringify(fornecedor), {headers: this.cadastrarHeadersSalvar()})
      .map(response => response);
  }

  excluir(codigo: number): Observable<Fornecedor> {
    return this.httpClient.delete<Fornecedor>(`${this.urlBase}/${codigo}`, {headers : this.adicionarHeaeders()});
  }

  buscarPorCodigo(codigo: number): Observable<Fornecedor> {
    return this.httpClient.get<Fornecedor>(`${this.urlBase}/${codigo}`, {headers: this.adicionarHeaeders()})
      .map(response => {
        const fornecedor = response as Fornecedor;

        this.converterStringToDate([fornecedor]);

        return fornecedor;
      });
  }

  listarTodos(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlBase}`, {headers: this.adicionarHeaeders()}).map(response => response);
  }

  listarTodosParams(fornecedorFilter: FornecedorFilter): Observable<any> {
    let params = new HttpParams();
    if (fornecedorFilter.nome) {
      params = params.append('nome', fornecedorFilter.nome);
    }
    return this.httpClient.get<any>(`${this.urlBase}`, {params, headers: this.adicionarHeaeders()}).map(response => response);
  }

  buscarCep(cep: string): Observable<any> {
    return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
      .map(response => response);
  }

  private converterStringToDate(fornecedores: [Fornecedor]) {
    for (const fornecedor of fornecedores) {
      if (fornecedor.dataAdmissao) {
        fornecedor.dataAdmissao = moment(fornecedor.dataAdmissao, 'YYYY-MM-DD').toDate();
      }
      if (fornecedor.dataDesligamento) {
        fornecedor.dataDesligamento = moment(fornecedor.dataDesligamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

  adicionarHeaeders() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return headers;
  }

  cadastrarHeadersSalvar() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
   }
}
