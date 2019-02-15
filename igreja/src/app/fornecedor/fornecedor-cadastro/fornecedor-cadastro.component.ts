import { Title } from '@angular/platform-browser';
import { SegurancaService } from './../../seguranca/seguranca.service';
import { HistoricoService } from './../../historico/historico.service';
import { FornecedorService } from './../fornecedor.service';
import { Fornecedor } from './../fornecedor';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-fornecedor-cadastro',
  templateUrl: './fornecedor-cadastro.component.html',
  styleUrls: ['./fornecedor-cadastro.component.css']
})
export class FornecedorCadastroComponent implements OnInit {

  fornecedor = new Fornecedor();
  pessoas = [];

  posicao = 0;

  constructor(
    private fornecedorService: FornecedorService,
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
      this.titleService.setTitle('Cadastro de fornecedor');
    }
    this.adicionarPessoas();
  }

  prepararSalvar(ngForm: NgForm) {
    if (!this.editando()) {
      this.salvar(ngForm);
    } else {
      this.editar();
    }
  }

  salvar(ngForm: NgForm) {
    this.fornecedorService.salvar(this.fornecedor).subscribe(response => {
      this.posicao = 0;
      this.historicoService.salvar('Cadastro de fornecedor/Colaborador ' + response.nome, this.segurancaService.nomeUsuario);
      ngForm.reset();
      this.messageService.add({severity: 'success', summary: 'Cadastrado com sucesso', detail: 'Cadastrado com sucesso'});
    });
  }

  editar() {
    this.fornecedorService.editar(this.fornecedor).subscribe(response => {
      this.messageService.add({severity: 'success', summary: 'Editado com sucesso', detail: 'Editado com sucesso'});
      this.adicionarTitulo();
      this.historicoService.salvar('Edição do fornecedor / colaborador ' + response.nome, this.segurancaService.nomeUsuario);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.fornecedorService.buscarPorCodigo(codigo).subscribe(response => {
      this.fornecedor = response;
      this.adicionarTitulo();
    });
  }

  buscarCep(cep: string) {
    const cepAux = cep.replace('/', '');
    this.fornecedorService.buscarCep(cepAux).subscribe(response => {
      this.fornecedor.endereco.cep = response.cep;
      this.fornecedor.endereco.bairro = response.logradouro;
      this.fornecedor.endereco.cidade = response.localidade;
      this.fornecedor.endereco.estado = response.uf;
    });
  }

  adicionarTitulo() {
    this.titleService.setTitle('Editando Forncedor ' + this.fornecedor.nome);
  }

  editando(): Boolean {
    return Boolean(this.fornecedor.codigo);
  }

  adicionarPessoas() {
    this.pessoas = [
      {label: 'Fisíca', value: 'fisica'},
      {label: 'Jurídica', value: 'juridica'}
    ];
  }

}
