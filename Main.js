import loop from './Loop.js'
import { Rectangle, Circle, Typhography, Line }from './libs/Shape.js'

export default class Main {
  static loop = loop;
  static Rectangle = Rectangle;
  static Circle = Circle;
  static Typhography = Typhography;
  static Line = Line;

  constructor ({canvasProps = null, cycleProps = null} = {}) {
    //* array of geometric objects
    this.shapesArray = [];

    // * inputs
    this.mousePos = [];
    this.keysDown = [];
    this.clickDown = false;

    // * js vanilla canvas
    this.canvas;
    this.canvasContext;

    this.canvasDefinition = canvasProps || {
      canvasWidth: 500,
      canvasHeight: 500,
      canvasCssText: 'background: #ffe7e8; border: 2px solid #e66465;'
    }

    // * miliseconds delay between cycles/frames
    this.canvasCycleWait = cycleProps || 1000 / 60;

    this.update =  () => {}

    // ! remove this
    this.waveMotionX = 0
  }

  // FUNCTIONS 
  #setup = (props) => {
    this.canvas = document.createElement('canvas')
    this.canvas.style.cssText = props.canvasCssText
    this.canvas.width = props.canvasWidth;
    this.canvas.height = props.canvasHeight;
    this.canvas.id = 'canvas'

    this.canvasContext = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas)

    console.log('Canvas Created');
  }

  // * function to be overwriten
  start() {
    // adds object to be rendered
    this.rectOne = new Rectangle({canvasContext: this.canvasContext, x:100, y:100, offsetX: 20, width: 50, height: 50, style: 'rgba(200, 0, 0, 0.5)'})
    this.rectTwo = new Rectangle({canvasContext: this.canvasContext, x:0, y:0, width: 50, height: 50, style: 'rgba(0, 200, 0, 0.5)'})
    this.circleOne = new Circle({canvasContext: this.canvasContext, x:200, y:200, width: 50, color: "#0000ff"})
    this.typoOne = new Typhography({canvasContext: this.canvasContext, textContent: 'Hello World', x:200, y:300, textSize: 50, offsetX: 100, maxWidth:200, offsetY: 25, color: "#00ffff"})
    this.typoTwo = new Typhography({canvasContext: this.canvasContext, x:200, y:350, color: "#ffff00"})

    this.shapesArray.push(this.rectOne)
    this.shapesArray.push(this.rectTwo)
    this.shapesArray.push(this.circleOne)
    this.shapesArray.push(this.typoOne)
    this.shapesArray.push(this.typoTwo)

    this.update = () => {
      this.waveMotionX += 0.01; 
    
      this.rectOne.scaleX = 1 + Math.cos(this.waveMotionX) * 0.5
      this.rectOne.angle = Math.cos(this.waveMotionX)*360
      this.rectTwo.x += Math.cos(this.waveMotionX)
      this.circleOne.y += Math.cos(this.waveMotionX)
      this.typoOne.angle = Math.cos(this.waveMotionX)*360
      this.typoOne.textSize = 30 + Math.cos(this.waveMotionX)*10
      this.typoTwo.textContent = Math.cos(this.waveMotionX)
    }
  }

  input = (event) => {
    // user input
    if (event.type === 'mousemove') {
      this.mousePos = [
        event.clientX - this.canvas.offsetLeft,
        event.clientY - this.canvas.offsetTop,
      ]
    } else if (event.type === 'mousedown') {
      this.clickDown = true
    } else if (event.type === 'click') {
      this.clickDown = false
      this.keysDown.push(event)
    } else if (event.type === 'keydown') {
      this.keysDown.push(event)
    }
  }

  #update = () => {
    this.shapesArray.map( shape => shape.update() )
  }

  #draw = () => {
    // clear the canvas
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // reorder objects by z-index
    // todo

    // run draw
    this.shapesArray.map( shape => shape.draw() )
  }

  #post =  () => {
    // manipulate drawned output
    // todo
  }

  #cleanInput = () => {
    // user input clean
    this.keysDown = []
  }

  loop = (event) => {
    console.log('DOM fully loaded and parsed');

    this.#setup(this.canvasDefinition);
    this.start();

    // ? draw should be dynamic refresh and update static 
    const mainLoop = setInterval( () => {
        this.update();
        this.#update();
        this.#update();
        this.#draw();
        this.#post();
        this.#cleanInput();
    }, this.canvasCycleWait)
  }
}
