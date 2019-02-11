import { FornecedorFilter } from './fornecedorFilter';
import { Fornecedor } from './fornecedor';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  urlBase = 'http://localhost:8080/fornecedor';

  constructor(private httpClient: HttpClient) {}

  salvar(fornecedor: Fornecedor): Promise<any> {
    return this.httpClient.post(`${this.urlBase}`, JSON.stringify(fornecedor), {headers : this.cadastrarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  editar(fornecedor: Fornecedor): Promise<any> {
    return this.httpClient.put(`${this.urlBase}/${fornecedor.codigo}`, JSON.stringify(fornecedor), {headers: this.cadastrarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  excluir(codigo: number): Promise<any> {
    return this.httpClient.delete(`${this.urlBase}/${codigo}`, {headers : this.adicionarHeaeders()})
      .toPromise().then(null);
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.httpClient.get(`${this.urlBase}/${codigo}`, {headers: this.adicionarHeaeders()})
      .toPromise().then(response => {
        const fornecedor = response as Fornecedor;

        this.converterStringToDate([fornecedor]);

        return fornecedor;
      });
  }

  listarTodos(): Promise<any> {
    return this.httpClient.get(`${this.urlBase}`, {headers: this.adicionarHeaeders()}).toPromise().then(response => response);
  }

  listarTodosParams(fornecedorFilter: FornecedorFilter): Promise<any> {
    let params = new HttpParams();
    if (fornecedorFilter.nome) {
      params = params.append('nome', fornecedorFilter.nome);
    }
    return this.httpClient.get(`${this.urlBase}`, {params, headers: this.adicionarHeaeders()}).toPromise().then(response => response);
  }

  buscarCep(cep: string): Promise<any> {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`)
      .toPromise().then(response => response);
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
