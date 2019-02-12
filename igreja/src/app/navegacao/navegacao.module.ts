import { CargoministroCadastroComponent } from './../cargoministro/cargoministro-cadastro/cargoministro-cadastro.component';
import { IgrejaPesquisaComponent } from './../igreja/igreja-pesquisa/igreja-pesquisa.component';
import { IgrejaCadastroComponent } from '../igreja/igreja-cadastro/igreja-cadastro.component';
import { DistricoCadastroComponent } from '../distrito/districo-cadastro/districo-cadastro.component';
import { DistricoPesquisaComponent } from './../distrito/districo-pesquisa/districo-pesquisa.component';
import { FornecedorPesquisaComponent } from './../fornecedor/fornecedor-pesquisa/fornecedor-pesquisa.component';
import { FornecedorCadastroComponent } from './../fornecedor/fornecedor-cadastro/fornecedor-cadastro.component';
import { HistoricoPesquisaComponent } from './../historico/historico-pesquisa/historico-pesquisa.component';
import { PaginaNaoEncontradaComponent } from './../pagina-nao-encontrada/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { LoginComponent } from './../seguranca/login/login.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CargoministroPesquisaComponent } from '../cargoministro/cargoministro-pesquisa/cargoministro-pesquisa.component';

const router: Routes = [
  {path: 'login', component: LoginComponent},

  {path: 'fornecedor/novo', component: FornecedorCadastroComponent},
  {path: 'fornecedor', component: FornecedorPesquisaComponent},
  {path: 'fornecedor/:codigo', component: FornecedorCadastroComponent},

  {path: 'distrito/novo', component: DistricoCadastroComponent},
  {path: 'distrito', component: DistricoPesquisaComponent},
  {path: 'distrito/:codigo', component: DistricoCadastroComponent},

  {path: 'igreja/novo', component: IgrejaCadastroComponent},
  {path: 'igreja', component: IgrejaPesquisaComponent},
  {path: 'igreja/:codigo', component: IgrejaCadastroComponent},

  {path: 'cargoministro/novo', component: CargoministroCadastroComponent},
  {path: 'cargoministro', component: CargoministroPesquisaComponent},

  {path: 'historico', component: HistoricoPesquisaComponent},

  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'pagina-nao-encontrada', pathMatch: 'full'}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(router),
  ],
  exports: [RouterModule]
})
export class NavegacaoModule { }
