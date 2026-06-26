import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private host = 'http://localhost:8086';

  constructor(private http: HttpClient) {}

  searchProducts(keyword = '', page = 1, size = 4) {
    return this.http.get(
      `${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,
      { observe: 'response' }
    );
  }

  checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${this.host}/products/${product.id}`,
      { checked: !product.checked }
    );
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete<any>(`${this.host}/products/${product.id}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`, product);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${productId}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);
  }
}
