import { SegurancaService } from 'src/app/seguranca/seguranca.service';
import { HistoricoService } from './../../historico/historico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IgrejaFilter } from '../igrejaFilter';

import { MessageService } from 'primeng/api';
import { IgrejaService } from '../igreja.service';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-igreja-pesquisa',
  templateUrl: './igreja-pesquisa.component.html',
  styleUrls: ['./igreja-pesquisa.component.css']
})
export class IgrejaPesquisaComponent implements OnInit {

  igrejaFilter = new IgrejaFilter();
  igrejas = [];
  @ViewChild('tabela') tabela;

  constructor(
    private igrejaService: IgrejaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private historicoService: HistoricoService,
    private segurancaService: SegurancaService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja excluir a igreja?',
      accept: () => {
        this.igrejaService.excluir(codigo).then(() => {
          this.adicionarMensagem('success', 'Excluido com sucesso', 'Excluido com sucesso');
          this.historicoService.salvar('Excluido uma igreja ', this.segurancaService.nomeUsuario);
          this.tabela.fist = 0;
          this.pesquisar();
        });
      }
    });
  }

  pesquisar() {
    this.igrejaService.listarTodosParams(this.igrejaFilter).then(response => {
      this.igrejas = response;
    })
    .catch(response => {
      console.log(response);
      this.adicionarMensagem('error', response.message, response.message);
    });
  }

  adicionarMensagem(severity: string, detail: string, sumary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: sumary});
  }

}
