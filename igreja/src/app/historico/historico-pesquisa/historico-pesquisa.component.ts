import { HistoricoFilter } from './../historicoFilter';
import { MessageService } from 'primeng/api';
import { HistoricoService } from './../historico.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-historico-pesquisa',
  templateUrl: './historico-pesquisa.component.html',
  styleUrls: ['./historico-pesquisa.component.css']
})
export class HistoricoPesquisaComponent implements OnInit {


  historicos = [];
  historicoFilter = new HistoricoFilter();
  pesquisarUsuario: string;

  constructor(
    private historicoService: HistoricoService,
    private messageService: MessageService,
    ) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.historicoFilter.usuario = this.pesquisarUsuario;
    this.historicoService.listar(this.historicoFilter).subscribe(response => this.historicos = response);
  }

}
