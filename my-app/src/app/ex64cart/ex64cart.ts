import { Component } from '@angular/core';
import { Ex64productapi } from '@app/ex64productapi';

@Component({
  selector: 'app-ex64cart',
  standalone: false,
  templateUrl: './ex64cart.html',
  styleUrl: './ex64cart.css',
})
export class Ex64cart {
  cart: any[] = [];
  message = '';

  constructor(private productApi: Ex64productapi) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.productApi.getCart().subscribe({
      next: (data) => {
        // Thêm field checked cho mỗi item
        this.cart = data.map((item) => ({ ...item, checked: false }));
      },
      error: (err) => console.error(err),
    });
  }

  totalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Cập nhật số lượng tất cả sản phẩm trong giỏ
  updateCart() {
    const updates = this.cart.map((item) =>
      this.productApi.updateCart(item._id, item.quantity).toPromise()
    );
    Promise.all(updates).then(() => {
      this.message = '✅ Đã cập nhật giỏ hàng!';
      setTimeout(() => (this.message = ''), 2000);
    });
  }

  // Xóa các sản phẩm đã check
  removeChecked() {
    const toRemove = this.cart.filter((item) => item.checked);
    if (toRemove.length === 0) {
      this.message = '⚠️ Chưa chọn sản phẩm nào để xóa!';
      setTimeout(() => (this.message = ''), 2000);
      return;
    }

    const removes = toRemove.map((item) =>
      this.productApi.removeFromCart(item._id).toPromise()
    );
    Promise.all(removes).then(() => {
      this.cart = this.cart.filter((item) => !item.checked);
      this.message = '🗑️ Đã xóa các sản phẩm đã chọn!';
      setTimeout(() => (this.message = ''), 2000);
    });
  }

  // Thanh toán - xóa giỏ hàng
  checkout() {
    if (confirm('Xác nhận thanh toán?')) {
      this.productApi.clearCart().subscribe({
        next: () => {
          this.cart = [];
          this.message = '🎉 Thanh toán thành công! Cảm ơn bạn đã mua hàng.';
        },
        error: (err) => console.error(err),
      });
    }
  }
}
