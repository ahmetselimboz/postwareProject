const { createClient } = require("redis");

let instance = null;

class Redis {
  constructor() {
    if (!instance) {
      this.client = createClient({
        socket: {
          reconnectStrategy: function (retries) {
            if (retries > 20) {
              console.log(
                "Too many attempts to reconnect. Redis connection was terminated"
              );
              return new Error("Too many retries.");
            } else {
              return retries * 500;
            }
          },
        },
        connectTimeout: 10000,
      });
      this.client
        .on("error", (err) => {
          console.error("Redis error:", err);
        })
        .connect();

      this.client.on("connect", ()=>{
        console.log("Redis Connected!");
      })
      instance = this;
    }
    return instance;
  }

  async set(key, value) {
    return this.client.set(key, value);
  }

  async get(key) {
    return this.client.get(key);
  }

  quit() {
    this.client.quit();
  }

  async exists(key){
    return this.client.exists(key)
  }

  async hSet(key, field, value) {
    return this.client.hSet(key, field, value);
  }
  async hGet(key, field) {
    return this.client.hGet(key, field);
  }

  async hGetAll(key) {
    return this.client.hGetAll(key);
  }
  async hVals(key) {
    return this.client.hVals(key);
  }
  async hDel(key, field) {
    return this.client.hDel(key, field);
  }

  expire(status, time){
    return this.client.expire(status, time)
  }
}

module.exports = new Redis();
