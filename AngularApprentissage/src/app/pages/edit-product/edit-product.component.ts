import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productId!: number;
  productFormGroup!: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productId = this.activeRoute.snapshot.params['id'];

    this.productService.getProductById(this.productId).subscribe({
      next: (product: Product) => {
        this.productFormGroup = this.fb.group({
          id: [product.id],
          name: [product.name, Validators.required],
          price: [product.price, [Validators.required, Validators.min(0)]],
          checked: [product.checked]
        });
      },
      error: (err: any) => {
        console.error(err);
        alert('Erreur lors du chargement du produit');
      }
    });
  }

  updateProduct(): void {
    const product: Product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: () => {
        alert('Produit modifié avec succès');
      },
      error: (err: any) => {
        console.error(err);
        alert('Erreur lors de la modification du produit');
      }
    });
  }
}
