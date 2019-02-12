import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/api';
import { FuncaomembroService } from '../funcaomembro.service';
import { ConfirmationService } from 'primeng/api';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';


@Component({
  selector: 'app-funcaomembro-pesquisa',
  templateUrl: './funcaomembro-pesquisa.component.html',
  styleUrls: ['./funcaomembro-pesquisa.component.css']
})
export class FuncaomembroPesquisaComponent implements OnInit {

  funcoes = [];
  @ViewChild('tabela') tabela;

  constructor(
    private funcaoMembroService: FuncaomembroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private historicoService: HistoricoService,
    private segurancaService: SegurancaService
  ) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.funcaoMembroService.listaTodos().then(response => this.funcoes = response)
      .catch(response => {
        console.log(response);
        this.adicionarMensagem('error', response.message, response.message);
      })
  }

  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja excluir a função?',
      accept: () => {
        this.funcaoMembroService.excluir(codigo).then(() => {
          this.tabela.first = 0;
          this.listarTodos();
          this.adicionarMensagem('success', 'Excluido com sucesso', 'Excluido com sucesso');
          this.historicoService.salvar('Excluiu uma função do membro', this.segurancaService.nomeUsuario);
        })
        .catch(response => {
          console.log(response);
          this.adicionarMensagem('error', response.message, response.message);
        })
      }
    });
    
  }

  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
