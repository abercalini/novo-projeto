import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuModule,
    SplitButtonModule
  ],
  exports: [MenuComponent]
})
export class CoreModule { }
