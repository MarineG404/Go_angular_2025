import { Routes } from '@angular/router';
import { Parties } from './pages/parties/parties';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'parties', component: Parties },
];
