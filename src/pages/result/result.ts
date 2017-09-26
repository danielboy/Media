import {Component} from "@angular/core";
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {AuthService} from '../../providers/authservice';
import {LoginPage} from '../login/login';
import { Popup } from '../../providers/popup'


@Component({
    templateUrl: 'result.html',
    providers: [ AuthService],
})
export class Result {
  private service: any;
  result: any;
  porcentage: any;
  CS: number;
  CSH: number;
  CEA: number;
  CBAP: number;
  CBI: number;
  matricula: any;
  fecha: any;
  estado: any;
  public resul;
  constructor(private popup: Popup, private nav: NavController, public navParams: NavParams, private authservice: AuthService, private alertCtrl: AlertController) {

    this.service = authservice
    this.nav = nav;
    this.result = navParams.data;
    this.estado = navParams.data.estado;
    this.fecha = new Date().toLocaleString()
    this.CS = (100 / this.result.p_CS) * this.result.CS;
    this.CSH = (100 / this.result.p_CSH) * this.result.CSH;
    this.CEA = (100 / this.result.p_CEA) * this.result.CEA;
    this.CBAP = (100 / this.result.p_CBAP) * this.result.CBAP;
    this.CBI = (100 / this.result.p_CBI) * this.result.CBI;


                        this.resul = [

                    {
                        nombre: 'C. DE LA SALUD',
                        puntos: this.CS,
                    },
                                        {
                        nombre: 'C. SOCIALES Y HUMANIDADES',
                        puntos: this.CSH,
                    },
                                        {
                        nombre: 'C. ECONÓMICAS ADMINISTRATIVAS',
                        puntos: this.CEA,
                    },
                                        {
                        nombre: 'C. BIOLÓGICO-AGROPECUARIAS Y PESQUERAS',
                        puntos: this.CBAP,
                    },
                                        {
                        nombre: 'C. BÁSICAS E INGENIERÍAS',
                        puntos: this.CBI,
                    }
                ]

  }

   ionViewDidLoad() {
       this.service.usedatos().then(data => {
                this.matricula = data.matricula
           });
  

  

   }
  
   logout(){       

               if(this.estado == 2 || this.estado==3){

                this.service.logout();
                this.nav.push(LoginPage);

                }else{ 
                    this.service.gua_resultados({matricula:this.matricula, intentos:this.result.intentos, area:'CS', puntos:this.CS, fecha:this.fecha})
                    .catch((error) => {this.popup.popup('Error al conectarse al servidor')})
                    this.service.gua_resultados({matricula:this.matricula, intentos:this.result.intentos, area:'CSH', puntos:this.CSH, fecha:this.fecha})
                    .catch((error) => {})
                    this.service.gua_resultados({matricula:this.matricula, intentos:this.result.intentos, area:'CEA', puntos:this.CEA, fecha:this.fecha})
                    .catch((error) => {})
                    this.service.gua_resultados({matricula:this.matricula, intentos:this.result.intentos, area:'CBAP', puntos:this.CBAP, fecha:this.fecha})
                    .catch((error) => {})
                    this.service.gua_resultados({matricula:this.matricula, intentos:this.result.intentos, area:'CBI', puntos:this.CBI, fecha:this.fecha})
                    .then((data) => {this.service.logout(),this.nav.push(LoginPage)}).catch((error) => {})
                  }

 }

}
