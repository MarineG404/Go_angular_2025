import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GamePlay {

  // reactive current player and scores using Angular signals
  currentPlayer: WritableSignal<string> = signal('player1');
  scores = signal<{ [key: string]: number }>({ player1: 0, player2: 0 });

  constructor() {}

  pass() {
    this.currentPlayer.update(p => (p === 'player1' ? 'player2' : 'player1'));
  }

  endTurn() {
    this.pass();
  }

  addScore(player: string, points: number) {
    this.scores.update(s => ({ ...s, [player]: (s[player] ?? 0) + points }));
    console.log(`Score updated: ${player} +${points}, total: ${this.scores()[player]}`);
  }

  showScores() {
    return this.scores();
  }

}
