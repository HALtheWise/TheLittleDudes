#pragma strict

var health:float = 100;
var type:SquareType;
@HideInInspector
var inited:boolean = false;

function Awake () {
	inited = false;
}

function Update () {
	if (!inited){
		WorldScript.addObject(type, gameObject);
		inited = true;
	}
	if (WorldScript.getSquare(WorldScript.vecTranslate(transform.position)).type == SquareType.EMPTY){
		Debug.Log("Initialization failed.");
		WorldScript.addObject(type, gameObject);
	}
	if (health<=0){
		WorldScript.worldGrid[transform.position.x, transform.position.z] = new Wrapper();
		GameObject.Destroy(gameObject, 0);
	}
}