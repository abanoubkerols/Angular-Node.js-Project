import { LoadingService } from './../../../services/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  isLoading!: boolean
  constructor(LoadingService: LoadingService) {
    LoadingService.IsLoading.subscribe((isLoading) => {
      this.isLoading = isLoading
    })
    // LoadingService.showLoading()
  }

  ngOnInit(): void {
  }

}
