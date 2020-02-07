import { TabsHomePage } from './../pages/tabs-home/tabs-home';
import {  SlidersPage } from './../pages/sliders/sliders';
import { LoginPage } from './../pages/login/login';
import { AuthService } from './../services/auth.service';
import { crudDB } from './../services/crudDB.service'
import { User } from './../interfeces/user';
import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, ModalController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  pages: Array<{ title: string, component: any }>;
  user: any;
  requests: any;
  mailsShown: any = [];
  boolLog: boolean = false;
  estadito: any = false;
/** STARING PAGE */
/*   rootPage: any = TabsHomePage; */
  rootPage: any = SlidersPage;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private push: Push,
    private crudDB: crudDB, private modalCtrl: ModalController, public alertCtrl: AlertController, private authService: AuthService
  ) {

    //let modal = this.modalCtrl.create(LoginPage);

    this.initializeApp();

    // Authentication status
    this.authService.getStatus().subscribe((result) => {
      if (result) {
        console.log("Usuario conectado en lista de productos");
        console.log(result);
        console.log(result.uid);
        let path = "/USUARIOS/" + result.uid;
        this.crudDB.get(path).valueChanges().subscribe((user: User) => {
          this.user = user;
          // modal.dismiss();
          // this.nav.setRoot(ListaGeneralProductosPage, { user: this.user});
        });
        this.estadito = true;
      }
      else {

      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushSetup();
    });
  }

  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '1021518127997'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  openPage(page, user) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, { user: user });
  }

  logOut() {
    this.authService.logout();
  }

  logIn() {
    console.log("El usuario no se encuentra conectado.")
    let modal = this.modalCtrl.create(SlidersPage);
    modal.present();
  }
}

