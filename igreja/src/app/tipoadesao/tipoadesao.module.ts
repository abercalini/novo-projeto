import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule }   from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



import { TipoadesaoCadastroComponent } from './tipoadesao-cadastro/tipoadesao-cadastro.component';
import { TipoadesaoPesquisaComponent } from './tipoadesao-pesquisa/tipoadesao-pesquisa.component';


@NgModule({
  declarations: [TipoadesaoCadastroComponent, TipoadesaoPesquisaComponent],
  imports: [
    CommonModule,
    RouterModule,
    FieldsetModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule
  ]
})
export class TipoadesaoModule { }
