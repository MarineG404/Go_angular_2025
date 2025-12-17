import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  imports: [],
  templateUrl: './game-board.html',
  styleUrls: ['./game-board.css'],
})
export class GameBoard {

	// Initialize empty 8x8 board
	board: string[][] = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => ''));

}
