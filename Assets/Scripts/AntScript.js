#pragma strict

enum Alignment {GOOD, EVIL};

var health:float = 100.0;
var alignment:Alignment;
var moveSpeed = 15;

@HideInInspector
var isMoving = false;

var target:Vector2;

function Start () {
	
}

function Update () {
	if (!isMoving){
		if (transform.position.x != target.x || transform.position.x != target.x){
			stepToPt(Pathfinding.nextStepToward(Vector2(transform.position.x, transform.position.y), target));
		}
	}
}

function stepToPt(dst:Vector2){
	isMoving = true;
	var src = Vector2(transform.position.x, transform.position.y);
	for (var i = 0; i < moveSpeed; i++){
		var pt = Vector2.Lerp(src, dst, (i+1.0)/(moveSpeed));
		transform.position.x = pt.x;
		transform.position.y = pt.y;
		yield;
	}
	isMoving = false;
}