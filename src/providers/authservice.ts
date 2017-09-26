import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class AuthService {
    private isLoggedin: any;
    private AuthToken: any;
     data: any ;
     TIPO_EXAMEN: any;
     exa: any;
    constructor(private http: Http) {
        this.isLoggedin = false;
        this.AuthToken = null;
    }

    storeUserCredentials(userdata) {
        window.localStorage.setItem('userdata', JSON.stringify(userdata));
        this.useCredentials(userdata);

    }
    datos(parametros) {
        window.localStorage.setItem('parametros', JSON.stringify(parametros));
        this.usedatos(parametros);

    }
    preguntas(pre) {
        window.localStorage.setItem('pre', JSON.stringify(pre));
        this.usepreguntas(pre);
    }    
    
    usedatos(parametros) {
        let param = JSON.parse(window.localStorage.getItem('parametros'))
        return new Promise(resolve =>{
            resolve(param)
        })
    }  
    usepreguntas(pre) {
        let preguntas = JSON.parse(window.localStorage.getItem('pre'))
        return new Promise(resolve =>{
            resolve(preguntas)
        })
    }
  
    useCredentials(userdata) {
        this.isLoggedin = true;
        this.AuthToken = userdata;
       
    }

    loadUserCredentials() {
        let token = JSON.parse(window.localStorage.getItem('userdata'));
        this.useCredentials(token);
    }

    destroyUserCredentials() {
        this.isLoggedin = false
        this.AuthToken = null
        window.localStorage.clear()
    }

    authenticate(user) {
            return new Promise((resolve, reject) => {
            let headers = new Headers()
            headers.append('Content-Type', 'application/json')
                this.http.post('https://fdc3b12c.ngrok.io/authenticate',JSON.stringify(user), {headers: headers}).subscribe(
                    data => {
                        let datai = data.json();
                    if(datai.success == true){
                        this.storeUserCredentials({
                            "token": datai.token
                            
                        });
                        this.datos({
                            ID_ALUMNO: datai.ID_ALUMNO,
                            INTENTOS: datai.INTENTOS,
                            ESTADO: datai.ESTADO,
                            EXAMEN: datai.EXAMEN
                        })
                        this.TIPO_EXAMEN = 3
                        console.log(datai)
                        resolve(datai)
                        
                    }else{
                        resolve(datai)
                    }

                    },
                    error =>  {
                        console.log()
                        reject(true)
                    })
            })
                

    }
    
    


    isAuthenticated() {
      return this.isLoggedin;
    }

   getinfo() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            this.loadUserCredentials();
             headers.append('Authorization', 'Bearer ' + this.AuthToken.token);
             this.http.get('https://fdc3b12c.ngrok.io/getinfo/', {headers: headers}).subscribe(data => {
                this.data = data;
                 if(data.json().user){

                     resolve(data.json().user)
                 }
                 else
                     resolve(false);

             },
             error => {
                 reject(true)
             });
        })
    }

   resultados(matricula) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json')
             this.http.post('https://fdc3b12c.ngrok.io/resultados/',JSON.stringify(matricula),{headers: headers}).subscribe(data => {
                this.data = data
                 if(data.json().resultados){

                     resolve(data.json().resultados)
                 }
                 else
                     resolve(0)
             },
             error =>{
                 reject(true)
             })
        })
    }

   intentos(matricula) {
        return new Promise((resolve, reject) => {
            let headers = new Headers()
            headers.append('Content-Type', 'application/json')
             this.http.post('https://fdc3b12c.ngrok.io/intentos/',JSON.stringify(matricula),{headers: headers}).subscribe(data => {
                this.data = data;
                 if(data.json().intentos){

                     resolve(data.json().intentos)
                 }
                 else
                     resolve(0);

             },
             error =>{
                 reject(true)
             })
        })
    }        
  

    gua_resultados(resul) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return new Promise((resolve, reject) => {
            this.http.post('https://fdc3b12c.ngrok.io/gua_resultados',JSON.stringify(resul), {headers: headers}).subscribe(data => {
            
                if(data.json().success == true){
                 

                    resolve(data.json())

                }
                else
                    resolve(data.json())

            },
            error =>{
                reject(true)
            })
        })
    }        

   areas() {
        return new Promise((resolve, reject) =>{
            let headers = new Headers();
             this.http.get('https://fdc3b12c.ngrok.io/areas/', {headers: headers}).subscribe(data => {
                this.data = data;
                 if(data.json().areas){

                     resolve(data.json().areas)
                 }
                 else
                     resolve(false);
             },
             error => {
                 reject(true)
             })
        })
    } 

  /* carreras() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
             this.http.get('https://fdc3b12c.ngrok.io/carreras/', {headers: headers}).subscribe(data => {
                this.data = data;
                 if(data.json().carreras){

                     resolve(data.json().carreras);
                 }
                 else
                     resolve(false);

             },
             error =>{
                 reject(true)
             })
        })
    }        */

    examen(examenes) {
        console.log(examenes)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return new Promise((resolve, reject) => {
            this.http.post('https://fdc3b12c.ngrok.io/examen',JSON.stringify({"id":examenes}), {headers: headers}).subscribe(data => {
            
                if(data.json().success == true){
                 

                    resolve(data.json())

                }
                else
                    resolve(data.json())

            },
            error =>{
                reject(true)
            })
        })
    }        
    

   pregu() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
             this.http.get('https://fdc3b12c.ngrok.io/preguntas'+this.TIPO_EXAMEN+'/', {headers: headers}).subscribe(data => {
                this.data = data;

                 if(data.json()['preguntas'+this.TIPO_EXAMEN]){
                     this.preguntas(data.json()['preguntas'+this.TIPO_EXAMEN])

                     resolve(data.json()['preguntas'+this.TIPO_EXAMEN]);
                 }
                 else
                     resolve(false);
             },
             error =>{
                 reject(error)
             })
        })
    } 

    logout() {
        this.destroyUserCredentials();
    }
}




