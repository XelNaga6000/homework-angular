import { Component, Input, OnInit } from '@angular/core';

export enum Categoty {
  Beer = 1,
  Wine,
  Whisky
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  @Input() name: string;
  @Input() description: string;
  @Input() price: number;
  @Input() category: Categoty;
  @Input() isAvailable: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
