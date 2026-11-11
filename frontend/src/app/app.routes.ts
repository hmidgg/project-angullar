import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductAdd } from './components/product-add/product-add';
import { ProductEdit } from './components/product-edit/product-edit';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductList },
  { path: 'products/add', component: ProductAdd },
  { path: 'products/edit/:id', component: ProductEdit },
  { path: '**', redirectTo: '/products' },
];