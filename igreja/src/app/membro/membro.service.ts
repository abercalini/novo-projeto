import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Membro } from './membro';

import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class MembroService {

  baseUrl = 'http://localhost:8080/membro';

  constructor(private httpClient: HttpClient) { }

  buscarCep(cep: string): Promise<any> {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`).toPromise().then(response => response);
  }

  salvar(membro: Membro): Promise<any> {
    return this.httpClient.post(this.baseUrl, JSON.stringify(membro), {headers : this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  editar(membro: Membro): Promise<any> {
    return this.httpClient.put(`${this.baseUrl}/${membro.codigo}`, JSON.stringify(membro), {headers : this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  excluir(codigo: number): Promise<any> {
    return this.httpClient.delete(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()}).toPromise().then(null);
  }

  listarTodos(): Promise<any> {
    return this.httpClient.get(this.baseUrl, {headers: this.adicionarHeaders()}).toPromise().then(response => response);
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()})
      .toPromise().then(response => {
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
