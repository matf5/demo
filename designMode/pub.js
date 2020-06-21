class SubPub {
  constructor() {
    this.observers = {};
  }
  subscrbe(topic, callback) {
    if (!this.observers[topic]) {
      this.observers[topic] = [];
    }
    this.observers[topic].push(callback);
  }
  publish(topic, ...rest) {
    let callbacks = this.observers[topic] || [];
    callbacks.forEach(cb => cb.apply(this, rest));
  }
}