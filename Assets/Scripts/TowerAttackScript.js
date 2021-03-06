﻿#pragma strict

function Start () {
	tryAttacks();
}

function Update () {

}

var DAMAGE:float;
var ATTACK_RADIUS:float;
var ATTACK_DELAY:float = 0.4;
var alignment:Alignment;

var attackParticles:GameObject;

function tryAttacks() {
	while(true){
		var ants = GameObject.FindGameObjectsWithTag("Ant");
		
		var didAttack = false;
		for (var i = 0; i < ants.Length; i++){
			if (Vector3.Distance(ants[i].transform.position, transform.position) <= ATTACK_RADIUS
					&& ants[i].GetComponent(AntScript).alignment != alignment){
				ants[i].GetComponent(AntScript).health -= DAMAGE;
				didAttack = true;
			}
		}
		if (didAttack){
			GameObject.Instantiate(attackParticles, transform.position, transform.rotation);
		}
		yield WaitForSeconds(ATTACK_DELAY); //Pause until next attack
	}
}