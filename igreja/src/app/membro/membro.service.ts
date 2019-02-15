import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Membro } from './membro';

import * as moment from 'moment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';



@Injectable({
  providedIn: 'root'
})
export class MembroService {

  baseUrl = 'http://localhost:8080/membro';

  constructor(private httpClient: HttpClient) { }

  buscarCep(cep: string): Observable<any> {
    return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`).map(response => response);
  }

  salvar(membro: Membro): Observable<Membro> {
    return this.httpClient.post<Membro>(this.baseUrl, JSON.stringify(membro), {headers : this.adicionarHeadersSalvar()})
      .map(response => response);
  }

  editar(membro: Membro): Observable<Membro> {
    return this.httpClient.put<Membro>(`${this.baseUrl}/${membro.codigo}`
    , JSON.stringify(membro), {headers : this.adicionarHeadersSalvar()}).map(response => response);
  }

  excluir(codigo: number): Observable<any> {
    return this.httpClient.delete<Membro>(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()});
  }

  listarTodos(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl, {headers: this.adicionarHeaders()}).map(response => response);
  }

  buscarPorCodigo(codigo: number): Observable<Membro> {
    return this.httpClient.get<Membro>(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()})
      .map(response => {
          const membro = response as Membro;
          this.converterStringToDate([membro]);
          return membro;
      });
  }

  converterStringToDate(membros: [Membro]) {
    for (const membro of membros) {
        if (membro.dataNascimento) {
            membro.dataNascimento = moment(membro.dataNascimento, 'YYYY-MM-DD').toDate();
        }
        if (membro.dataConsagracao) {
            membro.dataConsagracao = moment(membro.dataConsagracao, 'YYYY-MM-DD').toDate();
        }
        if (membro.dataBatismo) {
            membro.dataBatismo = moment(membro.dataBatismo, 'YYYY-MM-DD').toDate();
        }
    }
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
