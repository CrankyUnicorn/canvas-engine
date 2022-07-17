// IMPORT
import Main from './Main.js'
import { Rectangle, Circle, Typhography} from './libs/Shape.js'

// * no override for demo
class Canvas extends Main {
  constructor(props) {
    super(props)
  }
  
  // override
  start() {
    //this.shapeOne = new Rectangle({canvasContext: this.canvasContext, x:100, y:100, offsetX: 20, width: 50, height: 50, style: 'rgba(200, 0, 0, 0.5)'})
    //this.shapeOne = new Circle({canvasContext: this.canvasContext, x:200, y:200, width: 50, offsetX: 20, color: "#0000ff"})
    this.shapeOne = new Typhography({canvasContext: this.canvasContext, textContent: 'Hello World', x:200, y:300, textSize: 50, maxWidth:200, offsetX: 0, offsetY: 0, color: "#00ffff"})
    this.shapesArray.push(this.shapeOne)
  }

  // override
  update = () => {
    this.waveMotionX += 0.01; 
    
    this.shapeOne.scaleX = 1 + Math.cos(this.waveMotionX) * 0.5
    this.shapeOne.angle = Math.cos(this.waveMotionX) * 360
    //this.shapeOne.textSize = 30 + Math.cos(this.waveMotionX)*10
  }
}


// * wait and load main function
(() => {

  document.addEventListener('DOMContentLoaded', event => new Canvas().loop(event));
  
})()