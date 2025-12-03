import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoard } from "./components/game-board/game-board";
import { Cells } from "./components/cells/cells";
import { GamePlay } from './services/game-play';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameBoard, Cells],
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
    return this.gamePlay.showScores();
  }
}
