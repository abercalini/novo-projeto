import { LoginComponent } from './login/login.component';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    CoreModule,
  ]
})
export class SegurancaModule { }
