import {Component} from '@angular/core';
import {NavController, AlertController,Platform} from 'ionic-angular';
import {AuthService} from '../../providers/authservice';
import {Popup} from '../../providers/popup'
import {tipo} from '../tipo/tipo';

@Component({
  templateUrl: 'login.html',
    providers: [AuthService]
})
export class LoginPage {

    private usercreds: any;
    private service: any;
    private nav: any;
    matricula: any;



    constructor(private popup: Popup, private platform: Platform,private authservice: AuthService, private navcontroller: NavController, private alertCtrl: AlertController) {

        this.usercreds = { matricula: '', curp: ''}
        this.service = authservice;
        this.nav = navcontroller;
    }
    
    login(user) {
        this.service.authenticate(user)
            .then((data) => {   
                    if(data.success == false) {
                        this.popup.popup('Datos Invalidos')
                    }
                    if(data.success == true && data.estado == 0) {
                        this.popup.popup('Cuenta Inactiva')
                    }
                  if(data.success == true && data.estado != 0) {
                      console.log(data.EXAMEN)
                        this.nav.setRoot(tipo,{EXAMEN: data.EXAMEN});
                            return true;
                    }
                })
             .catch((error) => {
                this.popup.popup('Error al conectarse al servidor')
                });


        }

}

