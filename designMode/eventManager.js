class EventEmiter {
  constructor() {
    this.events = {
    };
  }
  on(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback)
    } else {
      this.events[eventName] = [callback];
    }
  }
  emit(eventName, ...rest) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(cb => {
        cb.apply(this, rest);
      })
    }
  }
  removeEvent(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] 
    }
  }
}