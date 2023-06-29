import { getBlankCard } from '../data/sample/cards';

export default class PlayerState {
  constructor(deckSize) {
    this.deckSize = deckSize;

    this.deck = [];
    this.discardPile = [];
    this.hand = [];
    this.field = [];
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

  getField() {
    return this.field;
  }

  /**
   * Adds unknown cards to this player's deck
   * @param {number} count 
   */
  addUnknownToDeck(count = 1) {
    for (let i = 0; i < count; i++) {
      this.deck.push(getBlankCard());
    }
  }
}
