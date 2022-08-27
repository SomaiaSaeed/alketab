import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  imges: any[] = ["assets/3.png","assets/4.png"];
  selectedImage: string = this.imges[0];
  selectedClass: string = 'item active';
  i = 0;
  constructor() { }

  ngOnInit() {
  }
  OnRightClick() {
    this.i++;

    if(this.i <= this.imges.length-1){
      this.selectedImage = this.imges[this.i];
    }else {
      this.selectedImage = this.imges[0];
      this.i = 0;
    }


  }

  OnLeftClick() {
    this.i--;
    if(this.i > 0){
      this.selectedImage = this.imges[this.i-1];
    }else {
      this.selectedImage = this.imges[this.imges.length-1];
      this.i = this.imges.length;
    }
  }
}
