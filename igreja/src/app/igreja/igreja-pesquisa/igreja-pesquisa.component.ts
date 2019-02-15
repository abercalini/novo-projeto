import { SegurancaService } from 'src/app/seguranca/seguranca.service';
import { HistoricoService } from './../../historico/historico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IgrejaFilter } from '../igrejaFilter';

import { MessageService } from 'primeng/api';
import { IgrejaService } from '../igreja.service';
import { ConfirmationService } from 'primeng/api';
import { Title } from '@angular/platform-browser';


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
    private segurancaService: SegurancaService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.pesquisar();
    this.titleService.setTitle('Pesquisa de igreja');
  }

  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja excluir a igreja?',
      accept: () => {
        this.igrejaService.excluir(codigo).subscribe(() => {
          this.adicionarMensagem('success', 'Excluido com sucesso', 'Excluido com sucesso');
          this.historicoService.salvar('Excluido uma igreja ', this.segurancaService.nomeUsuario);
          this.tabela.fist = 0;
          this.pesquisar();
        });
      }
    });
  }

  pesquisar() {
    this.igrejaService.listarTodosParams(this.igrejaFilter).subscribe(response => {
      this.igrejas = response;
    });
  }

  adicionarMensagem(severity: string, detail: string, sumary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: sumary});
  }

}
