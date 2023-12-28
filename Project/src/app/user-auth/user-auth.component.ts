import { Component, EventEmitter } from '@angular/core';
import { Product, cart, logIn, signUp } from 'src/data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  showLogin : boolean = true
  authError : string = "";
  cartData = new EventEmitter<any>();

  constructor(
    private userService:UserService,
    private productService:ProductService
  ){}
  ngOnInit():void{
    this.userService.userAuthReload();
  }
  signUp(data:object): void {
    this.userService.userSignUp(data)
  }
  login(data: logIn){
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      console.warn('resutl',result); 
      if (result) {
        this.authError = "Enter vaild user details !"
      } else {
        this.localCartToRemoteCart()
      }
    })
  };
  openLogin(){
    this.showLogin = true
  }
  openSignup(){
    this.showLogin = false
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
  
    let userId = user && JSON.parse(user)._id;
    if (data) {
      let cartDataList : Product[] = JSON.parse(data);
      cartDataList.forEach((product: Product , index) => {
        let cartData : cart = {
          ...product,
           productId: product.id, quantity: product.quantity ,
          userId,
        }
        delete cartData.id;
        console.warn("cad", cartData);
        
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            console.warn('Data stored in DB ',result);
          }
        });
        if (cartDataList.length === index+1){
          localStorage.removeItem('localCart');
        }
      })
    }
    this.productService.getCartList(userId)
  }
}
