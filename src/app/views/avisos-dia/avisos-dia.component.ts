import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AvisosService } from 'src/app/services/avisos.service';
import { FechasService } from 'src/app/services/fechas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { coches } from 'src/environments/environment';

@Component({
  selector: 'app-avisos-dia',
  templateUrl: './avisos-dia.component.html',
  styleUrls: ['./avisos-dia.component.scss']
})
export class AvisosDiaComponent implements OnInit {
  fecha: any;
  datos: any;
  seleccionado: any = null;
  confirmarCoches: any = [];
  coches: any = [];

  constructor(
    private router: Router,
    public avisosService: AvisosService,
    public usuarioService: UsuarioService,
    public fechaService: FechasService
  ) {
    // Recupera la fecha de la cabecera
    const hash = location.hash.substr(1);
    if (hash) this.fecha = moment(hash, 'Y-M-D');
    else this.fecha = moment();
    this.datos = {
      'pendientes': [], 'confirmados': []
    };
    this.coches = coches;
  }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos = () => {
    this.datos = {
      'pendientes': [], 'confirmados': []
    };
    this.avisosService.getByFecha(this.fecha.format('Y-M-D')).subscribe(
      (response: any) => {
        response.forEach(element => {
          if (element.confirmada == 0) this.datos.pendientes.push(element);
          else if (element.confirmada == 1) this.datos.confirmados.push(element);
        });
      }, (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
      }
    )
  }

  anterior = () => {
    // this.fecha.subtract(1, "d");
    this.fecha = this.fechaService.anteriorDia(this.fecha);
    this.cargarDia();
    return;
  };
  posterior = () => {
    // this.fecha.add(1, "d");
    this.fecha = this.fechaService.posteriorDia(this.fecha);
    this.cargarDia();
    return;
  };
  volver = () => {
    this.router.navigate([`/avisos`], { fragment: this.fecha.format("Y-M-D") });
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
    this.router.navigate([`/avisos/dia`], { fragment: this.fecha.format("Y-M-D") });
    this.cargarDatos();
    return;

  }
  /**
   * Abre el modal de confirmar entrada
   * @param id 
   */
  modalConfirmar(aviso) {
    this.seleccionado = aviso;
    this.confirmarCoches = aviso.coches;

  }
  onConfirmarModalHide() {
    this.confirmarCoches = [];
  }
  // TODO:incluir mensajes de feedback
  /**
   * Confirma una entrada
   */
  confirmar() {
    let coches = [];
    document.querySelectorAll("[name='confirmar-coches']:checked").forEach((cocheInput: HTMLInputElement) => {
      const c = {
        coche: this.coches[cocheInput.getAttribute('idCoche')].toUpperCase(),
        presupuesto: cocheInput.getAttribute('presupuesto'),
      };
      coches.push(c);
    });
    this.avisosService.confirmarEntrada(this.seleccionado.id, coches).subscribe(
      (response: any) => {
        const index = this.datos.pendientes.findIndex(e => e.id == response.id);
        this.datos.pendientes.splice(index, 1);
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
    this.seleccionado = this.datos.pendientes.find(x => x.id == id);
    document.getElementById('borrar-modal-open').click();
  }
  // TODO:incluir mensajes de feedback
  /**
   * Elimina una entrada
   */
  eliminar() {
    this.avisosService.eliminarEntrada(this.seleccionado.id).subscribe(
      (response: any) => {
        const index = this.datos.pendientes.findIndex(e => e.id == this.seleccionado);
        this.datos.pendientes.splice(index, 1);
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
  abrirEntrada = id => {
    this.router.navigate([`/avisos/dia/entrada`], { fragment: id.toString() });
  }
  nuevaEntrada = () => {
    this.router.navigate(["avisos/dia/entrada"]);
  }

}
