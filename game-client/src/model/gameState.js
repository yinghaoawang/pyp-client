import PlayerState from './PlayerState';

class GameState {
  constructor() {
    this.players = [];
    this.currentPlayerIndex = null;
    this.startingPlayerIndex = null;
    this.turn = 0;
  }

  isCurrentPlayerIndex(index) {
    return index == this.currentPlayerIndex;
  }

  isCurrentPlayerTurn() {
    if (this.currentPlayerIndex == null || this.startingPlayerIndex == null) {
      throw new Error('Player indices not set');
    }

    // TODO simplify this with math
    if (this.startingPlayerIndex === this.currentPlayerIndex) {
      if (this.turn % 2 === 1) return true;
      return false;
    } else {
      if (this.turn % 2 === 1) return false;
      return true;
    }
  }

  createPlayer(playerIndex, deckSize) {
    this.players[playerIndex] = new PlayerState(deckSize);
  }

  setStartingPlayerIndex(startingPlayerIndex) {
    if (this.startingPlayerIndex != null) {
      throw new Error('startingPlayerIndex is already set');
    }

    this.startingPlayerIndex = startingPlayerIndex;
  }

  setCurrentPlayerIndex(currentPlayerIndex) {
    if (this.currentPlayerIndex != null) {
      throw new Error('currentPlayerIndex is already set');
    }

    this.currentPlayerIndex = currentPlayerIndex;
  }

  nextTurn() {
    this.turn++;
  }

  getOtherPlayer() {
    if (this.currentPlayerIndex == null) {
      console.error('Current player index is null');
      return null;
    }

    return this.players[this.getOtherPlayerIndex()];
  }

  /**
   * Checks if playerIndex matches the current player's index
   * @param {number} playerIndex 
   * @returns boolean
   */
  isCurrentPlayer(playerIndex) {
    return this.currentPlayerIndex === playerIndex;
  }

  getPlayerByIndex(playerIndex) {
    return this.players[playerIndex];
  }

  getOtherPlayerIndex() {
    if (this.currentPlayerIndex == null) {
      console.error('Current player index is null');
      return null;
    }

    if (this.currentPlayerIndex === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  getPlayerByIndex(index) {
    return this.players[index];
  }

  getCurrentPlayerIndex() {
    return this.currentPlayerIndex;
  }

  getCurrentPlayer() {
    if (this.currentPlayerIndex == null) {
      console.error('Current player index is null');
      return null;
    }
    return this.players[this.currentPlayerIndex];
  }
}

export default GameState;
