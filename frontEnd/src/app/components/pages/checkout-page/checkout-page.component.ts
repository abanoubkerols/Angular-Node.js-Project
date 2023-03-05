import { OrderService } from './../../../services/order.service';
import { UserService } from './../../../services/user.service';
import { CartService } from './../../../services/cart.service';
import { Order } from './../../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  order: Order = new Order()
  checkoutForm!: FormGroup

  constructor(CartService: CartService, private FormBuilder: FormBuilder, private UserService: UserService ,
    private OrderService : OrderService, private router:Router) {
    const cart = CartService.getCart()
    this.order.items = cart.items
    this.order.totalPrice = cart.totalPrice

  }

  ngOnInit(): void {

    let { name, address } = this.UserService.currentUser
    this.checkoutForm = this.FormBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],

    })
  }

  get fc() {
    return this.checkoutForm.controls
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      return
    }

    if(!this.order.addressLatLng){
      return 
    }
    this.order.name = this.fc.name.value
    this.order.address = this.fc.address.value

    this.OrderService.create(this.order).subscribe({
      next:()=>{
        this.router.navigateByUrl('/payment')
      }
    })

  }

}
