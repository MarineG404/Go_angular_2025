import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoard } from "./components/game-board/game-board";
import { Cells } from "./components/cells/cells";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameBoard, Cells],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('go2');
}
