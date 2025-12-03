import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  imports: [],
  templateUrl: './game-board.html',
  styleUrls: ['./game-board.css'],
})
export class GameBoard {

	// Tableau de jeu 8*8
	board: string[][] = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => ''));

}
