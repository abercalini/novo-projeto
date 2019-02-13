import { Membro } from './../membro';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membro-cadastro',
  templateUrl: './membro-cadastro.component.html',
  styleUrls: ['./membro-cadastro.component.css']
})
export class MembroCadastroComponent implements OnInit {

  membro = new Membro();
  tipos = [];
  sexo = [];
  estadoCivil = [];

  constructor() { }

  ngOnInit() {
    this.adicionarTipos();
    this.adicionarSexo();
    this.adicionarEstadoCivil();
  }

  adicionarTipos() {
    this.tipos = [
      {value: 'Membro(a)', label: 'Membro(a)'},
      {value: 'Congregado(a)', label: 'Congregado(a)'},
    ];
  }

  adicionarSexo() {
    this.sexo = [
      {value: 'Masculino', label: 'Masculino'},
      {value: 'Feminino', label: 'Feminino'},
    ];
  }

  adicionarEstadoCivil() {
    this.estadoCivil = [
      {value: 'Solteiro(a)', label: 'Solteiro(a)'},
      {value: 'Casado(a)', label: 'Casado(a)'},
      {value: 'Divorciado(a)', label: 'Divorciado(a)'},
      {value: 'Viuvo(a)', label: 'Viuvo(a)'},
    ];
  }


}
