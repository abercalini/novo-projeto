import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



import { VisitanteCadastroComponent } from './visitante-cadastro/visitante-cadastro.component';
import { VisitantePesquisaComponent } from './visitante-pesquisa/visitante-pesquisa.component';


@NgModule({
  declarations: [VisitanteCadastroComponent, VisitantePesquisaComponent],
  imports: [
    CommonModule,
    RouterModule,
    FieldsetModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
    InputTextareaModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule
  ]
})
export class VisitanteModule { }
