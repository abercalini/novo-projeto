import { ActivatedRoute } from '@angular/router';
import { Distrito } from './../distrito';
import { HistoricoService } from './../../historico/historico.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DistritoService } from '../distrito.service';
import { MessageService } from 'primeng/api';
import { SegurancaService } from 'src/app/seguranca/seguranca.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-districo-cadastro',
  templateUrl: './districo-cadastro.component.html',
  styleUrls: ['./districo-cadastro.component.css']
})
export class DistricoCadastroComponent implements OnInit {

  distrito = new Distrito();

  constructor(
    private distritoService: DistritoService,
    private messageService: MessageService,
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
      this.titleService.setTitle('Cadastro de Distrito');
    }
  }

  prepararSalvar(ngForm: NgForm) {
    if (!this.editando()) {
      this.salvar(ngForm);
    } else {
      this.editar();
    }
  }

  salvar(ngForm: NgForm) {
    this.distritoService.salvar(this.distrito).subscribe(response => {
      this.historicoService.salvar('Cadastro do Distrito ' + response.nome, this.segurancaService.nomeUsuario);
      this.adicionarMensagem('success', 'Distrito cadastrado com sucesso', 'Distrito cadastrado com sucesso');
      ngForm.reset();
    });
  }

  editar() {
    this.distritoService.editar(this.distrito).subscribe(() => {
      this.historicoService.salvar('Editando Distrito', this.segurancaService.nomeUsuario);
      this.adicionarMensagem('success', 'Distrito editado com sucesso', 'Distrito editado com sucesso');
      this.titleService.setTitle('Editando Distrito ' + this.distrito.nome);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.distritoService.buscarPorCodigo(codigo).subscribe(response => {
      this.distrito = response;
      this.titleService.setTitle('Editando Distrito ' + this.distrito.nome);
    });
  }

  editando(): Boolean {
    return Boolean(this.distrito.codigo);
  }

  adicionarMensagem(severity: string, detail: string, sumary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: sumary});
  }

}
