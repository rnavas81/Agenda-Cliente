import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { language } from 'src/app/languages/es-es';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() selected: string = "";
  labels = language;
  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  salir(): void {
    this.usuarioService.salir();
  }

  dropdown(event): void {
    var item = document.getElementById("dropdownConfig");
    item.style.display = item.style.display == "none" ? "block" : "none";

  }

}
