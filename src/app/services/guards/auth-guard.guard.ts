import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  url = 'http://localhost:4200/api/';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | any { 
    const userId = sessionStorage.getItem('userId');
    const jwtToken = sessionStorage.getItem('jwt');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken,
      })
    };

    if (userId && jwtToken) {
      return this.http.get(`${this.url}user/${userId}`, reqHeader).pipe(
        map((res : any) => {
          if (res['data']['ID'] === Number(userId)) {
            return true;
          } else {
            this.router.navigateByUrl('login');
            return false;
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(false);
        })
      );
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
