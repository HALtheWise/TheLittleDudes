#pragma strict

function Start () {}

function Update () {}

var comingWave = 1;

function OnGUI(){
	if (GUI.Button(Rect(Screen.width * 0.8, Screen.height * 0.85, Screen.width * 0.15, Screen.height * 0.1), 
			"Start wave " + comingWave.ToString())){
		StartWave();
	}
}

function spawnBadAnt(pt:Vector2, health:float):GameObject{
	var ant:GameObject = GameObject.Instantiate(antPrefab, Vector3(pt.x, 0, pt.y), Quaternion.identity);
	ant.GetComponent(AntScript).health = health;
	return ant;
}

var antPrefab:GameObject;
function StartWave(){
	var ant = spawnBadAnt(Vector2(1,1), 5*comingWave);
	var s = ant.GetComponent(AntScript);
	s.target = Vector2(19, 9);
	s.alignment = Alignment.GOOD;
	
	switch (comingWave){
		case 1:
		spawnBadAnt(Vector2(18, 9), 10);
		break;
		case 2:
		spawnBadAnt(Vector2(18, 9), 10);
		spawnBadAnt(Vector2(18, 8), 20);
		spawnBadAnt(Vector2(17, 9), 30);
		break;
		case 3:
		spawnBadAnt(Vector2(18, 9), 10);
		spawnBadAnt(Vector2(18, 8), 20);
		spawnBadAnt(Vector2(19, 8), 20);
		spawnBadAnt(Vector2(17, 9), 45);
		break;
		case 4:
		spawnBadAnt(Vector2(18, 9), 10);
		spawnBadAnt(Vector2(19, 8), 20);
		spawnBadAnt(Vector2(17, 9), 100);
		spawnBadAnt(Vector2(18, 9), 10);
		spawnBadAnt(Vector2(16, 8), 20);
		spawnBadAnt(Vector2(16, 9), 20);
		spawnBadAnt(Vector2(17, 9), 45);
		break;
		default:
		GUIscript.gameOver = true;
		
	}
	comingWave++;
}