import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Membro } from './membro';
import { locateHostElement } from '@angular/core/src/render3/instructions';

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

    console.log(membro);
    console.log(JSON.stringify(membro));
    
    
    
    return this.httpClient.post(this.baseUrl, JSON.stringify(membro), {headers : this.adicionarHeadersSalvar()})
      .toPromise().then(response => response);
  }

  adicionarHeadersSalvar() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.set('Content-Type','application/json');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }
  
}
