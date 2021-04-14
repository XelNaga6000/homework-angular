import { BehaviorSubject } from 'rxjs';
import { Component, Directive, Injectable, Input, HostListener } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}
