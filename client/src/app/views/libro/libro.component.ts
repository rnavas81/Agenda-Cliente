import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
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
  isLoading: boolean=false;

  constructor(
    private router: Router,
    public libroservice: LibroService,
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

  cargarDatos = () => {
    // document.getElementById('toolbar').classList.add('disabled');
    this.isLoading = true;
    // Carga los datos de la semana
    this.datos = {};
    var fecha2 = moment(this.fecha.format("Y-M-D"), 'Y-M-D');
    for (let index = 0; index < 7; index++) {
      this.datos[fecha2.format("Y-M-D")] = [];
      this.recuperarDatos(fecha2.format("Y-M-D"), index);
      fecha2.add(1, "d");
    }
  }
  recuperarDatos = (fecha, index) => {
    setTimeout(() => {
      this.libroservice.getByFecha(fecha).subscribe(
        (response: any) => {
          this.datos[fecha] = response;
          this.isLoading = index !== 6;
        },
        (error) => {
          if (error.status === 401) this.usuarioService.salir();
        }
      );
    }, 200 * index);
  };

  abrirDia = dia => {
    this.router.navigate([`/libro/dia`], { fragment: dia });
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
