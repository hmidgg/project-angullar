import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
@Component({
selector: 'app-product-list',
imports: [CurrencyPipe, RouterLink],
templateUrl: './product-list.html',
styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
private productService = inject(ProductService);
private router = inject(Router);
products = signal<Product[]>([]);
loading = signal(true);
error = signal('');
ngOnInit(): void {
this.loadProducts();
}
loadProducts(): void {
this.loading.set(true);
this.productService.getProducts().subscribe({
next: data => {
this.products.set(data);
this.loading.set(false);
},
error: () => {
this.error.set('Cannot reach the API. Is the backend running on port 3000?');
this.loading.set(false);
}
});
}
editProduct(id: number): void {
this.router.navigate(['/products/edit', id]);
}
deleteProduct(id: number): void {
if (confirm('Are you sure you want to delete this product?')) {
this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
}
}
}