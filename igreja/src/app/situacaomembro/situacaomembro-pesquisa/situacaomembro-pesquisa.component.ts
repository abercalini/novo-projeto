import { Component, OnInit, ViewChild } from '@angular/core';

import { SituacaomembroService } from '../situacaomembro.service';
import { Title } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';


@Component({
  selector: 'app-situacaomembro-pesquisa',
  templateUrl: './situacaomembro-pesquisa.component.html',
  styleUrls: ['./situacaomembro-pesquisa.component.css']
})
export class SituacaomembroPesquisaComponent implements OnInit {

  @ViewChild('tabela') tabela;
  situacoes = [];

  constructor(
    private situacaoMembroService: SituacaomembroService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private historicoService: HistoricoService,
    private seugancaService: SegurancaService

  ) { }

  ngOnInit() {
    this.listarTodos();
    this.title.setTitle('Pesquisa situação de membro');
  }

  listarTodos() {
    this.situacaoMembroService.listarTodos().subscribe(response => this.situacoes = response);
  }

  excluir(codigo: number) {
    // Todo: depois alterar o codigo quando o cadastro de membro estiver ativo
    this.confirmationService.confirm({
      message: 'Deseja excluir a situação do membro?',
      accept: () => {
        this.situacaoMembroService.exluir(codigo).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Excluido com sucesso', detail: 'Excluido com sucesso'});
          this.tabela.firs = 0;
          this.listarTodos();
          this.historicoService.salvar('Excluiu uma situação de membro ', this.seugancaService.nomeUsuario);
        });
      }
    });
  }

}
