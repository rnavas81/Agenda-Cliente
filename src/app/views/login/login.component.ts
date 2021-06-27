import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "src/app/services/usuario.service";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  mensaje: string;
  cargando: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    private router: Router
  ) {
    var recordar = '';
    if (localStorage.getItem(environment.LOCALSTORAGE_REMEMBERME)) {
      recordar = localStorage.getItem(environment.LOCALSTORAGE_REMEMBERME);
    }
    this.formulario = this.formBuilder.group({
      username: [recordar, [Validators.required]],
      password: ['', [Validators.required]],
      recordar: [recordar]
    });
    this.mensaje = '';
    this.cargando = false;
  }

  ngOnInit(): void {

  }
  onSubmit = () => {
    this.mensaje = "";
    const data = this.formulario.value;

    if (this.formulario.valid) {
      this.cargando = true;
      document.getElementById('btn-acceder').classList.add('disabled');
      this.usuarioService.login(data.username, data.password).subscribe(
        (response: any) => {
          if (response.hasOwnProperty("user")) this.usuarioService.set(response.user);
          if (response.hasOwnProperty("token")) this.usuarioService.setToken(response.token);
          if (data.recordar) {
            localStorage.setItem(environment.LOCALSTORAGE_REMEMBERME, data.username);
          }
          this.cargando = false;
          document.getElementById('btn-acceder').classList.remove('disabled');
          this.router.navigate(['/main']);
        }, (error: any) => {
          console.log(error.status);
          
          switch (error.status) {
            case 403: this.mensaje = "Error en el usuario o la contraseña"; break;
            case 404: this.mensaje = "Problemas para acceder a la aplicación"; break;
            case 429: this.mensaje= "Demasiados intentos fallidos\n\rEspere o pongase en contacto con el administrador"; break;
            default: this.mensaje = "Problema no registrado"; break;
          }
          this.cargando = false;
          document.getElementById('btn-acceder').classList.remove('disabled');
        }
      );
    } else {

    }

  }
}
