import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit = faEdit;

  constructor(
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.list()
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = " Product is Deleted ";
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000)
  };

  list() {
    this.productService.productList().subscribe((result) => {
      if (result) {
        this.productList = result
      }
    });
  }
}
