import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { AgendaService } from "src/app/services/agenda.service";

@Component({
  selector: "app-agenda",
  templateUrl: "./agenda.component.html",
  styleUrls: ["./agenda.component.scss"],
})
export class AgendaComponent implements OnInit {
  fecha: any;
  datos: any;

  constructor(
    private router: Router,
    public agendaService: AgendaService) {
    // Recupera la fecha de la cabecera
    const hash = location.hash.substr(1);
    this.fecha = moment(hash ? hash : undefined);
    this.fechaALunes();
  }

  ngOnInit(): void {
    document.getElementById('toolbar').classList.add('disabled');
    // Carga los datos de la semana
    this.datos = {};
    var fecha2 = moment(this.fecha.format("Y-M-D"));
    for (let index = 0; index < 7; index++) {
      this.datos[fecha2.format("Y-M-D")] = [];
      this.recuperarDatos(fecha2.format("Y-M-D"),index);
      fecha2.add(1, "d");
    }
  }
  fechaALunes = () => {
    // Situa la fecha en lunes
    this.fecha.subtract(this.fecha.day() - 1, "days");
  }

  anterior = () => {
    this.fecha.subtract(1, "w");
    this.cargarFecha();
    return;
  };
  posterior = () => {
    this.fecha.add(1, "w");
    this.cargarFecha();
    return;
  };
  recuperarDatos = (fecha,index) => {
    setTimeout(() => {
      this.agendaService.getByFecha(fecha).subscribe(
        (response: any) => {
          this.datos[fecha] = response;
        },
        (error) => { }
      );
    }, 200*index);
    if(index==6)document.getElementById('toolbar').classList.remove('disabled');
  };

  abrirDia = dia => {
    this.router.navigate([`/agenda/dia`], { fragment: dia });
  }
  agregarEntrada = () => {
    this.router.navigate([`/agenda/dia/entrada`]);
  }
  buscar = () => {
    this.router.navigate([`/agenda/buscar`]);
  }
  /**
   * Recupera la fecha del caledario
   * Calcula el lunes de esa semana
   * Carga los datos de la semana
   */
  onClickCalendario = () => {
    let calendario = <HTMLInputElement>document.getElementById('modal-calendario');
    const fecha = calendario.value;
    console.log(fecha, !fecha, !!fecha);
    document.getElementById('calendar-modal-close').click();
    if (!!fecha) {
      this.fecha = moment(fecha);
      this.fechaALunes();
      this.cargarFecha();
    }
  }
  cargarFecha = () => {
    this.router.navigate([`/agenda`], { fragment: this.fecha.format("Y-M-D") });
    this.ngOnInit();
    return;
  }

}
