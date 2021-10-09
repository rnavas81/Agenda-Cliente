import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { language } from "src/app/languages/es-es";
import { FechasService } from "src/app/services/fechas.service";
import { LibroService } from "src/app/services/libro.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit {
  fecha: any;
  datos: any;
  isLoading: boolean = false;
  labels = language;

  constructor(
    private router: Router,
    public libroservice: LibroService,
    public usuarioService: UsuarioService,
    public fechaService: FechasService
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
    this.fechaService.alLunes(this.fecha);
  }

  // Carga los datos de la semana
  cargarDatos = () => {
    this.isLoading = true;
    this.datos = {};
    this.libroservice.getSemana(this.fecha.format("Y-M-D")).subscribe(
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
    this.router.navigate([`/libro/dia`], { fragment: dia });
  }
  abrirViaje = id => {
    this.router.navigate([`/libro/dia/entrada`], { fragment: id.toString() });
  }
  agregarEntrada = () => {
    this.router.navigate([`/libro/dia/entrada`]);
  }
  buscar = () => {
    this.router.navigate([`/libro/buscar`]);
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
    this.router.navigate([`/libro`], { fragment: this.fecha.format("Y-M-D") });
    this.cargarDatos();
    return;
  }

}
