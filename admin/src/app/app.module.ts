import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule,NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { NgxTinymceModule } from 'ngx-tinymce';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';

import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';

import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { ConfigComponent } from './components/config/config.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreateProductoComponent,

    CreateCuponComponent

    ConfigComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // HttpClient,
    routing,
    NgbPagination,
    routing,
    NgbPagination,
    NgxTinymceModule.forRoot({
      baseURL: '../../../assets/tinymce/',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
