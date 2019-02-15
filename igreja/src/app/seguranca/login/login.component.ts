import { HistoricoService } from './../../historico/historico.service';
import { MessageService } from 'primeng/api';
import { SegurancaService } from './../seguranca.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private segurancaService: SegurancaService,
    private messageService: MessageService,
    private historicoService: HistoricoService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  logar(email: string, senha: string) {
    this.segurancaService.logar(email, senha).subscribe(response => {
      this.historicoService.salvar('Entrou no sistema', this.segurancaService.nomeUsuario);
      this.router.navigate(['/pagina-nao-encontrada']);
    });
    /*.catch(() => {
      this.messageService.add({severity: 'error', summary: 'Usuário ou senha invalido', detail: 'Usuário ou senha invalido'});
    }); */
  }
}
