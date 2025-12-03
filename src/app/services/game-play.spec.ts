import { TestBed } from '@angular/core/testing';

import { GamePlay } from './game-play';

describe('GamePlay', () => {
  let service: GamePlay;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePlay);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
