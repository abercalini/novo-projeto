import { Component, OnInit } from '@angular/core';
import { TipoAdesao } from '../tipoAdesao';

import { MessageService } from 'primeng/api';
import { TipoadesaoService } from '../tipoadesao.service';
import { NgForm } from '@angular/forms';
import { SegurancaService } from '../../seguranca/seguranca.service';
import { HistoricoService } from '../../historico/historico.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-tipoadesao-cadastro',
  templateUrl: './tipoadesao-cadastro.component.html',
  styleUrls: ['./tipoadesao-cadastro.component.css']
})
export class TipoadesaoCadastroComponent implements OnInit {

  tipoAdesao = new TipoAdesao();

  constructor(
    private messageService: MessageService,
    private tipoAdesaoService: TipoadesaoService,
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
      this.titleService.setTitle('Cadastro do tipo de adesão');
    }

  }

  prepararSalvar(form: NgForm) {
    if (!this.editando()) {
      this.salvar(form);
    } else {
      this.editar();
    }
  }

  editar() {
    this.tipoAdesaoService.editar(this.tipoAdesao).subscribe(response => {
      this.adicionarMensagem('success', 'Atualizado com sucesso', 'Atualizado com sucesso');
      this.adicionarTitulo();
      this.historicoService.salvar('Editou um tipo de adesão ' + response.nome, this.segurancaService.nomeUsuario);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.tipoAdesaoService.buscarPorCodigo(codigo).subscribe(response => {
      this.tipoAdesao = response;
      this.adicionarTitulo();
    });
  }

  salvar(form: NgForm) {
    this.tipoAdesaoService.salvar(this.tipoAdesao).subscribe(response => {
      form.reset();
      this.tipoAdesao = new TipoAdesao();
      this.adicionarMensagem('success', 'Cadastrado com sucesso', 'Cadastrado com sucesso');
      this.historicoService.salvar('Tipo de adesão cadastrada ' + response.nome, this.segurancaService.nomeUsuario);
    });
  }

  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

  editando(): Boolean {
    return Boolean(this.tipoAdesao.codigo);
  }

  adicionarTitulo() {
    this.titleService.setTitle('Editando o tipo de adesão ' + this.tipoAdesao.nome);
  }

}
