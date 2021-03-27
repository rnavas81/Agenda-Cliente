import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  constructor(
    private http: HttpClient,
    public usuarioService: UsuarioService,
  ) { }

  get = (id: number = null) => {
    const url = environment.API_SERVER + '/coche' + (id > 0 ? `/${id}` : '');
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.usuarioService.getToken()
      }),
    };
    return this.http.get(url, extra);

  }
}
