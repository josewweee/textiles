import { AuthService } from './../../services/auth.service';
import { CheckOutPage } from './../check-out/check-out';
import { DetalleProductoPage } from './../detalle-producto/detalle-producto';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { crudDB } from '../../services/crudDB.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
  user: any;
  productos: any = [];
  total: number;
  estadito: any = false;
  productos_usuario_no_registrado: any = [];
  userTemp: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public crud: crudDB, public authService: AuthService, public modalCtrl: ModalController, public storage: Storage) {
        this.user = null;
        storage.get('usuario').then((val) => {
          let path = "/INFO/"  + "TEMPORALES" + "/USUARIOS/" + val + "/CARRITO/";
          this.userTemp = val;
          this.crud.getList(path).valueChanges()
          .subscribe((productosDB) => {
            this.productos = productosDB;
            if (this.productos.length > 0) {
              this.total = this.productos.map(this.precio).reduce(this.sum);
            }
          });
        });
  }
 

  precio(item) {
    return parseInt(item.subtotal);
  }

  sum(prev, next) {
    return parseInt(prev) + parseInt(next);
  }

  add(a, b) {
    return a + b;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');
  }

  borrarDelCarrito(producto) {
    if(this.user != null){
      //console.log("hola?");
      let path = "/USUARIOS/" + this.user.uid + "/CARRITO/" + producto.id;
      this.total = 0;
      this.crud.delete(path);
    }else{
      let path = "/INFO/" + "TEMPORALES" + "/USUARIOS/" + this.userTemp + "/CARRITO/" + producto.id;
      this.total = 0;
      this.crud.delete(path);
    }
    
  }

  vaciarCarrito() {
    this.total = 0;
    if(this.user != null){
      let path = "/USUARIOS/" + this.user.uid + "/CARRITO/";
      this.crud.delete(path);
    }else{
      let path = "/INFO/" + "TEMPORALES" + "/USUARIOS/" + this.userTemp + "/CARRITO/";
      this.crud.delete(path);
    }
  }
  irAVistaDeDetalleProducto(producto) {
    this.navCtrl.push(DetalleProductoPage, { producto: producto });
  }
  irCheckOut() {
    this.navCtrl.push(CheckOutPage, { user: this.user })
  }
}
