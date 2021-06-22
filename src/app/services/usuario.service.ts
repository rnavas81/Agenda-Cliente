import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  username: string;
  name: string;
  lastName: string;
  email: string;
  id: number;

  constructor(
    private http: HttpClient,
    public router: Router,
  ) {
    if (this.getUser()) this.setUser(this.getUser());
  }

  initial() {
    this.username = "";
    this.name = "";
    this.lastName = "";
    this.email = "";
    this.id = 0;
    sessionStorage.removeItem(environment.SESSIONSTORAGE_USER);
    sessionStorage.removeItem(environment.SESSIONSTORAGE_TOKEN);
  }

  set = (data: any) => {
    this.setUser(data);
    const user = {
      id: this.id,
      username: this.username,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
    };
    sessionStorage.setItem(
      environment.SESSIONSTORAGE_USER,
      JSON.stringify(user)
    );
  };
  setUser = data => {
    if (data.hasOwnProperty("username")) this.username = data.username;
    if (data.hasOwnProperty("name")) this.name = data.name;
    if (data.hasOwnProperty("lastName")) this.lastName = data.lastName;
    if (data.hasOwnProperty("email")) this.email = data.email;
    if (data.hasOwnProperty("id")) this.id = data.id;

  }
  getUser = () => {
    return sessionStorage.getItem(environment.SESSIONSTORAGE_USER)
      ? JSON.parse(sessionStorage.getItem(environment.SESSIONSTORAGE_USER))
      : null;
  }
  setToken = (token) => {
    sessionStorage.setItem(environment.SESSIONSTORAGE_TOKEN, token);
  };
  getToken() {
    return sessionStorage.getItem(environment.SESSIONSTORAGE_TOKEN);
  }

  login(username, password) {
    const url = `${environment.API_SERVER}/login`;
    const data = { username: username, password: password }
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      })
    }
    return this.http.post(url, data, extra);
  };
  logout() {
    const url = `${environment.API_SERVER}/logout`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.getToken()
      })
    }
    return this.http.post(url, {}, extra);
  }
  isLogged() {
    const url = `${environment.API_SERVER}/test`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'text/html',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.getToken()
      })
    }
    return this.http.post(url, {}, extra);
  }
  salir() {
    this.logout().subscribe(
      (response) => {
        this.initial();
        this.router.navigate(['/login']);
      }, error => {
        this.initial();
        this.router.navigate(['/login']);
      }
    );
  }
  save(data){
    const url = `${environment.API_SERVER}/user`;
    const extra = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }
    return this.http.put(url, data, extra);

  }
}
