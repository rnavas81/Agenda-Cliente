import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { CocheService } from 'src/app/services/coche.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LibroService } from 'src/app/services/libro.service';
import * as moment from 'moment';
import { language } from 'src/app/languages/es-es';
import { FechasService } from 'src/app/services/fechas.service';
@Component({
  selector: 'app-libro-entrada-historico',
  templateUrl: './libro-entrada-historico.component.html',
  styleUrls: ['./libro-entrada-historico.component.scss']
})
export class LibroEntradaHistoricoComponent implements OnInit {
  entity: string = "libro_historico";
  toast: any;
  labels = language;
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
    facturarA: null,
    facturaNumero: 0,
    facturaNombre: null,
    observaciones: null,
    coches: [],
    conductores: [],
  };

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService,
    public _location: Location,
    private usuarioService: UsuarioService,
    public fechas: FechasService,
  ) {
    // Recupera el id de la cabecera
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.getData(id);
  }

  ngOnInit(): void { }

  /**
   * Carga los datos en el formulario
   * @param data datos de la entrada para el formulario
   */
  getData = id => {
    this.libroService.getHistorico(id).subscribe(
      (response: any) => this.datos = response,
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { text: "Error al recuperar los datos", type: 'error' }
      }
    );
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

  goBack = () => {
    this._location.back();
  }
}
