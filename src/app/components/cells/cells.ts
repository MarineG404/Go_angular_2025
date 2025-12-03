import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePlay } from '../../services/game-play';

@Component({
  selector: 'app-cells',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cells.html',
  styleUrls: ['./cells.css'],
})
export class Cells {
  constructor(private gamePlay: GamePlay) {}

  get board() {
    return this.gamePlay.board();
  }

  @Output() cellClick = new EventEmitter<{ i: number; j: number; value: string }>();

  clickLeftCell(i: number, j: number) {
    if (this.gamePlay.placeStone(i, j)) {
      const value = this.board[i][j];
      this.cellClick.emit({ i, j, value });
    }
  }

  clickRightCell(i: number, j: number, ev: MouseEvent) {
    ev.preventDefault();
    const valueBefore = this.board?.[i]?.[j];
    if (this.gamePlay.removeStone(i, j)) {
      this.cellClick.emit({ i, j, value: '' });
    }
  }
}
