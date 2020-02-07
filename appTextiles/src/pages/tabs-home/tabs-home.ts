import { InfoPage } from './../info/info';
import { PerfilPage } from './../perfil/perfil';
import { CarritoPage } from './../carrito/carrito';
import { ListaGeneralProductosPage } from './../lista-general-productos/lista-general-productos';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs-home',
  templateUrl: 'tabs-home.html',
})
export class TabsHomePage {
  tabListaGeneralProductos = ListaGeneralProductosPage;
  tabCarrito = CarritoPage;
  tabPerfil = PerfilPage;
  tabInfo = InfoPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsHomePage');
  }
}
