import { Component, OnInit } from '@angular/core';
import { FuncaoMembro } from '../funcaoMembro';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { FuncaomembroService } from '../funcaomembro.service';
import { HistoricoService } from '../../historico/historico.service';
import { SegurancaService } from '../../seguranca/seguranca.service';
import { ActivatedRoute } from '@angular/router';

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
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
   const codigo = this.router.snapshot.params['codigo'];
   if (codigo) {
     this.buscarPorCodigo(codigo);
   }
  }

  salvar(form: NgForm) {
    this.funcaoMembroService.salvar(this.funcaoMembro).then(response => {
      form.reset();
      this.funcaoMembro = new FuncaoMembro();
      this.adicionarMensagem('success', 'Cadastrado com sucesso', 'Cadastrado com sucesso');
      this.historicoService.salvar('Cadastrou uma função do membro ' + response.nome, this.segurancaService.nomeUsuario);
    })
    .catch(response => {
      console.log(response);
      this.adicionarMensagem('error', response.message, response.message);
    })
  }

  buscarPorCodigo(codigo: number) {
    this.funcaoMembroService.buscarPorCodigo(codigo).then(response => {
      this.funcaoMembro = response;
    })
    .catch(response => {
      console.log(response);
      this.adicionarMensagem('error', response.message, response.message);
    })
  }

  editando(): Boolean {
    return Boolean(this.funcaoMembro.codigo);
  }

  adicionarMensagem(severity: string, detail: string, summary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: summary});
  }

}
