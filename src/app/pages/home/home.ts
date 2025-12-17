import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameBoard } from '../../components/game-board/game-board';
import { Cells } from '../../components/cells/cells';
import { GamePlay } from '../../services/game-play';
import { ThemeToggle } from '../../components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, GameBoard, Cells, ThemeToggle],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  constructor(private gamePlay: GamePlay) {}

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

  saveGameToFile() {
    const json = this.gamePlay.exportGame();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'go-game-save.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  loadGameFromFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const json = reader.result as string;
      if (this.gamePlay.importGame(json)) {
        console.log('Game loaded successfully!');
      } else {
        console.error('Failed to load game.');
      }
    };
    reader.readAsText(file);
  }

  saveParty() {
    const id = this.gamePlay.savePartyToList('Player 1', 'Player 2');
    console.log('Party saved with ID:', id);
    alert('Party saved!');
  }
}
