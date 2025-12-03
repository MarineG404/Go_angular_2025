import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrls: ['./theme-toggle.css'],
})
export class ThemeToggle implements OnInit {

  isDarkTheme: boolean = this.getCurrentTheme() === 'dark';

  ngOnInit(): void {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      this.setTheme(stored);
    }
  }

  toggleTheme() {
    const current = this.getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    this.isDarkTheme = !this.isDarkTheme; // Ajoute cette ligne
  }

  getCurrentTheme(): 'dark' | 'light' {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    const stored = localStorage.getItem('theme');
    return stored === 'dark' ? 'dark' : 'light';
  }

  private setTheme(theme: 'dark' | 'light') {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
