function drawColorWheel(lightness) {
  // Inspired by https://medium.com/@bantic/hand-coding-a-color-wheel-with-canvas-78256c9d7d43
  let image = colorWheelCTX.createImageData(config.canvasDimension, config.canvasDimension);
  let data = image.data;

  let padding = 10;

  for( let x = 0; x < config.canvasDimension; x++) {
    for( let y = 0; y < config.canvasDimension; y++) {

      let shiftedX = x - Center;
      let shiftedY = y - Center;
      let [radius, theta] = CartesianToPolar(shiftedX, shiftedY);
      theta = (theta + 90);
      theta = (theta > 360) ? theta - 360 : theta;

      // // If the point is outside the circle, skip it
      if (radius > config.Radius + padding) continue;

      let [red, green, blue] = HSLtoRGB(theta, radius/100, lightness);
      let alpha = 255;

      let index = (x + y*config.canvasDimension) * 4;
      data[index + 0] = red;
      data[index + 1] = green;
      data[index + 2] = blue;
      data[index + 3] = alpha;
    }
  }
  
  colorWheelData = image.data;
  colorWheelCTX.putImageData(image, 0, 0);

  // Adding a white outer circle to mask jarred edges
  colorWheelCTX.beginPath();
  colorWheelCTX.lineWidth = padding;
  colorWheelCTX.strokeStyle = 'white';
  colorWheelCTX.arc(Center, Center, config.Radius + padding, 0, Math.PI * 2, true);
  colorWheelCTX.stroke();
}

function renderLightSlider() {
  let image = ctx.createImageData(config.canvasDimension, config.canvasDimension);
  let data = image.data;

  for( let x = 0; x < config.canvasDimension; x++) {
    let [red, green, blue] = HSLtoRGB(x*360/config.canvasDimension, 1, lightness);
    let alpha = 255;

    for (let y = 0; y < 20; y++) {
      let index = (y*config.canvasDimension + x) * 4;
      data[index + 0] = red;
      data[index + 1] = green;
      data[index + 2] = blue;
      data[index + 3] = alpha;
    }
  }
  
  ctx.putImageData(image, 0, 0);
}
