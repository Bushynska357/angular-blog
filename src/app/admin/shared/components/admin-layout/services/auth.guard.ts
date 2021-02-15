import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private router:Router,
        public auth:AuthService
        ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        if (this.auth.isAuthenticated()){
            return true
        }else{
            this.auth.logout()
            this.router.navigate(['/admin', 'login'])
            throw new Error("Method not implemented.");
        }
    }

   

}