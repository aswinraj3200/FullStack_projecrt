import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from 'src/data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult : undefined | Product[];

  constructor(
    private activeRoute:ActivatedRoute,
    private productService:ProductService
  ) {}

  ngOnInit(): void{
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.productService.searchProduct(query).subscribe((result) => {
      this.searchResult = result;
    })
  }
}
