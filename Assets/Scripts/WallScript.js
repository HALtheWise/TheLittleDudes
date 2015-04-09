#pragma strict

var health:float = 100;
@HideInInspector
var inited:boolean = false;

function Awake () {
	inited = false;
}

function Update () {
	if (!inited){
		WorldScript.addObject(SquareType.WALL, gameObject);
		inited = true;
	}
	if (health<=0){
		WorldScript.worldGrid[transform.position.x, transform.position.z] = new Wrapper();
		GameObject.Destroy(gameObject, 0);
	}
}