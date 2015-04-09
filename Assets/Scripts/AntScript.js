﻿#pragma strict

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
	if (health <= 0) GameObject.Destroy(gameObject, 0);
	if (!isMoving){
		if (transform.position.x != target.x || transform.position.z != target.y){
			stepToPt(Pathfinding.nextStepToward(Vector2(transform.position.x, transform.position.z), target));
		}
	}
}

function stepToPt(dst:Vector2){
	
	isMoving = true;
	while (WorldScript.getSquare(dst).type == SquareType.WALL){
		Debug.Log("attacking wall");
		WorldScript.getSquare(dst).gameObject.GetComponent(WallScript).health -= 3;
		for (var i = 0; i < 3; i++){
			transform.position.x += .2;
			yield WaitForSeconds(0.05);
			transform.position.x -= .2;
			yield WaitForSeconds(0.05);
		}
	}
	
	var src = Vector2(transform.position.x, transform.position.z);
	for (i = 0; i < moveSpeed; i++){
		var pt = Vector2.Lerp(src, dst, (i+1.0)/(moveSpeed));
		transform.position.x = pt.x;
		transform.position.z = pt.y;
		yield;
	}
	isMoving = false;
}

class AItarget{
	var priority:float;
	var location:Vector2;
	
}