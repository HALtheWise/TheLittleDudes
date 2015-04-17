#pragma strict
var wallFollow:boolean = false;
var towerFollow:boolean = false;
var wallCursor : Texture2D; // Your cursor texture
var towerCursor : Texture2D;
var cursorSizeX : int = Screen.width * 0.04; // Your cursor size x
var cursorSizeY : int = Screen.height * 0.055; // Your cursor size y
     
function Start () {

}

function OnGUI(){
	if (GUI.Button(Rect(Screen.width * 0.1, Screen.height * 0.9, Screen.width * 0.1, Screen.height * 0.1), 
			wallCursor)){
		Debug.Log("hello");
		towerFollow = false;
		wallFollow = true;
	}
	if (GUI.Button(Rect(Screen.width * 0.2, Screen.height * 0.9, Screen.width * 0.1, Screen.height * 0.1), 
			towerCursor)){
		Debug.Log("hey");
		wallFollow = false;
		towerFollow = true;
	}
	if(wallFollow)
	{
    	Screen.showCursor = false;
    	GUI.DrawTexture (Rect(Event.current.mousePosition.x-cursorSizeX/2, Event.current.mousePosition.y-cursorSizeY/2, Screen.width * 0.04, Screen.height * 0.055), wallCursor);
	}
	else if(towerFollow)
	{
		Screen.showCursor = false;
    	GUI.DrawTexture (Rect(Event.current.mousePosition.x-cursorSizeX/2, Event.current.mousePosition.y-cursorSizeY/2, Screen.width * 0.04, Screen.height * 0.055), towerCursor);
	}
	else
	{
		Screen.showCursor = true;
	}
}

var wallPrefab:GameObject;
var towerPrefab:GameObject;
function Update () {
	var temp:Vector3;
	var real:Vector2;
	var cam = GameObject.Find("Main Camera");
	temp = cam.camera.ScreenToWorldPoint(Input.mousePosition);
	real = Pathfinding.round(Vector2(temp[0],temp[2]));
	temp[0] = real[0];
	temp[1] = 0;
	temp[2] = real[1];
	
	if(wallFollow)
	{
		if(Input.GetMouseButtonDown(0))
		{
			//Debug.Log(real[0]);
			//Debug.Log(real[1]);
			WorldScript.addObject(real, SquareType.WALL, gameObject);
			GameObject.Instantiate(wallPrefab, temp, Quaternion.identity);
			wallFollow = false;
		}
	}
	else if(towerFollow)
	{
		if(Input.GetMouseButtonDown(0))
		{
			//Debug.Log(real[0]);
			//Debug.Log(real[1]);
			WorldScript.addObject(real, SquareType.TOWER, gameObject);
			GameObject.Instantiate(towerPrefab, temp, Quaternion.identity);
			towerFollow = false;
		}
	}
	else{
	
	}
}