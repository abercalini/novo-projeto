import { HistoricoFilter } from './historicoFilter';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Historico } from './historico';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  urlBase = 'http://localhost:8080/historico';

  constructor(private httpClient: HttpClient) { }

  salvar(descricao: string, usuario: string): Promise<any> {
    return this.httpClient.post(`${this.urlBase}`, JSON.stringify(this.cadastrarHistorico(descricao, usuario)),
      {headers : this.cadastrarHeaders()}).toPromise().then(null);
  }

  listar(historicoFilter: HistoricoFilter): Promise<any> {


    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.httpClient.get(`${this.urlBase}`, {headers, params : this.adicionarParams(historicoFilter)})
      .toPromise().then(response => response);
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
