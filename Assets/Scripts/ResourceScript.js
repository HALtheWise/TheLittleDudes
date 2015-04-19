#pragma strict
var type:Resource;
function Start () {}

function Update () {
	if (WorldScript.getSquare(transform.position).resource != type){
		WorldScript.getSquare(transform.position).resource = type;
		Debug.Log("deployed resource");
	}
}