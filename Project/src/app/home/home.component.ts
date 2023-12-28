import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, cart } from 'src/data-type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  productData: undefined | Product;
  productQuantity: number = 1;
  cartData: Product | undefined;
  popularProduct:undefined | Product[];
  trendyProducts:undefined | Product[];
    
  constructor(
    private productService:ProductService,
    private activateRoute:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.productService.popularProduct().subscribe((data) => {  
      this.popularProduct=data;
    })

    this.productService.trendyProduct().subscribe((data) => {
      this.trendyProducts = data;
    })
  }

}
