import { HistoricoService } from './../../historico/historico.service';
import { CargoministroService } from './../cargoministro.service';
import { CargoMinistro } from './../cargoMinistro';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { SegurancaService } from 'src/app/seguranca/seguranca.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


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
    private segurancaService: SegurancaService,
    private router: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    const codigo = this.router.snapshot.params['codigo'];

    if (codigo) {
      this.buscarPorCodigo(codigo);
    } else {
      this.titleService.setTitle('Cadastro do cargo do ministro');
    }
  }

  prepararSalvar(ngForm: NgForm) {
    if (!this.editando()) {
      this.salvar(ngForm);
    } else {
      this.editar();
    }
  }

  editar() {
    this.cargoMinistroService.editar(this.cargoMinistro).subscribe(response => {
      this.adicionarMenssagem('success', 'Editado com sucesso', 'Editado com sucesso');
      this.adicionarTitulo();
      this.historicoService.salvar('Editou um cargo ' + response.nome, this.segurancaService.nomeUsuario);
    });
  }

  salvar(ngForm: NgForm) {
    this.cargoMinistroService.salvar(this.cargoMinistro).subscribe(response => {
      this.adicionarMenssagem('success', 'Cadastrado com sucesso', 'Cadastrado com sucesso');
      this.historicoService.salvar('Cadastrou um cargo do ministro ' + response.nome, this.segurancaService.nomeUsuario);
      ngForm.reset();
      this.cargoMinistro = new CargoMinistro();
    });
  }

  buscarPorCodigo(codigo: number) {
    this.cargoMinistroService.buscarPorCodigo(codigo).subscribe(response => {
      console.log(response);
      this.cargoMinistro = response;
      this.adicionarTitulo();
    });
  }

  adicionarTitulo() {
    this.titleService.setTitle('Editando cargo ministro ' + this.cargoMinistro.nome);
  }

  editando(): Boolean {
    return Boolean(this.cargoMinistro.codigo);
  }

  adicionarMenssagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
