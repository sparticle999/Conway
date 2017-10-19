var windowSize = 600;
var scl = 20;

var rowNum = Math.floor(windowSize/scl);

var squares = [];
var newSquares = [];

var reset, pause, next;

var pauseGame = false;

function setup(){
	createCanvas(windowSize, windowSize);
	frameRate(10);
	for(var i = 0; i < rowNum; i++){
		for(var j = 0; j < rowNum; j++){
			squares.push({x:j, y:i, val:0})
		}
	}
	button = createButton('Reset');
	button.position(8, windowSize+15);
	button.mousePressed(reset);
	reset = button;
	button = createButton('Pause');
	button.position(8, reset.y+25);
	button.mousePressed(togglePause);
	pause = button;
	button = createButton('Next Iteration');
	button.position(8, pause.y+25);
	button.mousePressed(next);
	next = button;
}

function draw(){
	background(255);
	stroke(51);
	if(pauseGame == false)calc();
	for(var s = 0; s < squares.length; s++){
		var cellBlock = squares[s];
		if(cellBlock.x == 0 || cellBlock.x == rowNum-1 || cellBlock.y == 0 || cellBlock.y == rowNum-1){
			cellBlock.val=0.2;
		}
		fill(cellBlock.val*255);
		rect(cellBlock.x*scl, cellBlock.y*scl, scl, scl);
	}
}

function calc(){
	for(var s = 0; s < squares.length; s++){
		var cell = squares[s];

		if(cell.x == 0 || cell.x == rowNum-1 || cell.y == 0 || cell.y == rowNum-1){
			cell.val=0.2;
		} else {
			// Starting from Above, going clockwise
			var neighbours = squares.filter(square =>
				(square.x == cell.x && square.y == cell.y+1)||		//Up
				(square.x == cell.x+1 && square.y == cell.y+1)||	//Up Right
				(square.x == cell.x+1 && square.y == cell.y)||		//Right
				(square.x == cell.x-1 && square.y == cell.y+1)||	//Down Right
				(square.x == cell.x && square.y == cell.y-1)||		//Down
				(square.x == cell.x-1 && square.y == cell.y-1)||	//Down Left
				(square.x == cell.x-1 && square.y == cell.y)||		//Left
				(square.x == cell.x+1 && square.y == cell.y-1));	//Up Left

			cell.nearPop = 0;
			for(var i = 0; i < neighbours.length; i++){
				if(neighbours[i].val == 1){
					cell.nearPop += 1;
				}
			}
		}



		newSquares.push(cell);
	}
	for(var i = 0; i < newSquares.length; i++){
		var cell = newSquares[i];
		if(cell.nearPop > 3 || cell.nearPop < 2){
			cell.val = 0;
		} else if(cell.nearPop == 3){
			cell.val = 1;
		}
	}
	squares = newSquares;
	newSquares = [];
}

function mousePressed(){
	for(var s = 0; s < squares.length; s++){
		if(mouseX >= squares[s].x*scl && mouseX <= squares[s].x*scl+scl && mouseY >= squares[s].y*scl && mouseY <= squares[s].y*scl+scl){
			var colour = squares[s].val;
			if(colour==1)colour=0;else colour=1;
			squares[s].val = colour;
		}
	}
}

function reset(){
	for(var s = 0; s < squares.length; s++){squares[s].val = 0;}
}

function togglePause(){
	pauseGame = !pauseGame;
	if(pauseGame == true){
		pause.elt.textContent = "Play";
	} else {
		pause.elt.textContent = "Pause";
	}
	
}

function next(){

}