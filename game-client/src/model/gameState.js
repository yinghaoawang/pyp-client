import PlayerState from './PlayerState';

class GameState {
  constructor() {
    this.players = [];
    this.currentPlayerIndex = null;
  }

  initializePlayers({ currentPlayerIndex }) {
    if (currentPlayerIndex == null) throw new Error('currentPlayerIndex required to initialize players');

    this.currentPlayerIndex = currentPlayerIndex;
    this.players[this.getCurrentPlayerIndex()] = new PlayerState(20);
    this.players[this.getOtherPlayerIndex()] = new PlayerState(20);
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
