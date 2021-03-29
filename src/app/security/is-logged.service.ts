import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedService {

  constructor(
    private usuarioService:UsuarioService,
    private router: Router
  ) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.usuarioService.isLogged().pipe(map((response: {
      authenticated: boolean}) => {
        if (response) {
          this.router.navigate(['/main']);
          return false;
        }
        return true;
      }), catchError((error) => {
        this.router.navigate(['/login']);
        return of(false);
      })
    )
  }  

}
