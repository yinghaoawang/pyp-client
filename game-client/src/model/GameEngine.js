import testPacketSender from '../data/sample/testPacketSender';
import PlayerState from './PlayerState';
import userState from './userState';

export default class GameEngine {
  constructor(gameState) {
    this.gameState = gameState;
  }

  initializePlayers({ currentPlayerIndex }) {
    if (currentPlayerIndex == null)
      throw new Error('currentPlayerIndex required to initialize players');

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

  playCard(playerIndex, cardIndex) {
    const player = this.gameState.getPlayerByIndex(playerIndex);

    if (cardIndex < 0 || cardIndex > player.hand.length - 1) {
      throw new Error('Hand card index out of bounds');
    }
    const card = player.hand.splice(cardIndex, 1)[0];
    player.field.push(card);
  }

  emitPlayCard(cardIndex) {
    if (process.env.NODE_ENV === 'development') {
      testPacketSender.sendPacket(
        'playCard',
        { cardIndex: cardIndex },
        userState.getCurrentUser()
      );
    } else {
      // real socket emit
    }
  }
}
