import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GamePlay {

  // reactive current player and scores using Angular signals
  currentPlayer: WritableSignal<string> = signal('player1');
  scores = signal<{ [key: string]: number }>({ player1: 0, player2: 0 });
  passedTurns: number = 0;
  end: boolean = false;

  constructor() {}

  pass() {
    this.currentPlayer.update(p => (p === 'player1' ? 'player2' : 'player1'));
    this.passedTurns++;
    if (this.passedTurns >= 3) {
      this.end = true;
    }
  }

  endTurn() {
    this.pass();
  }

  addScore(player: string, points: number) {
    this.scores.update(s => ({ ...s, [player]: (s[player] ?? 0) + points }));
  }

  resetGame() {
    this.end = false;
  }

  getWinner(){
    if (this.scores()['player1'] > this.scores()['player2']) {
      return 'player1';
    } else if (this.scores()['player2'] > this.scores()['player1']) {
      return 'player2';
    } else {
      return 'draw';
    }
  }

}
