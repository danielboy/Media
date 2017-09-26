import { Injectable } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import { Http } from '@angular/http';
import {test} from '../pages/test/test';
import 'rxjs/add/operator/map';

@Injectable()
export class Popup {
mensaje: any;
nav: any;
  constructor(public http: Http, private alertCtrl: AlertController) {



  }

popup(mensaje){
                let alert = this.alertCtrl.create({
                title: mensaje,
                buttons: ['OK']
                });
                alert.present();
                return false;
}
popupbutton(mensaje){
  let alert = this.alertCtrl.create({
  title: mensaje,
  buttons: [
    {
      text: 'Salir',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Continuar',
      handler: () => { 
        console.log('Buy clicked');
      }
    }
  ]
  
  });
  alert.present();
  return false;
}


}
