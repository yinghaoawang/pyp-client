class TestPacketSender {
  constructor() {

  }

  setGame(game) {
    this.game = game;
  }

  sendPacket (eventName, payload, user) {
    if (this.game == null) throw new Error('Game reference is null');

    console.log(`Test packet: ${eventName}`, payload, user);
    
    const packet = {
      eventName,
      payload: {
        ...payload
      }
    }
    this.game.processPacket(packet);
  }
}

const testPacketSender = new TestPacketSender();
export default testPacketSender;
