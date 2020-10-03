const config = {
	canvasDimension: 300,
	Radius: 100,
	mainColorDimension: 30
}

const Center = config.canvasDimension/2;

let colorWheelCanvas;
let colorWheelCTX;
let colorWheelData;
let mainColor;


function colorWheelInit() {
	colorWheelCanvas = document.getElementById("canvas");
	colorWheelCTX = colorWheelCanvas.getContext("2d");
	colorWheelCanvas.width = config.canvasDimension;
	colorWheelCanvas.height = config.canvasDimension;

	colorWheelCanvas.addEventListener("click", mainColorMove);
	colorWheelCanvas.addEventListener("mousedown", colorWheelMouseDown);
	colorWheelCanvas.addEventListener("mouseup", colorWheelMouseUp);

	drawColorWheel(0.5);
}

function mainColorInit() {
	mainColor = document.getElementsByClassName("main-color")[0];
	mainColor.style.height = config.mainColorDimension + "px";
	mainColor.style.width = config.mainColorDimension + "px";

	mainColorMove({ 
		offsetX: Center,
		offsetY: Center
	})
}

function mainColorMove(moveEvent) {
	let x = moveEvent.offsetX;
	let y = moveEvent.offsetY;

	let shiftedX = x - Center;
	let shiftedY = y - Center;
	let [radius, theta] = CartesianToPolar(shiftedX, shiftedY);

	if (radius > config.Radius) {
		// If the point is outside the circle
		[shiftedX, shiftedY] = PolarToCartesian(config.Radius, theta);
		x = Math.round(shiftedX) + Center;
		y = Math.round(shiftedY) + Center;
	}

	let index = (x + y*config.canvasDimension) * 4;
	let selectedPrimaryColor = RGBtoHex(colorWheelData[index], colorWheelData[index+1], colorWheelData[index+2])
	
	let translateX = x - config.mainColorDimension/4;
	let translateY = y - config.mainColorDimension/4;

	mainColor.style.transform = "translate3d(" + translateX + "px, " + translateY + "px, 0)";
	mainColor.style.backgroundColor = selectedPrimaryColor;

	populateColorHarmony(selectedPrimaryColor);
}

function populateColorHarmony(selectedPrimaryColor) {
	let colorHarmony = getColorHarmony(selectedPrimaryColor);

	console.log("Color Harmony: ", colorHarmony);

	for ( let method in colorHarmony ) {
		let container = document.getElementsByClassName(method)[0];
		container.innerHTML = "";
		
		colorHarmony[method].forEach( color => {
			let individualColor = document.createElement("span");
			individualColor.className = "color-harmony-individual";
			individualColor.style.background = color;

			container.appendChild(individualColor);
		})
	}
}

function colorWheelMouseDown(event) {
	mainColorMove(event);
	colorWheelCanvas.addEventListener("mousemove", mainColorMove)
	colorWheelCanvas.addEventListener("mouseout", colorWheelMouseUp)
}

function colorWheelMouseUp(event) {
	mainColorMove(event);
	colorWheelCanvas.removeEventListener("mousemove", mainColorMove)
	colorWheelCanvas.removeEventListener("mouseout", colorWheelMouseUp)
}

colorWheelInit();
mainColorInit();
// renderLightSlider();
