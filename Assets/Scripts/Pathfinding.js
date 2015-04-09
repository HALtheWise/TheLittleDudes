#pragma strict

static function edgeWeight(src:Vector2, dst:Vector2):float{
//return 1;
	var dx = Mathf.Abs(src.x - dst.x);
	var dy = Mathf.Abs(src.y - dst.y);
	
	var type:SquareType = WorldScript.getSquare(dst.x, dst.y).type;
//	Debug.Log(type);
	if (type == SquareType.TOWER || type == SquareType.WALL || type == SquareType.OFF_GRID){
		return 20;
	}
	
	if (dx == 0 || dy == 0){
		return dx+dy;
	}
	if (dx == dy){
		return 1.414*dx;
	}
	return Mathf.Sqrt(dx*dx + dy * dy);
}

static function neighbors(cell: Vector2):Array{
	// TODO: allow diagonal mvmt
	var a:Array = new Array();
	var x = cell.x;
	var y = cell.y;
	
	var width = WorldScript.worldGrid.GetLength(0);
	var height = WorldScript.worldGrid.GetLength(1);
	
	if (x>0)
		a.Add(new Vector2(x-1, y));
	if (x<width-1)
		a.Add(new Vector2(x+1, y));
	if (y>0)
		a.Add(new Vector2(x, y-1));
	if (y < height-1)
		a.Add(new Vector2(x, y+1));
		
	return a;
	
}

static function round(cell:Vector2):Vector2{
	cell.x = Mathf.Round(cell.x);
	cell.y = Mathf.Round(cell.y);
	return cell;
}

class FrontierPt{
	var totCost:float;
	var pt:Vector2;
	var firstStep:Vector2;
	function FrontierPt(){};
	function FrontierPt(oldpt:FrontierPt, newPt:Vector2){
		this.firstStep = oldpt.firstStep;
		this.totCost = oldpt.totCost + Pathfinding.edgeWeight(oldpt.pt, newPt);
		this.pt = newPt;
		if (oldpt.totCost == 0){
			this.firstStep = newPt;
		}else{
			this.firstStep = oldpt.firstStep;
		}
	}
}

static function popShortest(frontier:Array){
	var minDist:float;
	var minI:int;
	for (var i = 0; i < frontier.length; i++){
		if ((frontier[i] as FrontierPt).totCost < minDist || i == 0){
			minDist = (frontier[i] as FrontierPt).totCost;
			minI = i;
		}
	}
	var result = frontier[minI] as FrontierPt;
	frontier.RemoveAt(minI);
	return result;
}

// Note: this is currently using BFS. If we ever have many dozens of ants, we should consider A*
static function nextStepToward(src:Vector2, dst:Vector2){
	src = round(src);
	dst = round(dst);
	
	var visited = new Hashtable(); //HashSet of Vector2.ToString()'s
	var frontier = new Array();
	
	var startPt = new FrontierPt();
	startPt.totCost = 0;
	startPt.pt = src;
	frontier.Add(startPt);
	
	var loopCount = 0;
	
	while(frontier.length > 0){
		loopCount++;

		if (loopCount > 10000){
			Debug.LogError("Frontier grew way too big");
			break;
		}
		//Debug.Log((frontier[0] as FrontierPt).pt);
		var f:FrontierPt = Pathfinding.popShortest(frontier);
		if (visited.ContainsKey(f.pt.ToString())){
			continue;
		}
		if (f.pt == dst){
			return f.firstStep;
		}
		visited.Add(f.pt.ToString(), true);
		var neighbors = Pathfinding.neighbors(f.pt);
		//Debug.Log(neighbors);
		for (var i = 0; i < neighbors.length; i++){
			frontier.Add(new FrontierPt(f, neighbors[i]));
		}
	}
	//Debug.Log(frontier.length);
	return Vector2(-1, -1);
}