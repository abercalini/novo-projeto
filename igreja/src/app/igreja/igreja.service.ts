import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Igreja } from './igreja';
import { IgrejaFilter } from './igrejaFilter';

@Injectable({
  providedIn: 'root'
})
export class IgrejaService {

  baseUrl = 'http://localhost:8080/igreja';
  constructor(private httpClient: HttpClient) { }

  salvar(igreja: Igreja): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}`, JSON.stringify(igreja), {headers : this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  editar(igreja: Igreja): Promise<any> {
    return this.httpClient.put(`${this.baseUrl}/${igreja.codigo}`, JSON.stringify(igreja), {headers : this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  excluir(codigo: number): Promise<any> {
    return this.httpClient.delete(`${this.baseUrl}/${codigo}`, {headers : this.adicionarHeaders()})
      .toPromise().then(null);
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${codigo}`, {headers : this.adicionarHeaders()})
      .toPromise().then(response => response);
  }

  listarTodosParams(igrejaFilter: IgrejaFilter): Promise<any> {
    let params = new HttpParams();
    if (igrejaFilter.nome) {
      params = params.set('nome', igrejaFilter.nome);
    }

    return this.httpClient.get(`${this.baseUrl}`, {params, headers: this.adicionarHeaders()})
      .toPromise().then(response => response);
  }

  buscarPorCep(cep: string): Promise<any> {
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

