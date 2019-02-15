import { ActivatedRoute } from '@angular/router';
import { HistoricoService } from './../../historico/historico.service';
import { SegurancaService } from 'src/app/seguranca/seguranca.service';
import { DistritoService } from './../../distrito/distrito.service';
import { Component, OnInit } from '@angular/core';
import { Igreja } from '../igreja';

import { MessageService } from 'primeng/api';
import { IgrejaService } from '../igreja.service';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-igreja-cadastro',
  templateUrl: './igreja-cadastro.component.html',
  styleUrls: ['./igreja-cadastro.component.css']
})
export class IgrejaCadastroComponent implements OnInit {

  igreja =  new Igreja();
  distritos = [];
  tiposIgrejas = [];
  contribuicoes = [];

  constructor(
    private distritoService: DistritoService,
    private messageService: MessageService,
    private igrejaService: IgrejaService,
    private segurancaService: SegurancaService,
    private historicoService: HistoricoService,
    private router: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.listarDistritos();
    this.adicionarTiposIgrejas();
    this.adicionarContribuicoes();
    const codigo = this.router.snapshot.params['codigo'];
    if (codigo) {
      this.buscarPorCodigo(codigo);
    } else {
      this.titleService.setTitle('Cadastro de igreja');
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
    this.igrejaService.editar(this.igreja).subscribe(response => {
      this.historicoService.salvar('Igreja editada ' + response.nome, this.segurancaService.nomeUsuario);
      this.adicionarMensagem('success', 'Igreja editada com sucesso', 'Igreja editada com sucesso');
      this.adicionarTitulo();
    });
  }

  salvar(ngForm: NgForm) {
    this.igrejaService.salvar(this.igreja).subscribe(response => {
      ngForm.reset();
      this.igreja = new Igreja();
      this.adicionarMensagem('success', 'Igreja Cadastrado com suceso', 'Igreja Cadastrado com suceso');
      this.historicoService.salvar('Igreja cadastrada ' + response.nome, this.segurancaService.nomeUsuario);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.igrejaService.buscarPorCodigo(codigo).subscribe(respnse => {
      this.igreja = respnse;
      this.adicionarTitulo();
    });
  }

  eventTab(cep: string) {
    cep = cep.replace('-', '');
    this.igrejaService.buscarPorCep(cep).subscribe(response => {
      this.igreja.endereco.rua = response.logradouro;
      this.igreja.endereco.cep = response.cep;
      this.igreja.endereco.cidade = response.localidade;
      this.igreja.endereco.estado = response.uf;
    });
  }

  listarDistritos() {
    this.distritoService.listarTodos().subscribe(response => {
      this.distritos = response.map(d => ({label: d.nome, value: d.codigo}));
    });
  }

  adicionarTiposIgrejas() {
    this.tiposIgrejas = [
      {label: 'Filial', value: 'Filial'},
      {label: 'Sede', value: 'Sede' },
      {label: 'SubSede', value: 'SubSede'}
    ];
  }

  adicionarContribuicoes() {
    this.contribuicoes = [
      {label: '10%', value: '10%'},
      {label: '20%', value: '20%'},
      {label: '30%', value: '30%'},
      {label: '40%', value: '40%'},
      {label: '50%', value: '50%'},
      {label: '60%', value: '60%'},
      {label: '70%', value: '70%'},
      {label: '80%', value: '80%'},
      {label: '90%', value: '90%'},
      {label: '100%', value: '100%'}
    ];
  }

  adicionarMensagem(severity: string, detail: string, sumary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: sumary});
  }

  editando(): Boolean {
    return Boolean(this.igreja.codigo);
  }

  adicionarTitulo() {
    this.titleService.setTitle('Editando a igreja ' + this.igreja.nome);
  }

}
