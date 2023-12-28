import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import {  logIn, signUp } from 'src/data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }
  userSignUp(data: any){
    let result = this.http.post(`http://localhost:3000/api/auth/signup`,data,{observe:'response'})
    .subscribe((result) => {
      localStorage.setItem('user',JSON.stringify(result.body))
      this.router.navigate(['/']);
    })
    
  }

  userAuthReload(){
    if (localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  };

  userLogin(data: logIn){
    this.http.post<signUp[]>('http://localhost:3000/api/auth/signin',data,{ observe : 'response'})
    .subscribe(
      (result: any) => {
        if (result.body && 'accessToken' in result.body) {
          console.warn("logged in user");
          localStorage.setItem('user',JSON.stringify(result.body));
          this.router.navigate(['/']); 
          this.invalidUserAuth.emit(false) 
        } else {
          console.warn("Error");
          this.invalidUserAuth.emit(true)
        }
      },(error) =>{
        console.warn('Error',error);
        this.invalidUserAuth.emit(false)
      }
    )
  }
  
}
