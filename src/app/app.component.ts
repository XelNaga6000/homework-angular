import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'BoozeMart';
  @ViewChild('appTitle') titleElement: ElementRef<HTMLHeadingElement>;

  ngAfterViewInit(): void {
    this.titleElement.nativeElement.innerText = this.title;
  }
}
