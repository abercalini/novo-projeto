import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { CargoministroCadastroComponent } from './cargoministro-cadastro/cargoministro-cadastro.component';
import { CargoministroPesquisaComponent } from './cargoministro-pesquisa/cargoministro-pesquisa.component';

@NgModule({
  declarations: [CargoministroCadastroComponent, CargoministroPesquisaComponent],
  imports: [
    CommonModule,
    RouterModule,
    FieldsetModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule
  ]
})
export class CargoministroModule { }
