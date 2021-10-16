import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  toast: any;
  isLoading: Boolean = false;
  datos: any;
  seleccionado: number = null;
  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
  ) {

  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios = () => {
    this.usuarioService.getUsers().subscribe(
      (success: any) => {
        this.datos = success;
      },
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { type: 'error', text: 'Error al recuperar los usuarios' }
      }
    )
  }

  agregarUsuario = () => {
    this.router.navigate([`/usuario`]);

  }
  editarUsuario = (idUsuario) => {
    this.router.navigate([`/usuario`], { fragment: idUsuario.toString() });

  }

  eliminarUsuario = () => {
    this.usuarioService.delete(this.seleccionado).subscribe(
      (success: any) => {
        const index = this.datos.findIndex(x => x.id == this.seleccionado);
        if (index > -1) this.datos.splice(index, 1);
        document.getElementById("borrar-modal-close").click();
      },
      (error: any) => {
        if (error.status === 401) this.usuarioService.salir();
        else this.toast = { type: 'error', text: 'Ha ocurrido un error al eliminar al usuario' }
      }
    );
  }

  seleccionar = (idUsuario = null) => {
    this.seleccionado = idUsuario;
  }

}
