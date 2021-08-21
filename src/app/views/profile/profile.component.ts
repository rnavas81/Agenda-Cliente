import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  toast:any;
  formulario: FormGroup;
  validPasswords: boolean = true;
  validEmail: boolean = true;
  cargando:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public user: UsuarioService,
    private _location: Location,

  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name:[this.user.name, [Validators.required,Validators.maxLength(255)]],
      lastName:[this.user.lastName, [Validators.maxLength(255)]],
      username:[this.user.username, [Validators.required,Validators.maxLength(32)]],
      email:[this.user.email, [Validators.email,Validators.required,Validators.maxLength(255)]],
      password:['', [Validators.maxLength(32),Validators.minLength(8)]],
      password2:['', [Validators.maxLength(32),Validators.minLength(8)]],
    });
  }

  onSubmit(){
    const data = { ...this.formulario.value };
    this.validPasswords = data.password == data.password2;
    this.validEmail = true;

    if (this.formulario.valid && this.validPasswords) {

      if (data.password.trim().length == 0) {
        delete (data.password);
      }
      delete (data.password2);
      this.user.save(data).subscribe(
        (response: any) => {
          this.toast = { text: 'Cambios guardados', type: 'success' }
          this.user.set(response);
        }, (error: any) => {
          if (error.status == 403) this.user.salir();
          else if (error.status == 422) {
            if (error.error.errors.hasOwnProperty('email')) {
              this.validEmail = false;
            }
          }
          else this.toast = { text: 'Error al guardar los cambios', type: 'error' }
        }
      )
    } else {
      this.formulario.get('name').markAsDirty();
      this.formulario.get('lastname').markAsDirty();
      this.formulario.get('email').markAsDirty();
    }

  }

  volver() {
    this._location.back();
  }
}
