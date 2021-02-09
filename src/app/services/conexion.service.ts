import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ConexionService {


  private itemsCollection: AngularFirestoreCollection<Item>;
  private itemsCollection2: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  items2: Observable<Item[]>;
  constructor(private firestore: AngularFirestore) {
    this.itemsCollection = firestore.collection<Item>('dispositivos').doc('sensor_co2_21614420').collection('mediciones', ref => ref.orderBy('timestamp', 'desc').limit(10));
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc['id'];
        return { id, ...data };
      }))
    );
    this.itemsCollection2 = firestore.collection<Item>('dispositivos').doc('sensor_co2_21614420').collection('mediciones', ref => ref.orderBy('timestamp', 'desc').limit(15));
    this.items2 = this.itemsCollection2.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc['id'];
        return { id, ...data };
      }))
    );
   }
   listaItem(){
     return this.items;
   }
   listaItem2(){
    return this.items2;
  }

}
