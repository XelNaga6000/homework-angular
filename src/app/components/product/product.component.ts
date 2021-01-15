import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  @Input() name: string;
  @Input() isAvailable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onBuy(): void {
    this.isAvailable = !this.isAvailable;
  }

}
