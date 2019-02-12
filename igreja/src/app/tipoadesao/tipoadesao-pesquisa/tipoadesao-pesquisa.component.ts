import { Component, OnInit, ViewChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { TipoadesaoService } from '../tipoadesao.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';


@Component({
  selector: 'app-tipoadesao-pesquisa',
  templateUrl: './tipoadesao-pesquisa.component.html',
  styleUrls: ['./tipoadesao-pesquisa.component.css']
})
export class TipoadesaoPesquisaComponent implements OnInit {

  adesoes = [];
  @ViewChild('tabela') tabela;

  constructor(
    private titleService: Title,
    private tipoAdesaoService: TipoadesaoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private historicoService: HistoricoService,
    private segurancaService: SegurancaService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Pesquisa de tipo de adesão');
    this.listarTodos();
  }

  listarTodos() {
    this.tipoAdesaoService.listarTodos().then(response => this.adesoes = response)
      .catch(response => {
        console.log(response);
        this.adicionarMensagem('error', response.message, response.message);
      });
  }

  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja exluir o tipo de adesão?',
      accept: () => {
        this.tipoAdesaoService.excluir(codigo).then(() => {
          this.tabela.first = 0;
          this.listarTodos();
          this.historicoService.salvar('Excluiu um tipo de adesão', this.segurancaService.nomeUsuario);
          this.adicionarMensagem('success', 'Excluido com sucesso', 'Excluido com sucesso');
        })
        .catch(response => {
          //TODO: IMPLEMEMTAR O CATCH DEPOIS QUE O CADASTRO DE MEMBRO
          console.log(response);
          this.adicionarMensagem('error', response.message, response.message);
        })
      }
    })
  }



  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
