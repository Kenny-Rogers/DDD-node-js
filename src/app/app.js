class Application {
  constructor({ db, server }) {
    this.db = db;
    this.server = server;
  }

  async start(container) {
    await this.db.connect();
    await this.server.start(container);
  }
}
