// IMPORT
import { invertColor} from './Color.js'

// CLASSES
class Shape {
  constructor({
    name = '',
    shape = 0,
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    offsetX = 0,
    offsetY = 0,
    angle = 0,
    scaleX = 1,
    scaleY = 1,
    zIndex = 0,
    color = '#ff00ff',
    style = null,
    velocityX = 0,
    velocityY = 0,
    angularVelocity = 0,
    pivot = true,
    center = true,
    canvasContext = null
  })
  {
    this.shapesLookup = Object.freeze({
      rectangle: Symbol(1),
      circle: Symbol(2),
      text: Symbol(3),
    });
  
    this.piRadians = Math.PI / 180;

    this.name = name || new Date().toDateString() + 'Shape'
    this.shape = Number.isInteger(shape) ? shape : this.shapesLookup.shape;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.angle = angle;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.zIndex = zIndex
    this.color = color;
    this.style = style || color;
    this.velocityX = velocityX
    this.velocityY = velocityY
    this.angularVelocity = angularVelocity

    this.pivot = pivot;
    this.pivotFunc = () => {};
    this.setPivot(pivot)

    this.center = center;
    this.centerFunc = () => {};
    this.setCenter(center)
    
    this.calcTrans = [0, 0];
    this.calcRot = 0

    this.invertedColor = invertColor(this.style);
    this.invertedColorR = invertColor(this.style, {green: false});

    this.canvasContext = canvasContext;
  }

  setPivot (newPivotValue) {
    this.pivot = newPivotValue;

    if (newPivotValue) {
      this.pivotFunc = () => {
        this.canvasContext.fillStyle = this.invertedColorR;
        this.canvasContext.fillRect(- 2, - 1, 4, 2);
        this.canvasContext.fillRect(- 1, - 2, 2, 4);
      };
    } else {
      this.pivotFunc = () => {};
    }
  }

  setCenter (newCenterValue) {
    this.pivot = newCenterValue;

    if (newCenterValue) {
      this.centerFunc = () => {
        this.canvasContext.fillStyle = this.invertedColor;
        this.canvasContext.fillRect(
          this.offsetX * this.scaleX - 2,
          this.offsetY * this.scaleY - 2,
          4,
          4
        );
      };
    } else {
      this.centerFunc = () => {};
    }
  }
  
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.angle += this.angularVelocity;
  }

  preDraw() {
    this.canvasContext.fillStyle = this.style || this.color;

    this.calcTrans = [this.x + this.width / 2, this.y + this.height / 2];
    this.calcRot = this.angle * this.piRadians
    
    this.canvasContext.translate(this.calcTrans[0], this.calcTrans[1])
    this.canvasContext.rotate(this.calcRot)
  }
  
  postDraw() {
    this.centerFunc();
    this.pivotFunc();
    
    this.canvasContext.rotate(-this.calcRot)
    this.canvasContext.translate(-this.calcTrans[0], -this.calcTrans[1])
  }

  draw() {
    // ? is this needed
  }
}

// Rectangle
export class Rectangle extends Shape {
  constructor(props) {
    super(props)
  }

  draw() {
    this.preDraw()
    this.canvasContext.fillStyle = this.style;
    this.canvasContext.fillRect(
      -this.width * this.scaleX / 2 + this.offsetX * this.scaleX,
      -this.height * this.scaleY / 2 + this.offsetY * this.scaleY,
      this.width * this.scaleX,
      this.height * this.scaleY
    );
    this.postDraw()
  }
}

// Circle
export class Circle extends Shape {
  constructor(props) {
    super(props)
  }

  draw() {
    this.preDraw()
    const radius = this.width / 2;
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      this.offsetX * this.scaleX,
      this.offsetY * this.scaleY,
      radius * this.scaleX, 
      0, 
      2 * Math.PI
    );
    this.canvasContext.fill();
    this.postDraw()
  }
}

// Typography
export class Typhography extends Shape {
  constructor(props) {
    super(props);
    this.textContent = props.textContent || '';
    this.textSize = props.textSize || 18;
    this.maxWidth = props.maxWidth || this.textContent.length * this.textSize;
    this.midWidth = props.maxWidth / 2 || 0;
  }

  draw() {
    this.maxWidth =  this.textContent.toString().length * this.textSize / 2;
    this.height = this.textSize / Math.PI
    this.width = this.maxWidth
    
    this.preDraw()
    this.canvasContext.font = `${this.textSize}px serif`;
    this.canvasContext.fillText(
      this.textContent,
      this.offsetX - this.maxWidth / 2,
      this.offsetY + this.textSize / Math.PI,
      this.maxWidth
    );
    this.postDraw()
  }
}

