import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgrejaCadastroComponent } from './igreja-cadastro/igreja-cadastro.component';

import { FieldsetModule } from 'primeng/fieldset';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { IgrejaPesquisaComponent } from './igreja-pesquisa/igreja-pesquisa.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [IgrejaCadastroComponent, IgrejaPesquisaComponent],
  imports: [
    CommonModule,
    FieldsetModule,
    RouterModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ToastModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule
  ]
})
export class IgrejaModule { }
