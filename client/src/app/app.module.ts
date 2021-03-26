import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgendaComponent } from './views/agenda/agenda.component';
import { AgendaDiaComponent } from './views/agenda-dia/agenda-dia.component';
import { AgendaEntradaComponent } from './views/agenda-entrada/agenda-entrada.component';
import { MainComponent } from './views/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { LibroComponent } from './views/libro/libro.component';
import { LibroDiaComponent } from './views/libro-dia/libro-dia.component';
import { LibroEntradaComponent } from './views/libro-entrada/libro-entrada.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgendaComponent,
    AgendaDiaComponent,
    AgendaEntradaComponent,
    MainComponent,
    HeaderComponent,
    LibroComponent,
    LibroDiaComponent,
    LibroEntradaComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
