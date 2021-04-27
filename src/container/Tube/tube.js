class Tube {
  constructor(height, width, fluidNum = 4, fluidLevel) {
    this.height = height;
    this.width = width;
    this.area = this.height * this.width;
    this.fluidNum = fluidNum;
    this.fluidLevel = fluidLevel || fluidNum;
    this.fluidHeight = height / (fluidNum + 1);
    this.fluidArea = this.fluidHeight * this.width;
    this.maxFluidArea = this.maxfluidHeight * width * fluidNum;
  }
  get fluidTotalArea() {
    return this.fluidHeight * this.width * this.fluidLevel;
  }
  get isTriangle() {
    //console.log(this.fluidTotalArea, this.area / 2);
    return this.area / 2 >= this.fluidTotalArea;
  }
  findTurnRad() {
    let { fluidTotalArea, width, height, isTriangle } = this;
    //check shape of the fluid; trapezoid or triangle
    //find trapezoid's smaller side , triangle's height
    let triangleHeight = isTriangle
      ? height
      : height - ((2 * fluidTotalArea) / width - height);
    //calculate opposite side of the triangle
    let base = (2 * fluidTotalArea) / height;
    //base can't be bigger than tube's width;
    base = base > width ? width : base;
    console.log("O.side: " + base);
    //find precise angle when fluid reach the edge of the tube
    console.log("tH: " + triangleHeight);
    return Math.atan(triangleHeight / base);
  }
  findTurnDeg() {
    return (this.findTurnRad() * 180) / Math.PI;
  }

  getFluidShapeByRad(rad, area, fluidLevel) {
    let shape = {};
    shape.beta = rad;
    shape.alpha = Math.PI / 2 - rad;
    shape.a = Math.sqrt((2 * area * fluidLevel) / Math.tan(shape.beta));
    shape.area = area * fluidLevel;
    if (shape.a > this.width) {
      shape.a = this.width;
      shape.isTriangle = false;
      shape.b = shape.a / Math.tan(shape.alpha);
      shape.triangleArea = (shape.a * shape.b) / 2;
      shape.height = (shape.area - shape.triangleArea) / shape.a + shape.b;
    } else {
      shape.b = shape.a / Math.tan(shape.alpha);
      shape.isTriangle = true;
      shape.height = shape.b;
    }
    return shape;
  }
}
const tube = new Tube(250, 50);
tube.fluidLevel = 3;
console.log(tube.getFluidShapeByRad(tube.findTurnRad(), tube.fluidArea, 3));
