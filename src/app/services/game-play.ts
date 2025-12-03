import { Injectable, signal, WritableSignal } from '@angular/core';

export interface SavedParty {
  id: string;
  player1: string;
  player2: string;
  date: string;
  state: {
    board: string[][];
    currentPlayer: string;
    scores: { [key: string]: number };
    passedTurns: number;
    end: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GamePlay {

  // reactive state using Angular signals
  currentPlayer: WritableSignal<string> = signal('player1');
  scores = signal<{ [key: string]: number }>({ player1: 0, player2: 0 });
  board = signal<string[][]>(this.createEmptyBoard());
  passedTurns: number = 0;
  end: boolean = false;

  private readonly STORAGE_KEY = 'go-game-save';
  private readonly PARTIES_KEY = 'go-parties-list';

  constructor() {
    this.loadGame();
  }

  private createEmptyBoard(): string[][] {
    return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ''));
  }

  switchPlayer() {
    this.currentPlayer.update(p => (p === 'player1' ? 'player2' : 'player1'));
  }

  pass() {
    this.switchPlayer();
    this.passedTurns++;
    if (this.passedTurns >= 2) {
      this.end = true;
    }
    this.saveGame();
  }

  endTurn() {
    this.switchPlayer();
    this.saveGame();
  }

  addScore(player: string, points: number) {
    this.scores.update(s => ({ ...s, [player]: (s[player] ?? 0) + points }));
    this.saveGame();
  }

  /** Place a stone on the board for current player */
  placeStone(i: number, j: number): boolean {
    const b = this.board();
    if (b[i] && !b[i][j]) {
      b[i][j] = this.currentPlayer();
      this.board.set([...b]); // trigger reactivity
      this.passedTurns = 0;
      this.saveGame();
      return true;
    }
    return false;
  }

  /** Remove an opponent stone (capture) */
  removeStone(i: number, j: number): boolean {
    const b = this.board();
    const current = this.currentPlayer();
    const opponent = current === 'player1' ? 'player2' : 'player1';
    if (b[i]?.[j] === opponent) {
      b[i][j] = '';
      this.board.set([...b]);
      this.addScore(current, 1);
      this.passedTurns = 0;
      return true;
    }
    return false;
  }

  resetGame() {
    this.board.set(this.createEmptyBoard());
    this.scores.set({ player1: 0, player2: 0 });
    this.currentPlayer.set('player1');
    this.passedTurns = 0;
    this.end = false;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getWinner() {
    if (this.scores()['player1'] > this.scores()['player2']) {
      return 'player1';
    } else if (this.scores()['player2'] > this.scores()['player1']) {
      return 'player2';
    } else {
      return 'draw';
    }
  }

  /** Save current game state to localStorage */
  saveGame() {
    const state = {
      board: this.board(),
      currentPlayer: this.currentPlayer(),
      scores: this.scores(),
      passedTurns: this.passedTurns,
      end: this.end,
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  /** Load game state from localStorage (if any) */
  loadGame(): boolean {
    const json = localStorage.getItem(this.STORAGE_KEY);
    if (!json) return false;
    return this.importGame(json);
  }

  /** Export current game state as JSON string (for download) */
  exportGame(): string {
    const state = {
      board: this.board(),
      currentPlayer: this.currentPlayer(),
      scores: this.scores(),
      passedTurns: this.passedTurns,
      end: this.end,
    };
    return JSON.stringify(state, null, 2);
  }

  /** Import game state from a JSON string */
  importGame(json: string): boolean {
    try {
      const state = JSON.parse(json);
      if (state.board) this.board.set(state.board);
      if (state.currentPlayer) this.currentPlayer.set(state.currentPlayer);
      if (state.scores) this.scores.set(state.scores);
      if (typeof state.passedTurns === 'number') this.passedTurns = state.passedTurns;
      if (typeof state.end === 'boolean') this.end = state.end;
      this.saveGame(); // persist imported state
      return true;
    } catch {
      return false;
    }
  }

  // ========== PARTIES LIST MANAGEMENT ==========

  /** Get all saved parties from localStorage */
  getParties(): SavedParty[] {
    const json = localStorage.getItem(this.PARTIES_KEY);
    if (!json) return [];
    try {
      return JSON.parse(json) as SavedParty[];
    } catch {
      return [];
    }
  }

  /** Save current game as a new party in the list */
  savePartyToList(player1Name = 'Player 1', player2Name = 'Player 2'): string {
    const parties = this.getParties();
    const id = Date.now().toString();
    const party: SavedParty = {
      id,
      player1: player1Name,
      player2: player2Name,
      date: new Date().toISOString(),
      state: {
        board: this.board(),
        currentPlayer: this.currentPlayer(),
        scores: this.scores(),
        passedTurns: this.passedTurns,
        end: this.end,
      },
    };
    parties.push(party);
    localStorage.setItem(this.PARTIES_KEY, JSON.stringify(parties));
    return id;
  }

  /** Load a party by ID */
  loadPartyById(id: string): boolean {
    const parties = this.getParties();
    const party = parties.find(p => p.id === id);
    if (!party) return false;
    this.board.set(party.state.board);
    this.currentPlayer.set(party.state.currentPlayer);
    this.scores.set(party.state.scores);
    this.passedTurns = party.state.passedTurns;
    this.end = party.state.end;
    this.saveGame();
    return true;
  }

  /** Delete a party by ID */
  deletePartyById(id: string): boolean {
    let parties = this.getParties();
    const initialLength = parties.length;
    parties = parties.filter(p => p.id !== id);
    if (parties.length === initialLength) return false;
    localStorage.setItem(this.PARTIES_KEY, JSON.stringify(parties));
    return true;
  }

}
