import { Player } from "./player.class";

export class Game {
  public players:Player[]  = [
    {name: 'George', picture: './assets/profile/bee.png'},
    {name: 'Bianca', picture: './assets/profile/grim-reaper.png'},
    {name: 'John', picture: './assets/profile/knight.png'},
    {name: 'Jack', picture: './assets/profile/princess.png'}
  ]
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push('ace_' + i);
      this.stack.push('hearts_' + i);
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
    }
    this.shuffle(this.stack);
  }

  shuffle(array: string[]) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  
}