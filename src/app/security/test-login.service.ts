import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TestLoginService {

  constructor(
    private usuarioService:UsuarioService,
    private router: Router
  ) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.usuarioService.isLogged().pipe(map((response: {
      authenticated: boolean}) => {
          this.router.navigate(['/main']);
          return true;
      }), catchError((error) => {
        return of(true);
      })
    )
  }  

}
