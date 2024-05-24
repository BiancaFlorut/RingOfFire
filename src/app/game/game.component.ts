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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game) {
      this.currentCard = this.game?.stack.pop() || '';
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
}
