import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/order/models/order.model';
import { OrderService } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.scss']
})
export class AdminOrdersListComponent implements OnInit {
  public orders: Array<Order>;

  constructor(
    private orderService: OrderService
  ) { }

  trackByProductId(index: number, order: Order): string {
    return order.id;
  }

  ngOnInit(): void {
    this.orderService.getOrders()
      .then((orders) => { this.orders = orders })
      .catch(e => { console.log(e)});
  }

}
