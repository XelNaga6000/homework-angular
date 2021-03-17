import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/cart/models/cart-item.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:3333/orders';

  constructor(private http: HttpClient) {}

  public getOrders(): Promise<Array<Order>> {
    return this.http
      .get(this.ordersUrl)
      .toPromise()
      .then(response => response as Order[])
      .catch(this.handleError);
  }

  public createOrder(order: Order): Promise<Order> {
    const url = this.ordersUrl;
    const body = JSON.stringify(order);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response as Order)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
