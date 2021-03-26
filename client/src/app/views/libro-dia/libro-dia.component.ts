import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LibroService } from 'src/app/services/libro.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-libro-dia',
  templateUrl: './libro-dia.component.html',
  styleUrls: ['./libro-dia.component.scss']
})
export class LibroDiaComponent implements OnInit {
  fecha: any;
  datos: any;
  modalBorrar: any;
  seleccionado: number = null;

  constructor(
    private router: Router,
    public libroService: LibroService,
    public usuarioService: UsuarioService,
  ) {
    // Recupera la fecha de la cabecera
    const hash = location.hash.substr(1);
    if (hash) this.fecha = moment(hash, 'Y-M-D');
    else this.fecha = moment();
    this.datos = [];

  }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos() {
    this.libroService.getByFecha(this.fecha.format('Y-M-D')).subscribe(
      (response: any) => {
        this.datos = response;
      }, (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
      }
    )
  }

  anterior() {
    this.fecha.subtract(1, "d");
    this.cargarDia();
    return;
  };
  posterior() {
    this.fecha.add(1, "d");
    this.cargarDia();
    return;
  };
  volver() {
    this.router.navigate([`/libro`], { fragment: this.fecha.format("Y-M-D") });
  }
  onClickCalendario() {
    let calendario = <HTMLInputElement>document.getElementById('modal-calendario');
    const fecha = calendario.value;
    document.getElementById('calendar-modal-close').click();
    if (!!fecha) {
      this.fecha = moment(fecha);
      this.cargarDia();
    }

  }
  cargarDia() {
    this.router.navigate([`/libro/dia`], { fragment: this.fecha.format("Y-M-D") });
    this.ngOnInit();
    return;

  }
  modalEliminar(id) {
    this.seleccionado = id;
    document.getElementById('borrar-modal-open').click();
  }

  // TODO:incluir mensajes de feedback
  eliminar() {
    this.libroService.eliminarEntrada(this.seleccionado).subscribe(
      (response: any) => {
        const index = this.datos.findIndex(e => e.id == this.seleccionado);
        this.datos.splice(index, 1);
        document.getElementById('borrar-modal-close').click();
        this.seleccionado = null;
      }, (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else {
          document.getElementById('borrar-modal-close').click();
          this.seleccionado = null;
        }
      }
    )
  }
  editar(id) {
    this.router.navigate([`/libro/dia/entrada`], { fragment: id.toString() });
  }
  nuevaEntrada() {
    this.router.navigate(["libro/dia/entrada"]);
  }

}
