﻿#pragma strict

enum Alignment {GOOD, EVIL, NEUTRAL};

var health:float = 100.0;
var alignment:Alignment;
var moveSpeed = 15;

@HideInInspector
var isMoving = false;

var target:Vector2;

function Start () {
	
}

function attackBase() {
	if (alignment == alignment.EVIL){
		GUIscript.gameOver = true;
	}
}

var explosion:GameObject;
function Update () {
	if (health <= 0) GameObject.Destroy(gameObject, 0);
	if (!isMoving){
		if (transform.position.x != target.x || transform.position.z != target.y){
			stepToPt(Pathfinding.nextStepToward(Vector2(transform.position.x, transform.position.z), target));
		} else { 
			//You have reachced your destination
			attackBase();
			GameObject.Destroy(gameObject, 0);
			GameObject.Instantiate(explosion, transform.position, Quaternion.identity);
		}
	}
}

function stepToPt(dst:Vector2){
	var dst2 = Vector3(dst.x, transform.position.y, dst.y);
	transform.LookAt(dst2);
	if (isMoving) return;
	isMoving = true;
	while (WorldScript.getSquare(dst).type != SquareType.EMPTY){
		//Debug.Log("attacking wall");
		var gameobj = WorldScript.getSquare(dst).gameObject;
		if (gameobj != null) gameobj.GetComponent(WallScript).health -= 3;
		else WorldScript.getSquare(dst).type = SquareType.EMPTY;
		
		transform.position.x += .2;
		yield WaitForSeconds(0.05);
		transform.position.x -= .2;
		yield WaitForSeconds(0.05);
	}
	
	var src = Vector2(transform.position.x, transform.position.z);
	var moveTime = moveSpeed * Vector2.Distance(src, dst) * Random.Range(0.8, 1.2);
	for (var i = 0; i < moveTime; i++){
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