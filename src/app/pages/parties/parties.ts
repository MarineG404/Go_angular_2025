import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GamePlay, SavedParty } from '../../services/game-play';

@Component({
  selector: 'app-parties',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './parties.html',
  styleUrls: ['./parties.css'],
})
export class Parties implements OnInit {
  parties: SavedParty[] = [];

  constructor(private gamePlay: GamePlay, private router: Router) {}

  ngOnInit() {
    this.loadParties();
  }

  loadParties() {
    this.parties = this.gamePlay.getParties();
  }

  charge(id: string) {
    if (this.gamePlay.loadPartyById(id)) {
      // navigate back to game
      this.router.navigate(['/']);
    } else {
      console.error('Failed to load party', id);
    }
  }

  deleteParty(id: string) {
    if (this.gamePlay.deletePartyById(id)) {
      this.loadParties(); // refresh list
    }
  }
}
