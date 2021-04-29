export default class Tube {
  constructor(height, width, fluidMaxLevel = 4, fluidLevel) {
    this.height = height;
    this.width = width;
    this.area = this.height * this.width;
    this.fluidMaxLevel = fluidMaxLevel;
    this.fluidLevel = fluidLevel || fluidMaxLevel;
    this.fluidHeight = height / (fluidMaxLevel + 1);
    this.fluidArea = this.fluidHeight * this.width;
    this.maxFluidArea = this.maxfluidHeight * width * fluidMaxLevel;
  }
  getFluidTotalArea(fluidLevel) {
    return this.fluidHeight * this.width * fluidLevel;
  }
  isTriangle(fluidLevel) {
    //console.log(this.fluidTotalArea, this.area / 2);
    return this.area / 2 >= this.getFluidTotalArea(fluidLevel);
  }
  findTurnRad(fluidLevel) {
    let { width, height } = this;
    let isTriangle = this.isTriangle(fluidLevel);
    let fluidTotalArea = this.getFluidTotalArea(fluidLevel);
    //check shape of the fluid; trapezoid or triangle
    //find trapezoid's smaller side , triangle's height
    let triangleHeight = isTriangle
      ? height
      : height - ((2 * fluidTotalArea) / width - height);
    //calculate opposite side of the triangle
    let base = (2 * fluidTotalArea) / height;
    //base can't be bigger than tube's width;
    base = base > width ? width : base;
    //find precise angle when fluid reach the edge of the tube
    return Math.atan(triangleHeight / base);
  }
  radToDeg(rad) {
    return (rad * 180) / Math.PI;
  }

  getFluidShapeByRad(rad, area, fluidLevel) {
    let shape = {};
    shape.beta = rad; //right-angled triangle bottom angle
    shape.alpha = Math.PI / 2 - rad; //right-angled triangle top angle
    shape.a = Math.sqrt((2 * area * fluidLevel) / Math.tan(shape.beta));
    shape.area = area * fluidLevel;
    //is shape is a trapezium
    if (shape.a > this.width) {
      shape.a = this.width;
      shape.isTriangle = false;
      shape.b = shape.a / Math.tan(shape.alpha);
      shape.triangleArea = (shape.a * shape.b) / 2;
      shape.height = (shape.area - shape.triangleArea) / shape.a + shape.b;
      //if shape is a triangle
    } else {
      shape.b = shape.a / Math.tan(shape.alpha);
      shape.isTriangle = true;
      shape.height = shape.b;
    }
    return shape;
  }
  getAllFluidShapeByRad(rad, fluidLevel) {
    const shapes = [];
    //Returns a fluid object for each level.
    for (let i = fluidLevel; i > 0; i--) {
      shapes.push(tube.getFluidShapeByRad(rad, tube.fluidArea, i));
    }
    //Adds the fluid level difference to each fluid object.
    shapes.forEach((shape, i, shapes) => {
      let previousHeight = i === shapes.length - 1 ? 0 : shapes[i + 1].height;
      let b = shape.height - previousHeight;
      shape.fluidHeight = Math.tan(shape.alpha) * b;
    });
    for (let i = this.fluidMaxLevel - fluidLevel; i > 0; i--) {
      shapes.unshift({ fluidHeight: 0 });
    }
    return shapes;
  }
  getAllAngles() {
    const states = [];
    for (let fluidLevel = this.fluidMaxLevel; fluidLevel > 0; fluidLevel--)
      states.push(this.findTurnRad(fluidLevel));
    return states;
  }
  //collecting the parameters needed for animation
  get fluidAnimationParams() {
    let degs = this.getAllAngles();
    const stages = degs.map((deg, i) => {
      return this.getAllFluidShapeByRad(
        deg,
        this.fluidMaxLevel - i
      ).map((shape) => parseInt(shape.fluidHeight));
    });
    degs = degs.map((rad) => parseInt(this.radToDeg(rad)));
    degs.push(90);
    degs.unshift(0);
    let stageLast = [...stages[0]].map((height) => 0);
    let stage0 = [...stages[0]].map((height) => this.fluidHeight);
    stages.push(stageLast);
    stages.unshift(stage0);
    return { degs: degs, stages: stages };
  }
}
const tube = new Tube(250, 50);
console.log(tube.fluidAnimationParams);
