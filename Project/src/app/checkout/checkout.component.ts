import { Component, IterableDiffers } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, cart, order } from 'src/data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;


  constructor(
    private productService:ProductService,
    private router:Router
  ) {}

  ngOnInit(): void{
    this.productService.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price* +item.quantity);
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);
      console.warn('price Summary : ',this.totalPrice);
    })

  }
  orderNow(data: {email:string,address:string,contact:string,_id:string}) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)._id
    console.warn('cartadta : ',this.cartData);
    
    if (this.totalPrice ) {
      let orderData : order = {
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined,

       
      }
      this.cartData?.forEach((item) => {
          item._id  && this.productService.deleteCartItem(item._id);
      });
      this.productService.orderNow(orderData).subscribe((result) => {
        console.warn("order : ",result);
        if (result) {
          this.orderMsg = "Your Order is Placed"
          setTimeout(() => {
            this.router.navigate(['/my-order']);
            this.orderMsg = undefined
          },4000)
        }
      })
    }
  }


}
