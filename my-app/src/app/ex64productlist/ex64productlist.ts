import { Component } from '@angular/core';
import { Ex64productapi } from '@app/ex64productapi';

@Component({
  selector: 'app-ex64productlist',
  standalone: false,
  templateUrl: './ex64productlist.html',
  styleUrl: './ex64productlist.css',
})
export class Ex64productlist {
  products: any[] = [];
  cartCount = 0;
  message = '';

  constructor(private productApi: Ex64productapi) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartCount();
  }

  loadProducts() {
    this.productApi.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error(err),
    });
  }

  loadCartCount() {
    this.productApi.getCart().subscribe({
      next: (cart) => {
        this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      },
      error: () => (this.cartCount = 0),
    });
  }

  addToCart(product: any) {
    const item = {
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      description: product.description,
    };

    this.productApi.addToCart(item).subscribe({
      next: (res) => {
        this.cartCount = res.cart.reduce(
          (sum: number, i: any) => sum + i.quantity,
          0
        );
        this.message = `✅ Đã thêm "${product.name}" vào giỏ hàng!`;
        setTimeout(() => (this.message = ''), 2000);
      },
      error: (err) => console.error(err),
    });
  }
}
