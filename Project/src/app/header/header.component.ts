import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from 'src/data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuType: string = 'default';
  sellerName: string = '';
  searchResults: undefined | Product[];
  userName: string = '';
  cartItems = 0;

  constructor(
    private route: Router,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore=localStorage.getItem('seller')
         let sellerData =sellerStore && JSON.parse(sellerStore);
         if (sellerData && sellerData.username) {
          console.warn('name',sellerData.username);
          this.sellerName = sellerData.username;
          this.menuType = 'seller';}
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.username;
          this.menuType='user';
          this.productService.getCartList(userData._id);
        }
         else {
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if(cartData) {
      this.cartItems = JSON.parse(cartData).length
    }
    this.productService.cartData.subscribe((items) => {
      this.cartItems = items.length
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  };
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.productService.cartData.emit([])
  };
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5 ) {
          result.length = length
        }
        this.searchResults = result;
      });
    }
  };
  hideSearch(){
    this.searchResults = undefined
  }

  redirectToDetails(id:number){
    this.route.navigate([`/details/`+id])
  }

  submitSearch(val:string){
      console.warn(val);
      this.route.navigate([`search/${val}`]) 
  }

}
