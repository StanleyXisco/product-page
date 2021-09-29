import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Iproduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  errorMessage: string = '';
  product: Iproduct | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService : ProductService) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += ` : ${id}`;
    this.getProduct(id);
    // this.product = {
    //   "productId": 7,
    //   "productName": "AOT Controller",
    //   "productCode": "GMG-0058",
    //   "releaseDate": "June 7, 2020",
    //   "description": "AOT Compiler",
    //   "price": 120.95,
    //   "starRating": 4.6,
    //   "imageUrl": "assets/images/xbox-controller.png"
    // }
  }

  getProduct(id:number) : void {
    this.productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error
    )
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
