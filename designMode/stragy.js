const Ball = {
  x: 0,
  y: 0,
};
const controller = {
  goTop: (ball) => {
    ball.y = ball.y + 1;
  },
  goBottom: (ball) => {
    ball.y = ball.y - 1;
  },
  goLeft: (ball) => {
    ball.x = ball.x - 1;
  },
  goRight: (ball) => {
    ball.x = ball.x + 1;
  }
}
controller.goTop(Ball);
console.log(Ball);