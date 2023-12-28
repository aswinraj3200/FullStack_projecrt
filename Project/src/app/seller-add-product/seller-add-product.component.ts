import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage : string | undefined;
  constructor(private productService: ProductService) {}

  submit(Data: Product): void {
    this.productService.addProduct(Data).subscribe(
      (result) => {
        console.warn(result);
        if (result) {
          this.addProductMessage = "product added sucessfully"
        }
      });
      setTimeout(() => {
        this.addProductMessage = undefined
      },3000)
  }
}
