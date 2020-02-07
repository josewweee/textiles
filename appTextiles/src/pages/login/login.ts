import { crudDB } from './../../services/crudDB.service';
import { User, Status } from './../../interfeces/user';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { SingUpPage } from '../sing-up/sing-up';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  password: any;
  password2: string;
  email: any;
  status: Status;
  nick: string;
  operation: string = 'login';
  pathUsuarios: string = '/USUARIOS/';
  user: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public viewCtrl: ViewController, public authService: AuthService
              , private toastCtrl: ToastController, public crud: crudDB,
              public modalCtrl: ModalController) {
                this.authService.getStatus().subscribe((result) => {            
                  if(result){
                    this.viewCtrl.dismiss();
                  } 
                });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  regis(){
    let modal = this.modalCtrl.create(SingUpPage);
    modal.present();               
  }

  
  loginWithEmail() {
    this.authService.loginWithEmail(this.email, this.password).then((data) => {
      console.log(data);
      let toast = this.toastCtrl.create({
        message: 'Bienvenido',
        duration: 3000,
        position: 'top'
      });
      toast.present();      
      // this.navCtrl.setRoot(ListaGeneralProductosPage);      
    }).catch((error) => {
      alert('Asegurate de que pusiste bien los datos');
      console.log(error);
    })
  }
  // loginFacebook() {
  //   this.authService.loginWithFacebook().then( (response)=> {
  //     alert('Loggeado con Facebook con éxito, bienvenido a Barbero Express.');
  //     this.viewCtrl.dismiss();      
  //     localStorage.setItem('loginData', JSON.stringify(response))
  //   });
  // }
  loginGoogle(){
    return new Promise<any>((resolve, rejevt) => {
      this.authService.loginWithGoogle()
      .then( (response) => {        
        this.viewCtrl.dismiss();
        alert('Loggeado con Google con éxito, bienvenido a Barbero Express.')
        localStorage.setItem('loginData', JSON.stringify(response))
        // var papi = localStorage.getItem('loginData')      
        // var papus = JSON.parse(papi);               
        resolve(response)
      }, err => rejevt(err))
    })    
    
  }

  registerWithEmail() {
    if (this.password.length < 3){
      alert('La contraseña debe contener más de 3 caracteres.');
      return;
    }
    if(this.email.length < 3){
      alert('Debes de poner un correo valido.');
      return;
    }
    return new Promise<any>((resolve, rejevt) => {
      this.authService.registerWithEmail(this.email, this.password)
      .then(res => {
        resolve(res);
        const user: User = {        
          email: this.email,          
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          creationTime: res.user.metadata.creationTime,
          lastSingInTime: res.user.metadata.lastSignInTime
        };
        console.log(res.user.uid)
        this.pathUsuarios += res.user.uid;
        this.crud.create(this.pathUsuarios, user);
        this.loginWithEmail();
      }, err => rejevt(err))
    })    
  }


  cancelar() {
    console.log('Entró')
    this.viewCtrl.dismiss();
  }

}
