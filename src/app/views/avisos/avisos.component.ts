import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { AvisosService } from "src/app/services/avisos.service";
import { FechasService } from "src/app/services/fechas.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-avisos",
  templateUrl: "./avisos.component.html",
  styleUrls: ["./avisos.component.scss"],
})
export class AvisosComponent implements OnInit {
  fecha: any;
  datos: any;
  isLoading: boolean = false;
  seleccionado:number = 0;

  constructor(
    private router: Router,
    public avisosService: AvisosService,
    public usuarioService: UsuarioService,
    public fechaService: FechasService,
  ) {
    // Recupera la fecha de la cabecera
    const hash = location.hash.substr(1);
    if (hash) this.fecha = moment(hash, 'Y-M-D');
    else this.fecha = moment();
    fechaService.alLunes(this.fecha);
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  // Carga los datos de la semana
  cargarDatos = () => {
    this.isLoading = true;
    this.datos = {};
    this.avisosService.getSemana(this.fecha.format("Y-M-D")).subscribe(
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
    this.router.navigate([`/avisos/dia`], { fragment: dia });
  }
  abrirAviso(entrada) {
    this.router.navigate([`/avisos/dia/entrada`], { fragment: entrada.toString() });
  }
  /**
 * Abre el modal de confirmar entrada
 * @param id 
 */
  modalConfirmar(id) {
    this.seleccionado = id;
    document.getElementById('confirmar-modal-open').click();
  }
  // TODO:incluir mensajes de feedback
  /**
   * Confirma una entrada
   */
  confirmar () {
    this.avisosService.confirmarEntrada(this.seleccionado).subscribe(
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
  agregarEntrada = () => {
    this.router.navigate([`/avisos/dia/entrada`]);
  }
  buscar = () => {
    this.router.navigate([`/avisos/buscar`]);
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
      this.fechaService.alLunes(this.fecha);
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
    this.router.navigate([`/avisos`], { fragment: this.fecha.format("Y-M-D") });
    this.cargarDatos();
    return;
  }

}
