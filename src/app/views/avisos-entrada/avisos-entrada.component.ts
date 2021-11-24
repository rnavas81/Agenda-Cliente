import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvisosService } from 'src/app/services/avisos.service';
import { ClienteService } from 'src/app/services/cliente.service';
// import { CocheService } from 'src/app/services/coche.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as moment from 'moment';
import { coches } from 'src/environments/environment';
import { language } from 'src/app/languages/es-es';
import { FechasService } from 'src/app/services/fechas.service';

@Component({
  selector: 'app-avisos-entrada',
  templateUrl: './avisos-entrada.component.html',
  styleUrls: ['./avisos-entrada.component.scss']
})
export class AvisosEntradaComponent implements OnInit {
  id: number = 0;
  mensaje: string = "";
  coches: any = [];
  clientes: any = [];
  formulario: FormGroup;
  cargando: boolean = false;
  datos: any = {
    salidaFecha: moment().format("YYYY-MM-DD"),
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
    created_at: moment(),
    respuesta: 0,
    respuestaFecha: null,
    respuestaDetalle: '',
    confirmada: 0,
    fecha_aviso: null,
  };
  toast: any;
  labels = language;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public avisosService: AvisosService,
    private conductorService: ConductorService,
    // private cocheService: CocheService,
    private clienteService: ClienteService,
    private _location: Location,
    public usuarioService: UsuarioService,
    public fechas: FechasService,
  ) {
    // Recupera el id de la cabecera
    const hash = location.hash.substr(1);
    if (hash) this.id = parseInt(hash);
    else this.id = 0;
    this.coches = coches;
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
      salidaFecha: [{ value: moment().format("YYYY-MM-DD"), disabled: true }, [Validators.required]],
      salidaHora: [{ value: '', disabled: true }, []],
      salidaLugar: [{ value: '', disabled: true }, [Validators.maxLength(500)]],
      llegadaFecha: [{ value: '', disabled: true }, []],
      llegadaHora: [{ value: '', disabled: true }, []],
      llegadaLugar: [{ value: '', disabled: true }, [Validators.maxLength(500)]],
      itinerario: [{ value: '', disabled: true }, [Validators.maxLength(1000)]],
      cliente: [{ value: '', disabled: true }, [Validators.required]],
      clienteDetalle: [{ value: '', disabled: true }, [Validators.maxLength(500)]],
      observaciones: [{ value: '', disabled: true }, [Validators.maxLength(1000)]],
      respuesta: [{ value: '', disabled: true }, []],
      respuestaFecha: [{ value: '', disabled: true }, []],
      respuestaDetalle: [{ value: '', disabled: true }, []],
      fecha_aviso: [{ value: moment().format("YYYY-MM-DD"), disabled: true }, []],
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
    } else this.cargarDatos();
  }
  /**
   * Carga los datos en el formulario
   * @param data datos de la entrada para el formulario
   */
  cargarDatos = (data = null) => {
    if (!!data) this.datos = data;
    this.datos.created_at = moment(this.datos.created_at);
    for (var key in this.formulario.controls) {
      if (key == 'cliente' && this.datos[key]) this.formulario.controls[key].setValue(this.datos[key].id, { onlySelf: true });
      else
        this.formulario.controls[key].setValue(this.datos[key], { onlySelf: true });
      if (this.datos.confirmada == 0) {
        this.formulario.get(key).enable();
      }
    }
  }

  volver = () => {
    if (history.length > 1) {
      this._location.back();
    } else {
      if (this.id == 0) {
        this.router.navigate([`/avisos`]);
      } else {
        var date = this.formulario.controls["salidaFecha"].value;
        this.router.navigate([`/avisos`], { fragment: moment(date).format("YYYY-MM-DD") });
      }
    }
  }
  eliminarItem = (event, tipo, index) => {
    // event.target.parentNode.parentNode.remove();
    switch (tipo) {
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
  onClickCoches = (select, presupuesto): void => {
    this.datos.coches.push(
      { idCoche: select, presupuesto: presupuesto }
    );
    document.getElementById('coches-modal-close').click();
    return;
  }
  asignarPresupuesto = (value, i) => {
    this.datos.coches[i].presupuesto = value;
  }
  onChangeInputModal = select => {
    select.value = 0;
  }
  onChangeSelectModal = input => {
    input.value = '';
  }

  onSubmit = () => {
    this.mensaje = "";
    var data = this.formulario.value;
    this.formulario.controls['cliente'].setValue(data.cliente == 0 ? null : data.cliente);
    if (this.formulario.valid) {
      this.cargando = true;
      document.getElementById('btn-guardar').classList.add('disabled');
      data.cliente = data.cliente > 0 ? this.clientes.find(e => e.id == data.cliente) : null;
      data.coches = this.datos.coches;
      if (this.id == 0) {
        this.avisosService.agregarEntrada(data).subscribe(
          response => {
            this.toast = { text: 'Datos guardados correctamente', type: 'success' }
          }
          , error => {
            if (error.status === 401) this.usuarioService.salir();
            else this.toast = { text: 'Error al guardar los datos', type: 'error' }
          }
        )
      } else {
        this.avisosService.modificarEntrada(this.id, data).subscribe(
          response => {
            this.toast = { text: 'Datos guardados correctamente', type: 'success' }
          }
          , error => {
            if (error.status === 401) this.usuarioService.salir();
            else this.toast = { text: 'Error al guardar los datos', type: 'error' }
          }
        )
      }
      this.cargando = false;
      document.getElementById('btn-guardar').classList.remove('disabled');
    } else {
      Object.keys(this.formulario.controls).forEach(key => {
        if (!this.formulario.controls[key].valid) {
          var campo = document.querySelector(`label[for="${key}"]`).textContent;
          this.toast = { text: `Error en el campo ${campo}`, type: 'error' }
        }
      });

    }

  }

}
