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

  clickLeftCell(i: number, j: number) {
    if (!this.board[i] || !this.board[i][j]) {
      this.board[i][j] = this.gamePlay.currentPlayer();
    }
    const value = this.board[i][j];
    this.cellClick.emit({ i, j, value });
  }

  clickRightCell(i: number, j: number, ev: MouseEvent) {
    ev.preventDefault();
    const value: string = this.board?.[i]?.[j];
    const current : string = this.gamePlay.currentPlayer();
    const opponent: 'player1' | 'player2' = current === 'player1' ? 'player2' : 'player1';

    if (value === opponent) {
      this.board[i][j] = '';
      this.cellClick.emit({ i, j, value: '' });
      this.gamePlay.addScore(current, 1);
    }
  }
}
