import { Title } from '@angular/platform-browser';
import { HistoricoService } from './../../historico/historico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DistritoService } from '../distrito.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SegurancaService } from 'src/app/seguranca/seguranca.service';
import { Message } from 'primeng/components/common/api';



@Component({
  selector: 'app-districo-pesquisa',
  templateUrl: './districo-pesquisa.component.html',
  styleUrls: ['./districo-pesquisa.component.css']
})
export class DistricoPesquisaComponent implements OnInit {

  distritos = [];
  @ViewChild('tabela') tabela;
  mensagem: Message[] = [];

  constructor(
    private distritoService: DistritoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private historicoService: HistoricoService,
    private segurancaService: SegurancaService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.listarTodos();
    this.titleService.setTitle('Pesquisa de distrito');
  }

  listarTodos() {
    this.distritoService.listarTodos().subscribe(response => {
      this.distritos = response;
    });
  }

  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja excluir o distrito ?',
      accept: () => {
        this.distritoService.excluir(codigo).subscribe(() => {
          this.tabela.first = 0;
          this.listarTodos();
          this.adicionarMensagem('success', 'Excluido com sucesso', 'Excluido com sucesso');
          this.historicoService.salvar('Excluiu um distrito', this.segurancaService.nomeUsuario);
        });
      }
    });
  }

  adicionarMensagem(severity: string, detail: string, sumary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: sumary});
  }
}
