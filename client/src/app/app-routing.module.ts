import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AgendaComponent } from "./views/agenda/agenda.component";
import { LoginComponent } from "./views/login/login.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "agenda", component: AgendaComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
