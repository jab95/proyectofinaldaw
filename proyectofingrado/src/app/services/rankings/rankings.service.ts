import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Ranking } from 'src/app/models/rankig';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  private dbPath = 'rankings';

  rankings: AngularFirestoreCollection<Ranking> = null;
  preguntasNivel: AngularFirestoreCollection<Ranking> = null;

  constructor(private firestore: AngularFirestore) { }


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
  createCustomer(customer: Ranking): void {
    this.rankings.add({ ...customer });
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.rankings.doc(key).update(value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.rankings.doc(key).delete();
  }

  getPreguntas(): AngularFirestoreCollection<Ranking> {
    return this.rankings;
  }

  getPreguntasNivel(nivel: number): AngularFirestoreCollection<Ranking> {
    return this.firestore.collection(this.dbPath, ref => ref.where('dificultad', '==', nivel));

  }
  deleteAll() {
    this.rankings.get().subscribe(
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
