#pragma strict

static var worldGrid:Wrapper[,];

static var water: int = 10;
static var stone:int = 15;

enum SquareType {EMPTY, OFF_GRID, ENEMY_BASE, HOME_BASE, TOWER, WALL, MINE};

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

static function addObject(type:SquareType, object:GameObject){
	addObject(vecTranslate(object.transform.position), type, object);
}

static function addObject(position:Vector2, type:SquareType, object:GameObject){
	if (Rect(0, 0, worldGrid.GetLength(0), worldGrid.GetLength(1)).Contains(position)){
		worldGrid[position.x, position.y] = new Wrapper(type, object);
	}
}

static function getSquare(pt:Vector2):Wrapper{
	pt = Pathfinding.round(pt);
	return getSquare(pt.x, pt.y);
}

static function vecTranslate(pos:Vector3):Vector2{
	return Pathfinding.round(Vector2(pos.x, pos.z));
}

static function getSquare(x: int, y:int):Wrapper{
	if (x < 0 || x >= worldGrid.GetLength(0) || 
			y < 0 || y >= worldGrid.GetLength(1)){
		return new Wrapper(SquareType.OFF_GRID, null);	
	}
	return worldGrid[x,y];
}

function Start () {	
	worldGrid = new Wrapper[20,12];
	for (var x = 0; x < worldGrid.GetLength(0); x++){
		for (var y = 0; y < worldGrid.GetLength(1); y++){
			worldGrid[x,y] = new Wrapper();
		}
	}
//	addObject(SquareType.WALL, GameObject.Instantiate(wallPrefab, Vector3(3,0,3), Quaternion.identity));
}

function Update () {
//	var src = Vector2(Random.RandomRange(-1, 3), Random.RandomRange(1,3));
//	var dst = Vector2(Random.RandomRange(1, 5), Random.RandomRange(1,5));
//	
//	Debug.Log(src);
//	Debug.Log(getSquare(src.x, src.y).type);
//	Debug.Log(dst); 
//	Debug.Log(Pathfinding.nextStepToward(src, dst));
//	Debug.Log("");
}