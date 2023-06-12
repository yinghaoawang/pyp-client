export default class PlayerState {
  constructor(deckSize) {
    this.deck = [];
    this.discardPile = [];
    this.addUnknownToDeck(deckSize);
    this.hand = [];
  }

  addUnknownToDeck(count = 1) {
    for (let i = 0; i < count; i++) {
      this.deck.push({});
    }
  }
}
