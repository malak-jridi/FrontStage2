import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Auth from 'src/app/utils/auth';
import { IUser } from "../../shared/models/user.model";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router:Router){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      if(Auth.get){
        return Auth.get()?.role == 'teacher' ? this.router.createUrlTree(['']) : true;
      }else{
        return true;
      }
      
   
  }
  
}
