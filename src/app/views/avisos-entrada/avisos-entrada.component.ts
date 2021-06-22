import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvisosService } from 'src/app/services/avisos.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { CocheService } from 'src/app/services/coche.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as moment from 'moment';

@Component({
  selector: 'app-avisos-entrada',
  templateUrl: './avisos-entrada.component.html',
  styleUrls: ['./avisos-entrada.component.scss']
})
export class AvisosEntradaComponent implements OnInit {
  id: number = 0;
  mensaje: string = "";
  coches: any = [];
  conductores: any = [];
  clientes: any = [];
  formulario: FormGroup;
  cargando: boolean = false;
  datos: any = {
    salidaFecha: null,
    salidaHora: null,
    salidaLugar: null,
    llegadaFecha: null,
    llegadaHora: null,
    llegadaLugar: null,
    itinerario: null,
    cliente: { id: 0 },
    clienteDetalle: null,
    observaciones: '',
    coches: [],
    conductores: [],
    created_at: moment(),
    respuesta: 0,
    respuestaFecha: null,
    respuestaDetalle: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public avisosService: AvisosService,
    private conductorService: ConductorService,
    private cocheService: CocheService,
    private clienteService: ClienteService,
    private _location: Location,
    public usuarioService: UsuarioService,
  ) {
    // Recupera el id de la cabecera
    const hash = location.hash.substr(1);
    if (hash) this.id = parseInt(hash);
    else this.id = 0;
    // Recupera los conductores
    this.conductorService.get().subscribe(
      (response: any) => this.conductores = response,
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.mensaje = "Error al recuperar los conductores"
      }
    )
    // Recupera los coches
    this.cocheService.get().subscribe(
      (response: any) => this.coches = response,
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.mensaje = "Error al recuperar los coches"
      }
    )
    // Recupera los clientes
    this.clienteService.get().subscribe(
      (response: any) => this.clientes = response,
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.mensaje = "Error al recuperar los clientes"
      }
    )
    // Crea el formulario
    this.formulario = this.formBuilder.group({
      salidaFecha: [{value:'',disabled:true}, [Validators.required]],
      salidaHora: [{value:'',disabled:true}, []],
      salidaLugar: [{value:'',disabled:true}, [Validators.maxLength(500)]],
      llegadaFecha: [{value:'',disabled:true}, []],
      llegadaHora: [{value:'',disabled:true}, []],
      llegadaLugar: [{value:'',disabled:true}, [Validators.maxLength(500)]],
      itinerario: [{value:'',disabled:true}, [Validators.maxLength(1000)]],
      cliente: [{value:'',disabled:true}, [Validators.required]],
      clienteDetalle: [{value:'',disabled:true}, [Validators.maxLength(500)]],
      observaciones: [{value:'',disabled:true}, [Validators.maxLength(1000)]],
      respuesta: [{value:'',disabled:true}, []],
      respuestaFecha: [{value:'',disabled:true}, []],
      respuestaDetalle: [{value:'',disabled:true}, []],
    });
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.avisosService.get(this.id).subscribe(
        (response: any) => this.cargarDatos(response),
        (error: any) => {
          if (error.status === 401) this.usuarioService.salir();
          else this.mensaje = "Error al recuperar los datos"
        }
      );
    }
  }
  /**
   * Carga los datos en el formulario
   * @param data datos de la entrada para el formulario
   */
  cargarDatos = data => {
    this.datos = data;
    this.datos.created_at = moment(data.created_at);
    this.formulario.controls.salidaFecha.setValue(data.salidaFecha);
    this.formulario.controls.salidaHora.setValue(data.salidaHora);
    this.formulario.controls.salidaLugar.setValue(data.salidaLugar);
    this.formulario.controls.llegadaFecha.setValue(data.llegadaFecha);
    this.formulario.controls.llegadaHora.setValue(data.llegadaHora);
    this.formulario.controls.llegadaLugar.setValue(data.llegadaLugar);
    this.formulario.controls.itinerario.setValue(data.itinerario);
    this.formulario.controls.cliente.setValue(data.cliente.id);
    this.formulario.controls.clienteDetalle.setValue(data.clienteDetalle);
    this.formulario.controls.observaciones.setValue(data.observaciones);
    this.formulario.controls.respuesta.setValue(data.respuesta);
    this.formulario.controls.respuestaFecha.setValue(data.respuestaFecha);
    this.formulario.controls.respuestaDetalle.setValue(data.respuestaDetalle);
    if(this.datos.confirmada == 0){
      for(var key in this.formulario.controls){
        this.formulario.get(key).enable();
      }
    }
  }

  volver = () => {
    this._location.back();
  }
  eliminarItem = (event, tipo, index) => {
    // event.target.parentNode.parentNode.remove();
    switch (tipo) {
      case 1://Eliminar conductor
        this.datos.conductores.splice(index, 1);
        break;
      case 2://Eliminar coche
        this.datos.coches.splice(index, 1);
        break;
      default:
        break;
    }
  }
  /**
   * Agrega un nuevo cliente
   * @param nombre Nombre del cliente
   * @param telefono telefono del cliente
   */
  onClickClientes = (nombre, telefono) => {
    nombre = nombre.trim().toUpperCase();
    telefono = telefono.trim().toUpperCase();
    if (nombre.length > 0) {
      var id = 0;
      const existe = this.clientes.find(e => e.nombre.toUpperCase() == nombre && (telefono.length == 0 ? true : e.telefono.toUpperCase() == telefono));
      if (existe) {
        id = existe.id;
      } else {
        id = Date.now();
        this.clientes.push({
          id: id,
          nombre: nombre,
          telefono: telefono,
        })
      }
      this.formulario.controls.cliente.setValue(id);
      document.getElementById('clientes-modal-close').click();

    }
  }
  /**
   * Agrega un nuevo coche
   * @param input Matricula del nuevo coche
   * @param select Id del coche a agregar
   * @returns
   */
  onClickCoches = (input, select): void => {
    input = input.trim().toUpperCase();
    if (input.length > 0) {//Si no existe ya esa matricula agrega un coche nuevo
      const existe = this.coches.findIndex(e => e.matricula.toUpperCase() == input) !== -1;
      if (!existe) {
        const esta = this.datos.coches.findIndex(e => e.coche.matricula.toUpperCase() == input) !== -1;
        if (!esta) {
          this.datos.coches.push(
            { coche: { id: 0, matricula: input } }
          );
        }
      }
    } else if (select > 0) {//Si no está agregado lo agrega
      const esta = this.datos.coches.findIndex(e => e.coche.id == select) !== -1;
      if (!esta) {
        const coche = this.coches.find(e => e.id == select);
        this.datos.coches.push(
          { coche: coche,presupuesto:0 }
        );
      }
    }
    document.getElementById('coches-modal-close').click();
    return;
  }
  asignarPresupuesto = (value, id) => {
    const coche = this.datos.coches.find(e => e.coche.id == id);
    coche.presupuesto = value;
  }
  /**
   * Agrega un conductor
   * @param input texto para un nuevo conductor
   * @param select id del conductor a agregar
   * @returns
   */
  onClickConductores = (input, select): void => {
    input = input.trim().toUpperCase();
    if (input.length > 0) {//Si no existe ya ese nombre agrega un conductor nuevo
      const existe = this.conductores.findIndex(e => e.nombre.toUpperCase() == input) !== -1;
      if (!existe) {
        const esta = this.datos.conductores.findIndex(e => e.conductor.nombre.toUpperCase() == input) !== -1;
        if (!esta) {
          this.datos.conductores.push(
            { conductor: { id: 0, nombre: input } }
          );
        }
      }
    } else if (select > 0) {//Si no está agregado lo agrega
      const esta = this.datos.conductores.findIndex(e => e.conductor.id == select) !== -1;
      if (!esta) {
        const conductor = this.conductores.find(e => e.id == select);
        this.datos.conductores.push(
          { conductor: conductor }
        );
      }
    }
    document.getElementById('conductores-modal-close').click();
    return;
  }
  onChangeInputModal = select => {
    select.value = 0;
  }
  onChangeSelectModal = input => {
    input.value = '';
  }

  onSubmit = () => {
    this.mensaje = "";
    const data = this.formulario.value;
    if (this.formulario.valid) {
      this.cargando = true;
      document.getElementById('btn-guardar').classList.add('disabled');
      data.cliente = this.clientes.find(e => e.id == data.cliente);
      data.coches = [];
      this.datos.coches.forEach(coche => 
        data.coches.push([coche.coche.id != 0 ? coche.coche.id : coche.coche.matricula,coche.presupuesto])
        );
      data.conductores = [];
      this.datos.conductores.forEach(conductor => data.conductores.push(conductor.conductor.id != 0 ? conductor.conductor.id : conductor.conductor.nombre));

      if (this.id == 0) {
        this.avisosService.agregarEntrada(data).subscribe(
          response => this.router.navigate(["/avisos/dia"], { fragment: this.datos.salidaFecha }),
          error => {
            if (error.status === 401) this.usuarioService.salir();
            else this.mensaje = "Error al guardar los datos"
          }
        )
      } else {
        this.avisosService.modificarEntrada(this.id, data).subscribe(
          response => this.router.navigate(["/avisos/dia"], { fragment: this.datos.salidaFecha }),
          error => {
            if (error.status === 401) this.usuarioService.salir();
            else this.mensaje = "Error al guardar los datos"
          }
        )
      }
      this.cargando = false;
      document.getElementById('btn-guardar').classList.remove('disabled');
    } else {

    }

  }

}
