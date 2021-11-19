import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FechasService {
  diasNombre:any= ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado']

  constructor() { }

  alLunes(fecha:any) {
    fecha.subtract(fecha.day() - 1, "days");
  }
  formatoLocal(fecha:any){
    if(fecha!==null)return moment(fecha).format("DD-MM-Y");
    else return "";
  }
  formatoCompleto(fecha:any){
    if(fecha!==null)return moment(fecha).format("HH:mm DD-MM-Y");
    else return "";
  }
  diaLocal(fecha:any){
    if(fecha!==null)return this.diasNombre[moment(fecha).day()];
    else return "";
  }
  anteriorDia(fecha:any){
    var f = moment(fecha.toString());
    f.subtract(1, "d");
    return f;
  }
  posteriorDia(fecha:any){
    var f = moment(fecha.toString());
    f.add(1, "d");
    return f;
  }
}
