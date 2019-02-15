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
  cargos = [];

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
    this.listarCargos();
    const codigo = this.router.snapshot.params['codigo'];
    if (codigo) {
      this.buscarPorCodigo(codigo);
    } else {
      this.titleService.setTitle('Cadastro do visitante');
    }

  }

  buscarPorCodigo(codigo: number) {
    this.visitanteService.buscarPorCodigo(codigo).subscribe(response => {
      this.visitante = response;
      this.adicionarTitulo();
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

  editar() {
    this.visitanteService.editar(this.visitante).subscribe(response => {
      this.historicoService.salvar('Editou um visitante ' + response.nome, this.segurancaService.nomeUsuario);
      this.adicionarMensagem('success', 'Editou com sucesso', 'Editou com sucesso');
      this.adicionarTitulo();
    });
  }

  prepararSalvar(form: NgForm) {
    if (!this.editando()) {
      this.salvar(form);
    } else {
      this.editar();    
    }
  }

  editando(): Boolean {
    return Boolean(this.visitante.codigo);
  }

  listarCargos() {
    this.cargoMinistroService.listarTodos().subscribe(response => this.cargos = response.map(c => ({label: c.nome, value: c.codigo})));
  }

  adicionarTitulo() {
    this.titleService.setTitle('Editando visitante ' + this.visitante.nome);
  }

  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
