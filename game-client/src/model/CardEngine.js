class CardEngine {
  constructor(gameState) {
    this.gameState = gameState;
  }

  drawCard({ turn, playerIndex, card }) {
    console.log('>>>Drawing card in engine');
    const targetPlayer = this.gameState.getPlayerByIndex(playerIndex);
    if (targetPlayer.deck.length === 0)
      throw new Error('Cannot draw from empty deck');
    targetPlayer.deck.pop();
    targetPlayer.hand.push(card);
  }
}

export default CardEngine;
