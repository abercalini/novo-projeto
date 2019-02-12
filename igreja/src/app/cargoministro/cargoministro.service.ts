import { CargoMinistro } from './cargoMinistro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargoministroService {

  baseUrl = 'http://localhost:8080/cargoministro';

  constructor(private httpClient: HttpClient) { }

  salvar(cargoMinistro: CargoMinistro): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}`, JSON.stringify(cargoMinistro), {headers : this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  excluir(codigo: number): Promise<any> {
    return this.httpClient.delete(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()}).toPromise().then(null);
  }

  /*buscarPorCodigo(codigo: number): Promise<any> {

  } */

  listarTodos(): Promise<any> {
    return this.httpClient.get(this.baseUrl, {headers: this.adicionarHeaders()}).toPromise().then(response => response);
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
