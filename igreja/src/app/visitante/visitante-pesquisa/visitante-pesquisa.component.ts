import { HistoricoService } from './../../historico/historico.service';
import { SegurancaService } from 'src/app/seguranca/seguranca.service';
import { VisitanteFilter } from './../visitanteFIlter';
import { VisitanteService } from './../visitante.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-visitante-pesquisa',
  templateUrl: './visitante-pesquisa.component.html',
  styleUrls: ['./visitante-pesquisa.component.css']
})
export class VisitantePesquisaComponent implements OnInit {


  visitantes = [];
  visitanteFilter = new VisitanteFilter();
  @ViewChild('tabela') tabela;

  constructor(
    private visitanteService: VisitanteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private segurancaService: SegurancaService,
    private historicoService: HistoricoService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.visitanteService.listarTodos(this.visitanteFilter).then(response => this.visitantes = response);
  }


  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja excluir o visitante?',
      accept: () => {
        this.visitanteService.excluir(codigo).then(() => {
          this.adicionarMensagem('success', 'Excluido com sucesso', 'Excluido com sucesso');
          this.tabela.first = 0;
          this.pesquisar();
          this.historicoService.salvar('Excluiu um visitante ', this.segurancaService.nomeUsuario);
        });
      }
    });
  }

  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
