import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { crudDB } from '../../services/crudDB.service';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the DetalleProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalle-producto',
  templateUrl: 'detalle-producto.html',
})
export class DetalleProductoPage {
  producto: any = {};
  user: any;
  path: string;
  userTemp: any;
  coloresObjeto: any = [];
  coloresArreglo: any = [];
  images: any = [];
  diseñoEscogido: any;
  colors: Array<string> = [/* '#d435a2', '#a834bf', '#6011cf', '#0d0e81', '#0237f1', '#0d8bcd', '#16aca4', '#3c887e', '#157145', '#57a773', '#88aa3d', '#b7990d', '#fcbf55', '#ff8668', '#ff5c6a', '#c2454c', '#c2183f', '#d8226b', '#8f2d56', '#482971', '#000000', '#561f37', '#433835', '#797979', '#819595' */];
  color: string;
  colorEscogido: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public crud: crudDB, public toastCtrl: ToastController,public storage: Storage) {
    this.producto = navParams.get('producto') || {};
    this.images = this.producto.diseños;

    this.user = navParams.get('user');
    this.coloresObjeto = this.producto.colores;
    if(this.coloresObjeto != undefined){
      for(let i=0; i< this.coloresObjeto.length; i++){
        this.coloresArreglo.push(this.coloresObjeto[i].color);
      }
      this.colors = this.coloresArreglo;
    }

    if(this.user != null){
      console.log("enhora buena");
    }else{
      storage.get('usuario').then((val) => {
        this.userTemp = val;
      });
    }
  }


  agregarAlCarrito(productoEntrante) {
    if (productoEntrante.cantidad < 1 || productoEntrante.cantidad == null) {
      alert("Recuerda escribir la cantidad que quieres del producto");
    }else{
        this.path = "/INFO/" + "TEMPORALES" + "/USUARIOS/"  + this.userTemp + "/CARRITO/" + productoEntrante.id;
        if(productoEntrante.diseñoEscogido == undefined){
          this.diseñoEscogido = "";
        }
        if(productoEntrante.colorEscogido == undefined){
          this.colorEscogido = "";
        }
        let productoFinal = {
          nombre: productoEntrante.nombre,
          precio: productoEntrante.precio,
          foto: productoEntrante.foto,
          id: productoEntrante.id,
          cantidad: productoEntrante.cantidad,
          diseño: this.diseñoEscogido,
          color: this.colorEscogido,
          subtotal: parseInt(productoEntrante.cantidad) * parseInt(productoEntrante.precio)
        }
        this.crud.create(this.path, productoFinal);
        let toast = this.toastCtrl.create({
          message: `${productoFinal.cantidad} ` + `${productoFinal.nombre} ` + `agregados al carrito correctamente`,
          duration: 3000,
          position: 'top'
        });
        this.navCtrl.pop();
        toast.present();
    }
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

  ImageSelected(event: any){
    let id = event.toString();
    let diseñosProducto;
    let imageSelected = document.getElementById(id);
    imageSelected.style.border = '5px solid black';
    this.diseñoEscogido = imageSelected.style.backgroundImage.substring(4,imageSelected.style.backgroundImage.length - 1);
    console.log(this.diseñoEscogido);
    for(let i = 0;i < this.producto.diseños.length; i++){
      let position = i.toString();
      diseñosProducto = document.getElementById(position);
      if(position != id){
        diseñosProducto.style.border = "";
      }
    }
  }

  prepareColorSelector() {
		setTimeout(() => {
			let buttonElements = document.querySelectorAll('div.alert-radio-group button');
			if (!buttonElements.length) {
				this.prepareColorSelector();
			} else {
				for (let index = 0; index < buttonElements.length; index++) {
					let buttonElement = buttonElements[index];
					let optionLabelElement = buttonElement.querySelector('.alert-radio-label');
					let color = optionLabelElement.innerHTML.trim();

					if (this.isHexColor(color)) {
						buttonElement.classList.add('colorselect', 'color_' + color.slice(1, 7));
						if (color == this.color) {
							buttonElement.classList.add('colorselected');
						}
					}
				}
			}
		}, 100);
	}

	isHexColor(color) {
		let hexColorRegEx = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
		return hexColorRegEx.test(color);
	}

	selectColor(color) {
		let buttonElements = document.querySelectorAll('div.alert-radio-group button.colorselect');
		for (let index = 0; index < buttonElements.length; index++) {
			let buttonElement = buttonElements[index];
			buttonElement.classList.remove('colorselected');
			if (buttonElement.classList.contains('color_' + color.slice(1, 7))) {
				buttonElement.classList.add('colorselected');
			}
		}
	}

	setColor(color) {
    let encontrado = false;
    color = color.toString();
    for(let j=0; j < this.coloresObjeto.length && !encontrado; j++){
      if(color == this.coloresObjeto[j].color){
        this.colorEscogido = this.coloresObjeto[j].nombre + " " + color;
        encontrado = true;
      }
    }
	}

}
