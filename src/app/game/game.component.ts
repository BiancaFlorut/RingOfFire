import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Player } from '../../models/player.class';
import { GameInfoComponent } from '../game-info/game-info.component';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribe, doc, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.sass'
})
export class GameComponent {
  currentCard: string = '';
  pickCardAnimation = false;
  game: Game | undefined;

  unsubGame: Unsubscribe | undefined;

  constructor(private firestore: FirebaseService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe(params => {
      this.subscribeToGame(params['id']);
    });

  }

  subscribeToGame(id: string) {
      let docRef = doc(this.firestore.firestore, 'games', id);
      this.unsubGame = onSnapshot(docRef, (data) => {
        let game = data.data();
        if (this.game && game) {
          this.game.currentPlayer = game['currentPlayer'];
          this.game.players = game['players'];
          this.game.stack = game['stack'];
          this.game.playedCards = game['playedCards'];
        }
        console.log(this.game);
        
      });
  }

  setGameObj(obj: any) {

  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
      if (this.game.currentPlayer == this.game.players.length - 1) {
        this.game.currentPlayer = 0;
      } else
        this.game.currentPlayer++;
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game?.playedCards.push(this.currentCard);
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((newPlayer: Player) => {
      if (!newPlayer) return;
      this.game?.players.push(newPlayer);
    });
  }

  ngOnDestroy() {
    if (this.unsubGame)
      this.unsubGame();
  }
}
