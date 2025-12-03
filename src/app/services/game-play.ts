import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GamePlay {

  currentPlayer: string = 'player1';

  pass() {
    this.currentPlayer = this.currentPlayer === 'player1' ? 'player2' : 'player1';
  }

  endTurn() {
    // change current player
    this.pass();
    console.log(`It's now ${this.currentPlayer}'s turn.`);
  }

}
