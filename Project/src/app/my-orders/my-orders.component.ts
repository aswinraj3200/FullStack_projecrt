import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from 'src/data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orderData: order[] | undefined;
 

  constructor(
    private productService:ProductService
  ) {}

  ngOnInit() {
    this.getOrderList();
  }
  
  cancelOrder(_id: string){
     this.productService.cancelOrder(_id).subscribe((result) => {
      if(result) {
        this.getOrderList();
      }
       
    })
  }
  getOrderList(){
    this.productService.orderList().subscribe((result) => {
      this.orderData = result;
    })
  }
}
