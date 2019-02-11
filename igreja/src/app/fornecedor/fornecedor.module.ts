import { FornecedorCadastroComponent } from './fornecedor-cadastro/fornecedor-cadastro.component';
import { FornecedorPesquisaComponent } from './fornecedor-pesquisa/fornecedor-pesquisa.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SpinnerModule } from 'primeng/spinner';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [FornecedorCadastroComponent, FornecedorPesquisaComponent],
  imports: [
    CommonModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    SelectButtonModule,
    InputMaskModule,
    ToggleButtonModule,
    SpinnerModule,
    CurrencyMaskModule,
    CalendarModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    FieldsetModule,
    TableModule,
    SplitButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    DialogModule,
    ChartModule
  ]
})
export class FornecedorModule { }
