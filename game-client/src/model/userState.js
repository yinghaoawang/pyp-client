class UserState {
  constructor() {}

  loadUser(user) {
    this.isTesting = false;
    this.user = user;
  }

  loadTestUser(user) {
    this.isTesting = true;
    this.user = user || { id: 9, username: 'guywho-testmygame' };
  }

  getCurrentUser() {
    return this.user;
  }
}

const userState = new UserState();

export default userState;
  