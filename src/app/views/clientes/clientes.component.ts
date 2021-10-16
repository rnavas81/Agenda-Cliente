import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { language } from 'src/app/languages/es-es';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  toast: any;
  entity: string = "cliente";
  entities: string = "clientes";
  isLoading: Boolean = false;
  datos: any;
  seleccionado: number = null;
  labels = language;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    public service: ClienteService,
  ) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.service.get().subscribe(
      (response: any) => {
        this.datos = response;
      },
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { type: 'error', text: this.labels.error_get(this.entities) }

      }
    )
  }

  seleccionar = (selected = null) => this.seleccionado = selected;


  eliminar(): void {
    this.service.delete(this.seleccionado).subscribe(
      (success: any) => {
        const index = this.datos.findIndex(x => x.id == this.seleccionado);
        if (index > -1) this.datos.splice(index, 1);
        document.getElementById("borrar-modal-close").click();
      },
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { type: 'error', text: this.labels.error_action('eliminar', this.entity) }
      }
    );

  }
}
