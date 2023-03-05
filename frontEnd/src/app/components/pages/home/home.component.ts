import { Observable } from 'rxjs';
import { FoodService } from './../../../services/food.service';
import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/models/food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = []
  constructor(private FoodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodObservable: Observable<Food[]>
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        foodObservable = FoodService.getAllFoodsBySearchTerm(params.searchTerm)
      } else if (params.tag) {
        foodObservable = this.FoodService.getAllFoodByTag(params.tag)
      }
      else {
        foodObservable = FoodService.getAll()
      }

      foodObservable.subscribe((ServerFoods) => {
        this.foods = ServerFoods
      })
    })

  }

  ngOnInit(): void {
  }

}
