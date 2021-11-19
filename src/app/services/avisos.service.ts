import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  private url: string = environment.API_SERVER + '/aviso';

  constructor(
    private http: HttpClient,
    public usuarioService: UsuarioService,
  ) { }

  get = (id: number = null) => {
    const url = this.url + (id != null ? `/${id}` : '');
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken()
      }),
    };
    return this.http.get(url, extra);

  }
  getSemana = fecha => {
    const url = this.url + `/semana/${fecha}`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      }),
    };
    return this.http.get(url, extra);
  }
  getByFecha = (fecha) => {
    const url = this.url + `/entradas/${fecha}`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      }),
    };
    return this.http.get(url, extra);
  }
  // Confirma una entrada de avisos
  confirmarEntrada = (id, coches) => {
    const url = this.url + `/confirmar/${id}`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      }),
    };
    return this.http.put(url, { coches: coches }, extra);
  }

  // Elimina una entrada de avisos
  eliminarEntrada = id => {
    const url = this.url + `/${id}`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      }),
    };
    return this.http.delete(url, extra);
  }

  // Agrega una nueva entrada
  agregarEntrada = data => {
    const url = this.url + ``;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      }),
    };
    return this.http.post(url, data, extra);

  }

  // Modifica una entrada existente
  modificarEntrada = (id, data) => {
    const url = this.url + `/${id}`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      }),
    };
    return this.http.put(url, data, extra);
  }
  getHistorico = (id) => {
    const url = this.url + `/historico/${id}`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      }),
    };
    return this.http.get(url, extra);
  }
}
