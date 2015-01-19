/*
Hide & Seek with Cap'n Vor
by Matthew Russell
clarvel.github.io
Last updated Jan 13, 2015

3D stealth game vs AI, with increasing difficulty over time.
*/

/*--Document Variables-------------------------------------------------------*/

var canvas = document.getElementById("canvas");
var currDisplay = document.getElementById("main");
var prevDisplay;

/*--Global Variables---------------------------------------------------------*/

var paused = true;
var debug = false;
var gravity = -0.2;
var gameDim = [60, 100, 10, 30, 8]; // width, length, floor height, floor length

// Load the BABYLON 3D engine with antialias on
var engine = new BABYLON.Engine(canvas, true);
var scene;

/*--HTML Callbacks and Event Listeners---------------------------------------*/

// debug flag mapped to alt key
document.onkeydown = keydown;
function keydown(evt) {
    if (!evt) evt = event;
    if (evt.altKey) {
        debug = !debug;
        console.log("Setting debug to " + debug);
    }else if (evt.keyCode == 27 && !paused) {
        pause();
    }
}

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});

//mouse movement events
window.addEventListener("mousemove"), function(){
	var coords = scene.pick(scene.pointerX, scene.pointerY);
}

function display(option){
	var tmpDisplay = currDisplay;
	currDisplay.style.display = "none";


	if(option == "PREV"){
		currDisplay = prevDisplay;
	}else{
		currDisplay = document.getElementById(option);
	}
	currDisplay.style.display = "inline";
	prevDisplay = tmpDisplay;
}

function resume(){
	paused = false;
	display("game");

	// Register a render loop to repeatedly render the scene
	engine.runRenderLoop(function () {
		scene.render();
	});
	engine.resize();
}

function pause(){
	paused = true;
	engine.stopRenderLoop();
	display("pause");
}

function startGame(){
	// Now, call the createScene function that you just finished creating
	scene = createScene();

	resume();
}
function endGame(){
	paused = true;
	engine.stopRenderLoop();
	document.getElementById("results").innerHTML = "Game Ended";
	document.getElementById("stats").innerHTML = "You ended the game";
	display("end");
}

/*--Level Generation---------------------------------------------------------*/

// scene creator class
var createScene = function () {
	var loader = new LevelLoader();
	var level = loader.createScene(engine, 0); // make first level
	var camera = makeCamera("Cam1", new BABYLON.Vector3(0, 3, -gameDim[1]/2 + 1), level, true);
	return level;
}

function makeCamera(name, vector3, scene, gravity){
	var camera = new BABYLON.FreeCamera(name, vector3, scene);
	camera.attachControl(canvas, false); // This attaches the camera to the canvas
	if(gravity){
		camera.applyGravity = true;
		camera.ellipsoid = new BABYLON.Vector3(1, 1.5, 1);
		camera.checkCollisions = true;
	}
	camera.speed = 1.0;
	camera.keysUp.push(87);
	camera.keysLeft.push(65);
	camera.keysDown.push(83);
	camera.keysRight.push(68);
	return camera;
}

/*---------------------------------------------------------------------------*/