import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Status, User } from '../../interfeces/user';
import { crudDB } from '../../services/crudDB.service';

/**
 * Generated class for the SingUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sing-up',
  templateUrl: 'sing-up.html',
})
export class SingUpPage {
  password: string;
  password2: string;
  email: any;
  telefono: any;
  status: Status;
  nick: string;
  operation: string = 'login';
  pathUsuarios: string = '/USUARIOS/';
  user: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public crud: crudDB, public toastCtrl: ToastController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingUpPage');
  }

  registerWithEmail() {
    if(this.password !== this.password2) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    if (this.password.length < 6){
      alert('La contraseña debe contener más de 6 caracteres.');
      return;
    }
    return new Promise<any>((resolve, rejevt) => {
      this.authService.registerWithEmail(this.email, this.password)
      .then(res => {
        resolve(res);
        const user: User = {        
          email: this.email,          
          uid: res.user.uid,
          telefono: this.telefono,
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

  loginWithEmail() {
    this.authService.loginWithEmail(this.email, this.password).then((data) => {
      console.log(data);
      let toast = this.toastCtrl.create({
        message: 'Bienvenido',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();      
      this.viewCtrl.dismiss();      
            
    }).catch((error) => {
      alert('Ocurrió un error');
      console.log(error);
    })
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

}
