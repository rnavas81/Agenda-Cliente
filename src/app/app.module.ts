import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/************* COMPONENTES *************/
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { AvisosComponent } from './views/avisos/avisos.component';
import { AvisosDiaComponent } from './views/avisos-dia/avisos-dia.component';
import { AvisosEntradaComponent } from './views/avisos-entrada/avisos-entrada.component';
import { MainComponent } from './views/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { LibroComponent } from './views/libro/libro.component';
import { LibroDiaComponent } from './views/libro-dia/libro-dia.component';
import { LibroEntradaComponent } from './views/libro-entrada/libro-entrada.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';

/************* SEGURIDAD *************/
import { IsLoggedService } from './security/is-logged.service';
import { TestLoginService } from './security/test-login.service';
import { ProfileComponent } from './views/profile/profile.component';
import { ToastComponent } from './components/toast/toast.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { BuscadorComponent } from './views/buscador/buscador.component';
import { ExportComponent } from './views/export/export.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { ConductorComponent } from './views/conductor/conductor.component';
import { ConductoresComponent } from './views/conductores/conductores.component';
import { CocheComponent } from './views/coche/coche.component';
import { CochesComponent } from './views/coches/coches.component';
import { ImportarComponent } from './views/importar/importar.component';
import { LibroEntradaHistoricoComponent } from './views/libro-entrada-historico/libro-entrada-historico.component';
import { AvisoEntradaHistoricoComponent } from './views/aviso-entrada-historico/aviso-entrada-historico.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AvisosComponent,
    AvisosDiaComponent,
    AvisosEntradaComponent,
    MainComponent,
    HeaderComponent,
    LibroComponent,
    LibroDiaComponent,
    LibroEntradaComponent,
    ProfileComponent,
    ToastComponent,
    UsuariosComponent,
    UsuarioComponent,
    BuscadorComponent,
    ExportComponent,
    ClienteComponent,
    ClientesComponent,
    ConductorComponent,
    ConductoresComponent,
    CocheComponent,
    CochesComponent,
    ImportarComponent,
    LibroEntradaHistoricoComponent,
    AvisoEntradaHistoricoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    IsLoggedService,
    TestLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
