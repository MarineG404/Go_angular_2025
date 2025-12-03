import { Component } from '@angular/core';

@Component({
  selector: 'app-cells',
  imports: [],
  templateUrl: './cells.html',
  styleUrl: './cells.css',
})
export class Cells {
  board: string[][] = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ''));
}
