import { VisitanteFilter } from './visitanteFIlter';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Visitante } from './visitante';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';



@Injectable({
  providedIn: 'root'
})
export class VisitanteService {

  baseUrl = 'http://localhost:8080/visitantes';

  constructor(private httpClient: HttpClient) { }

  salvar(visitante: Visitante): Observable<Visitante> {
    return this.httpClient.post<Visitante>(this.baseUrl, JSON.stringify(visitante), {headers: this.adicionarHeadersSalvar()})
      .map(response => response);
  }


  excluir(codigo: number): Promise<any> {
    return this.httpClient.delete(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()})
      .toPromise().then(null);
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${codigo}`).toPromise().then(response => response);
  }

  listarTodos(visitanteFilter: VisitanteFilter): Promise<any> {
    let params = new HttpParams();
    if (visitanteFilter.nome) {
      params = params.set('nome', visitanteFilter.nome);
    }
    return this.httpClient.get(this.baseUrl, {params, headers: this.adicionarHeaders()}).toPromise().then(response => response);
  }

  buscarCep(cep: string): Observable<any> {
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
