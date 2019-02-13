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



import { MembroCadastroComponent } from './membro-cadastro/membro-cadastro.component';

@NgModule({
  declarations: [MembroCadastroComponent],
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
    MultiSelectModule
  ]
})
export class MembroModule { }
