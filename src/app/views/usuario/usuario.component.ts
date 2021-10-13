import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  toast: any;
  formulario: FormGroup;
  validPasswords: boolean = true;
  validEmail: boolean = true;
  data: any = {
    id: 0,
    name: "",
    lastName: "",
    username: "",
    email: "",
  }

  constructor(
    private formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {
    // Recupera el id de la cabecera
    const hash = location.hash.substr(1);
    if (hash) this.data.id = parseInt(hash);
    else this.data.id = 0;
    // Crea el formulario
    this.formulario = this.formBuilder.group({
      name: [this.data.name, [Validators.required, Validators.maxLength(255)]],
      lastName: [this.data.lastName, [Validators.maxLength(255)]],
      username: [this.data.username, [Validators.required, Validators.maxLength(32)]],
      email: [this.data.email, [Validators.email, Validators.required, Validators.maxLength(255)]],
      password: ['', [Validators.maxLength(32), Validators.minLength(8)]],
      password2: ['', [Validators.maxLength(32), Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    if (this.data.id > 0) {
      this.getDatos();
    }
  }

  getDatos() {
    this.usuarioService.get(this.data.id).subscribe(
      (success: any) => this.cargarDatos(success)
      ,
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { type: 'error', text: 'Error al recuperar los datos del usuario' }
      }
    )
  }
  cargarDatos(data) {
    this.data = data;
    for (var key in data) if (this.formulario.contains(key)) this.formulario.controls[key].setValue(data[key])


  }

  guardarDatos() {
    const data = { ...this.formulario.value };
    this.validPasswords = data.password == data.password2;
    this.validEmail = true;

    if (this.formulario.valid && this.validPasswords) {

      if (data.password.trim().length == 0) {
        delete (data.password);
      }
      delete (data.password2);
      if (this.data.id == 0) {
        this.usuarioService.create(data).subscribe(
          (response: any) => {
            this.toast = { text: 'Nuevo usuario creado', type: 'success' }
            this.router.navigate([`/usuario`], { fragment: response.id.toString() });
            this.data.id = response.id;
            this.data = response;
          }, (error: any) => {
            if (error.status == 403) this.usuarioService.salir();
            else if (error.status == 422) {
              if (error.error.errors.hasOwnProperty('email')) {
                this.validEmail = false;
              }
            }
            else this.toast = { text: 'Error al guardar los cambios', type: 'error' }
          }
        );
      } else {
        this.usuarioService.update(this.data.id, data).subscribe(
          (response: any) => {
            this.toast = { text: 'Cambios guardados', type: 'success' }
          }, (error: any) => {
            if (error.status == 403) this.usuarioService.salir();
            else if (error.status == 422) {
              if (error.error.errors.hasOwnProperty('email')) {
                this.validEmail = false;
              }
            }
            else this.toast = { text: 'Error al guardar los cambios', type: 'error' }
          }
        )
      }
    } else {

      Object.keys(this.formulario.controls).forEach(key => {
        if (this.formulario.controls[key].status == "INVALID") {
          var campo = "";
          if (document.querySelector(`label[for="${key}"]`)) {
            setTimeout(() => {
              if (document.querySelector(`label[for="${key}"]`).innerHTML == 'Lugar' && key == "salidaLugar") campo = "Lugar de salida";
              else if (document.querySelector(`label[for="${key}"]`).innerHTML == 'Lugar' && key == "llegadaLugar") campo = "Lugar de llegada";
              else campo = document.querySelector(`label[for="${key}"]`).innerHTML;

              this.toast = { text: `Error en el campo ${campo}`, type: 'error' }
            }, 100);
          }
        }
      });
    }

  }

  volver() {
    this._location.back();
  }
}
