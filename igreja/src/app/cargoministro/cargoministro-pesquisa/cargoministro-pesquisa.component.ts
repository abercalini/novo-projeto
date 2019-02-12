import { Component, OnInit, ViewChild } from '@angular/core';

import { CargoministroService } from '../cargoministro.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';



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
    private segurancaService: SegurancaService
  ) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.cargoMinistroService.listarTodos().then(response => this.cargos = response)
      .catch(response => {
        console.log(response);
        this.adicionarMensagem('error', response.message, response.message);
      });
  }

  adicionarMensagem(severity: string, detail: string, sumary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: sumary});
  }

  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja excluir o cargo ministerial?',
      accept: () => {
        this.cargoMinistroService.excluir(codigo).then(() => {
          this.historicoService.salvar('Excluiu um cargo ministerial', this.segurancaService.nomeUsuario);
          this.adicionarMensagem('success', 'Excluido com sucesso', 'Excluido com sucesso');
          this.tabela.fist = 0;
          this.listarTodos();
        })
        .catch(response => {
          //TODO: depois de criar a tabela membro fazer as alterações
          console.log(response);
          this.adicionarMensagem('error', response.message, response.message);
        })
      }
    })
  }

}
