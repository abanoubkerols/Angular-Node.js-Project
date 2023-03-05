import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from './../../../shared/models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent implements OnInit {


  order!: Order
  constructor(ActivatedRoute: ActivatedRoute, OrderService: OrderService) {
    const params = ActivatedRoute.snapshot.params
    if(!params.orderId){
      return
    }

    OrderService.trackOrderById(params.orderId).subscribe(order=>{
      this.order = order
    })
  }

  ngOnInit(): void {
  }

}
