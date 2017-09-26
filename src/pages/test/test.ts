import {Component} from "@angular/core";
import {NavController, AlertController,NavParams, Platform} from 'ionic-angular';
import {AuthService} from '../../providers/authservice';
import {Popup} from '../../providers/popup'
import {Result} from '../result/result';



@Component({
    templateUrl: 'test.html',
    providers: [AuthService]

})
export class test {
    data: any;
    preguntas: any;
    Preguntas: any;
    id : any;
    indice: number = 0;
    CS: number = 0;
    CSH: number = 0;
    CEA: number = 0;
    CBAP: number = 0;
    CBI: number = 0;
    p_CS: number = 0;
    p_CSH: number = 0;
    p_CEA: number = 0;
    p_CBAP: number = 0;
    p_CBI: number = 0;
    areas: string;
    ans: any[];
    questionNo: number = 0;
    answerValue = null;
    answersNumber: number = 0;
    answerIndex: number = 0;
    correctAnsInd: any;
    service :any;
    lengthOfQuizQuestions: any;
    grado: any;
    intentos: any;
    estado: any;
    tipo_examen: any;
    examen: any;
    fecha_ini: any;
    constructor(private popup: Popup, private platform: Platform, private nav: NavController, serve: AuthService, private alertCtrl: AlertController,public navParams: NavParams) {
    
       
       this.nav = nav;
       this.fecha_ini = Date;
       this.examen = 'Bimestral';
       this.platform = platform;
       this.tipo_examen = navParams.data.TIPO_EXAMEN;
       this.intentos = navParams.data.INTENTOS;
       console.log(navParams.data)
       this.service = serve;
       this.Preguntas = 
           {
           Reactivo: '',
           area:'',
           id: ''
           }   

    }



    ionViewWillEnter(){
        this.service.usedatos().then( data =>{
            this.grado = data.grado
            this.estado = data.estado
        })
            this.pre()
    }
    pre(){
        
        this.service.usepreguntas().then( data => {
            console.log(data)
        this.data = data;
        this.Preguntas = this.data[this.indice];
        this.areas = this.data[this.indice].area;
        this.ans = this.data[this.indice].respuestas;
        this.correctAnsInd = this.data[this.indice].res_correcta;
        this.lengthOfQuizQuestions = this.data.length;

       });
     
    }
  

    next(opt: any) {

        if(this.answerValue == null){

            console.log(this.answerValue)
            this.popup.popup('Selecciona Tu Respuesta')
        }else{

        if(opt == this.ans[this.correctAnsInd].respuesta && this.areas == 'CS'){
            this.CS++;
        } if(this.areas == 'CS'){this.p_CS++;}
        if(opt == this.ans[this.correctAnsInd].respuesta && this.areas == 'CSH'){
           this.CSH++;
        }if(this.areas == 'CSH'){this.p_CSH++;}
        if(opt == this.ans[this.correctAnsInd].respuesta && this.areas == 'CEA'){
            this.CEA++;
        }if(this.areas == 'CEA'){this.p_CEA++;}
        if(opt == this.ans[this.correctAnsInd].respuesta && this.areas == 'CBAP'){
            this.CBAP++;
        }if(this.areas == 'CBAP'){this.p_CBAP++;}
        if(opt == this.ans[this.correctAnsInd].respuesta && this.areas == 'CBI'){
            this.CBI++;
        } if(this.areas == 'CBI'){this.p_CBI++;}            

       

        if(this.indice + 1 < this.lengthOfQuizQuestions){
          this.indice++;
          this.Preguntas = this.data[this.indice];
          this.areas = this.data[this.indice].area;
          this.ans = this.data[this.indice].respuestas;
          this.correctAnsInd = this.data[this.indice].res_correcta;
          this.answerIndex++;
          this.answerValue = null;

        }
        else{
         this.nav.push(Result, {
            CS: this.CS,
            CSH: this.CSH,
            CEA: this.CEA,
            CBAP: this.CBAP,
            CBI: this.CBI,
            p_CS: this.p_CS,
            p_CSH: this.p_CSH,
            p_CEA: this.p_CEA,
            p_CBAP: this.p_CBAP,
            p_CBI: this.p_CBI,
            intentos: this.intentos,
          });
        
        }
        }
    }


     
}
