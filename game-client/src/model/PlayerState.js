export default class PlayerState {
  constructor(deckSize) {
    this.deckSize = deckSize;

    this.deck = [];
    this.discardPile = [];
    this.hand = [];
  }

  init() {
    this.addUnknownToDeck(this.deckSize);
  }

  getDeck() {
    return this.deck;
  }

  getDiscardPile() {
    return this.discardPile;
  }

  getHand() {
    return this.hand;
  }

  /**
   * Adds unknown cards to this player's deck
   * @param {number} count 
   */
  addUnknownToDeck(count = 1) {
    for (let i = 0; i < count; i++) {
      this.deck.push({unknown: true});
    }
  }
}