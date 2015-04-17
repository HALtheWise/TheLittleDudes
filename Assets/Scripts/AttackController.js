#pragma strict

function Start () {}

function Update () {}

var comingWave = 1;

function OnGUI(){
	if (GUI.Button(Rect(Screen.width * 0.8, Screen.height * 0.85, Screen.width * 0.15, Screen.height * 0.1), 
			"Start wave 1")){
		StartWave();
	}
}

function spawnBadAnt(pt:Vector2, health:float){
	var ant:GameObject = GameObject.Instantiate(antPrefab, Vector3(pt.x, 0, pt.y), Quaternion.identity);
	ant.GetComponent(AntScript).health = health;
}

var antPrefab:GameObject;
function StartWave(){
	switch (comingWave){
		case 1:
		spawnBadAnt(Vector2(18, 9), 10);
		break;
		
	}
}