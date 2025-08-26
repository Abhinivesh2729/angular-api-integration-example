import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get('http://localhost:3000/api/products').subscribe({
      next: (response: any) => {
        console.log(response);
        this.products = response.data || response;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  addProduct() {
    this.router.navigate(['/add-product']);
  }
}
