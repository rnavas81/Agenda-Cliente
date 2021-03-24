import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-agenda-dia',
  templateUrl: './agenda-dia.component.html',
  styleUrls: ['./agenda-dia.component.scss']
})
export class AgendaDiaComponent implements OnInit {
  fecha: any;
  datos: any;

  constructor(
    private router: Router,
    public agendaService: AgendaService) {
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

  // TODO:incluir mensajes de feedback
  confirmar = id => {
    this.agendaService.confirmarEntrada(id).subscribe(
      (response: any) => {
        const index = this.datos.findIndex(e => e.id == id);
        this.datos.splice(index, 1);
      }, (error: any) => {

      }
    )
    const index = this.datos.findIndex(e => e.id == id);
    this.datos.splice(index, 1);;
  }
  // TODO:incluir mensajes de feedback
  eliminar = id => {
    this.agendaService.eliminarEntrada(id).subscribe(
      (response: any) => {
        const index = this.datos.findIndex(e => e.id == id);
        this.datos.splice(index, 1);
      }, (error: any) => {

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
