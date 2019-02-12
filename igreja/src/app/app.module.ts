import { CargoministroModule } from './cargoministro/cargoministro.module';
import { IgrejaModule } from './igreja/igreja.module';
import { DistritoModule } from './distrito/distrito.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { CoreModule } from './core/core.module';
import { HistoricoModule } from './historico/historico.module';
import { PaginaNaoEncontradaModule } from './pagina-nao-encontrada/pagina-nao-encontrada.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { SegurancaModule } from './seguranca/seguranca.module';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { SegurancaService } from './seguranca/seguranca.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HistoricoService } from './historico/historico.service';
import { FornecedorService } from './fornecedor/fornecedor.service';
import { DistritoService } from './distrito/distrito.service';
import { IgrejaService } from './igreja/igreja.service';
import { CargoministroService } from './cargoministro/cargoministro.service';



import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { SituacaomembroModule } from './situacaomembro/situacaomembro.module';
import { SituacaomembroService } from './situacaomembro/situacaomembro.service';
import { TipoadesaoModule } from './tipoadesao/tipoadesao.module';
import { TipoadesaoService } from './tipoadesao/tipoadesao.service';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SegurancaModule,
    NavegacaoModule,
    PaginaNaoEncontradaModule,
    HttpClientModule,
    HistoricoModule,
    CoreModule,
    FornecedorModule,
    DistritoModule,
    IgrejaModule,
    CargoministroModule,
    SituacaomembroModule,
    TipoadesaoModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    SegurancaService, JwtHelperService, MessageService, HistoricoService, FornecedorService, ConfirmationService,
    Title, DistritoService, IgrejaService, CargoministroService, SituacaomembroService, TipoadesaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
