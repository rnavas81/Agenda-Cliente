import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  get = () => {
    const url = environment.API_SERVER + '/agenda';
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + sessionStorage.getItem(UsuarioService.SESSIONSTORAGE_TOKEN)
      }),
    };
    return this.http.get(url, extra);

  }
  getByFecha = (fecha) => {
    const url = environment.API_SERVER + `/agenda/entradas/${fecha}`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + sessionStorage.getItem(UsuarioService.SESSIONSTORAGE_TOKEN),
      }),
    };
    return this.http.get(url, extra);
  }
}
