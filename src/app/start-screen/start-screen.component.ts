import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.sass'
})
export class StartScreenComponent {
  constructor(private router: Router, private firestore: FirebaseService) {

  }

  newGame() {
    let game = new Game();
    const id = this.firestore.addGame(game);
    this.router.navigate(['/game/' + id]);

  }
}
