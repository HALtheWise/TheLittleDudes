#pragma strict

static var worldGrid:Wrapper[,];

enum SquareType {EMPTY, OFF_GRID, ENEMY_BASE, HOME_BASE, TOWER, WALL};

class Wrapper
{
	var type:SquareType;
	var gameObject:GameObject;
	
	function Wrapper(type:SquareType, gameObject:GameObject){
		this.type = type;
		this.gameObject = gameObject;
	}
	
	function Wrapper(){
		this.type = SquareType.EMPTY;
	}
}

static function addObject(position:Vector2, type:SquareType, object:GameObject){
	worldGrid[position.x, position.y] = new Wrapper(type, object);
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