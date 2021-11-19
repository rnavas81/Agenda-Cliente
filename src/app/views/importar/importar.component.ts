import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { language } from 'src/app/languages/es-es';
import { ImportacionService } from 'src/app/services/importacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.scss']
})
export class ImportarComponent implements OnInit {
  toast: any;
  entity: string = "importar";
  labels = language;
  formulario: FormGroup;
  importado: number = 0;
  fichero: File;
  importResult: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private servicio: ImportacionService,
    private http: HttpClient,
    private usuarioService: UsuarioService,
  ) {

    // Crea el formulario
    this.formulario = this.formBuilder.group({
      fichero: ["", [Validators.required]],
      tipo: [2, [Validators.required]],
      donde: [1, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.importado = 0;
  }
  fileChange(e) {
    const file: File = e.target.files[0];
    if (file) {
      this.fichero = file;
    }
  }

  importar() {
    if (this.formulario.valid) {
      this.importado = 1;

      const data = { ...this.formulario.value };
      this.servicio.send(data, this.fichero).subscribe(
        (success: any) => {
          this.importado = 2;
        },
        (error: any) => {
          if (error.status == 201) this.importado = 2;
          else if (error.status === 401) this.usuarioService.salir();
          else this.importado = 3;
        }
      )
    }
  }

  nueva() {
    this.formulario.reset();
    this.formulario.controls['tipo'].setValue(2);
    this.formulario.controls['donde'].setValue(1);
    this.fichero = null
    this.importado = 0;
  }
}
