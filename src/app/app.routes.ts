import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { BeherenPersoonComponent } from './beheren-persoon.component';
import { UseCases } from "anva-contracts/components";

export const ROUTES: Routes = [
    { path: UseCases.beherenPersoon.name, component: BeherenPersoonComponent },
    { path: UseCases.beherenPersoon.name + ':id', component: BeherenPersoonComponent },
    { path: '**', redirectTo: UseCases.beherenPersoon.name, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule { }