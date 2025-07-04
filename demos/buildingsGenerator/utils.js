var floorHeight = 2.5;
var diagFloor = Math.sqrt(floorHeight*floorHeight + floorHeight*floorHeight);

var originalInstances = {};

var createCuboid = function($widthX, $widthY, $widthZ)
{
	var ID = 'createCuboid' + $widthX + $widthY + $widthZ;
	var instance = originalInstances[ID];
	var cuboid  = null;

	if (utils.isset(instance))
		cuboid = new Instance(instance);
	else
	{
		cuboid = new Cuboid($widthX, $widthY, $widthZ);
		originalInstances[ID] = cuboid;
		cuboid = new Instance(cuboid);
	}

	return cuboid;
};

var createPrism = function($radius, $height, $nbFaces)
{
	var ID = 'createPrism' + $radius + $height + $nbFaces;
	var instance = originalInstances[ID];
	var prism  = null;

	if (utils.isset(instance))
		prism = new Instance(instance);
	else
	{
		prism = new Prism($radius, $radius, $height, $nbFaces);
		originalInstances[ID] = prism;
		prism = new Instance(prism);
	}

	return prism;
};

var createStarPolygonPoints = function($innerRadius, $outerRadius, $nbBranches)
{
	var pointsList = [];
	var angleStep = 2.0*Math.PI/$nbBranches;

	for (var i = 0; i < $nbBranches; i++)
	{
		var angle = i*angleStep;
		var angle2 = angle + angleStep/2.0;
		var x1 = $outerRadius*Math.cos(angle);
		var y1 = $outerRadius*Math.sin(angle);
		var x2 = $innerRadius*Math.cos(angle2);
		var y2 = $innerRadius*Math.sin(angle2);
		pointsList.push([x1, y1]);
		pointsList.push([x2, y2]);
	}

	return pointsList;
};
