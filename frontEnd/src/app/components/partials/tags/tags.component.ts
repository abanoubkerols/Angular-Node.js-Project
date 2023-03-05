import { FoodService } from './../../../services/food.service';
import { Tag } from './../../../shared/models/tags';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
tags?:Tag[]
  constructor(FoodService:FoodService) 
  {
     FoodService.gatAllTags().subscribe(serverTags=>{
      this.tags = serverTags
     })
   }

  ngOnInit(): void {
  }

}
