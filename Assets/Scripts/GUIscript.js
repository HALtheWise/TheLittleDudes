#pragma strict
var cursorSizeX : int = Screen.width * 0.04; // Your cursor size x
var cursorSizeY : int = Screen.height * 0.055; // Your cursor size y

var cursors : Texture2D[];
var prefabs : GameObject[];
@HideInInspector
var carryingObject:int = -1;

static var gameOver:boolean = false;
     
function Start () {
	gameOver = false;
}

function pickup(id:int){
	carryingObject = id;
	Debug.Log(String.Format("Picked up {0}", prefabs[id].name));
}

function OnGUI(){
	drawMode();
	drawResources();
	if (gameOver){
		GUI.Box(Rect(50, 50, Screen.width -100, Screen.height-100), "Game Over");
	}

	if (GUI.Button(Rect(Screen.width * 0.1, Screen.height * 0.9, Screen.width * 0.1, Screen.height * 0.1), 
			cursors[0])){
		pickup(0);
	}
	if (GUI.Button(Rect(Screen.width * 0.2, Screen.height * 0.9, Screen.width * 0.1, Screen.height * 0.1), 
			cursors[2])){
		pickup(2);
	}
	if (GUI.Button(Rect(Screen.width * 0.3, Screen.height * 0.9, Screen.width * 0.1, Screen.height * 0.1), 
			cursors[1])){
		pickup(1);
	}
	if(carryingObject >= 0)
	{
    	Screen.showCursor = false;
    	GUI.DrawTexture (Rect(Event.current.mousePosition.x-cursorSizeX/2, Event.current.mousePosition.y-cursorSizeY/2, Screen.width * 0.04, Screen.height * 0.055), 
    		cursors[carryingObject]);
	}
	else
	{
		Screen.showCursor = true;
	}
}

function drawMode(){
	GUI.Box(Rect(Screen.width * 0.3, Screen.height * 0.0, Screen.width * 0.4, Screen.height * 0.05), 
		"Phase: " + WorldScript.gameState
	);
}

function drawResources(){
	GUI.Box(Rect(Screen.width * 0.0, Screen.height * 0.0, Screen.width * 0.2, Screen.height * 0.2), 
		String.Format("Resources Available:\nAir: {0}\nEarth: {1}\nFire: {2}\nWater: {3}", 
			WorldScript.resources[Resource.AIR+0],
			WorldScript.resources[Resource.EARTH+0],
			WorldScript.resources[Resource.FIRE+0],
			WorldScript.resources[Resource.WATER+0])
	);
}

function Update () {
	var temp:Vector3;
	var real:Vector2;
	var cam = GameObject.Find("Main Camera");
	temp = cam.camera.ScreenToWorldPoint(Input.mousePosition);
	real = Pathfinding.round(Vector2(temp[0],temp[2]));
	
	if(carryingObject >= 0)
	{
		if(Input.GetMouseButtonDown(0))
		{
			Debug.Log(String.Format("Placed {0}", prefabs[carryingObject].name));
//			WorldScript.addObject(real, SquareType.WALL, gameObject);
			GameObject.Instantiate(prefabs[carryingObject], WorldScript.vecTranslate(real), Quaternion.identity);
			ResourceManager.deductResources(1,1,1,1);
			carryingObject = -1;
		}
	}
}