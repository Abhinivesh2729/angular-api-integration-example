import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  productId: number = 0;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct() {
    this.http.get(`http://localhost:3000/api/products/${this.productId}`).subscribe({
      next: (response: any) => {
        console.log(response);
        this.product = response.data || response;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        alert('Product not found!');
        this.router.navigate(['/']);
      }
    });
  }

  editProduct() {
    this.router.navigate(['/edit-product', this.productId]);
  }

  deleteProduct() {
    const confirmed = confirm(`Are you sure you want to delete "${this.product.title}"?`);
    
    if (confirmed) {
      this.http.delete(`http://localhost:3000/api/products/${this.productId}`).subscribe({
        next: (response: any) => {
          console.log('Product deleted:', response);
          alert('Product deleted successfully!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Error deleting product. Please try again.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
