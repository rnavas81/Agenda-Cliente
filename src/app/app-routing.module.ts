import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IsLoggedService } from "./security/is-logged.service";
import { TestLoginService } from "./security/test-login.service";
import { AgendaDiaComponent } from "./views/agenda-dia/agenda-dia.component";
import { AgendaEntradaComponent } from "./views/agenda-entrada/agenda-entrada.component";
import { AgendaComponent } from "./views/agenda/agenda.component";
import { LibroDiaComponent } from "./views/libro-dia/libro-dia.component";
import { LibroEntradaComponent } from "./views/libro-entrada/libro-entrada.component";
import { LibroComponent } from "./views/libro/libro.component";
import { LoginComponent } from "./views/login/login.component";
import { MainComponent } from "./views/main/main.component";

const routes: Routes = [
  { path: "", component: LoginComponent, canActivate:[TestLoginService] },
  { path: "login", component: LoginComponent, canActivate:[TestLoginService] },
  { path: "main", component: MainComponent, canActivate: [IsLoggedService] },
  { path: "agenda", component: AgendaComponent, canActivate: [IsLoggedService] },
  { path: "agenda/dia", component: AgendaDiaComponent, canActivate: [IsLoggedService] },
  { path: "agenda/dia/entrada", component: AgendaEntradaComponent, canActivate: [IsLoggedService] },
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
