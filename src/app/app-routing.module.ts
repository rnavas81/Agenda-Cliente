import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IsLoggedService } from "./security/is-logged.service";
import { TestLoginService } from "./security/test-login.service";
import { AvisosDiaComponent } from "./views/avisos-dia/avisos-dia.component";
import { AvisosEntradaComponent } from "./views/avisos-entrada/avisos-entrada.component";
import { AvisosComponent } from "./views/avisos/avisos.component";
import { LibroDiaComponent } from "./views/libro-dia/libro-dia.component";
import { LibroEntradaComponent } from "./views/libro-entrada/libro-entrada.component";
import { LibroComponent } from "./views/libro/libro.component";
import { LoginComponent } from "./views/login/login.component";
import { MainComponent } from "./views/main/main.component";
import { ProfileComponent } from "./views/profile/profile.component";

const routes: Routes = [
  { path: "", component: LoginComponent, canActivate:[TestLoginService] },
  { path: "login", component: LoginComponent, canActivate:[TestLoginService] },
  { path: "profile", component: ProfileComponent, canActivate:[IsLoggedService] },
  { path: "main", component: MainComponent, canActivate: [IsLoggedService] },
  { path: "avisos", component: AvisosComponent, canActivate: [IsLoggedService] },
  { path: "avisos/dia", component: AvisosDiaComponent, canActivate: [IsLoggedService] },
  { path: "avisos/dia/entrada", component: AvisosEntradaComponent, canActivate: [IsLoggedService] },
  { path: "libro", component: LibroComponent, canActivate: [IsLoggedService] },
  { path: "libro/dia", component: LibroDiaComponent, canActivate: [IsLoggedService] },
  { path: "libro/dia/entrada", component: LibroEntradaComponent, canActivate: [IsLoggedService] },
  { path: "**", redirectTo: "", canActivate: [IsLoggedService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
