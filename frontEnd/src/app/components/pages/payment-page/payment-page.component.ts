import { Router } from '@angular/router';

import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  order:Order = new Order()
  constructor(orderServices: OrderService, router: Router) {
    orderServices.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order
      }, error: () => {
        router.navigateByUrl('/checkout')
      }
    })
  }

  ngOnInit(): void {
  }

}
