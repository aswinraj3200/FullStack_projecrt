import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product, cart } from 'src/data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productData: undefined | Product;
  productQuantity: number = 1;
  cartData: Product | undefined;
  removeCart = false;


  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('id')
    console.warn(productId)
    productId && this.productService.getProduct(productId).subscribe((result) => {
      this.productData = result

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user)._id
        this.productService.getCartList(userId);
        
        this.productService.cartData.subscribe((result) => {
          let item = result.filter((item: Product) => productId?.toString() === item.productId?.toString());
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }
    })
  };
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1
    }
  };
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData)
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)._id;
        console.warn('ID : ', userId);
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
          id:undefined
        }
        delete cartData.id
        console.warn(cartData);
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
          alert('product added')
        })

      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId)
      this.removeCart = false;
    } else {
      console.warn("cart data",this.cartData);
      
      this.cartData && this.productService.removeToCart(this.cartData?._id).subscribe((result) => {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)._id;
        this.productService.getCartList(userId)
      })
    }
    this.removeCart = false
  }

}
