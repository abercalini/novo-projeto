import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FuncaoMembro } from './funcaoMembro';

@Injectable({
  providedIn: 'root'
})
export class FuncaomembroService {

  baseUrl = 'http://localhost:8080/funcaomembro';

  constructor(private httpClient: HttpClient) { }

  salvar(funcaoMembro: FuncaoMembro): Promise<any> {
    return this.httpClient.post(this.baseUrl, JSON.stringify(funcaoMembro), {headers: this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  excluir(codigo: number): Promise<any> {
    return this.httpClient.delete(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()}).toPromise().then(null);
  }

  listaTodos(): Promise<any> {
    return this.httpClient.get(this.baseUrl, {headers: this.adicionarHeaders()}).toPromise().then(response => response);
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${codigo}`, {headers: this.adicionarHeaders()}).toPromise().then(response => response);
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
