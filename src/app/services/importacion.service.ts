import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ImportacionService {

  private url: string = environment.API_SERVER + '/importar';

  constructor(
    private http: HttpClient,
    public usuarioService: UsuarioService,
  ) { }

  send = (data, file) => {

    const formData = new FormData();
    formData.append("thumbnail", file);
    const extra = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.usuarioService.getToken(),
      }),
      params: {
        tipo:data.tipo,
        donde:data.donde,
      },
    };
    const upload$ = this.http.post(this.url, formData,extra);
    return upload$;
  }
}
