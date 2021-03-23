import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AgendaDiaComponent } from "./views/agenda-dia/agenda-dia.component";
import { AgendaComponent } from "./views/agenda/agenda.component";
import { LoginComponent } from "./views/login/login.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "agenda", component: AgendaComponent },
  { path: "agenda/dia", component: AgendaDiaComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
