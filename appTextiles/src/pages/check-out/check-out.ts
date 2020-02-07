import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, App } from 'ionic-angular';
import { crudDB } from '../../services/crudDB.service';
import { Storage } from '@ionic/storage';
import { InfoPage } from '../info/info';
import { TabsHomePage } from '../tabs-home/tabs-home';

/**
 * Generated class for the CheckOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-check-out',
  templateUrl: 'check-out.html',
})
export class CheckOutPage {
  
  user: any;
  productos: any = [];
  total: number;

  nombre: string;
  telefono: string;
  departamento: string;
  
  municipio: string;  
  direccion: string;
  barrio: string;
  
  userTemp: any;
  observaciones: string;
  datosUbicacion: any;
  constructor(private app: App, public toastCtrl: ToastController, public crud: crudDB, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage) {
    this.user = navParams.get('user');
      this.user = navParams.get('user');
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
    console.log('ionViewDidLoad CheckOutPage');
  }

  sumaTotal(subtotal, envio) {
    return subtotal + envio;
  }

  

  confirmar() {
    let idPedido = Date.now();
    
    let pathPedidos = "/PEDIDOS/" + idPedido;
    let monto_total = this.total;

    if (idPedido == null || this.telefono == null || this.departamento == null || this.municipio == null || this.direccion == null || this.productos == null || this.total == null || this.barrio == null || this.observaciones == null) {
      alert("Debes escribir todos los datos para poder realizar el envío correctamente, en caso de que no apliquen, deber poner NO APLICA, gracias y disculpa las molestias.")
      return;
    }
    if(this.telefono.length < 10){
      alert("Revisa que el numero este bien escrito o agrega 034 antes de tu numero, si es un telefono fijo");
      return;
    }

    switch (this.municipio.replace(" ", "").toUpperCase()) {
      case "MEDELLIN":
        monto_total = this.total + 4500;
        break;
      case "MEDELLÍN":
        monto_total = this.total + 4500;
        break;
      case "MED":
        monto_total = this.total + 4500;
        break;
      case "MEDÉLLIN":
        monto_total = this.total + 4500;
        break;
      case "MÉDELLIN":
        monto_total = this.total + 4500;
        break;
      default:
        monto_total = this.total + 6500;
        break;
    }
       let pedido = {
        id: idPedido,
        usuario: {
          uid: this.userTemp,
          nombre: this.nombre,
          email: "USUARIO NO REGISTRADO",
          telefono: this.telefono
        },
        departamento: this.departamento,      
        municipio: this.municipio,
        barrio: this.barrio,
        direccion: this.direccion,
        observaciones: this.observaciones,
        productos: this.productos,
        total: monto_total,
        estado: "Procesando"
      }

      let path = "/INFO/" + "TEMPORALES" + "/USUARIOS/" + this.userTemp + "/PEDIDOS/" + idPedido;               
      this.crud.create(path, pedido);
      this.crud.create(pathPedidos, pedido);    
      let pathUser = "/INFO/" + "TEMPORALES" + "/USUARIOS/" + this.userTemp + "/nombre";
      this.crud.create(pathUser, this.nombre);  
      let pathUser2 = "/INFO/" + "TEMPORALES" + "/USUARIOS/" + this.userTemp + "/telefono";
      this.crud.create(pathUser2, this.telefono);
      let pathUser3 = "/INFO/" + "TEMPORALES" + "/USUARIOS/" + this.userTemp + "/direccion";
      this.crud.create(pathUser3, this.direccion);
      let pathCarrito = "/INFO/" + "TEMPORALES" + "/USUARIOS/" + this.userTemp + "/CARRITO/";
      this.crud.delete(pathCarrito);
      this.storage.set("idPedido", idPedido);

      let toast = this.toastCtrl.create({
        message: `El pedido # ${idPedido} se ha procesado exitosamente, en las próximas horas uno de nuestros colaboradores te contactará para confirmar el horario de entrega, gracias por tu compra.`,
        duration: 9000,
        position: 'middle'
      });
      toast.present();
     
    this.app.getRootNav().setRoot(TabsHomePage);
    setTimeout( () => {
      this.app.getRootNav().getActiveChildNav().select(2);
    }, 1000);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
