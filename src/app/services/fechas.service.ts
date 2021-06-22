import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  constructor() { }

  alLunes(fecha:any) {
    fecha.subtract(fecha.day() - 1, "days");
  }
  formatoLocal(fecha:any){
    return moment(fecha).format("DD-MM-Y");
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
