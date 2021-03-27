import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private url: string = environment.API_SERVER + '/libro';

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

  // Elimina una entrada
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
}