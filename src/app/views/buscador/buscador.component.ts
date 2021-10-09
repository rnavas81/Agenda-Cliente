import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { language } from 'src/app/languages/es-es';
import { BuscarService } from 'src/app/services/buscar-service';
import { ClienteService } from 'src/app/services/cliente.service';
import { FechasService } from 'src/app/services/fechas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  loading: boolean = false;
  toast: any;
  formulario: FormGroup;
  clientes: any = [];
  buscarConductores: any = [];
  datos: any = [];
  labels = language;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    public fechasService: FechasService,
    private buscarService: BuscarService,
    private router: Router,
  ) {
    // Recupera los clientes
    this.clienteService.get().subscribe(
      (response: any) => this.clientes = response,
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { text: "Error al recuperar los clientes", type: 'error' }

      }
    )
    this.formulario = this.formBuilder.group({
      tipo: [0],
      desde: [null],
      hasta: [null],
      salida: [null, [Validators.maxLength(250)]],
      llegada: [null, [Validators.maxLength(250)]],
      cliente: [0],
      cobrado: [-1],
      factura: [null, [Validators.maxLength(250)]],
    });
  }

  ngOnInit(): void {
  }
  cambiarFormulario = () => {
    var hijo = <HTMLElement>document.getElementById('form-btn-img');
    var form = <HTMLElement>document.getElementById('campos-busqueda');
    if (hijo.classList.contains('fa-caret-square-up')) {
      hijo.classList.remove('fa-caret-square-up');
      hijo.classList.add('fa-caret-square-down');
      form.classList.remove('abierto')
    } else {
      hijo.classList.remove('fa-caret-square-down');
      hijo.classList.add('fa-caret-square-up');
      form.classList.add('abierto')

    }
  }

  buscar(): void {
    if (this.formulario.valid) {
      this.loading = true;
      this.buscarService.get(this.formulario.value).pipe(
        finalize(
          () => this.loading = false
        )
      ).subscribe(
        (success: any) => {
          this.datos = success;
        },
        (error: any) => {
          if (error.status === 401) this.usuarioService.salir();
          else this.toast = { text: "Error al realizar la busqueda", type: 'error' }
        }
      )
    }
  }
  limpiarFormulario(): void {
    this.formulario.reset();
    this.formulario.controls['tipo'].setValue(0);
    this.formulario.controls['cliente'].setValue(0);
    this.formulario.controls['cobrado'].setValue(false);
  }
  abrirEntrda = (index) => {
    if (this.datos[index].tipo == 1) {//Abre un aviso
      this.router.navigate([`/avisos/dia/entrada`], { fragment: this.datos[index].id.toString() });
    } else {//Abre un viaje
      this.router.navigate([`/libro/dia/entrada`], { fragment: this.datos[index].id.toString() });
    }

  }
}
