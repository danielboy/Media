import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from '../../providers/authservice';

@Component({
  selector: 'page-tipo-examen',
  templateUrl: 'tipo.html',
  providers: [AuthService]
})

  
export class tipo {

  parametros: any;
  service: any;
  nombre: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private serve: AuthService) {

      this.parametros = navParams.data.EXAMEN
      console.log(this.parametros)
      this.service = serve
      
  }

  ionViewDidLoad() {
    this.service.examen(this.parametros).then( data =>{
      this.nombre = data.NOMBRE
      console.log(data,'servicio tipo examen')
  })
  }

}
