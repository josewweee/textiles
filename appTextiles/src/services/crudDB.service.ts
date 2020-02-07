import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";

// This is injectable service to another component
@Injectable()
export class crudDB {
    constructor(public afDB: AngularFireDatabase) {

    }
    public get(path: string) {
        return this.afDB.object(path);
    }
    public getList(path: string) {
        return this.afDB.list(path);
    }    
    public create(path: string, objeto: any) {
        return this.afDB.object(path).set(objeto);                
    }
    public edit(path: string, objeto: any) {
        return this.afDB.object(path).set(objeto);        
    }
    public delete(path: string){
        return this.afDB.object(path).remove();
    }
}