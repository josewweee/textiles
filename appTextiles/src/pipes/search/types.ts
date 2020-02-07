import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'types'
})
export class TypesPipe implements PipeTransform {
  public transform(value, args: string) {
    if (!value) {
      return null;
    }
    if (!args) {
      return value;
    }
    args = args.toLowerCase();
    return value.filter(function(item){
        if (args == "todos los productos"){
            return true;
        } else {
            try {
              return JSON.stringify(item.tipo).toLowerCase().includes(args);
            } catch (error) {
             
            }
            
        }
        
    });
  }
}
