"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function async1() {
  return _async.apply(this, arguments);
}

function _async() {
  _async = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('1');
            _context.t0 = console;
            _context.next = 4;
            return async2();

          case 4:
            _context.t1 = _context.sent;

            _context.t0.log.call(_context.t0, _context.t1);

            console.log('2');

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _async.apply(this, arguments);
}

function async2() {
  return _async2.apply(this, arguments);
}

function _async2() {
  _async2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('3');
            setTimeout(function () {
              return console.log('4');
            }, 0);
            console.log('5');

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _async2.apply(this, arguments);
}

console.log('6');
setTimeout(function () {
  console.log('7');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('8');
  resolve();
}).then(function () {
  console.log('9');
});
console.log('10');