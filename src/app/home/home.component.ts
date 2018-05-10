import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  c:any;
  ratio: number = 3/4;
  screenWidth: number = 800; //Testing: change number accordingly
  baseX = 5;
  len = 80;
  wid = 52;
  baseY = this.baseX;
  availableWidth = this.screenWidth - 2*this.baseX;
  distX = (this.availableWidth-2*this.baseX)/this.wid;
  dimX = this.distX*this.ratio;
  distY = this.distX;
  dimY = this.dimX;
  screenHeight: number =this.distY * this.len + this.baseY;

  constructor() { }

  ngAfterViewInit() {

    this.c = document.getElementById("myCanvas");
    console.log(this.c)
    let  ctx = this.c.getContext("2d");

    for(  let j = 0; j<this.len; j++){
      let cursorY = this.baseY + j*this.distY;

      for(let i = 0; i<this.wid; i++) {
        let cursorX = this.baseX + i*this.distX;
        ctx.rect(cursorX, cursorY, this.dimX, this.dimY);
      }
    }
    ctx.stroke();
  }

}
