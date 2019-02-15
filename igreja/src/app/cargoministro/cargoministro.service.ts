import { CargoMinistro } from './cargoMinistro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable({
  providedIn: 'root'
})
export class CargoministroService {

  baseUrl = 'http://localhost:8080/cargoministro';

  constructor(private httpClient: HttpClient) { }

  salvar(cargoMinistro: CargoMinistro): Observable<CargoMinistro> {
    return this.httpClient.post<CargoMinistro>(this.baseUrl, JSON.stringify(cargoMinistro), {headers: this.adicionarHeadersSalvar()})
      .map(response => response);
  }

  editar(cargoministro: CargoMinistro): Observable<CargoMinistro> {
    return this.httpClient.put<CargoMinistro>(`${this.baseUrl}/${cargoministro.codigo}`, JSON.stringify(cargoministro),
      {headers : this.adicionarHeadersSalvar()}).map(response => response);
  }

  excluir(codigo: number): Observable<CargoMinistro> {
    return this.httpClient.delete<CargoMinistro>(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()});
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()}).map(response => response);
  }

  /*listarTodos(): Promise<any> {
    return this.httpClient.get(this.baseUrl, {headers: this.adicionarHeaders()}).toPromise().then(response => response);
  } */

  listarTodos(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl, {headers: this.adicionarHeaders()})
      .map(response => response);
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
