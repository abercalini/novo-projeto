import { Component, OnInit } from '@angular/core';
import { FuncaoMembro } from '../funcaoMembro';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { FuncaomembroService } from '../funcaomembro.service';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-funcaomembro-cadastro',
  templateUrl: './funcaomembro-cadastro.component.html',
  styleUrls: ['./funcaomembro-cadastro.component.css']
})
export class FuncaomembroCadastroComponent implements OnInit {

  funcaoMembro = new FuncaoMembro();

  constructor(
    private funcaoMembroService: FuncaomembroService,
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
     this.titleService.setTitle('Cadastro da função do membro');
   }
  }

  preprarSalvar(form: NgForm) {
    if (!this.editando()) {
      this.salvar(form);
    } else {
      this.editar();
    }
  }

  editar() {
    this.funcaoMembroService.editar(this.funcaoMembro).subscribe(response => {
      this.adicionarMensagem('success', 'Alterado com sucesso', 'Alterado com sucesso');
      this.historicoService.salvar('Alterou uma função membro ' + response.nome, this.segurancaService.nomeUsuario);
      this.titleService.setTitle('Editando função ' + response.nome);
    });
  }

  salvar(form: NgForm) {
    this.funcaoMembroService.salvar(this.funcaoMembro).subscribe(response => {
      form.reset();
      this.funcaoMembro = new FuncaoMembro();
      this.adicionarMensagem('success', 'Cadastrado com sucesso', 'Cadastrado com sucesso');
      this.historicoService.salvar('Cadastrou uma função do membro ' + response.nome, this.segurancaService.nomeUsuario);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.funcaoMembroService.buscarPorCodigo(codigo).subscribe(response => {
      this.funcaoMembro = response;
      this.titleService.setTitle('Editando função ' + response.nome);
    });
  }

  editando(): Boolean {
    return Boolean(this.funcaoMembro.codigo);
  }

  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
