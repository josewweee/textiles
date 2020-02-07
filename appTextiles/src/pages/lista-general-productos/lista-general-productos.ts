import { CarritoPage } from './../carrito/carrito';
import { MyApp } from './../../app/app.component';
import { User } from './../../interfeces/user';
import { AuthService } from './../../services/auth.service';
import { DetalleProductoPage } from './../detalle-producto/detalle-producto';
import { crudDB } from './../../services/crudDB.service';
import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ListaGeneralProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lista-general-productos',
  templateUrl: 'lista-general-productos.html',
  
})


export class ListaGeneralProductosPage {
  user: User;
  productos: any = [];
  pathProductos: string = "/PRODUCTOS/";
  query: string;
  catego: string;
  estadito: any = false;
  tipos: any = [];
  filtered: any = [];
  ListaCortaTipos: any = [];
  items: any = [];
  usuario_no_registrado: any = [];
  usuario_no_registrado_id: any;
  is_mobile: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public crud: crudDB, public modalCtrl: ModalController,
    public authService: AuthService, public crudDB: crudDB,
    private toastCtrl: ToastController, public myAppInit: MyApp, public storage: Storage) {
    // this.user = this.navParams.get('user'); 
    this.is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    this.crud.getList(this.pathProductos).valueChanges()
      .subscribe((productosDB) => {
        this.productos = productosDB;        
        for(let i = 0; i < this.productos.length; i++){
          if (this.productos[i].cantidad == null){
            this.productos[i].cantidad = 1;
          }                 
        }
        this.items = this.productos.slice(0,20);
      });
    // Authentication status
        this.user = null;
        storage.get('usuario').then((val) => {
          var max = 9999999999999999;
          var min = 0;
          var random = "USERNUMBER" + Math.floor(Math.random() * (max - min + 1) + min).toString();
          var key;
          try {
            key = val.toString().substring(0,10);
            console.log(key);
          } catch (error) {
            key = 12345678901234567890;
          }
          

          if(key == "USERNUMBER"){
            console.log("VAL = " + val);
            console.log("usuario ya registrado");
          }else{
            val = random;            
          }
            let path = "/INFO/" + "TEMPORALES/USUARIOS/" + val
            this.crud.create(path, val);
            storage.set("usuario", val);
        });
  }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad ListaGeneralProductosPage');
  } */
  

  //PONEMOS LOS DATOS DE CADA TIPO EN LA LISTA
  filterItemsOfType(type){
    if(type.toLowerCase() == 'productos estrella'){
      return this.productos.filter(x => x.recomendado == "100");
    }
    return this.productos.filter(x => x.tipo.toLowerCase() == type.toLowerCase());
  }
  //ARMAMOS LISTAS DE TIPOS
  filterItemsNames(){
    return this.ListaCortaTipos.filter(x => x.text.toLowerCase() != 'todos los productos');
  }

  cambioLista(evento){
    if(evento.length > 0){
      this.items = this.productos;
    }else{
      this.items = this.productos.slice(0,20);
    }
  }

  cambioTipo(evento){
    if(evento != "TODOS LOS PRODUCTOS"){
      this.items = this.productos;
    }else{
      this.items = this.productos.slice(0,20);
    }
  }

  //AGREGAMOS MAS DATOS A LA PANTALLA PRINCIPAL PARA EL SCROLL INFINITO
  loadData(infiniteScroll) {
    var k;
    if(this.is_mobile){
      k = this.ListaCortaTipos.length;
      setTimeout(() => {
        this.ListaCortaTipos = this.ListaCortaTipos.concat(this.tipos.slice(k, k+3));
        infiniteScroll.complete();
      }, 10);
    }else{
      k = this.ListaCortaTipos.length;
      setTimeout(() => {
        this.ListaCortaTipos = this.ListaCortaTipos.concat(this.tipos.slice(k, k+3));
        infiniteScroll.complete();
      }, 10);

      /* var k = this.items.length;
      setTimeout(() => {
        this.items = this.items.concat(this.productos.slice(k, k+10));
        infiniteScroll.complete();
      }, 100); */
    } 
  }

  irAVistaDeDetalleProducto(producto) {
    this.navCtrl.push(DetalleProductoPage, { producto: producto , user: this.user});
  }
  agregarAlCarrito(productoEntrante) {
    if (productoEntrante.cantidad < 1 || productoEntrante.cantidad == null) {
      alert("Parcero, recuerda escribir la cantidad que quieres del producto, justo al lado del botón AGREGAR AL CARRITO. Gracias y bienvenido!!!");
    }else {
      let productoFinal = {
        nombre: productoEntrante.nombre,
        marca: productoEntrante.marca,
        precio: productoEntrante.precio,
        foto: productoEntrante.foto,
        id: productoEntrante.id,        
        cantidad: productoEntrante.cantidad,
        subtotal: parseInt(productoEntrante.cantidad) * parseInt(productoEntrante.precio)  
      }

        this.storage.get('usuario').then((val) => {
          let path = "/INFO/" + "TEMPORALES" + "/USUARIOS/"  + val + "/CARRITO/" + productoEntrante.id;
          this.crud.create(path, productoFinal);
          let toast = this.toastCtrl.create({
            message: `${productoFinal.cantidad} ` + `${productoFinal.nombre} ` + `agregados al carrito correctamente`,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
    }
  }

  irCarrito() {
    this.navCtrl.setRoot(CarritoPage, {user: this.user});
  }

  restar(producto){
    if (producto.cantidad < 0 || producto.cantidad == null){
      producto.cantidad = 1;
    }else{
      producto.cantidad -= 1;
    }      
  }

  sumar(producto){
    if (producto.cantidad < 0 || producto.cantidad == null){
      producto.cantidad = 1;
    }else{
      producto.cantidad += 1;
    } 
  }

  sumarUno(producto){
    if (producto.cantidad == null){
      producto.cantidad = 1;
    }    
  }
}
