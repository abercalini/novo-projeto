import { MembroService } from './../membro.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';



@Component({
  selector: 'app-membro-pesquisa',
  templateUrl: './membro-pesquisa.component.html',
  styleUrls: ['./membro-pesquisa.component.css']
})
export class MembroPesquisaComponent implements OnInit {

  membros = [];
  display = false;
  codigo: number;
  @ViewChild('tabela') tabela;

  constructor(
    private membroService: MembroService,
    private confirmationService: ConfirmationService,
    private historicoService: HistoricoService,
    private segurancaService: SegurancaService,
    private messageService: MessageService,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.listarTodos();
    this.titleService.setTitle('Pesquisa de membro');
  }

  editar() {
    this.router.navigate([`/membro/${this.codigo}`]);
  }

  listarTodos() {
    this.membroService.listarTodos().subscribe(response => this.membros = response);
  }

  showDialog(codigo: number) {
    this.display = true;
    this.codigo = codigo;
  }

  excluir() {
    this.display = false;
    this.confirmationService.confirm({
      message: 'Deseja excluir o membro?',
      accept: () => {
        this.membroService.excluir(this.codigo).subscribe(() => {
          this.tabela.first = 0;
          this.listarTodos();
          this.historicoService.salvar('Excluiu um membro', this.segurancaService.nomeUsuario);
          this.messageService.add({severity: 'success', detail: 'Excluido com sucesso', summary: 'Excluido com sucesso'});
        });
      }
    });
  }


}
