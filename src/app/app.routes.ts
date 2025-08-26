import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component'; 
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFormComponent } from './components/product-form/product-form.component'; 

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'edit-product/:id', component: ProductFormComponent },
  { path: '**', redirectTo: '' }
];
