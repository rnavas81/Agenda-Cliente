import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private static readonly SESSIONSTORAGE_USER: string =
    "b49a78ee7c36d704b76b23297ded54e9";
  private static readonly SESSIONSTORAGE_TOKEN: string =
    "4a945fb7d809dd183d67f0a33570c713";
  username: string;
  name: string;
  lastname: string;
  email: string;
  id: number;

  constructor(private http: HttpClient) {
    this.username = "";
    this.name = "";
    this.lastname = "";
    this.email = "";
    this.id = 0;
  }

  set = (data: any) => {
    if (data.hasOwnProperty("username")) this.username = data.username;
    if (data.hasOwnProperty("name")) this.name = data.name;
    if (data.hasOwnProperty("lastname")) this.lastname = data.lastname;
    if (data.hasOwnProperty("email")) this.email = data.email;
    if (data.hasOwnProperty("id")) this.id = data.id;
    const user = {
      id: this.id,
      username: this.username,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
    };
    sessionStorage.setItem(
      UsuarioService.SESSIONSTORAGE_USER,
      JSON.stringify(user)
    );
  };
  setToken = (token) => {
    sessionStorage.setItem(UsuarioService.SESSIONSTORAGE_TOKEN, token);
  };

  login = (username, password) => {
    const url = `${environment.API_SERVER}/login`;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(
      url,
      { username: username, password: password },
      { headers: headers }
    );
  };
}
