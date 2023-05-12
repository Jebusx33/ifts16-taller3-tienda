import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";



const appRoute : Routes =[
    {path:'', component:InicioComponent},
    {path:'', pathMatch:'full', redirectTo:'home' },
    {path:'**', pathMatch:'full', redirectTo:'home' }
];

export const appRoutingproviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute)