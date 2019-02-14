import { SegurancaService } from 'src/app/seguranca/seguranca.service';
import { HistoricoService } from './../../historico/historico.service';
import { Membro } from './../membro';
import { Component, OnInit } from '@angular/core';
import { MembroService } from '../membro.service';
import { SituacaomembroService } from '../../situacaomembro/situacaomembro.service';
import { CargoministroService } from '../../cargoministro/cargoministro.service';
import { TipoadesaoService } from '../../tipoadesao/tipoadesao.service';
import { FuncaomembroService } from '../../funcaomembro/funcaomembro.service';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';





@Component({
  selector: 'app-membro-cadastro',
  templateUrl: './membro-cadastro.component.html',
  styleUrls: ['./membro-cadastro.component.css']
})
export class MembroCadastroComponent implements OnInit {

  membro = new Membro();
  tipos = [];
  sexo = [];
  estadoCivil = [];
  situacao = [];
  cargos = [];
  batismo = [];
  dizimista = [];
  tipoAdesao = [];
  funcoes: [];


  constructor(
    private membroService: MembroService,
    private situacaoMembroService: SituacaomembroService,
    private cargoMinistroService: CargoministroService,
    private tipoAdesaoService: TipoadesaoService,
    private funcaoMembroService: FuncaomembroService,
    private historicoService: HistoricoService,
    private segurancaService: SegurancaService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.adicionarTipos();
    this.adicionarSexo();
    this.adicionarEstadoCivil();
    this.adiconarSituacao();
    this.adicionarCargos();
    this.adicionarBatismo();
    this.adicionarDizimo();
    this.adicionarAdesao();
    this.adicionarFuncoes();
  }


  salvar(form: NgForm) {
    this.membroService.salvar(this.membro).then(response => {
      form.reset();
      this.membro = new Membro();
      this.adicionarMensagem('success', 'Cadastrado com sucesso', 'Cadastrado com sucesso');
      this.historicoService.salvar('Cadastrou um membro ' + response.nome, this.segurancaService.nomeUsuario);
    });
  }

<<<<<<< HEAD
    console.log(this.membro);

    this.membroService.salvar(this.membro);
=======
  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
>>>>>>> refs/remotes/origin/master
  }


  adicionarFuncoes() {
    this.funcaoMembroService.listaTodos().then(response => this.funcoes = response.map(
      f => ({label: f.nome, value: {codigo: f.codigo, nome: f.nome}})));
  }

  adicionarAdesao() {
    this.tipoAdesaoService.listarTodos().then(response => this.tipoAdesao = response.map(t => ({value: t.codigo, label: t.nome})));
  }

  adicionarCargos() {
    this.cargoMinistroService.listarTodos().then(response => {
      this.cargos = response.map(c => ({value: c.codigo, label: c.nome}));
    });
  }

  adiconarSituacao() {
    this.situacaoMembroService.listarTodos().then(response => {
      this.situacao = response.map(s => ({value: s.codigo, label: s.situacao}));
    });
  }

  buscarCep(cep: string) {
    cep = cep.replace('/', '');
    this.membroService.buscarCep(cep).then(response => {
      this.membro.endereco.cidade = response.localidade;
      this.membro.endereco.bairro = response.logradouro;
      this.membro.endereco.cep = response.cep;
      this.membro.endereco.estado = response.uf;
    })
    .catch(response => {

    });
  }

  adicionarBatismo() {
    this.batismo = [
      {value: 'Sim', label: 'Sim'},
      {value: 'Não', label: 'Não'}
    ];
  }

  adicionarTipos() {
    this.tipos = [
      {value: 'Membro(a)', label: 'Membro(a)'},
      {value: 'Congregado(a)', label: 'Congregado(a)'},
    ];
  }

  adicionarSexo() {
    this.sexo = [
      {value: 'Masculino', label: 'Masculino'},
      {value: 'Feminino', label: 'Feminino'},
    ];
  }

  adicionarEstadoCivil() {
    this.estadoCivil = [
      {value: 'Solteiro(a)', label: 'Solteiro(a)'},
      {value: 'Casado(a)', label: 'Casado(a)'},
      {value: 'Divorciado(a)', label: 'Divorciado(a)'},
      {value: 'Viuvo(a)', label: 'Viuvo(a)'},
    ];
  }

  adicionarDizimo() {
    this.dizimista = [
      {value: 'Sim', label: 'Sim'},
      {value: 'Não', label: 'Não'}
    ];
  }


}
