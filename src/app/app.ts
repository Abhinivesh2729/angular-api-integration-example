import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit{
  protected readonly title = signal('products');
  products: any[] = []

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.http.get('https://api.escuelajs.co/api/v1/products').subscribe({
      next: (data: any) => {
        this.products = data
        console.log(data)
      }
    })
  }

}
