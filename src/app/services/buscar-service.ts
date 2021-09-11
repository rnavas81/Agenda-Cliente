import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  private url: string = environment.API_SERVER + '/buscar';

  constructor(
    private http: HttpClient,
    public usuarioService: UsuarioService,
  ) { }

  get(filtros) {
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      }),
    };
    return this.http.post(this.url, filtros, extra);
  }

}
