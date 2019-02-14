import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';



import { MembroCadastroComponent } from './membro-cadastro/membro-cadastro.component';
import { MembroPesquisaComponent } from './membro-pesquisa/membro-pesquisa.component';

@NgModule({
  declarations: [MembroCadastroComponent, MembroPesquisaComponent],
  imports: [
    CommonModule,
    FieldsetModule,
    FormsModule,
    InputTextModule,
    ToggleButtonModule,
    DropdownModule,
    CalendarModule,
    InputMaskModule,
    ButtonModule,
    MultiSelectModule,
    ToastModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    RouterModule
  ]
})
export class MembroModule { }
