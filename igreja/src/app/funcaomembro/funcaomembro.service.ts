import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FuncaoMembro } from './funcaoMembro';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Injectable({
  providedIn: 'root'
})
export class FuncaomembroService {

  baseUrl = 'http://localhost:8080/funcaomembro';

  constructor(private httpClient: HttpClient) { }

  salvar(funcaoMembro: FuncaoMembro): Observable<FuncaoMembro> {
    return this.httpClient.post<FuncaoMembro>(this.baseUrl, JSON.stringify(funcaoMembro), {headers: this.adicionarHeadersSalvar()})
      .map(response => response);
  }

  editar(funcaoMembro: FuncaoMembro): Observable<FuncaoMembro> {
    return this.httpClient.put<FuncaoMembro>(`${this.baseUrl}/${funcaoMembro.codigo}`, JSON.stringify(funcaoMembro),
      {headers: this.adicionarHeadersSalvar()}).map(response => response);
  }

  excluir(codigo: number): Observable<FuncaoMembro> {
    return this.httpClient.delete<FuncaoMembro>(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()});
  }

  listaTodos(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl, {headers: this.adicionarHeaders()}).map(response => response);
  }

  buscarPorCodigo(codigo: number): Observable<FuncaoMembro> {
    return this.httpClient.get<FuncaoMembro>(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()}).map(response => response);
  }


  adicionarHeaders() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
   }

  adicionarHeadersSalvar() {
   let headers = new HttpHeaders();
   const token = localStorage.getItem('token');

   headers = headers.set('Content-Type', 'application/json');
   headers = headers.set('Authorization', `Bearer ${token}`);
   return headers;
  }

}
