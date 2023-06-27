import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements  CanActivate {


    constructor(private service : AuthService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> |  boolean {
        return this.service.validateToken().pipe(
            tap(result => {
                if(!result) this.router.navigate(['login']);
            }),
            map(isAutenticated => isAutenticated)
        );
    }
}