import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-component',
  templateUrl: './seller-update-component.component.html',
  styleUrls: ['./seller-update-component.component.css']
})
export class SellerUpdateComponentComponent {

  productData : undefined | Product;
  productMessage : undefined | string;

  constructor(
    private route:ActivatedRoute,
    private productService:ProductService
    ){}

  ngOnInit(): void{
    let productId = this.route.snapshot.paramMap.get('id')
    console.warn(productId);
    productId && this.productService.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data;
    })
  }

  submit(data:any){
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = "Product has updated";
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    },3000)
    console.warn(data)
    
  }

}
