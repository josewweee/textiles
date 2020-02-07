import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsHomePage } from '../tabs-home/tabs-home';

/**
 * Generated class for the SlidersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sliders',
  templateUrl: 'sliders.html',
})
export class SlidersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  slider = [
    {
      title: 'Las telas que necesites a domicilio',
      description: 'Te llevaremos la muestra de la tela para que veas su calidad',
      image: 'assets/imgs/rollosSliders.jpg'
    },
    {
      title: 'Los mejores precios a tan solo 1 click.',
      description: 'Buenos precios y buenas telas a domicilio.',
      image: 'assets/imgs/rollosSliders.jpg'
    }
  ];

  irPantallaPrincipal(){
    this.navCtrl.push(TabsHomePage);
  }

}
