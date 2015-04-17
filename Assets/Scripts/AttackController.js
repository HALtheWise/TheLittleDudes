#pragma strict

function Start () {

}

function Update () {
//	Debug.Log(WorldScript.getSquare(14, 10).type);
}

function OnGUI(){
	if (GUI.Button(Rect(Screen.width * 0.8, Screen.height * 0.85, Screen.width * 0.15, Screen.height * 0.1), 
			"Start wave 1")){
		StartWave();
	}
}

var antPrefab:GameObject;
function StartWave(){
	for (var x = 17; x < 20; x++){
		for (var z = 11; z > 28-x; z--){
			GameObject.Instantiate(antPrefab, Vector3(x, 0, z), Quaternion.identity);
		}
	}
}