import { FornecedorFilter } from './../fornecedorFilter';
import { Title } from '@angular/platform-browser';
import { SegurancaService } from './../../seguranca/seguranca.service';
import { HistoricoService } from './../../historico/historico.service';
import { FornecedorService } from './../fornecedor.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-fornecedor-pesquisa',
  templateUrl: './fornecedor-pesquisa.component.html',
  styleUrls: ['./fornecedor-pesquisa.component.css']
})
export class FornecedorPesquisaComponent implements OnInit {

  fornecedores  = [];
  @ViewChild('tabela') tabela;
  display = false;
  data: any;
  quantidadeColaborador = 0;
  quantidadeFornecedor = 0;
  fornecedorFilter = new FornecedorFilter();
  nomeFilter: string;

  constructor(
    private forncedorService: FornecedorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private historicoService: HistoricoService,
    private seguracaService: SegurancaService,
    private titleService: Title,

  ) {
    this.verificarCondicaoGrafico();
  }

  ngOnInit() {
    this.titleService.setTitle('Pesquisa de fornecedor');
    this.listarTodos();

  }

  excluir(codigo: number) {
    this.confirmationService.confirm({
      message: 'Deseja excluir o Fornecedor?',
      accept: () => {
        this.forncedorService.excluir(codigo).subscribe(() => {
          this.adicionarMenssagem('success', 'Excluido com sucesso', 'Excluido com sucesso');
          this.tabela.first = 0;
          this.listarTodos();
          this.historicoService.salvar('Excluiu um Fornecedor/Colaborador', this.seguracaService.nomeUsuario);
        });
      }
    });
  }

  listarTodos() {
    this.fornecedorFilter.nome = this.nomeFilter;
    this.forncedorService.listarTodosParams(this.fornecedorFilter).subscribe(response => this.fornecedores = response);
    
   /* this.forncedorService.listarTodos().then(response => this.fornecedores = response)
      .catch(response => {
        this.adicionarMenssagem('error', 'Falha ao listar fornecedor', response.message);
      });*/
  }



  mostrarDialog() {
    this.display = true;

    this.data = {
      labels: ['Colaborador', 'Fornecedor'],
      datasets: [
          {
              data: [this.quantidadeColaborador, this.quantidadeFornecedor],
              backgroundColor: ['#FFCE56', '#36A2EB'],
              hoverBackgroundColor: ['FFCE56,', '36A2EB']
          }]
      };
  }

  adicionarMenssagem(severty: string, detail: string, sumary: string) {
    this.messageService.add({severity: severty, detail: detail, summary: sumary});
  }

  verificarCondicaoGrafico() {
    this.forncedorService.listarTodos().subscribe(response => {
      for (const fornecedor of response) {
        if (fornecedor.colaborador === true) {
          this.quantidadeColaborador ++;
        } else {
          this.quantidadeFornecedor ++;
        }
      }
    });
  }

}
