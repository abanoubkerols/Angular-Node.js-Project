import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css']
})
export class DefaultButtonComponent implements OnInit {


@Input()type:'submit' | 'button' = 'submit'
@Input()text:string = 'submit'
@Input()bgColor = '#E72929'
@Input()color = 'white'
@Input()fontSize = 1.3 
@Input()width = 12 

@Output()onClick = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

}
