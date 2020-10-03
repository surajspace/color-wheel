function HEXtoRGB(hexString) {
  const hexLookup = "0123456789abcdef";
  let r, g, b;

  let _hex = hexString.toLowerCase().split("");
  _hex.shift(); // Remove #

  if (_hex.length != 6) {
    if (_hex.length === 3)
      _hex = [_hex[0], _hex[0], _hex[1], _hex[1], _hex[2], _hex[3]];
    else {
      console.log("Invalid Hex code: ", hexString);
      return null;
    }
  }

  r = hexLookup.indexOf(_hex[0]) * 16 + hexLookup.indexOf(_hex[1]);
  g = hexLookup.indexOf(_hex[2]) * 16 + hexLookup.indexOf(_hex[3]);
  b = hexLookup.indexOf(_hex[4]) * 16 + hexLookup.indexOf(_hex[5]);

  return [r, g, b];
}

function RGBtoHex(r, g, b) {
  let rgbHex = [r, g, b].map((color) => Math.round(color).toString(16));
  rgbHex = rgbHex.map((color) => (color.length === 1 ? "0" + color : color));

  return "#" + rgbHex.join("");
}

function RGBtoHSL(r, g, b) {
  let h, s, l;

  const CMAX = Math.max(r, g, b);
  const CMIN = Math.min(r, g, b);

  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;

  const Cmax = Math.max(r1, g1, b1);
  const Cmin = Math.min(r1, g1, b1);
  const delta = Cmax - Cmin;

  // Calculating Lightness l
  l = (Cmax + Cmin) / 2;

  // Calculating Saturation s
  if (CMAX - CMIN === 0) {
    s = 0;
  } else {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  // Calculating Hue h
  if (delta === 0) {
    h = 0;
  } else if (CMAX === r) {
    h = 60 * (((g1 - b1) / delta) % 6);
  } else if (CMAX === g) {
    h = 60 * ((b1 - r1) / delta + 2);
  } else if (CMAX === b) {
    h = 60 * ((r1 - g1) / delta + 4);
  }

  return [h, s, l];
}

function HSLtoRGB(h, s, l) {
  // https://www.rapidtables.com/convert/color/hsl-to-rgb.html
  const C = (1 - Math.abs(2 * l - 1)) * s;
  let x1 = (h / 60) % 2;
  const X = C * (1 - Math.abs(x1 - 1));
  const M = l - C / 2;

  let rgb = [];

  if (h < 60 || h === 360) {
    rgb = [C, X, 0];
  } else if (h < 120) {
    rgb = [X, C, 0];
  } else if (h < 180) {
    rgb = [0, C, X];
  } else if (h < 240) {
    rgb = [0, X, C];
  } else if (h < 300) {
    rgb = [X, 0, C];
  } else if (h < 360) {
    rgb = [C, 0, X];
  }

  return [Math.round((rgb[0] + M) * 255), Math.round((rgb[1] + M) * 255), Math.round((rgb[2] + M) * 255)];
}

function rotateAngle(angle, rotation) {
  let newAngle = angle + rotation;
  if (newAngle > 360) newAngle = newAngle - 360;
  else if (newAngle < 0) newAngle = newAngle + 360;
  return newAngle;
}

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function CartesianToPolar(x, y) {
	let r = Math.sqrt(x*x + y*y);
	theta = Math.atan2(y, x) * 180 / Math.PI;
	theta = (theta < 0) ? theta + 360 : theta;
	return [r, theta];
}

function PolarToCartesian(r, theta) {
	// Converting theta to radians
	theta *= Math.PI / 180;
	let x = r * Math.cos(theta);
	let y = r * Math.sin(theta);
	return [x, y];
}
