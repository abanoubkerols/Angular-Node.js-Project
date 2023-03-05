import { FOODS_BY_SEARCH_URL, FOODS_TAGS_URL, FOODS_BY_TAG_URL, FOODS_BY_ID_URL } from './../shared/constants/urls';
import { Observable } from 'rxjs';

import { Tag } from './../shared/models/tags';
import { Injectable } from '@angular/core';

import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/food';
import { HttpClient } from '@angular/common/http';
import { FOODS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http :HttpClient) { }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL)
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  gatAllTags():Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL)
  }

  getAllFoodByTag(tag: string): Observable<Food[]> {

    return tag == "All" ? this.getAll() :
      this.http.get<Food[]>(FOODS_BY_TAG_URL + tag)
  }

  getFoodById(foodId: String): Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId)
  }
}
