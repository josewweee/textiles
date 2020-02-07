import { crudDB } from './../../services/crudDB.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { User } from '../../interfeces/user';
import { LoginPage } from '../../pages/login/login'

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  user: any;
  uid: any = "";
  email: any = "";
  estadito: any;
  rootPage: any = LoginPage;
  constructor(public crud: crudDB, public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public authService: AuthService, public crudDB: crudDB, public alertCtrl: AlertController) {         
    this.authService.getStatus().subscribe((result) => {            
      if(result){
        console.log("Usuario conectado en lista de productos");
        console.log(result);
        console.log(result.uid);
        let path = "/USUARIOS/" + result.uid;
        this.crud.get(path).valueChanges().subscribe((user: User) => {
          this.user = user; 
          this.uid = this.user.uid; 
          this.email = this.user.email;
          console.log(this.user);
          // modal.dismiss();       
          // this.nav.setRoot(ListaGeneralProductosPage, { user: this.user});
        });
        this.estadito = true;
      }else{
        this.estadito = false;
      }  
      // else{          
      //   this.estadito = false;
      //   console.log("El usuario no se encuentra conectado.")
      //   console.log(result);
      //   // Open loginPage view   
      //   let modal = this.modalCtrl.create(LoginPage);     
      //   modal.present();                       
      // }              
    });           
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Descuento Barberos',
      message: "Bienvenidos parceros, esta es una forma de agradecer su constancia.",
      inputs: [
        {
          name: 'descuento',
          placeholder: 'Introduce el descuento'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log(data.descuento)
            let idDescuento = Date.now();
            let path = "/USUARIOS/" + this.user.uid + "/PROMOCIONES/" + idDescuento;        
            let descuentoFinal = {
              id: idDescuento,
              codigo: data.descuento,              
            }
            this.crud.create(path, descuentoFinal); 
            let toast = this.toastCtrl.create({
              message: `Código ${data.descuento} ` + ` agregado con éxito.`,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();             
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  logOut(){
    this.estadito = false;
    this.authService.logout();
  }

  registro(){
    let modal = this.modalCtrl.create(LoginPage);
    modal.present(); 
    console.log("hola");
  }

}
