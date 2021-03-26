import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { AgendaService } from "src/app/services/agenda.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-agenda",
  templateUrl: "./agenda.component.html",
  styleUrls: ["./agenda.component.scss"],
})
export class AgendaComponent implements OnInit {
  fecha: any;
  datos: any;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    public agendaService: AgendaService,
    public usuarioService: UsuarioService,
  ) {
    // Recupera la fecha de la cabecera
    const hash = location.hash.substr(1);
    if (hash) this.fecha = moment(hash, 'Y-M-D');
    else this.fecha = moment();
    this.fechaALunes();
  }

  ngOnInit(): void {
    this.cargarDatos();
  }
  fechaALunes = () => {
    // Situa la fecha en lunes
    this.fecha.subtract(this.fecha.day() - 1, "days");
  }

  // Carga los datos de la semana
  cargarDatos = () => {
    this.isLoading = true;
    this.datos = {};
    this.agendaService.getSemana(this.fecha.format("Y-M-D")).subscribe(
      (response: any) => {
        this.datos = response;
        this.isLoading = false;
      },
      (error) => {
        if (error.status === 401) this.usuarioService.salir();
      }
    );
  }
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
    document.getElementById('calendar-modal-close').click();
    if (!!fecha) {
      this.fecha = moment(fecha);
      this.fechaALunes();
      this.cargarFecha();
    }
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
  cargarFecha = () => {
    this.router.navigate([`/agenda`], { fragment: this.fecha.format("Y-M-D") });
    this.cargarDatos();
    return;
  }

}
