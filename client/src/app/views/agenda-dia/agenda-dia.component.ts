import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AgendaService } from 'src/app/services/agenda.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agenda-dia',
  templateUrl: './agenda-dia.component.html',
  styleUrls: ['./agenda-dia.component.scss']
})
export class AgendaDiaComponent implements OnInit {
  fecha: any;
  datos: any;
  seleccionado: number = null;

  constructor(
    private router: Router,
    public agendaService: AgendaService,
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
  cargarDatos = () => {
    this.agendaService.getByFecha(this.fecha.format('Y-M-D')).subscribe(
      (response: any) => {
        this.datos = response;
      }, (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
      }
    )
  }

  anterior = () => {
    this.fecha.subtract(1, "d");
    this.cargarDia();
    return;
  };
  posterior = () => {
    this.fecha.add(1, "d");
    this.cargarDia();
    return;
  };
  volver = () => {
    this.router.navigate([`/agenda`], { fragment: this.fecha.format("Y-M-D") });
  }
  onClickCalendario = () => {
    let calendario = <HTMLInputElement>document.getElementById('modal-calendario');
    const fecha = calendario.value;
    document.getElementById('calendar-modal-close').click();
    if (!!fecha) {
      this.fecha = moment(fecha);
      this.cargarDia();
    }

  }
  cargarDia = () => {
    this.router.navigate([`/agenda/dia`], { fragment: this.fecha.format("Y-M-D") });
    this.ngOnInit();
    return;

  }
  /**
   * Abre el modal de confirmar entrada
   * @param id 
   */
  modalConfirmar(id){
    this.seleccionado = id;
    document.getElementById('confirmar-modal-open').click();
  }
  // TODO:incluir mensajes de feedback
  /**
   * Confirma una entrada
   */
  confirmar () {
    this.agendaService.confirmarEntrada(this.seleccionado).subscribe(
      (response: any) => {
        const index = this.datos.findIndex(e => e.id == this.seleccionado);
        this.datos.splice(index, 1);
        document.getElementById('confirmar-modal-close').click();
        this.seleccionado = null;
      }, (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else {
          document.getElementById('confirmar-modal-close').click();
          this.seleccionado = null;
        }
      }
    )
  }
  /**
   * Abre el modal para eliminar una entrada
   * @param id 
   */
  modalEliminar(id) {
    this.seleccionado = id;
    document.getElementById('borrar-modal-open').click();
  }
  // TODO:incluir mensajes de feedback
  /**
   * Elimina una entrada
   */
  eliminar() {
    this.agendaService.eliminarEntrada(this.seleccionado).subscribe(
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
  editar = id => {
    this.router.navigate([`/agenda/dia/entrada`], { fragment: id.toString() });
  }
  nuevaEntrada = () => {
    this.router.navigate(["agenda/dia/entrada"]);
  }

}
