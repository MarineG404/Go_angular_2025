import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoard } from "./components/game-board/game-board";
import { Cells } from "./components/cells/cells";
import { GamePlay } from './services/game-play';
import { ThemeToggle } from "./components/theme-toggle/theme-toggle";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameBoard, Cells, ThemeToggle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('go2');

  constructor(private gamePlay: GamePlay) {  }

  currentPlayer() {
    return this.gamePlay.currentPlayer();
  }

  pass() {
    this.gamePlay.pass();
  }

  endTurn() {
    this.gamePlay.endTurn();
  }

  showScores() {
    return this.gamePlay.scores();
  }

  endGame() {
    return this.gamePlay.end;
  }

  resetGame() {
    this.gamePlay.resetGame();
  }

  getWinner() {
    return this.gamePlay.getWinner();
  }
}
