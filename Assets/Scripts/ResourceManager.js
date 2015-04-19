#pragma strict

function Start () {}

function Update () {}

static function deductResources(air:int, earth:int, fire:int, water:int){
	WorldScript.resources[Resource.AIR+0] -= air;
	WorldScript.resources[Resource.EARTH+0] -= earth;
	WorldScript.resources[Resource.FIRE+0] -= fire;
	WorldScript.resources[Resource.WATER+0] -= water;
}