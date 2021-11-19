import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvisosService } from 'src/app/services/avisos.service';
// import { CocheService } from 'src/app/services/coche.service';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/services/usuario.service';
import { language } from 'src/app/languages/es-es';
import { FechasService } from 'src/app/services/fechas.service';

@Component({
  selector: 'app-aviso-entrada-historico',
  templateUrl: './aviso-entrada-historico.component.html',
  styleUrls: ['./aviso-entrada-historico.component.scss']
})
export class AvisoEntradaHistoricoComponent implements OnInit {
  entity: string = "aviso_historico";
  labels = language;
  toast: any;
  mensaje: string = "";
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
    created_at: null,
    respuesta: 0,
    respuestaFecha: null,
    respuestaDetalle: '',
    confirmada: 0
  };

  constructor(
    private route: ActivatedRoute,
    private avisosService: AvisosService,
    private _location: Location,
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
    this.avisosService.getHistorico(id).subscribe(
      (response: any) => this.datos = response,
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { text: "Error al recuperar los datos", type: 'error' }
      }
    );
  }

  goBack = () => {
    this._location.back();
  }
}
