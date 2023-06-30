import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders, createComponent } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
<<<<<<< HEAD
import { CreateCuponComponent } from "./components/cupones/create-cupon/create-cupon.component";
=======

import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";

import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";

>>>>>>> 3dee132c888086f5fce2ae5fe5b9e2ed498562a2


const appRoute: Routes = [
    { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
    { path: 'Inicio', component: InicioComponent, canActivate: [AdminGuard] },
    { path: 'login', component: LoginComponent },
    {
        path: 'panel', children: [
            { path: 'clientes', component: IndexClienteComponent, canActivate: [AdminGuard] },
            { path: 'clientes/registro', component: CreateClienteComponent, canActivate: [AdminGuard] },
<<<<<<< HEAD
            { path: 'cupones/registro', component: CreateCuponComponent, canActivate: [AdminGuard] }
        ]
    },
    
=======

            { path: 'clientes/:id', component: EditClienteComponent, canActivate: [AdminGuard] },

            { path: 'productos/registro', component: CreateProductoComponent, canActivate: [AdminGuard] },

        ]
    },
    { path: 'login', component: LoginComponent },
>>>>>>> 3dee132c888086f5fce2ae5fe5b9e2ed498562a2
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const appRoutingproviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute)