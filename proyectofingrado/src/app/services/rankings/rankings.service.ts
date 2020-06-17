import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Ranking } from 'src/app/models/rankig';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  private dbPath = 'rankings';


  constructor(private firestore: AngularFirestore) {

  }


  // CREA EL RAKING CUANDO SE GUARDA AL PERDER LA PARTIDA
  createRanking(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.dbPath)
        .add(data)
        .then(res => {
          resolve(res)
        }, err => reject(err));
    });
  }


  updateCustomer(key: string, value: any): Promise<void> {
    return this.firestore.collection(this.dbPath).doc(key).update(value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.firestore.collection(this.dbPath).doc(key).delete();
  }

  // SE OBTIENEN TODOS LOS RANKINGS
  getRankings(): AngularFirestoreCollection<Ranking> {
    return this.firestore.collection(this.dbPath)
  }

  getPreguntasNivel(nivel: number): AngularFirestoreCollection<Ranking> {
    return this.firestore.collection(this.dbPath, ref => ref.where('dificultad', '==', nivel));

  }
  deleteAll() {
    this.firestore.collection(this.dbPath).get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      });
  }






}
