class GameEventQueue {
  constructor(gameState, cardEngine) {
    this.eventQueue = [];
    this.gameState = gameState;
    this.cardEngine = cardEngine;
    this.curentEvent = null;
    this.isPaused = false;
  }

  update() {
    if (this.isPaused) return;

    if (this.currentEvent == null) {
      if (this.eventQueue.length === 0) {
        console.log('Event queue empty');
        return;
      }

      this.currentEvent = this.eventQueue.shift();
      console.log('Starting new event ' + this.currentEvent.name);
      console.log(this.currentEvent);
      new Promise((resolve, reject) =>
        this.currentEvent.command(resolve, reject)
      )
        .then(() => {
          this.currentEvent = null;
          console.log('Event finished');
        })
        .catch((err) => {
          alert('Fatal: ' + err.message);
          console.error(err);
        });
    }
  }

  checkIsRunning() {
    return this.currentEvent != null;
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
        this.enqueue({
          name: eventName,
          command: (resolve, reject) => {
            setTimeout(() => {
              this.gameState.setPlayerIndex(payload);
              console.log('Player index has been set');
              resolve();
            }, 1000);
          }
        });
        break;
      case 'drawCards':
        this.enqueue({
          name: eventName,
          command: (resolve, reject) => {
            setTimeout(() => {
              this.cardEngine.drawCards(payload);
              console.log('Cards drawn');
              resolve();
            }, 1000);
          }
        });

        break;
      default:
        console.error(`Unrecognized event: ${eventName}`);
        break;
    }
  }
}

export default GameEventQueue;
