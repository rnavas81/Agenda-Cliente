import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { language } from 'src/app/languages/es-es';
import { FechasService } from 'src/app/services/fechas.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  datos:any=[];
  labels=language;
  constructor(
    private route: ActivatedRoute,
    public fechasService:FechasService,
  ) { }

  ngOnInit(): void {
    const key=this.route.snapshot.paramMap.get('key');
    if(sessionStorage.getItem(key)){
      this.datos = JSON.parse(sessionStorage.getItem(key));
    }
    console.log(this.datos);
    
  }

}
