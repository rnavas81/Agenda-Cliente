import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { CocheService } from 'src/app/services/coche.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LibroService } from 'src/app/services/libro.service';
import * as moment from 'moment';

@Component({
  selector: 'app-libro-entrada',
  templateUrl: './libro-entrada.component.html',
  styleUrls: ['./libro-entrada.component.scss']
})
export class LibroEntradaComponent implements OnInit {
  id: number = 0;
  mensaje: string = "";
  coches: any = [];
  conductores: any = [];
  clientes: any = [];
  formulario: FormGroup;
  cargando: boolean = false;
  toast: any;
  datos: any = {
    salidaFecha: null,
    salidaHora: null,
    salidaLugar: null,
    llegadaFecha: null,
    llegadaHora: null,
    llegadaLugar: null,
    itinerario: null,
    kms: null,
    contacto: null,
    contactoTlf: null,
    cliente: { id: 0 },
    clienteDetalle: null,
    importe: null,
    cobrado: 0,
    cobradoFecha: null,
    cobradoForma: null,
    cobradoDetalle: null,
    gastos: null,
    facturaNombre: null,
    facturaNumero: 0,
    observaciones: null,
    coches: [],
    conductores: [],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public libroService: LibroService,
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
        else this.toast = { text: "Error al recuperar los conductores", type: 'error' }

      }
    )
    // Recupera los coches
    this.cocheService.get().subscribe(
      (response: any) => this.coches = response,
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { text: "Error al recuperar los coches", type: 'error' }

      }
    )
    // Recupera los clientes
    this.clienteService.get().subscribe(
      (response: any) => this.clientes = response,
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { text: "Error al recuperar los clientes", type: 'error' }

      }
    )
    // Crea el formulario
    this.formulario = this.formBuilder.group({
      salidaFecha: [moment().format("YYYY-MM-DD"), [Validators.required]],
      salidaHora: ['', []],
      salidaLugar: ['', [Validators.required]],
      llegadaFecha: ['', []],
      llegadaHora: ['', []],
      llegadaLugar: ['', [Validators.required]],
      itinerario: ['', []],
      contacto: ['', []],
      contactoTlf: ['', []],
      kms: ['', []],
      cliente: ['', [Validators.required]],
      clienteDetalle: ['', []],
      importe: ['', []],
      cobrado: ['', []],
      cobradoFecha: ['', []],
      cobradoForma: ['', []],
      cobradoDetalle: ['', []],
      gastos: ['', []],
      facturaNombre: ['', []],
      facturaNumero: ['', [Validators.min(0)]],
      observaciones: ['', []]
    });
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.libroService.get(this.id).subscribe(
        (response: any) => this.cargarDatos(response),
        (error: any) => {
          if (error.status === 401) this.usuarioService.salir();
          else this.toast = { text: "Error al recuperar los datos", type: 'error' }
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

    for (var key in this.formulario.controls) {
      if (key == 'cliente' && this.datos[key]) {
        this.formulario.controls[key].setValue(this.datos[key].id, { onlySelf: true });
      } else if (key == 'cobrado') {
        this.formulario.controls[key].setValue(this.datos[key] == 1, { onlySelf: true });
      } else
        this.formulario.controls[key].setValue(this.datos[key]);
    }

  }
  showTab(idTab) {
    var tabs = document.querySelectorAll("[role='tab']");
    var contents = document.querySelectorAll("[role='tabpanel']");
    tabs.forEach(item => {
      if (item.id == `tab-${idTab}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    })
    contents.forEach(item => {
      if (item.id == `tabpanel-${idTab}`) {
        item.classList.add('active', 'show');
      } else {
        item.classList.remove('active', 'show');
      }
    })
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
          { coche: coche }
        );
      }
    }
    document.getElementById('coches-modal-close').click();
    return;
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
    var data = this.formulario.value;
    this.formulario.controls['cliente'].setValue(data.cliente == 0 ? null : data.cliente);
    if (this.formulario.valid) {
      this.cargando = true;
      document.getElementById('btn-guardar').classList.add('disabled');
      data.cliente = data.cliente == 0 ? null : this.clientes.find(e => e.id == data.cliente);
      data.coches = [];
      this.datos.coches.forEach(coche => data.coches.push(coche.coche.id != 0 ? coche.coche.id : coche.coche.matricula));
      data.conductores = [];
      this.datos.conductores.forEach(conductor => data.conductores.push(conductor.conductor.id != 0 ? conductor.conductor.id : conductor.conductor.nombre));
      data.cobrado = data.cobrado ? 1 : 0;
      if (this.id == 0) {
        this.libroService.agregarEntrada(data).subscribe(
          response => this.router.navigate(["/libro/dia"], { fragment: this.datos.salidaFecha }),
          error => {
            if (error.status === 401) this.usuarioService.salir();
            else this.toast = { text: "Error al guardar los datos", type: 'error' }

          }
        )
      } else {
        this.libroService.modificarEntrada(this.id, data).subscribe(
          response => this.router.navigate(["/libro/dia"], { fragment: this.datos.salidaFecha }),
          error => {
            if (error.status === 401) this.usuarioService.salir();
            else this.toast = { text: "Error al guardar los datos", type: 'error' }
          }
        )
      }
      this.cargando = false;
      document.getElementById('btn-guardar').classList.remove('disabled');
    } else {
      Object.keys(this.formulario.controls).forEach(key => {
        if (this.formulario.controls[key].status == "INVALID") {
          var campo = "";
          if(document.querySelector(`label[for="${key}"]`)) {
            setTimeout(() => {
              if(document.querySelector(`label[for="${key}"]`).innerHTML=='Lugar' && key=="salidaLugar")campo = "Lugar de salida";
              else if(document.querySelector(`label[for="${key}"]`).innerHTML=='Lugar' && key=="llegadaLugar")campo = "Lugar de llegada";
              else campo = document.querySelector(`label[for="${key}"]`).innerHTML;

              this.toast = { text: `Error en el campo ${campo}`, type: 'error' }              
            }, 100);
          }
        }
      });
    }

  }


}
