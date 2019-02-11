import { ActivatedRoute } from '@angular/router';
import { HistoricoService } from './../../historico/historico.service';
import { SegurancaService } from 'src/app/seguranca/seguranca.service';
import { DistritoService } from './../../distrito/distrito.service';
import { Component, OnInit } from '@angular/core';
import { Igreja } from '../igreja';

import { MessageService } from 'primeng/api';
import { IgrejaService } from '../igreja.service';
import { NgForm } from '@angular/forms';


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
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listarDistritos();
    this.adicionarTiposIgrejas();
    this.adicionarContribuicoes();
    const codigo = this.router.snapshot.params['codigo'];
    console.log(codigo);

  }

  salvar(ngForm: NgForm) {
    this.igrejaService.salvar(this.igreja).then(response => {
      ngForm.reset();
      this.igreja = new Igreja();
      this.adicionarMensagem('success', 'Igreja Cadastrado com suceso', 'Igreja Cadastrado com suceso');
      this.historicoService.salvar('Igreja cadastrada ' + response.nome, this.segurancaService.nomeUsuario);
    });
  }

  eventTab(cep: string) {
    cep = cep.replace('-', '');
    this.igrejaService.buscarPorCep(cep).then(response => {
      this.igreja.endereco.rua = response.logradouro;
      this.igreja.endereco.cep = response.cep;
      this.igreja.endereco.cidade = response.localidade;
      this.igreja.endereco.estado = response.uf;
    });
  }

  listarDistritos() {
    this.distritoService.listarTodos().then(response => {
      this.distritos = response.map(d => ({label: d.nome, value: d.codigo}));
    }).catch(response => {
      console.log(response);
      this.adicionarMensagem('error', response.message, response.message);
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

}
