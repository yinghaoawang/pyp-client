class CardEngine {
  constructor(gameState) {
    this.gameState = gameState;
  }

  drawCards({ turn, playerIndex, cards }) {
    console.log('>>>Drawing cards in engine');
    const targetPlayer = this.gameState.getPlayerByIndex(playerIndex);
    for (let i = 0; i < cards.length; i++) {
      if (targetPlayer.deck.length === 0) throw new Error('Cannot draw from empty deck');
      targetPlayer.deck.pop();
    }
    targetPlayer.hand.push(...cards);
  }
}

export default CardEngine;
