function Vehicle() {
  this.engines = 1;
}
Vehicle.prototype.ingnition = function() {
  console.log('Turning on my engine');
}
Vehicle.prototype.drive = function() {
  this.ingnition();
  console.log('Steering and moving forward');
}
function Car() {
  const car = new Vehicle();
  car.wheels = 4;
  const vehDrive = car.drive;
  car.drive = function () {
    vehDrive.call(this);
    console.log(
      "Rolling on all " + this.wheels + " wheels!"
    );
  }
  return car;
}
const myCar = new Car();
myCar.drive();