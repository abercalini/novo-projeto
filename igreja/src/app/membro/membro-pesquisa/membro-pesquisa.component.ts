import { MembroService } from './../membro.service';
import { Membro } from './../membro';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membro-pesquisa',
  templateUrl: './membro-pesquisa.component.html',
  styleUrls: ['./membro-pesquisa.component.css']
})
export class MembroPesquisaComponent implements OnInit {

  membros = [];

  constructor(
    private membroService: MembroService
  ) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.membroService.listarTodos().then(response => this.membros = response);
  }


}
