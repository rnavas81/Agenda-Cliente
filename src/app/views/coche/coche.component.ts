import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { language } from 'src/app/languages/es-es';
import { CocheService } from 'src/app/services/coche.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-coche',
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.scss']
})
export class CocheComponent implements OnInit {
  entity: string = "vehiculo";
  entities: string = "vehiculos";
  labels = language;
  toast: any;
  formulario: FormGroup;
  data: any = {
    id: 0,
    matricula: "",
  }

  constructor(
    private formBuilder: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private service: CocheService,
  ) {

    // Crea el formulario
    this.formulario = this.formBuilder.group({
      matricula: [this.data.matricula, [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getData(id);
    }
  }

  getData(id): void {
    this.service.get(id).subscribe(
      (response: any) => this.loadData(response),
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { type: 'error', text: this.labels.error_get(this.entity) }
      }

    )
  }

  loadData(data) {
    this.data = data;
    for (var key in data) if (this.formulario.contains(key)) this.formulario.controls[key].setValue(data[key])
  }

  save(): void {
    if (this.formulario.valid) {
      const data = { ...this.formulario.value };
      for (var key in data) {
        data[key] = data[key] ? data[key].toUpperCase() : "";
      }
      if (this.data.id == 0) {
        this.service.create(data).subscribe(
          (response: any) => {
            this._location.replaceState(`/${this.entity}/${response.id}`);
            this.loadData(response);
            this.toast = { text: this.labels.new(this.entity), type: 'success' }
          }, (error: any) => {
            if (error.status == 403) this.usuarioService.salir();
            else this.toast = { text: this.labels.error_action('add', this.entity), type: 'error' }
          }
        );
      } else {
        this.service.update(this.data.id, data).subscribe(
          (response: any) => {
            this.toast = { text: this.labels.cambios_guardados, type: 'success' }
          }, (error: any) => {
            if (error.status == 403) this.usuarioService.salir();
            else this.toast = { text: this.labels.error_action('edit', this.entity), type: 'error' }
          }
        )
      }
    } else {
      this.showErrors();
    }
  }

  showErrors(): void {
    Object.keys(this.formulario.controls).forEach(key => {
      if (this.formulario.controls[key].status == "INVALID") {
        var campo = "";
        if (document.querySelector(`label[for="${key}"]`)) {
          setTimeout(() => {
            campo = document.querySelector(`label[for="${key}"]`).innerHTML;
            this.toast = { text: `Error en el campo ${campo}`, type: 'error' }
          }, 150);
        }
      }
    });
  }

  goBack(): void {
    this._location.back();
  }

}
