import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { language } from 'src/app/languages/es-es';
import { BuscarService } from 'src/app/services/buscar-service';
import { FechasService } from 'src/app/services/fechas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  loading: boolean = false;
  toast: any;
  formulario: FormGroup;
  buscarConductores: any = [];
  datos: any = [];
  labels = language;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    public fechasService: FechasService,
    private buscarService: BuscarService,
    private router: Router,
  ) {
    this.formulario = this.formBuilder.group({
      tipo: [0],
      desde: [null],
      hasta: [null],
      salida: [null, [Validators.maxLength(250)]],
      llegada: [null, [Validators.maxLength(250)]],
      cliente: [null, [Validators.maxLength(250)]],
      cobrado: [-1],
      facturarA: [null, [Validators.maxLength(250)]],
      facturaNumero: [null, [Validators.maxLength(250)]],
    });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem(environment.SESSIONSTORAGE_SEARCH)){
      const data_form = JSON.parse(sessionStorage.getItem(environment.SESSIONSTORAGE_SEARCH));
      for(var key in data_form){
        this.formulario.controls[key].setValue(data_form[key]);
      }
      this.cambiarFormulario();
      this.buscar();
    }
  }
  cambiarFormulario = () => {
    var hijo = <HTMLElement>document.getElementById('form-btn-img');
    var form = <HTMLElement>document.getElementById('campos-busqueda');
    if (hijo.classList.contains('fa-caret-square-up')) {
      hijo.classList.remove('fa-caret-square-up');
      hijo.classList.add('fa-caret-square-down');
      form.classList.remove('abierto')
    } else {
      hijo.classList.remove('fa-caret-square-down');
      hijo.classList.add('fa-caret-square-up');
      form.classList.add('abierto')

    }
  }

  buscar(): void {
    if (this.formulario.valid) {
      this.loading = true;
      this.buscarService.get(this.formulario.value).pipe(
        finalize(
          () => this.loading = false
        )
      ).subscribe(
        (success: any) => {
          this.datos = success;
          sessionStorage.setItem(
            environment.SESSIONSTORAGE_SEARCH,
            JSON.stringify(this.formulario.value)
          );
        },
        (error: any) => {
          if (error.status === 401) this.usuarioService.salir();
          else this.toast = { text: "Error al realizar la busqueda", type: 'error' }
        }
      )
    }
  }
  limpiarFormulario(): void {
    this.formulario.reset();
    this.formulario.controls['tipo'].setValue(0);
    this.formulario.controls['cobrado'].setValue(false);
    sessionStorage.removeItem(environment.SESSIONSTORAGE_SEARCH);
  }
  abrirEntrda = (index) => {
    var url;
    if (this.datos[index].tipo == 1) {//Abre un aviso
      url = this.router.serializeUrl(
        this.router.createUrlTree([`/avisos/dia/entrada`], { fragment: this.datos[index].id.toString() })
      );
    } else {//Abre un viaje
      url = this.router.serializeUrl(
        this.router.createUrlTree([`/libro/dia/entrada`], { fragment: this.datos[index].id.toString() })
      );
    }
    window.open(url, '_blank');

  }
  exportar = () => {
    // this.router.navigate(['exportar',{data:this.datos}]);
    const key = Math.random().toString(36).slice(2);
    sessionStorage.setItem(key,JSON.stringify(this.datos));
    var url = this.router.serializeUrl(
      this.router.createUrlTree([`exportar`,{key:key}])
    );
    var open = window.open(url,'_blank');
    
  }
}
