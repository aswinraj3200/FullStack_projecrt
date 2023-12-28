import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { logIn, signUp } from 'src/data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  userSignUp(data: signUp) {
    console.warn('service called');
    let result = this.http.post(`http://localhost:3000/api/auth/register`,data,{ observe: 'response' })
    .subscribe((result) => {
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['/seller-home'])
      console.warn('result', result)
    });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home'])
    }
  }
  userLogin(data: logIn) {
    this.http.post('http://localhost:3000/api/auth/login', data, { observe: 'response' })
      .subscribe(
        (result: any) => {
          console.warn(result);
  
          if (result.body && 'accessToken' in result.body) {
            console.warn("Logged in");
            localStorage.setItem('seller', JSON.stringify(result.body));
            this.router.navigate(['/seller-home']);
          } else {
            console.warn("Error");
            this.isLoginError.emit(true);
          }
        },
        (error) => {
          console.error('Error:', error);
          this.isLoginError.emit(true);
        }
      );
  }
  

}
