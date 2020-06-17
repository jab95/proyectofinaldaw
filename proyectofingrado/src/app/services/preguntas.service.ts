import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private dbPath = 'preguntas';

  preguntas: AngularFirestoreCollection<Pregunta> = null;
  preguntasNivel: AngularFirestoreCollection<Pregunta> = null;

  constructor(private db: AngularFirestore) {
    this.preguntas = db.collection(this.dbPath);
  }




  addPregunta(data) {

    this.db.collection(this.dbPath).add(data)

  }

  updatePregunta(key: string, value: any): Promise<void> {
    return this.preguntas.doc(key).update(value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.preguntas.doc(key).delete();
  }

  // SE OBTIENEN TODOS LAS PREGUNTAS
  getPreguntas(): AngularFirestoreCollection<Pregunta> {
    return this.preguntas;
  }

  // SE OBTIENEN TODAS LAS PREGUNTAS DEL NIVEL INDICADO
  getPreguntasNivel(nivel: number): AngularFirestoreCollection<Pregunta> {
    return this.db.collection(this.dbPath, ref => ref.where('dificultad', '==', nivel));

  }

  // getPreguntasNombre(nombre: string): AngularFirestoreCollection<Pregunta> {
  //   return this.db.collection(this.dbPath, ref => ref.orderBy("pregunta").(nombre)
  //     .endAt(nombre + "\uf8ff"));

  // }

  deleteAll() {
    this.preguntas.get().subscribe(
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