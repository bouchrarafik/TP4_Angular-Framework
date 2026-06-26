import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    public appState: AppStateService
  ) {}

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts(): void {
    this.productService.searchProducts(
      this.appState.productsState.keyword,
      this.appState.productsState.currentpage,
      this.appState.productsState.pageSize
    ).subscribe({
      next: (resp: any) => {
        const products = resp.body as Product[];
        const totalProducts = parseInt(resp.headers.get('X-Total-Count') || '0');
        const totalPages = Math.ceil(totalProducts / this.appState.productsState.pageSize);
        this.appState.setProductState({ products, totalProducts, totalPages, status: 'LOADED' });
      },
      error: (err: any) => {
        this.appState.setProductState({ status: 'ERROR', errorMessage: err.message || 'Server error' });
      }
    });
  }

  handleCheckProduct(product: Product): void {
    this.productService.checkProduct(product).subscribe({
      next: () => { product.checked = !product.checked; }
    });
  }

  handleDeleteProduct(product: Product): void {
    if (confirm('Êtes-vous sûr ?')) {
      this.productService.deleteProduct(product).subscribe({
        next: () => this.searchProducts()
      });
    }
  }

  handleGotoPage(page: number): void {
    this.appState.productsState.currentpage = page;
    this.searchProducts();
  }

  handleEditProduct(product: Product): void {
    this.router.navigateByUrl(`/editproducts/${product.id}`);
  }
}
