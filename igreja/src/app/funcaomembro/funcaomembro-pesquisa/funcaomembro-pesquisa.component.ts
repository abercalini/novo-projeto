import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/api';
import { FuncaomembroService } from '../funcaomembro.service';
import { ConfirmationService } from 'primeng/api';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';
import { Title } from '@angular/platform-browser';


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
    private segurancaService: SegurancaService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.listarTodos();
    this.titleService.setTitle('Pesquisa da função de membro');
  }

  listarTodos() {
    this.funcaoMembroService.listaTodos().subscribe(response => this.funcoes = response);
  }

  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja excluir a função?',
      accept: () => {
        this.funcaoMembroService.excluir(codigo).subscribe(() => {
          this.tabela.first = 0;
          this.listarTodos();
          this.adicionarMensagem('success', 'Excluido com sucesso', 'Excluido com sucesso');
          this.historicoService.salvar('Excluiu uma função do membro', this.segurancaService.nomeUsuario);
        });
      }
    });

  }

  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
