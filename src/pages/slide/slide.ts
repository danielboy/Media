import { Component,ViewChild } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';
import {test} from '../test/test';

@Component({
  selector: 'my-component',
  templateUrl: 'slide.html'
})
export class slide {
   @ViewChild(Slides) slides: Slides;

      nav: any

  constructor(private navcontroller: NavController) {

  this.nav = navcontroller;

}



  test(){
    this.nav.push(test)
  }

}
