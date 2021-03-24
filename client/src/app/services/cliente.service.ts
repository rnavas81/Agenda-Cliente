import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  
  get = (id:number=null) => {
    const url = environment.API_SERVER + '/cliente'+(id>0?`/${id}`:'');
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + sessionStorage.getItem(UsuarioService.SESSIONSTORAGE_TOKEN)
      }),
    };
    return this.http.get(url, extra);

  }
}
