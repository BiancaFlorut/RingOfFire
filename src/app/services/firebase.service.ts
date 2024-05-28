import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, Unsubscribe, addDoc, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { Player } from '../../models/player.class';

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
      console.log('Game with id;', id, 'is now: ',this.game);
    });
  }

  ngOnDestroy() {
    if (this.unsubGame)
      this.unsubGame();
  }

  async addGame(game: Game) {
    return await addDoc(collection(this.firestore, 'games'), game.toJSON());
  }

}
