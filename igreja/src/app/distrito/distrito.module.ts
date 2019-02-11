import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistricoCadastroComponent } from './districo-cadastro/districo-cadastro.component';
import { DistricoPesquisaComponent } from './districo-pesquisa/districo-pesquisa.component';

import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


@NgModule({
  declarations: [DistricoCadastroComponent, DistricoPesquisaComponent],
  imports: [
    CommonModule,
    FieldsetModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    TableModule,
    RouterModule,
    TooltipModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule
  ]
})
export class DistritoModule { }
