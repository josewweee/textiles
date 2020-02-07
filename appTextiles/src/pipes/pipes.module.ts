import { TypesPipe } from './search/types';
import { SearchPipe } from './search/search';
import { NgModule } from '@angular/core';
@NgModule({
	declarations: [SearchPipe, TypesPipe],
	imports: [],
	exports: [SearchPipe, TypesPipe]
})
export class PipesModule {}
