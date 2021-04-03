import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AvisosService } from 'src/app/services/avisos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-avisos-dia',
  templateUrl: './avisos-dia.component.html',
  styleUrls: ['./avisos-dia.component.scss']
})
export class AvisosDiaComponent implements OnInit {
  fecha: any;
  datos: any;
  seleccionado: number = null;

  constructor(
    private router: Router,
    public avisosService: AvisosService,
    public usuarioService: UsuarioService,
  ) {
    // Recupera la fecha de la cabecera
    const hash = location.hash.substr(1);
    if (hash) this.fecha = moment(hash, 'Y-M-D');
    else this.fecha = moment();
    this.datos = {
      'pendientes':[],'confirmados':[]
    };
  }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos = () => {
    this.avisosService.getByFecha(this.fecha.format('Y-M-D')).subscribe(
      (response: any) => {
        response.forEach(element => {
          console.log(element);
          
          if(element.confirmada==0)this.datos.pendientes.push(element);
          else if(element.confirmada==1)this.datos.confirmados.push(element);
        });
        console.log(this.datos);
        
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
    this.avisosService.eliminarEntrada(this.seleccionado).subscribe(
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
    this.router.navigate([`/avisos/dia/entrada`], { fragment: id.toString() });
  }
  nuevaEntrada = () => {
    this.router.navigate(["avisos/dia/entrada"]);
  }

}
