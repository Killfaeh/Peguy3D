var createRectGlass = function($width, $height, $depth)
{
	var ID = 'createRectGlass' + $width + $height + $depth;
	var instance = originalInstances[ID];
	var cuboid  = null;

	if (utils.isset(instance))
		cuboid = new Instance(instance);
	else
	{
		var cuboid = new Cuboid($depth, $width, $height);
		cuboid.setMaterial(windowMaterial);
		originalInstances[ID] = cuboid;
		cuboid = new Instance(cuboid);
	}

	return cuboid;
};

var createBeam = function($width, $height, $depth)
{
	var ID = 'createBeam' + $width + $height + $depth;
	var instance = originalInstances[ID];
	var cuboid  = null;

	if (utils.isset(instance))
		cuboid = new Instance(instance);
	else
	{
		var cuboid = new Cuboid($depth, $width, $height);
		cuboid.setMaterial(wallMaterial);
		originalInstances[ID] = cuboid;
		cuboid = new Instance(cuboid);
	}

	return cuboid;
};

var createRectWindow = function($width, $height, $thickness, $horDepth, $verDepth)
{
	var group = new Group();

	var glassWidth = $width - 2.0*$thickness;
	var glassHeight = $height - 2.0*$thickness;

	var glass = createRectGlass(glassWidth, glassHeight, glassThickness);
	var topBeam = createBeam($width, $thickness, $horDepth);
	var bottomBeam = createBeam($width, $thickness, $horDepth);
	var leftBeam = createBeam($thickness, $height, $verDepth);
	var rightBeam = createBeam($thickness, $height, $verDepth);

	glass.add(new Translation(glassThickness/2.0, 0.0, 0.0));
	topBeam.add(new Translation($horDepth/2.0, 0.0, $thickness/2.0 + glassHeight/2.0));
	bottomBeam.add(new Translation($horDepth/2.0, 0.0, -$thickness/2.0 - glassHeight/2.0));
	leftBeam.add(new Translation($verDepth/2.0, -$thickness/2.0 - glassWidth/2.0, 0.0));
	rightBeam.add(new Translation($verDepth/2.0, $thickness/2.0 + glassWidth/2.0, 0.0));

	group.add(glass);
	group.add(topBeam);
	group.add(bottomBeam);
	group.add(leftBeam);
	group.add(rightBeam);

	group.add(new Translation(0.0, 0.0, $height/2.0));

	return group;
};

var createStalinianWindowWall = function($width, $height, $nbWindowsWidth, $nbWindowsHeight, $verDepth, $horDepth, $canvas)
{
	var group = new Group();

	var width = $width;
	var height = $height;

	var verThickness = width/$nbWindowsWidth/7.0;
	var horThickness = height/$nbWindowsHeight/15.0;

	var verDepth = $verDepth;
	var horDepth = $horDepth;

	if (!utils.isset(verDepth))
		verDepth = width/$nbWindowsWidth/7.0;

	if (!utils.isset(horDepth))
		horDepth = height/$nbWindowsHeight/7.0;

	var canvas = $canvas;

	if (!utils.isset(canvas))
		canvas = true;

	var windowWidth = (width-verThickness)/$nbWindowsWidth;
	var windowHeight = (height-horThickness)/$nbWindowsHeight;

	var startI = 0;
	var endVerI = $nbWindowsWidth;
	var endHorI = $nbWindowsHeight;

	var offsetVer = verThickness/2.0;
	var offsetHor = horThickness/2.0;

	if (canvas !== true)
	{
		windowWidth = width/$nbWindowsWidth;
		windowHeight = height/$nbWindowsHeight;
		startI = 1;
		endVerI = $nbWindowsWidth-1;
		endHorI = $nbWindowsHeight-1;
		offsetVer = 0.0;
		offsetHor = 0.0;
	}

	var glass = createRectGlass(width, height, glassThickness);
	glass.add(new Translation(glassThickness/2.0, 0.0, height/2.0));
	group.add(glass);

	for (var i = startI; i <= endVerI; i++)
	{
		var beam = createBeam(verThickness, height, verDepth);
		beam.add(new Translation(verDepth/2.0, offsetVer - width/2.0 + i*windowWidth, height/2.0));
		group.add(beam);
	}

	for (var i = startI; i <= endHorI; i++)
	{
		var beam = createBeam(width, horThickness, horDepth);
		beam.add(new Translation(horDepth/2.0, 0.0, offsetHor + i*windowHeight));
		group.add(beam);
	}

	return group;
};

var createStalinianFront = function($frontData)
{
	var width = utils.isset($frontData.width) ? $frontData.width : 2.0*floorHeight;
	var height = utils.isset($frontData.height) ? $frontData.height : 4.0*floorHeight;
	var nbWindowsWidth = utils.isset($frontData.nbWindowsWidth) ? $frontData.nbWindowsWidth : 5;
	var nbWindowsHeight = utils.isset($frontData.nbWindowsHeight) ? $frontData.nbWindowsHeight : 5;
	var verDepth = utils.isset($frontData.verDepth) ? $frontData.verDepth : 0.3;
	var horDepth = utils.isset($frontData.horDepth) ? $frontData.horDepth : 0.4;
	var verMargin = utils.isset($frontData.verMargin) ? $frontData.verMargin : 0.1;
	var horMargin = utils.isset($frontData.horMargin) ? $frontData.horMargin : 0.05;
	var marginDepth = utils.isset($frontData.marginDepth) ? $frontData.marginDepth : 0.6;

	var wallWidth = width*(1.0-2.0*verMargin);
	var wallHeight = height*(1.0-2.0*horMargin);

	var group = new Group();

	var wall = createStalinianWindowWall(wallWidth, wallHeight, nbWindowsWidth, nbWindowsHeight, verDepth, horDepth, false);
	wall.add(new Translation(0.0, 0.0, height*horMargin));
	group.add(wall);

	if (horMargin > 0.0)
	{
		var topBeam = createBeam(wallWidth, height*horMargin, marginDepth);
		var bottomBeam = createBeam(wallWidth, height*horMargin, marginDepth);
		topBeam.add(new Translation(marginDepth/2.0, 0.0, height*horMargin*1.5 + wallHeight));
		bottomBeam.add(new Translation(marginDepth/2.0, 0.0, height*horMargin/2.0));
		group.add(topBeam);
		group.add(bottomBeam);
	}

	if (verMargin > 0.0)
	{
		var leftBeam = createBeam(width*verMargin, height, marginDepth);
		var rightBeam = createBeam(width*verMargin, height, marginDepth);
		leftBeam.add(new Translation(marginDepth/2.0, -width*verMargin/2.0 - wallWidth/2.0, height/2.0));
		rightBeam.add(new Translation(marginDepth/2.0, width*verMargin/2.0 + wallWidth/2.0, height/2.0));
		group.add(leftBeam);
		group.add(rightBeam);
	}

	return group;
};

var createStalinianTowerFloor = function($floorData)
{
	var nbRadius = utils.isset($floorData.nbRadius) ? $floorData.nbRadius : 5;
	var nbFloors = utils.isset($floorData.nbFloors) ? $floorData.nbFloors : 5;
	var nbFaces = utils.isset($floorData.nbFaces) ? $floorData.nbFaces : 4;
	var frontData = utils.isset($floorData.frontData) ? $floorData.frontData : {};

	if (nbFaces < 3)
		nbFaces = 3;

	var radius = nbRadius*diagFloor;
	var theta = 2.0*Math.PI/nbFaces;
	var faceDistance = radius*Math.cos(theta/2.0);
	var faceWidth = 2.0*radius*Math.sin(theta/2.0);
	var height = nbFloors*floorHeight;

	frontData.width = faceWidth;
	frontData.height = height;

	var prism = new RegularPolygon(radius, nbFaces);
	prism.setMaterial(wallMaterial);
	var prismInstance = new Instance(prism);
	prismInstance.add(new Translation(0.0, 0.0, height));

	var group = new Group();

	group.add(prism);
	group.add(prismInstance);

	for (var i = 0; i < nbFaces; i++)
	{
		var front = createStalinianFront(frontData);
		front.add(new Rotation((i*theta + theta/2.0)/Math.PI*180.0, 'z'));
		front.add(new Translation(faceDistance-frontData.marginDepth, 0.0, 0.0));
		group.add(front);
	}

	group.add(new Rotation(theta/2.0/Math.PI*180.0));

	return group;
};

var createStalinianWall = function($wallData)
{
	var nbFloors = utils.isset($wallData.nbFloors) ? $wallData.nbFloors : 2;
	var nbWidth = utils.isset($wallData.nbWidth) ? $wallData.nbWidth : 1;
	var nbDepth = utils.isset($wallData.nbDepth) ? $wallData.nbDepth : 1;
	var roofType = utils.isset($wallData.roofType) ? $wallData.roofType : 0;
	var frontData = utils.isset($wallData.frontData) ? $wallData.frontData : {};

	var group = new Group();

	var width = nbWidth*floorHeight;
	var height = (nbFloors-1)*floorHeight;

	if (roofType > 0)
	{
		var base = createEmptyWall(1, nbWidth, nbDepth, roofType, 0, 0, 0.0, 0.0, true);
		base.add(new Translation(0.0, 0.0, (nbFloors-1)*floorHeight));
		group.add(base);
	}
	else
		height = nbFloors*floorHeight;

	frontData.width = width;
	frontData.height = height;

	var beam = createBeam(width, height, nbDepth*floorHeight - 2.0*frontData.marginDepth);
	beam.add(new Translation(0.0, 0.0, height/2.0));
	group.add(beam);

	var front1 = createStalinianFront(frontData);
	front1.add(new Translation(nbDepth*floorHeight/2.0 - frontData.marginDepth, 0.0, 0.0));
	group.add(front1);

	var front2 = createStalinianFront(frontData);
	front2.add(new Translation(-nbDepth*floorHeight/2.0 + frontData.marginDepth, 0.0, 0.0));
	front2.add(new Rotation(180.0, 'z'));
	group.add(front2);

	return group;
};

var createStalinianWing = function($wallDataList)
{
	//var offsetY = 0.0;
	var group = new Group();

	var roofType = utils.isset($wallDataList.roofType) ? $wallDataList.roofType : 0;
	var roofNbWidth = utils.isset($wallDataList.roofNbWidth) ? $wallDataList.roofNbWidth : 1;
	var roofNbDepth = utils.isset($wallDataList.roofNbDepth) ? $wallDataList.roofNbDepth : 1;
	var roofNbOffset = utils.isset($wallDataList.roofNbOffset) ? $wallDataList.roofNbOffset : 1;
	var roofNbHeight = utils.isset($wallDataList.roofNbHeight) ? $wallDataList.roofNbHeight : 1;
	var nbWalls = utils.isset($wallDataList.nbWalls) ? $wallDataList.nbWalls : 1;
	var wallData = utils.isset($wallDataList.wallData) ? $wallDataList.wallData : {};

	var roofWidth = roofNbWidth*floorHeight;
	var roofDepth = roofNbDepth*floorHeight;
	var roofHeight = roofNbHeight*floorHeight;
	var wallStep = (roofDepth+wallData.nbWidth*floorHeight)/(nbWalls+1);

	var roof = null;
	var roofWall = null;

	if (roofType === 0)
	{
		var roofWall = createCuboid(roofWidth, roofDepth, roofNbOffset*floorHeight);
		roofWall.add(new Translation(0.0, 0.0, roofNbOffset*floorHeight/2.0));
	}
	if (roofType === 1)
	{
		roofWall = createInnerWindow1(roofWidth-roofThickness, roofNbOffset*floorHeight+roofWidth/2.0+0.0001, roofDepth);
		roof = createOuterWindow1_2(roofWidth, roofWidth/2.0+roofThickness+0.0001, roofThickness, roofDepth);
	}
	else if (roofType === 2)
	{
		roofWall = createInnerWindow2(roofWidth-roofThickness, roofNbOffset*floorHeight+roofHeight+0.0001, roofHeight, roofDepth);
		roof = createOuterWindow2_2(roofWidth, roofHeight+roofThickness+0.0001, roofHeight+roofThickness, roofThickness, roofDepth);
	}
	else if (roofType === 3)
	{
		roofWall = createInnerWindow3(roofWidth-roofThickness, roofNbOffset*floorHeight+roofHeight+0.0001, roofHeight, roofDepth);
		roof = createOuterWindow3_2(roofWidth, roofHeight+roofThickness+0.0001, roofHeight+roofThickness, roofThickness, roofDepth);
	}
	else if (roofType === 4)
	{
		roofWall = createInnerWindow4(roofWidth-roofThickness, roofNbOffset*floorHeight+roofHeight+0.0001, roofHeight, roofDepth);
		roof = createOuterWindow4_2(roofWidth, roofHeight+roofThickness+0.0001, roofHeight+roofThickness, roofThickness, roofDepth);
	}

	if (utils.isset(roof))
	{
		if (roofType > 0)
		{
			roof.getObject().setMaterial(roofMaterial);
			roof.add(new Rotation(90.0, 'z'));
			roof.add(new Translation(0.0, 0.0, roofNbOffset*floorHeight));
		}
		else
			roof.setMaterial(roofMaterial);

		group.add(roof);
	}

	if (utils.isset(roofWall))
	{
		if (roofType > 0)
		{
			roofWall.getObject().setMaterial(wallMaterial);
			roofWall.add(new Rotation(90.0, 'z'));
			//roofWall.add(new Translation(0.0, 0.0, 0.0));
		}
		else
			roofWall.getObject().setMaterial(wallMaterial);

		group.add(roofWall);
	}

	for (var i = 1; i <= nbWalls; i++)
	{
		var wall = createStalinianWall(wallData);
		wall.add(new Translation(0.0, i*wallStep - roofDepth/2.0 - wallData.nbWidth*floorHeight/2.0, 0.0));
		group.add(wall);
	}

	group.width = roofDepth;

	return group;
};

var createStalinianNode = function($nodeData)
{
	var group = new Group();

	var nbFaces = utils.isset($nodeData.nbFaces) ? $nodeData.nbFaces : 4;
	var nbRadius = utils.isset($nodeData.nbRadius) ? $nodeData.nbRadius : 1;
	var nbHeight = utils.isset($nodeData.nbHeight) ? $nodeData.nbHeight : 1;
	var wingData = utils.isset($nodeData.wingData) ? $nodeData.wingData : {};

	if (nbFaces%2 !== 0)
		nbFaces = nbFaces+1;

	var theta = 360.0/nbFaces;

	var prism = createPrism(nbRadius*diagFloor, nbHeight*floorHeight, nbFaces);
	prism.getObject().setMaterial(wallMaterial);
	prism.add(new Translation(0.0, 0.0, nbHeight*floorHeight/2.0));
	prism.add(new Rotation(theta/2.0, 'z'));
	group.add(prism);

	for (var i = 0; i < nbFaces/2; i++)
	{
		var wing = createStalinianWing(wingData);
		var subGroup = new Group();
		subGroup.add(wing);
		subGroup.add(new Rotation(i*theta, 'z'));
		group.add(subGroup);
	}

	return group;
};


