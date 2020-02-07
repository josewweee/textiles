import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { ListaGeneralProductosPage } from './lista-general-productos';


@NgModule({
  declarations: [
    ListaGeneralProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaGeneralProductosPage),
    PipesModule
  ],
})
export class ListaGeneralProductosPageModule {}
