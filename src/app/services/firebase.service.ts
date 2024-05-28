import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, Unsubscribe, addDoc, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore: Firestore = inject(Firestore);

  game: any = { };

 
  unsubGame: Unsubscribe | undefined;


  constructor() {
   
  }

  subGame(id: string) {
    let docRef = doc(this.firestore, 'games', id);
    this.unsubGame = onSnapshot(docRef, (data) => {
      this.game = data.data();
    });
  }

  ngOnDestroy() {
    if (this.unsubGame)
      this.unsubGame();
  }

  async addGame(game: Game) {
    const docRef = collection(this.firestore, 'games');
    let id;
    await addDoc(docRef, game.toJSON()).then((doc) => { 
      id = doc.id;
    ; });
    return id;
    
  }

  updateGame(game: Game, id: string) {
    if (id.length > 0) {
      let docRef = doc(this.firestore, 'games', id);
      return updateDoc(docRef, game.toJSON());
    }
    else return this.addGame(game);
  }

}
