#pragma strict

static var worldGrid:Wrapper[,];

enum SquareType {EMPTY, OFF_GRID, ENEMY_BASE, HOME_BASE, TOWER, WALL};

class Wrapper
{
	var type:SquareType;
	var gameObject:GameObject;
	
	function Wrapper(type:SquareType, gameObject){
		this.type = type;
		this.gameObject = gameObject;
	}
	
	function Wrapper(){
		this.type = SquareType.EMPTY;
	}
}



function Start () {
	worldGrid = new Wrapper[20,12];
	for (var x = 0; x < worldGrid.GetLength(0); x++){
		for (var y = 0; y < worldGrid.GetLength(1); y++){
			worldGrid[x,y] = new Wrapper();
		}
	}
}

//function Update () {
//
//}