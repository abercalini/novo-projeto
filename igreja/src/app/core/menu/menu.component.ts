import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [{
      label: 'Cadastro',
      items: [
          {label: 'Fornecedor', icon: 'pi pi-fw pi-user-plus', routerLink: ['/fornecedor']},
          {label: 'Distrito', icon: 'pi pi-tags', routerLink: ['/distrito']},
          {label: 'Igreja', icon: 'pi pi-home', routerLink: ['/igreja']}
      ]
    },
    {
      label: 'Configurar Membro',
      items: [
        {label: 'Cargos Ministeriais', routerLink: ['/cargoministro']},
        {label: 'Situação Membro', routerLink: ['/situacaomembro']},
        {label: 'Tipo Adesão', routerLink: ['/tipoadesao']},
        {label: 'Função membro', routerLink: ['funcaomembro']}
      ]
    },
    {
      label: 'Historico',
      items: [
          {label: 'Log do sistema', icon: 'pi pi-clock', routerLink: ['/historico']},
      ]
    }];
  }

}
