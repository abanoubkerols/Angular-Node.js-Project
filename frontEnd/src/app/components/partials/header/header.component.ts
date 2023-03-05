import { User } from './../../../shared/models/user';
import { UserService } from './../../../services/user.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  user!: User
  constructor(cartService: CartService,private userService: UserService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount
    })

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser
    })
  }

  logOut() {
    this.userService.logOut()
  }
  ngOnInit(): void {
  }

  get isAuth(){
    return this.user.token
  }

}
