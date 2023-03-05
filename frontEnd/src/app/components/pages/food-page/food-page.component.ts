import { CartService } from './../../../services/cart.service';
import { FoodService } from './../../../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from './../../../shared/models/food';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!:Food
  constructor(activatedRoute: ActivatedRoute, FoodService: FoodService, private cartService: CartService,private router : Router) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
         FoodService.getFoodById(params.id).subscribe((serverFood)=>{
          this.food = serverFood
         })
      }
    })
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addCart(this.food)
    this.router.navigateByUrl('/cart-page')
  }


}
