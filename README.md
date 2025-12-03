
# Go2 — Angular Go Board Prototype

This repository contains a small Angular application (prototype) for a Go-like board game. It demonstrates a playable board UI, simple game state management using Angular Signals, save/load/export of games, and a small admin page to manage saved parties.

This README explains how to set up the project locally, run the dev server, and use the main features.

## Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Angular CLI (optional, you can use the local `ng` via npm scripts)

Check your versions:

```bash
node -v
npm -v
```

If you have Angular CLI installed globally, you can use `ng` commands. Otherwise use the project scripts (npm run).

## Install

From the project root:

```bash
npm install
```

## Development server

Start the dev server and open the app in your browser:

```bash
npm start
# or
ng serve
```

Open http://localhost:4200/ — the app reloads on file changes.

## Available scripts

- `npm start` — runs `ng serve` (dev server)

Check `package.json` for details.

## Features / How to use

- Play the board: left-click to place a stone for the current player; right-click removes an opponent's stone (and increases your score).
- Theme toggle: use the button in the header to switch light/dark theme. The app stores the theme in `localStorage` and sets `data-theme` on the `<html>` element.
- Save / Load:
	- `Save Game` downloads the current game as `go-game-save.json`.
	- `Load Game` lets you pick a previously exported JSON file to restore the game state.
	- `Sauvegarder la partie` saves the current state to the app's internal list of parties (stored in `localStorage`).
	- `Voir les parties` opens the Parties page where you can load or delete previously saved parties.

## Saving / Parties

The `GamePlay` service manages a list of saved parties in `localStorage` under the key `go-parties-list`. Each saved party stores a snapshot of the board, current player, scores and metadata (date, id). Use the `Parties` page to manage them.

## Export / Import JSON

- Export: the app serializes the game state to an indented JSON string so you can store it or share it.
- Import: choose a valid `go-game-save.json` exported from this app to restore the board and scores.
