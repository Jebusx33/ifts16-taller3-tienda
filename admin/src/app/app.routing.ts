import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from "./guards/admin.guard";



const appRoute: Routes = [
    { path: '', component: InicioComponent, canActivate: [AdminGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const appRoutingproviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute)