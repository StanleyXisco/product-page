import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/Operators';

import { Iproduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient){}

    getProducts() : Observable<Iproduct[]> {
        return this.http.get<Iproduct[]>(this.productUrl).pipe(
          tap(data => console.log('All' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    getProduct(id:number): Observable<Iproduct | undefined> {
      return this.getProducts()
      .pipe(
        map((products:Iproduct[]) => products.find(p => p.productId === id))
      )
    }

    private handleError(err: HttpErrorResponse) {
      let errMessage = '';

      if(err.error instanceof ErrorEvent) {
        errMessage = `An error occured: ${err.error.message}`
      } else {
        errMessage = `Server returned code: ${err.status}, error Message is ${err.message}`;
      }
      console.log(errMessage);
      return throwError(errMessage);
    }

}