import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SituacaoMembro } from '../situacaomembro';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { SituacaomembroService } from '../situacaomembro.service';
import { SegurancaService } from '../../seguranca/seguranca.service';
import { HistoricoService } from '../../historico/historico.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-situacaomembro-cadastro',
  templateUrl: './situacaomembro-cadastro.component.html',
  styleUrls: ['./situacaomembro-cadastro.component.css']
})
export class SituacaomembroCadastroComponent implements OnInit {

  situacaoMembro = new SituacaoMembro();

  constructor(
    private titleService: Title,
    private messageService: MessageService,
    private situacaoMembroService: SituacaomembroService,
    private segurancaService: SegurancaService,
    private historicoService: HistoricoService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Cadastro de situação do membro');
    const codigo = this.router.snapshot.params['codigo'];
    if (codigo) {
      this.buscarPorCodigo(codigo);
    } else {
      this.titleService.setTitle('Cadastro de situação de membro');
    }
  }

  buscarPorCodigo(codigo: number) {
    this.situacaoMembroService.buscarPorCodigo(codigo).subscribe(response => {
      this.situacaoMembro = response;
      this.titleService.setTitle('Editando situação membro ' + response.situacao);
    });
  }

  prapararSalvar(form: NgForm) {
    if (!this.editando()) {
      this.salvar(form);
    } else {
      this.editar();
    }
  }

  editar() {
    this.situacaoMembroService.editar(this.situacaoMembro).subscribe(response => {
      this.adicionarMensagem('success', 'Editado com sucesso', 'Editado com sucesso');
      this.historicoService.salvar('Editou uma situação do membro ' + response.situacao, this.segurancaService.nomeUsuario);
      this.titleService.setTitle('Editando situação membro ' + response.situacao);
    });
  }

  salvar(form: NgForm) {
    this.situacaoMembroService.salvar(this.situacaoMembro).subscribe(response => {
      this.adicionarMensagem('success', 'Cadastrado com sucesso', 'Cadastrado com sucesso');
      this.historicoService.salvar('Cadastrou uma situação do membro ' + response.situacao, this.segurancaService.nomeUsuario);
      form.reset();
      this.situacaoMembro = new SituacaoMembro();
    });
  }

  editando(): Boolean {
    return Boolean(this.situacaoMembro.codigo);
  }

  adicionarMensagem(severity: string, detail: string, sumary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: sumary});
  }

}
