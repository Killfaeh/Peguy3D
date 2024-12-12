var createRoofProfile1 = function($innerRadius, $height)
{
	var path = new Path([]);
	path.moveTo($innerRadius+$height, 0.0);
	path.lineTo(0.0, 0.0);
	path.lineTo(0.0, $height);
	path.lineTo($innerRadius, $height);
	path.arc($height, $height, 0, 0, 0, $innerRadius+$height, 0.0);
	path.close();
	
	var pointsList = path.samplePoints();

	return pointsList;
};

var createRoofProfile2 = function($innerRadius, $height, $bump)
{
	var path = new Path([]);
	path.moveTo($innerRadius+$bump, 0.0);
	path.lineTo(0.0, 0.0);
	path.lineTo(0.0, $height);
	path.lineTo($innerRadius, $height);
	path.bezierQ($innerRadius+$bump*1.6, $height*0.4, $innerRadius+$bump, 0.0);
	path.close();

	var pointsList = path.samplePoints();

	return pointsList;
};

var createRoofProfile3 = function($innerRadius, $height)
{
	var path = new Path([]);
	path.moveTo($innerRadius+$height*0.65, 0.0);
	path.lineTo(0.0, 0.0);
	path.lineTo(0.0, $height);
	path.lineTo($innerRadius, $height);
	path.bezierC($innerRadius+$height*0.1, $height*0.75, $innerRadius+$height*0.65, $height*0.75, $innerRadius+$height*0.65, 0.0);
	path.close();
	
	var pointsList = path.samplePoints();

	return pointsList;
};

var createRoofProfile4 = function($innerRadius, $height, $bump)
{
	var inflectionPoint = new InflectionPoint($innerRadius+$bump*0.08, $height*0.8, -35.0, $bump/10.0, $bump/10.0);
	var h1 = inflectionPoint.getHandles()[0];
	var h2 = inflectionPoint.getHandles()[1];

	var path = new Path([]);
	path.moveTo($innerRadius+$bump, 0.0);
	path.lineTo(0.0, 0.0);
	path.lineTo(0.0, $height);
	path.lineTo($innerRadius, $height);
	path.bezierQ(h1[0], h1[1], inflectionPoint.getX(), inflectionPoint.getY());
	path.bezierC(h2[0], h2[1], $innerRadius+$bump*1.65, $height*0.4, $innerRadius+$bump, 0.0);
	path.close();

	var pointsList = path.samplePoints();

	return pointsList;
};

var createRoofProfile5 = function($innerRadius, $height, $bump)
{
	var inflectionPoint = new InflectionPoint($innerRadius+$bump*0.5, $height*0.7, -7.0, $bump/2.0, $bump/2.0);
	var h1 = inflectionPoint.getHandles()[0];
	var h2 = inflectionPoint.getHandles()[1];

	var path = new Path([]);
	path.moveTo($innerRadius+$bump, 0.0);
	path.lineTo(0.0, 0.0);
	path.lineTo(0.0, $height);
	path.lineTo($innerRadius, $height);
	path.bezierQ(h1[0], h1[1], inflectionPoint.getX(), inflectionPoint.getY());
	path.bezierC(h2[0], h2[1], $innerRadius+$bump*1.275, $height*0.25, $innerRadius+$bump, 0.0);
	path.close();

	var pointsList = path.samplePoints();

	return pointsList;
};

var createRoofProfile6 = function($innerRadius, $height, $bump)
{
	var inflectionPoint = new InflectionPoint($innerRadius+$bump*0.5, $height*0.6, -20.0, $bump/2.0, $bump/2.0);
	var h1 = inflectionPoint.getHandles()[0];
	var h2 = inflectionPoint.getHandles()[1];

	var path = new Path([]);
	path.moveTo($innerRadius+$bump, 0.0);
	path.lineTo(0.0, 0.0);
	path.lineTo(0.0, $height);
	path.lineTo($innerRadius, $height);
	path.bezierQ(h1[0], h1[1], inflectionPoint.getX(), inflectionPoint.getY());
	path.bezierC(h2[0], h2[1], $innerRadius+$bump, $height*0.25, $innerRadius+$bump, 0.0);
	path.close();

	var pointsList = path.samplePoints();

	return pointsList;
};

var createRoofProfile7 = function($innerRadius, $height, $bump)
{
	var path = new Path([]);
	path.moveTo($innerRadius+$bump, 0.0);
	path.lineTo(0.0, 0.0);
	path.lineTo(0.0, $height);
	path.lineTo($innerRadius, $height);
	path.bezierC($innerRadius+$bump*0.2, $height*0.5, $innerRadius+$bump*0.8, $height*0.5, $innerRadius+$bump, 0.0);
	path.close();

	var pointsList = path.samplePoints();

	return pointsList;
};

var createRoofProfile8 = function($innerRadius, $height, $bump)
{
	var inflectionPoint = new InflectionPoint($innerRadius+$bump*0.35, $height*0.75, -25.0, $bump/2.6, $bump/1.25);
	var h1 = inflectionPoint.getHandles()[0];
	var h2 = inflectionPoint.getHandles()[1];

	var path = new Path([]);
	path.moveTo($innerRadius+$bump, 0.0);
	path.lineTo(0.0, 0.0);
	path.lineTo(0.0, $height);
	path.lineTo($innerRadius, $height);
	path.bezierQ(h1[0], h1[1], inflectionPoint.getX(), inflectionPoint.getY());
	path.bezierC(h2[0], h2[1], $innerRadius+$bump*0.5, $height*0.25, $innerRadius+$bump, 0.0);
	path.close();

	var pointsList = path.samplePoints();

	return pointsList;
};

var createRoofProfile9 = function($innerRadius, $height, $bump)
{
	var path = new Path([]);
	path.moveTo($innerRadius+$bump, 0.0);
	path.lineTo(0.0, 0.0);
	path.lineTo(0.0, $height);
	path.lineTo($innerRadius, $height);
	path.bezierQ($innerRadius+$bump*1.6, $height*0.8, $innerRadius+$bump, 0.0);
	path.close();

	var pointsList = path.samplePoints();

	return pointsList;
};

