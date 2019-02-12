import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



import { SituacaomembroCadastroComponent } from './situacaomembro-cadastro/situacaomembro-cadastro.component';
import { SituacaomembroPesquisaComponent } from './situacaomembro-pesquisa/situacaomembro-pesquisa.component';

@NgModule({
  declarations: [SituacaomembroCadastroComponent, SituacaomembroPesquisaComponent],
  imports: [
    CommonModule,
    FieldsetModule,
    InputTextModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule
  ]
})
export class SituacaomembroModule { }
