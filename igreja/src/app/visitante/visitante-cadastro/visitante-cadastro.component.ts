import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Visitante } from '../visitante';
import { CargoministroService } from '../../cargoministro/cargoministro.service';
import { VisitanteService } from '../visitante.service';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';
import { Title } from '@angular/platform-browser';


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
    private segurancaService: SegurancaService,
    private router: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    // this.listarVisitantes();
    const codigo = this.router.snapshot.params['codigo'];
  }

  buscarPorCodigo(codigo: number) {
    this.visitanteService.buscarPorCodigo(codigo).then(response => {

    })
    .catch(response => {
      console.log(response);
      this.adicionarMensagem('error', response.message, response.message);
    });
  }

  salvar(form: NgForm) {
      this.visitanteService.salvar(this.visitante).subscribe(response => {
        form.reset();
        this.visitante = new Visitante();
        this.historicoService.salvar('Cadastrou um visitante ' + response.nome, this.segurancaService.nomeUsuario);
        this.adicionarMensagem('success', 'Cadastrou com sucesso', 'Cadastrou com sucesso');
      });
  }

  buscarCep(cep: string) {
    cep = cep.replace('/', '');
    this.visitanteService.buscarCep(cep).subscribe(response => {
        this.visitante.endereco.bairro = response.logradouro;
        this.visitante.endereco.cep = response.cep;
        this.visitante.endereco.cidade = response.localidade;
        this.visitante.endereco.estado = response.uf;
    });
  }

 /* listarVisitantes() {
    this.visitanteService.listarTodos().then(response => this.visitantes = response);
  }*/

  adicionarTitulo() {
    this.titleService.setTitle('Editando visitante ' + this.visitante.nome);
  }

  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
