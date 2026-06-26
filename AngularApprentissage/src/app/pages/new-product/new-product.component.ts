import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-new-product',
  standalone: false,
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      checked: [false]
    });
  }

  saveProduct(): void {
    this.productService.saveProduct(this.productForm.value).subscribe({
      next: () => {
        alert('Produit enregistré avec succès');
        this.productForm.reset({ name: '', price: 0, checked: false });
      },
      error: (err: any) => {
        console.error(err);
        alert('Erreur lors de l\'enregistrement');
      }
    });
  }
}
