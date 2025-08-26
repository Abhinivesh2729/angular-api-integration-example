import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  product = {
    title: '',
    price: 0,
    images: ['']
  };
  
  isEditMode = false;
  productId: number = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = Number(id);
      this.loadProduct();
    }
  }

  loadProduct() {
    this.http.get(`http://localhost:3000/api/products/${this.productId}`).subscribe({
      next: (response: any) => {
        const productData = response.data || response;
        this.product = {
          title: productData.title,
          price: productData.price,
          images: productData.images.length > 0 ? productData.images : ['']
        };
      },
      error: (error) => {
        console.error('Error loading product:', error);
        alert('Product not found!');
        this.router.navigate(['/']);
      }
    });
  }

  addImageField() {
    this.product.images.push('');
  }

  removeImageField(index: number) {
    if (this.product.images.length > 1) {
      this.product.images.splice(index, 1);
    }
  }

  onSubmit() {
    // Basic validation
    if (!this.product.title.trim()) {
      alert('Please enter a product title');
      return;
    }
    
    if (this.product.price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    // Filter out empty image URLs
    const filteredImages = this.product.images.filter(img => img.trim() !== '');
    if (filteredImages.length === 0) {
      alert('Please enter at least one image URL');
      return;
    }

    const productData = {
      title: this.product.title.trim(),
      price: Number(this.product.price),
      images: filteredImages
    };

    if (this.isEditMode) {
      this.updateProduct(productData);
    } else {
      this.createProduct(productData);
    }
  }

  createProduct(productData: any) {
    this.http.post('http://localhost:3000/api/products', productData).subscribe({
      next: (response: any) => {
        console.log('Product created:', response);
        alert('Product created successfully!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error creating product:', error);
        alert('Error creating product. Please try again.');
      }
    });
  }

  updateProduct(productData: any) {
    this.http.put(`http://localhost:3000/api/products/${this.productId}`, productData).subscribe({
      next: (response: any) => {
        console.log('Product updated:', response);
        alert('Product updated successfully!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error updating product:', error);
        alert('Error updating product. Please try again.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
