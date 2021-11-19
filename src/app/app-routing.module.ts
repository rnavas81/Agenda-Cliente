import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AvisoEntradaHistoricoComponent } from "./views/aviso-entrada-historico/aviso-entrada-historico.component";
import { IsLoggedService } from "./security/is-logged.service";
import { TestLoginService } from "./security/test-login.service";
import { AvisosDiaComponent } from "./views/avisos-dia/avisos-dia.component";
import { AvisosEntradaComponent } from "./views/avisos-entrada/avisos-entrada.component";
import { AvisosComponent } from "./views/avisos/avisos.component";
import { BuscadorComponent } from "./views/buscador/buscador.component";
import { ClienteComponent } from "./views/cliente/cliente.component";
import { ClientesComponent } from "./views/clientes/clientes.component";
import { CocheComponent } from "./views/coche/coche.component";
import { CochesComponent } from "./views/coches/coches.component";
import { ConductorComponent } from "./views/conductor/conductor.component";
import { ConductoresComponent } from "./views/conductores/conductores.component";
import { ExportComponent } from "./views/export/export.component";
import { ImportarComponent } from "./views/importar/importar.component";
import { LibroDiaComponent } from "./views/libro-dia/libro-dia.component";
import { LibroEntradaHistoricoComponent } from "./views/libro-entrada-historico/libro-entrada-historico.component";
import { LibroEntradaComponent } from "./views/libro-entrada/libro-entrada.component";
import { LibroComponent } from "./views/libro/libro.component";
import { LoginComponent } from "./views/login/login.component";
import { MainComponent } from "./views/main/main.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { UsuarioComponent } from "./views/usuario/usuario.component";
import { UsuariosComponent } from "./views/usuarios/usuarios.component";

const routes: Routes = [
  { path: "", component: LoginComponent, canActivate:[TestLoginService] },
  { path: "login", component: LoginComponent, canActivate:[TestLoginService] },
  { path: "profile", component: ProfileComponent, canActivate:[IsLoggedService] },
  { path: "main", component: MainComponent, canActivate: [IsLoggedService] },
  { path: "avisos", component: AvisosComponent, canActivate: [IsLoggedService] },
  { path: "avisos/dia", component: AvisosDiaComponent, canActivate: [IsLoggedService] },
  { path: "avisos/dia/entrada", component: AvisosEntradaComponent, canActivate: [IsLoggedService] },
  { path: "avisos/dia/entrada/historico/:id", component: AvisoEntradaHistoricoComponent, canActivate: [IsLoggedService] },
  { path: "libro", component: LibroComponent, canActivate: [IsLoggedService] },
  { path: "libro/dia", component: LibroDiaComponent, canActivate: [IsLoggedService] },
  { path: "libro/dia/entrada", component: LibroEntradaComponent, canActivate: [IsLoggedService] },
  { path: "libro/dia/entrada/historico/:id", component: LibroEntradaHistoricoComponent, canActivate: [IsLoggedService] },
  { path: "usuarios", component: UsuariosComponent, canActivate: [IsLoggedService] },
  { path: "usuario", component: UsuarioComponent, canActivate: [IsLoggedService] },
  { path: "buscador", component: BuscadorComponent, canActivate: [IsLoggedService] },
  { path: "exportar", component: ExportComponent, canActivate: [IsLoggedService] },
  { path: "cliente", component: ClienteComponent, canActivate: [IsLoggedService] },
  { path: "cliente/:id", component: ClienteComponent, canActivate: [IsLoggedService] },
  { path: "clientes", component: ClientesComponent, canActivate: [IsLoggedService] },
  { path: "vehiculo", component: CocheComponent, canActivate: [IsLoggedService] },
  { path: "vehiculo/:id", component: CocheComponent, canActivate: [IsLoggedService] },
  { path: "vehiculos", component: CochesComponent, canActivate: [IsLoggedService] },
  { path: "conductor", component: ConductorComponent, canActivate: [IsLoggedService] },
  { path: "conductor/:id", component: ConductorComponent, canActivate: [IsLoggedService] },
  { path: "conductores", component: ConductoresComponent, canActivate: [IsLoggedService] },
  { path: "importar", component: ImportarComponent, canActivate: [IsLoggedService] },
  { path: "**", redirectTo: "", canActivate: [IsLoggedService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
