class GameEventQueue {
  constructor(gameState, cardEngine) {
    this.eventQueue = [];
    this.gameState = gameState;
    this.cardEngine = cardEngine;
  }

  enqueue(action) {
    this.eventQueue.push(action);
  }

  peek() {
    return this.eventQueue[0];
  }

  handleEvent(eventName, payload) {
    switch (eventName) {
      case 'error':
        alert(`Error: ${payload.message}`);
        break;
      case 'message':
        alert(payload);
        break;
      case 'setPlayerIndex':
        this.enqueue(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              this.gameState.setPlayerIndex(payload);
              console.log('Player index has been set');
              resolve();
            }, 1000);
          })
        );
        break;
      case 'drawCards':
        this.enqueue(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              this.cardEngine.drawCards(payload);
              console.log('Cards drawn');
              resolve();
            }, 1000);
          })
        );

        break;
      default:
        console.error(`Unrecognized event: ${eventName}`);
        break;
    }
  }
}

export default GameEventQueue;
