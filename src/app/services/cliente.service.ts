import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  api = environment.API_SERVER + "/cliente";

  constructor(
    private http: HttpClient,
    public usuarioService: UsuarioService,
  ) { }

  get = (id: number = null) => {
    const url = this.api + (id > 0 ? `/${id}` : '');
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken()
      }),
    };
    return this.http.get(url, extra);

  }

  delete(id) {
    const url = `${this.api}/${id}`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      })
    }
    return this.http.delete(url, extra);
  }
  create(data) {
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      })
    }
    return this.http.post(this.api, data, extra);
  }
  update(id, data) {
    const url = `${this.api}/${id}`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      })
    }
    return this.http.put(url, data, extra);
  }
}
