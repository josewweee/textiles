import { Push } from '@ionic-native/push';
import { TabsHomePage } from './../pages/tabs-home/tabs-home';
import { CheckOutPage } from './../pages/check-out/check-out';
import { InfoPage } from './../pages/info/info';
import { SlidersPage } from './../pages/sliders/sliders';
import { PerfilPage } from './../pages/perfil/perfil';
import { DetalleProductoPage } from './../pages/detalle-producto/detalle-producto';
import { ListaGeneralProductosPage } from './../pages/lista-general-productos/lista-general-productos';
import { LoginPage } from './../pages/login/login';
import { CarritoPage } from './../pages/carrito/carrito';
import { PipesModule } from './../pipes/pipes.module';
import { ComponentsModule } from './../components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

// Imports Firebase auth, Database, Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
export const firebaseConfig = {
  apiKey: "AIzaSyB5cRYv9hMgpttryAwJO1z1_yu-8R0ciaI",
  authDomain: "text-7a76b.firebaseapp.com",
  databaseURL: "https://text-7a76b.firebaseio.com",
  projectId: "text-7a76b",
  storageBucket: "text-7a76b.appspot.com",
  messagingSenderId: "921551570554"
/*   appId: "1:921551570554:web:66f34efb1d111422" */
}

// Servicios
import { crudDB } from './../services/crudDB.service';
import { AuthService } from './../services/auth.service';

import { MyApp } from './app.component';
import { SingUpPage } from '../pages/sing-up/sing-up';

@NgModule({
  declarations: [
    MyApp,
    TabsHomePage,
    CarritoPage,
    LoginPage,
    ListaGeneralProductosPage,
    DetalleProductoPage,
    PerfilPage,
    InfoPage,
    CheckOutPage,
    SingUpPage,
    SlidersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    ComponentsModule,
    PipesModule    ,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsHomePage,
    CarritoPage,
    LoginPage,
    ListaGeneralProductosPage,
    DetalleProductoPage,
    PerfilPage,
    InfoPage,
    CheckOutPage,
    SingUpPage,
    SlidersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    crudDB,
    AngularFireAuth,
    AngularFireDatabase,
    AngularFireStorage,
    Push
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
