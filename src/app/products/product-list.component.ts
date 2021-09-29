import { Component, OnInit } from "@angular/core";


import { Iproduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl : './product-list.component.html',
    styleUrls : ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

     pageTitle : string = 'Product List';
     imageWidth : number = 50;
     imageMargin : number = 2;
     showImage : boolean = false;
     errorMessage : string;

    _listfilter: string;
    get listfilter(): string {
      return this._listfilter;
     }
    set listfilter(value: string) {
      this._listfilter = value;
      this.filteredProducts = this.listfilter ? this.performfilter(this.listfilter) : this.products;
     }
     
     filteredProducts: Iproduct[];
     products : Iproduct[] = [];

      constructor(private productService: ProductService) {
        // this._listfilter = 'cart';
      }

      performfilter(filterby: string): Iproduct[] {
        filterby = filterby.toLocaleLowerCase();
        return this.products.filter((product : Iproduct) => product.productName.toLocaleLowerCase().indexOf(filterby) !== -1);
      }
    
      toggleImage(): void {
        this.showImage = !this.showImage;
      }
    
      ngOnInit(): void {
        this.productService.getProducts().subscribe(
          products => {
            this.products = products
            this.filteredProducts = this.products},
          error => this.errorMessage = <any>error
        );
      }

      onRatingClicked(message: string): void {
        this.pageTitle = 'Product List ' + message;
      }
}