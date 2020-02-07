import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { crudDB } from '../../services/crudDB.service';
import { AuthService } from '../../services/auth.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  path: string = "INFO/diciembre/text";
  text: any;
  user: any;
  productos: any = [];
  pedidos: any = [];
  pedidoUsuarioNoRegistrado: any = []; 
  loggeado: boolean;
  nombre_usuario_no_registrado: any;
  total_usuario_no_registrado: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public crud: crudDB, public authService: AuthService, public storage: Storage) {
    var index_data_usuario_no_registrado;
    this.crud.get(this.path).valueChanges()
      .subscribe((textDB) => {
        this.text = textDB;
    });

    this.authService.getStatus().subscribe((result) => {
      if (result) {
        this.loggeado = true;
        this.user = result;
        let path = "/USUARIOS/" + this.user.uid + "/PEDIDOS/";
        this.crud.getList(path).valueChanges()
          .subscribe((pedidosDB) => {
            this.pedidos = pedidosDB;
            console.log(this.pedidos);
          });
        /* console.log("Loggeado = " + this.loggeado); */
      }else{
        this.loggeado = false;
        storage.get('idPedido').then((val) => {
          let path ="/PEDIDOS/" +  val + "/";
          this.crud.getList(path).valueChanges()
          .subscribe((pedidosDB) => {
            /*  console.log("Cambios" + pedidosDB); */
            if(pedidosDB.length < 1){
              this.pedidos = [];
            }else{
              this.pedidos[0] = pedidosDB;
            }
            /* console.log(this.pedidos); */
             //BUSCAMOS EL INDEX DE LA DATA PERSONAL
            try {
              for(var i =0; i<this.pedidos[0].length;i++){
                  var arreglo_interno_a_pedidos = this.pedidos[0][i];
                  if(arreglo_interno_a_pedidos != undefined){
                    if(arreglo_interno_a_pedidos.telefono != undefined){
                      index_data_usuario_no_registrado = i;
                    }
                  }
              }
              this.nombre_usuario_no_registrado = this.pedidos[0][index_data_usuario_no_registrado].nombre;
              /* console.log(this.nombre_usuario_no_registrado); */
              this.total_usuario_no_registrado = this.pedidos[0][index_data_usuario_no_registrado - 1];
              /* console.log(this.total_usuario_no_registrado); */
            } catch (error) {
              console.log(error);
            }
          });
        });
      }
    });

  }

  verPedido(pedido){
    var text = "";
    var i = 0;
    var index_productos_usuario_no_registrado;
    if(this.loggeado){
      for(i=0;i<pedido.productos.length;i++){
        text += pedido.productos[i].nombre + " x " + pedido.productos[i].cantidad + '\n';
      }
    }else{

      //BUSCAMOS EL INDEX DE LOS PRODUCTOS
      try {
        //nos adentramos al arreglo del pedido, para hallar la posicion productos
        for(i =0; i<this.pedidos[0].length;i++){
            var arreglo_interno_a_pedidos = this.pedidos[0][i];
            if(arreglo_interno_a_pedidos[0] != undefined){
              if(arreglo_interno_a_pedidos[0].cantidad != undefined){
                index_productos_usuario_no_registrado = i;
              }
            }
        }
      } catch (error) {
        console.log(error);
      }

      for(i=0;i<this.pedidos[0][index_productos_usuario_no_registrado].length;i++){
        text += pedido[index_productos_usuario_no_registrado][i].nombre + " x " + pedido[index_productos_usuario_no_registrado][i].cantidad + '\n';
      }
    }
    alert("Tu pedido:" + '\n' + text)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}

