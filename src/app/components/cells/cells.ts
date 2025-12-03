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

  board: string[][] = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ''));

  @Output() cellClick = new EventEmitter<{ i: number; j: number; value: string }>();

  clickCell(i: number, j: number) {
    if (!this.board[i] || !this.board[i][j]) {
      this.board[i][j] = this.gamePlay.currentPlayer;
    } else {
    }
    const value = this.board[i][j];
    console.log(`Cell clicked: row=${i}, col=${j}`, { value });
    this.cellClick.emit({ i, j, value });
  }
}
