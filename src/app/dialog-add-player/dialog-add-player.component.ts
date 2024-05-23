import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Player } from '../../models/player.class';


@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.sass'
})
export class DialogAddPlayerComponent {
  pictures: string[] = ['./assets/profile/angel.png', './assets/profile/bee.png', './assets/profile/elf.png', './assets/profile/frog.png', './assets/profile/grim-reaper.png', './assets/profile/knight.png', './assets/profile/medusa.png', './assets/profile/princess.png', './assets/profile/unicorn.png', './assets/profile/vampire.png', './assets/profile/wizard.png'];
  player: Player = { name: '', picture: this.pictures[Math.floor(Math.random() * this.pictures.length)] };

  constructor(
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
