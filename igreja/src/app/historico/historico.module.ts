import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoPesquisaComponent } from './historico-pesquisa/historico-pesquisa.component';

import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [HistoricoPesquisaComponent],
  imports: [
    CommonModule,
    FieldsetModule,
    TableModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ]
})
export class HistoricoModule { }
