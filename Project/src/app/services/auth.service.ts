import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | null = null;

  constructor() {
  }
  

  getAccessToken(){
    const storedSeller = localStorage.getItem('seller');
    if (storedSeller) {
      const seller = JSON.parse(storedSeller);
      if (seller && seller.accessToken){
        return seller.accessToken
      }
    }
    return this.getAccessToken;
  }
  getUserAccessToken(){
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.accessToken){
        return user.accessToken
      }
    }
  }
}
