import PlayerState from './PlayerState';

class GameState {
  constructor() {
    this.players = [];
    this.currentPlayerIndex = null;
    this.startingPlayerIndex = null;
    this.turn = 0;
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
