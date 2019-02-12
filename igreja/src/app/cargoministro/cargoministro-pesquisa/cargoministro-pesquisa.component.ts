import { Component, OnInit } from '@angular/core';

import { CargoministroService } from '../cargoministro.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cargoministro-pesquisa',
  templateUrl: './cargoministro-pesquisa.component.html',
  styleUrls: ['./cargoministro-pesquisa.component.css']
})
export class CargoministroPesquisaComponent implements OnInit {

  cargos = [];

  constructor(
    private cargoMinistroService: CargoministroService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.cargoMinistroService.listarTodos().then(response => this.cargos = response)
      .catch(response => {
        console.log(response);
        this.adicionarMensagem('error', response.message, response.message);
      });
  }

  adicionarMensagem(severity: string, detail: string, sumary: string) {
    this.messageService.add({severity: severity, detail: detail, summary: sumary});
  }

}
