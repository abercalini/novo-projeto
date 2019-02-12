import { HistoricoService } from './../../historico/historico.service';
import { CargoministroService } from './../cargoministro.service';
import { CargoMinistro } from './../cargoMinistro';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { SegurancaService } from 'src/app/seguranca/seguranca.service';


@Component({
  selector: 'app-cargoministro-cadastro',
  templateUrl: './cargoministro-cadastro.component.html',
  styleUrls: ['./cargoministro-cadastro.component.css']
})
export class CargoministroCadastroComponent implements OnInit {

  cargoMinistro = new CargoMinistro();

  constructor(
    private messageService: MessageService,
    private cargoMinistroService: CargoministroService,
    private historicoService: HistoricoService,
    private segurancaService: SegurancaService
  ) { }

  ngOnInit() {

  }

  salvar(ngForm: NgForm) {
    this.cargoMinistroService.salvar(this.cargoMinistro).then(response => {
      this.adicionarMenssagem('success', 'Cadastrado com sucesso', 'Cadastrado com sucesso');
      this.historicoService.salvar('Cargo ministro cadastrado ' + response.nome, this.segurancaService.nomeUsuario);
      ngForm.reset();
      this.cargoMinistro = new CargoMinistro();
    })
    .catch(response => {
      console.log(response);
      this.adicionarMenssagem('error', response.message, response.message);
    });
  }

  adicionarMenssagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
