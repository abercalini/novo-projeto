import { CargoMinistro } from './../cargoMinistro';
import { Component, OnInit, ViewChild } from '@angular/core';

import { CargoministroService } from '../cargoministro.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-cargoministro-pesquisa',
  templateUrl: './cargoministro-pesquisa.component.html',
  styleUrls: ['./cargoministro-pesquisa.component.css']
})
export class CargoministroPesquisaComponent implements OnInit {

  cargos = [];
  @ViewChild('tabela') tabela;

  constructor(
    private cargoMinistroService: CargoministroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private historicoService: HistoricoService,
    private segurancaService: SegurancaService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.listarTodos();
    this.titleService.setTitle('Pesquisa do ministro');
  }

  listarTodos() {
    this.cargoMinistroService.listarTodos().subscribe(response => this.cargos = response);
  }

  adicionarMensagem(severity: string, detail: string, sumary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: sumary});
  }

  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja excluir o cargo ministerial?',
      accept: () => {
        this.cargoMinistroService.excluir(codigo).subscribe(() => {
          this.historicoService.salvar('Excluiu um cargo ministerial', this.segurancaService.nomeUsuario);
          this.adicionarMensagem('success', 'Excluido com sucesso', 'Excluido com sucesso');
          this.tabela.fist = 0;
          this.listarTodos();
        });
      }
    });
  }

}
