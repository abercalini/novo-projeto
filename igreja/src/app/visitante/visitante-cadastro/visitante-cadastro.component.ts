import { Component, OnInit } from '@angular/core';
import { Visitante } from '../visitante';
import { CargoministroService } from '../../cargoministro/cargoministro.service';
import { VisitanteService } from '../visitante.service';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';


@Component({
  selector: 'app-visitante-cadastro',
  templateUrl: './visitante-cadastro.component.html',
  styleUrls: ['./visitante-cadastro.component.css']
})
export class VisitanteCadastroComponent implements OnInit {

  visitante = new Visitante();
  visitantes = [];

  constructor(
    private cargoMinistroService: CargoministroService,
    private visitanteService: VisitanteService,
    private messageService: MessageService,
    private historicoService: HistoricoService,
    private segurancaService: SegurancaService
  ) { }

  ngOnInit() {
    this.listarVisitantes();
  }

  salvar(form: NgForm) {
    console.log('aqiio');
    
      this.visitanteService.salvar(this.visitante).then(response => {
        form.reset();
        this.visitante = new Visitante();
        this.historicoService.salvar('Cadastrou um visitante ' + response.nome, this.segurancaService.nomeUsuario);
        this.adicionarMensagem('success', 'Cadastrou com sucesso', 'Cadastrou com sucesso');  
      })
      .catch(response => {
        console.log(response);
        this.adicionarMensagem('error', response.message, response.message);
      });
  }

  buscarCep(cep: string) {
    cep = cep.replace('/', '');
    this.visitanteService.buscarCep(cep).then(response => {
        this.visitante.endereco.bairro = response.logradouro;
        this.visitante.endereco.cep = response.cep;
        this.visitante.endereco.cidade = response.localidade;
        this.visitante.endereco.estado = response.uf;
    });
  }

  listarVisitantes() {
    this.cargoMinistroService.listarTodos().then(response => this.visitantes = response.map(v => ({label: v.nome, value: v.codigo})));
  }

  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
