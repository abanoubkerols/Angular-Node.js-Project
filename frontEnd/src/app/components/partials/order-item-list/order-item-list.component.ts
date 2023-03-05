import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css']
})
export class OrderItemListComponent implements OnInit {


  @Input()order!:Order

  constructor() { }

  ngOnInit(): void {
  }

}
