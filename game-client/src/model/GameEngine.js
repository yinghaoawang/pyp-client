import PlayerState from './PlayerState';

export default class GameEngine {
  constructor(gameState) {
    this.gameState = gameState;
  }

  initializePlayers({ currentPlayerIndex }) {
    if (currentPlayerIndex == null) throw new Error('currentPlayerIndex required to initialize players');

    this.gameState.setCurrentPlayerIndex(currentPlayerIndex);
    this.gameState.createPlayer(this.gameState.getCurrentPlayerIndex(), 20);
    this.gameState.createPlayer(this.gameState.getOtherPlayerIndex(), 20);
    this.gameState.getOtherPlayer().init();
    this.gameState.getCurrentPlayer().init();
  }

  drawCard({ turn, playerIndex, card }) {
    console.log('>>>Drawing card in engine');
    const targetPlayer = this.gameState.getPlayerByIndex(playerIndex);
    if (targetPlayer.deck.length === 0)
      throw new Error('Cannot draw from empty deck');
    targetPlayer.deck.pop();
    targetPlayer.hand.push(card);
  }

  startGame(startingPlayerIndex) {
    this.gameState.setStartingPlayerIndex(startingPlayerIndex);
  }
}