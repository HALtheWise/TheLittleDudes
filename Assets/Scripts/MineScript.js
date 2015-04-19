#pragma strict

function Start () {}

@HideInInspector 
var oldState = WorldScript.gameState;
function Update () {
	if (WorldScript.gameState == GameMode.BUILD_PHASE && oldState != GameMode.BUILD_PHASE){
		produceResources();
	}
	oldState = WorldScript.gameState;
}

var strength:int = 5;
function produceResources(){
	Debug.Log("producing");
	Debug.Log(WorldScript.getSquare(transform.position).type);
	var tile = WorldScript.getSquare(transform.position);
	if (tile.resource == Resource.NONE){ Debug.Log("Mine not on resource!"); return;}
	WorldScript.resources[tile.resource + 0] += strength;
	Debug.Log("Now has " + WorldScript.resources[tile.resource + 0].ToString() + " " + 
			Resource.GetName(Resource, tile.resource));
}