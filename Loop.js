// * wait, setup listners and run main loop function
export const loop = (CanvasClass) => {
  document.addEventListener('DOMContentLoaded', event => {
    const canvasClass = new CanvasClass();

    window.addEventListener('keydown', event => canvasClass.input(event), false);
    window.addEventListener('keyup', event => canvasClass.input(event), false);
    document.addEventListener('mousemove', event => canvasClass.input(event), false);
    document.addEventListener('click', event => canvasClass.input(event), false);
    document.addEventListener('mouseover', event => canvasClass.input(event), false);
    document.addEventListener('mousedown', event => canvasClass.input(event), false);

    canvasClass.loop(event)
  });
}

export default loop