import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.sass'
})
export class PlayerComponent {
  @Input() name: string | undefined;
  @Input() picture: string | undefined;
  @Input() active: boolean = false;
}
