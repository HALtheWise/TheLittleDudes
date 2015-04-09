#pragma strict

static function edgeWeight(src:Vector2, dst:Vector2):float{
	var dx = Mathf.Abs(src.x - dst.x);
	var dy = Mathf.Abs(src.y - dst.y);
	
	if (dx == 0 || dy == 0){
		return dx+dy;
	}
	if (dx == dy){
		return 1.414*dx;
	}
	return Mathf.Sqrt(dx*dx + dy * dy);
}

static function neighbors(cell: Vector2):Vector2[]{
	
}

static function round(cell:Vector2):Vector2{
	cell.x = Mathf.Round(cell.x);
	cell.y = Mathf.Round(cell.y);
	return cell;
}

// Note: this is currently using BFS. If we ever have many dozens of ants, we should consider A*
static function nextStepToward(src:Vector2, dst:Vector2){
	src = round(src);
	dst = round(dst);
}