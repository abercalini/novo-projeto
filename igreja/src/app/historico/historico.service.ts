import { HistoricoFilter } from './historicoFilter';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Historico } from './historico';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  urlBase = 'http://localhost:8080/historico';

  constructor(private httpClient: HttpClient) { }

  salvar(descricao: string, usuario: string): Promise<any> {
    return this.httpClient.post<any>(`${this.urlBase}`, JSON.stringify(this.cadastrarHistorico(descricao, usuario)),
      {headers : this.cadastrarHeaders()}).toPromise().then(null);
  }

 /* salvarTeste(descricao: string, usuario: string): Observable<string> {
    console.log('Chamou o salvar');
    return this.httpClient.post<string>(`${this.urlBase}`, JSON.stringify(this.cadastrarHistorico(descricao, usuario)),
      {headers : this.cadastrarHeaders()}).map(response => response);
  } */

  listar(historicoFilter: HistoricoFilter): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<any>(`${this.urlBase}`, {headers, params : this.adicionarParams(historicoFilter)})
      .map(response => response);
  }

  adicionarParams(historicoFilter: HistoricoFilter) {
    let params = new HttpParams();
    if (historicoFilter.usuario) {
      params = params.set('usuario', historicoFilter.usuario);
    }
    return params;
  }

  cadastrarHistorico(descricao: string, usuario: string) {
    const historico = new Historico();
    historico.descricao = descricao;
    historico.usuario = usuario;
    historico.data = new Date();

    return historico;
  }

  cadastrarHeaders() {
   let headers = new HttpHeaders();
   const token = localStorage.getItem('token');

   headers = headers.set('Content-Type', 'application/json');
   headers = headers.set('Authorization', `Bearer ${token}`);
   return headers;
  }
}
