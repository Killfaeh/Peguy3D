/////////////////////////////////////////////////
// Etages de tour entourés de fenêtres simples //
/////////////////////////////////////////////////

var createTowerFloorSimple1 = function($nbFloors, $nbFaces, $radius, $windowType)
{
	var theta = 2.0*Math.PI/$nbFaces;
	var faceDistance = $radius*Math.cos(theta/2.0);
	var faceWidth = 2.0*$radius*Math.sin(theta/2.0);
	var height = $nbFloors*floorHeight;
	var thickness = faceWidth/10.0;
	var depth = thickness*2.0/3.0;
	var windowWidth = faceWidth-4.0*depth;
	var windowHeight = 0.9*$nbFloors*floorHeight;

	var prism = createPrism($radius, height, $nbFaces);
	prism.getObject().setMaterial(wallMaterial);
	prism.add(new Translation(0.0, 0.0, height/2.0));

	var group = new Group();

	group.add(prism);

	for (var i = 0; i < $nbFaces; i++)
	{
		var window = null;

		if ($windowType === 1)
			window = createWindow1_2(windowWidth, windowHeight, thickness, depth);
		else if ($windowType === 2)
			window = createWindow2_2(windowWidth, windowHeight, Math.min(windowHeight/3.0, floorHeight), thickness, depth);
		else if ($windowType === 3)
			window = createWindow3_2(windowWidth, windowHeight, Math.min(windowHeight/3.0, floorHeight), thickness, depth);
		else if ($windowType === 4)
			window = createWindow4_2(windowWidth, windowHeight, Math.min(windowHeight/3.0, floorHeight), thickness, depth);
		else if ($windowType === 5)
			window = createWindow5_2(windowWidth, windowHeight, Math.min(windowHeight/3.0, floorHeight), thickness, depth);
		else if ($windowType === 6)
			window = createPorthole(windowWidth/3.0, thickness, depth);

		window.add(new Rotation((i*theta + theta/2.0)/Math.PI*180.0, 'z'));

		if ($windowType < 6)
			window.add(new Translation(-faceDistance, 0.0, (height-windowHeight)/2.0));
		else
			window.add(new Translation(-faceDistance, 0.0, $nbFloors*floorHeight/2.0));

		group.add(window);

		if ($windowType < 5)
		{
			var windowBorder = createCuboid(depth, windowWidth-2.0*thickness, thickness);
			windowBorder.getObject().setMaterial(windowBorderMaterial);

			windowBorder.add(new Rotation((i*theta + theta/2.0)/Math.PI*180.0, 'z'));
			windowBorder.add(new Translation(-faceDistance-depth/2.0, 0.0, (height-windowHeight)/2.0 + thickness/2.0));

			group.add(windowBorder);
		}
	}

	group.add(new Rotation(theta/2.0/Math.PI*180.0));

	return group;
};

var createTowerFloorSimple2 = function($nbFloors, $nbFaces, $radius, $windowType, $roofType, $roofHeight, $endRadius)
{
	var theta = 2.0*Math.PI/$nbFaces;
	var faceDistance = $radius*Math.cos(theta/2.0);
	var faceWidth = 2.0*$radius*Math.sin(theta/2.0);
	var height = $nbFloors*floorHeight;
	var endRadius = $endRadius;

	//if (!utils.isset(endRadius))
	//	endRadius = faceDistance;

	var group = new Group();

	var roof = null;

	if ($roofType === 2)
	{
		if (!utils.isset(endRadius))
			endRadius = $radius;

		roof = new Prism($radius, endRadius, $roofHeight+floorHeight, $nbFaces);
	}
	else
	{
		if (!utils.isset(endRadius))
			endRadius = faceDistance;

		roof = new Cylinder(faceDistance, endRadius, $roofHeight+floorHeight);
	}

	roof.add(new Translation(0.0, 0.0, ($roofHeight+floorHeight)/2.0+height-floorHeight));

	roof.setMaterial(wallMaterial);

	group.add(roof);

	for (var i = 0; i < $nbFaces; i++)
	{
		var window = null;
		var backWindow = null;

		if ($windowType === 1)
		{
			window = createWindow1_2(faceWidth, $nbFloors*floorHeight, 0.2, 0.3);
			backWindow = createInnerWindow1(faceWidth, $nbFloors*floorHeight, faceDistance);
		}
		else if ($windowType === 2)
		{
			window = createWindow2_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.2, 0.3);
			backWindow = createInnerWindow2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance);
		}
		else if ($windowType === 3)
		{
			window = createWindow3_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.2, 0.3);
			backWindow = createInnerWindow3(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance);
		}
		else if ($windowType === 4)
		{
			window = createWindow4_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.2, 0.3);
			backWindow = createInnerWindow4(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance);
		}
		else if ($windowType === 5)
		{
			window = createWindow5_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.2, 0.3);
			backWindow = createInnerWindow5(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance);
		}

		window.add(new Rotation((i+0.5)*theta/Math.PI*180.0, 'z'));
		window.add(new Translation(-faceDistance, 0.0, 0.0));

		backWindow.add(new Rotation(((i+0.5)*theta)/Math.PI*180.0, 'z'));
		backWindow.add(new Translation(faceDistance/2.0, 0.0, 0.0));

		backWindow.setMaterial(wallMaterial);

		group.add(window);
		group.add(backWindow);
	}

	group.add(new Rotation(theta/2.0/Math.PI*180.0));

	return group;
};

/////////////////////////////////////////////////
// Etages de tour entourés de fenêtres doubles //
/////////////////////////////////////////////////

var createTowerFloorDouble1 = function($nbFloors, $nbFaces, $radius, $innerType, $outerType)
{
	var theta = 2.0*Math.PI/$nbFaces;
	var faceDistance = $radius*Math.cos(theta/2.0);
	var faceWidth = 2.0*$radius*Math.sin(theta/2.0);
	var height = $nbFloors*floorHeight;
	var windowHeight = 0.9*$nbFloors*floorHeight;
	var thickness = faceWidth/15.0;
	var depth = thickness*2.0/3.0;

	var prism = createPrism($radius, height, $nbFaces);
	prism.getObject().setMaterial(wallMaterial);
	prism.add(new Translation(0.0, 0.0, height/2.0));

	var group = new Group();

	group.add(prism);

	for (var i = 0; i < $nbFaces; i++)
	{
		var window = createDoubleWindow1(faceWidth-0.6, windowHeight, Math.min(windowHeight/3.0, floorHeight), thickness, depth, $innerType, $outerType);

		window.add(new Rotation((i*theta + theta/2.0)/Math.PI*180.0, 'z'));
		window.add(new Translation(-faceDistance, 0.0, (height-windowHeight)/2.0));

		group.add(window);

		var windowBorder = new Cuboid(depth, faceWidth-0.6, thickness);
		windowBorder.setMaterial(windowBorderMaterial);

		windowBorder.add(new Rotation((i*theta + theta/2.0)/Math.PI*180.0, 'z'));
		windowBorder.add(new Translation(-faceDistance-0.15, 0.0, (height-windowHeight)/2.0));

		group.add(windowBorder);
	}

	group.add(new Rotation(theta/2.0/Math.PI*180.0));

	return group;
};

var createTowerFloorDouble2 = function($nbFloors, $nbFaces, $radius, $innerType, $outerType, $roofType, $roofHeight, $endRadius)
{
	var theta = 2.0*Math.PI/$nbFaces;
	var faceDistance = $radius*Math.cos(theta/2.0);
	var faceWidth = 2.0*$radius*Math.sin(theta/2.0);
	var height = $nbFloors*floorHeight;
	var endRadius = $endRadius;
	var thickness = faceWidth/15.0;
	var depth = thickness*2.0/3.0;

	var group = new Group();

	var roof = null;

	if ($roofType === 2)
	{
		if (!utils.isset(endRadius))
			endRadius = $radius;

		roof = new Prism($radius, endRadius, $roofHeight+floorHeight, $nbFaces);
	}
	else
	{
		if (!utils.isset(endRadius))
			endRadius = faceDistance;

		roof = new Cylinder(faceDistance, endRadius, $roofHeight+floorHeight);
	}

	roof.add(new Translation(0.0, 0.0, ($roofHeight+floorHeight)/2.0+height-floorHeight));

	roof.setMaterial(wallMaterial);

	group.add(roof);

	for (var i = 0; i < $nbFaces; i++)
	{
		var window = createDoubleWindow1(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), thickness, depth, $innerType, $outerType);

		window.add(new Rotation(((i+0.5)*theta)/Math.PI*180.0, 'z'));
		window.add(new Translation(-faceDistance, 0.0, 0.0));

		group.add(window);

		if ($roofType !== 2 || endRadius < $radius)
		{
			var backWindow = null;

			if ($outerType === 1)
				backWindow = createInnerWindow1(faceWidth, $nbFloors*floorHeight, faceDistance);
			else if ($outerType === 2)
				backWindow = createInnerWindow2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance);
			else if ($outerType === 3)
				backWindow = createInnerWindow3(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance);
			else if ($outerType === 4)
				backWindow = createInnerWindow4(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance);
			else if ($outerType === 5)
				backWindow = createInnerWindow5(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance);

			backWindow.add(new Rotation(((i+0.5)*theta)/Math.PI*180.0, 'z'));
			backWindow.add(new Translation(faceDistance/2.0, 0.0, 0.0));

			backWindow.setMaterial(wallMaterial);

			group.add(backWindow);
		}
	}

	group.add(new Rotation(theta/2.0/Math.PI*180.0));

	return group;
};

///////////////////////////////////////////////////////////
// Base de tour avec cadres de fenêtres mais sans vitres //
///////////////////////////////////////////////////////////

var createBaseTower1 = function($nbFloors, $nbFaces, $radius, $windowType)
{
	var theta = 2.0*Math.PI/$nbFaces;
	var faceDistance = $radius*Math.cos(theta/2.0);
	var faceWidth = 2.0*$radius*Math.sin(theta/2.0);
	var height = $nbFloors*floorHeight;

	var prism = createPrism($radius, height, $nbFaces);
	prism.getObject().setMaterial(wallMaterial);
	prism.add(new Translation(0.0, 0.0, height/2.0));

	var group = new Group();

	group.add(prism);

	for (var i = 0; i < $nbFaces; i++)
	{
		var window = null;

		if ($windowType === 1)
			window = createOuterWindow1_2(faceWidth, $nbFloors*floorHeight, 0.4, 0.6);
		else if ($windowType === 2)
			window = createOuterWindow2_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.4, 0.6);
		else if ($windowType === 3)
			window = createOuterWindow3_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.4, 0.6);
		else if ($windowType === 4)
			window = createOuterWindow4_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.4, 0.6);
		else if ($windowType === 5)
			window = createOuterWindow5_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.4, 0.6);

		window.setMaterial(wallMaterial);

		window.add(new Rotation(((i+0.5)*theta)/Math.PI*180.0, 'z'));
		window.add(new Translation(faceDistance, 0.0, 0.0));

		group.add(window);
	}

	group.add(new Rotation(theta/2.0/Math.PI*180.0));

	return group;
};

var createBaseTower2 = function($nbFloors, $nbFaces, $radius, $windowType, $roofType, $roofHeight, $endRadius)
{
	var theta = 2.0*Math.PI/$nbFaces;
	var faceDistance = $radius*Math.cos(theta/2.0);
	var faceWidth = 2.0*$radius*Math.sin(theta/2.0);
	var height = $nbFloors*floorHeight;
	var endRadius = $endRadius;

	//if (!utils.isset(endRadius))
	//	endRadius = faceDistance;

	var group = new Group();

	var roof = null;

	if ($roofType === 2)
	{
		if (!utils.isset(endRadius))
			endRadius = $radius;

		roof = new Prism($radius, endRadius, $roofHeight+floorHeight, $nbFaces);
	}
	else
	{
		if (!utils.isset(endRadius))
			endRadius = faceDistance;

		roof = new Cylinder(faceDistance, endRadius, $roofHeight+floorHeight);
	}

	roof.add(new Translation(0.0, 0.0, ($roofHeight+floorHeight)/2.0+height-floorHeight));

	roof.setMaterial(wallMaterial);

	group.add(roof);

	for (var i = 0; i < $nbFaces; i++)
	{
		var window = null;
		var backWindow = null;

		if ($windowType === 1)
		{
			window = createOuterWindow1_2(faceWidth, $nbFloors*floorHeight, 0.4, 0.6);
			backWindow = createInnerWindow1(faceWidth, $nbFloors*floorHeight, faceDistance+glassThickness);
		}
		else if ($windowType === 2)
		{
			window = createOuterWindow2_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.4, 0.6);
			backWindow = createInnerWindow2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance+glassThickness);
		}
		else if ($windowType === 3)
		{
			window = createOuterWindow3_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.4, 0.6);
			backWindow = createInnerWindow3(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance+glassThickness);
		}
		else if ($windowType === 4)
		{
			window = createOuterWindow4_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.4, 0.6);
			backWindow = createInnerWindow4(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance+glassThickness);
		}
		else if ($windowType === 5)
		{
			window = createOuterWindow5_2(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), 0.4, 0.6);
			backWindow = createInnerWindow5(faceWidth, $nbFloors*floorHeight, Math.min($nbFloors*floorHeight/3.0, floorHeight), faceDistance+glassThickness);
		}

		window.setMaterial(wallMaterial);

		window.add(new Rotation(((i+0.5)*theta)/Math.PI*180.0, 'z'));
		window.add(new Translation(faceDistance, 0.0, 0.0));

		backWindow.add(new Rotation(((i+0.5)*theta)/Math.PI*180.0, 'z'));
		backWindow.add(new Translation(faceDistance/2.0, 0.0, 0.0));

		backWindow.setMaterial(wallMaterial);

		group.add(window);
		group.add(backWindow);
	}

	group.add(new Rotation(theta/2.0/Math.PI*180.0));

	return group;
};

var createBaseTower3 = function($nbFloors, $nbFaces, $radius, $windowType)
{
	var theta = 2.0*Math.PI/$nbFaces;
	var faceDistance = $radius*Math.cos(theta/2.0);
	var faceWidth = 2.0*$radius*Math.sin(theta/2.0);
	var height = $nbFloors*floorHeight;
	var thickness = faceWidth*0.3/15.0;
	var depth = thickness*2.0/3.0;

	var widthRatio = 0.7;
	var heightRatio = 0.92;
	var arcHeightRatio = 0.6;

	//var prism = new Prism($radius, $radius, 0.2, 360, 0.0, 0.0, $nbFaces, true, true, true);
	var prism = new RegularPolygon($radius, $nbFaces);
	prism.setMaterial(wallMaterial);
	var prismInstance = new Instance(prism);
	prismInstance.add(new Translation(0.0, 0.0, height));

	var group = new Group();

	group.add(prism);
	group.add(prismInstance);

	for (var i = 0; i < $nbFaces; i++)
	{
		var window = null;

		if ($windowType === 1)
			window = createWindow1_3(faceWidth, height, faceWidth*widthRatio, $nbFloors*floorHeight*heightRatio, 1.0);
		else if ($windowType === 2)
			window = createWindow2_3(faceWidth, height, faceWidth*widthRatio, $nbFloors*floorHeight*heightRatio, $nbFloors*floorHeight*heightRatio*arcHeightRatio, 1.0);
		else if ($windowType === 3)
			window = createWindow3_3(faceWidth, height, faceWidth*widthRatio, $nbFloors*floorHeight*heightRatio, $nbFloors*floorHeight*heightRatio*arcHeightRatio, 1.0);
		else if ($windowType === 4)
			window = createWindow4_3(faceWidth, height, faceWidth*widthRatio, $nbFloors*floorHeight*heightRatio, $nbFloors*floorHeight*heightRatio*arcHeightRatio, 1.0);
		else if ($windowType === 5)
			window = createWindow5_3(faceWidth, height, faceWidth*widthRatio, $nbFloors*floorHeight*heightRatio, $nbFloors*floorHeight*heightRatio*arcHeightRatio, 1.0);

		window.add(new Rotation((i*theta + theta/2.0)/Math.PI*180.0, 'z'));
		window.add(new Translation(0.5-faceDistance, 0.0, 0.0));

		group.add(window);
	}

	group.add(new Rotation(theta/2.0/Math.PI*180.0));

	return group;
};

/////////////////////
// Tours complètes //
/////////////////////

var createTower = function($floorsList)
{
	var group = new Group();

	var offsetHeight = 0.0;
	var lastRadius = 0.0;

	for (var i = 0; i < $floorsList.length; i++)
	{
		var floorData = $floorsList[i];
		var type = utils.isset(floorData.type) ? floorData.type : 'base3';
		var nbRadius = utils.isset(floorData.nbRadius) ? floorData.nbRadius : 5;
		var nbFloors = utils.isset(floorData.nbFloors) ? floorData.nbFloors : 5;
		var nbFaces = utils.isset(floorData.nbFaces) ? floorData.nbFaces : 6;
		var windowType1 = utils.isset(floorData.windowType1) ? floorData.windowType1 : 1;
		var windowType2 = utils.isset(floorData.windowType2) ? floorData.windowType2 : 1;
		var roofType = utils.isset(floorData.roofType) ? floorData.roofType : 2;
		var roofHeight = utils.isset(floorData.roofHeight) ? floorData.roofHeight : 0.0;
		var roofRadius = utils.isset(floorData.roofRadius) ? floorData.roofRadius : null;

		if (type === 'simple1')
		{
			var floor = createTowerFloorSimple1(nbFloors, nbFaces, nbRadius*diagFloor, windowType1);
			floor.add(new Translation(0.0, 0.0, offsetHeight));
			group.add(floor);
		}
		else if (type === 'simple2')
		{
			var floor = createTowerFloorSimple2(nbFloors, nbFaces, nbRadius*diagFloor, windowType1, roofType, roofHeight, roofRadius);
			floor.add(new Translation(0.0, 0.0, offsetHeight));
			group.add(floor);
		}
		else if (type === 'double1')
		{
			var floor = createTowerFloorDouble1(nbFloors, nbFaces, nbRadius*diagFloor, windowType1, windowType2);
			floor.add(new Translation(0.0, 0.0, offsetHeight));
			group.add(floor);
		}
		else if (type === 'double2')
		{
			var floor = createTowerFloorDouble2(nbFloors, nbFaces, nbRadius*diagFloor, windowType1, windowType2, roofType, roofHeight, roofRadius)
			floor.add(new Translation(0.0, 0.0, offsetHeight));
			group.add(floor);
		}
		else if (type === 'base1')
		{
			var floor = createBaseTower1(nbFloors, nbFaces, nbRadius*diagFloor, windowType1);
			floor.add(new Translation(0.0, 0.0, offsetHeight));
			group.add(floor);
		}
		else if (type === 'base2')
		{
			var floor = createBaseTower2(nbFloors, nbFaces, nbRadius*diagFloor, windowType1, roofType, roofHeight, roofRadius);
			floor.add(new Translation(0.0, 0.0, offsetHeight));
			group.add(floor);
		}
		else if (type === 'base3')
		{
			var floor = createBaseTower3(nbFloors, nbFaces, nbRadius*diagFloor, windowType1);
			floor.add(new Translation(0.0, 0.0, offsetHeight));
			group.add(floor);
		}
		else if (type === 'stalinian')
		{
			var floor = createStalinianTowerFloor(floorData);
			floor.add(new Translation(0.0, 0.0, offsetHeight));
			group.add(floor);
		}
		else if (type === 'roof1')
		{
			var roof = createRevRoof(nbRadius*diagFloor, nbFloors*floorHeight, roofRadius*diagFloor, roofType);
			roof.add(new Translation(0.0, 0.0, offsetHeight));
			group.add(roof);
		}
		else if (type === 'roof2')
		{
			var roof = createPrismRevRoof(nbRadius*diagFloor, nbFloors*floorHeight, roofRadius*diagFloor, roofType, nbFaces);
			roof.add(new Translation(0.0, 0.0, offsetHeight));
			group.add(roof);
		}
		else if (type === 'platform1')
		{
			var platform = createPrism(nbRadius*diagFloor, nbFloors*floorHeight, nbFaces);
			platform.getObject().setMaterial(wallMaterial);
			platform.add(new Translation(0.0, 0.0, offsetHeight + nbFloors*floorHeight/2.0));
			platform.add(new Rotation(180.0/nbFaces, 'z'));
			group.add(platform);
		}
		else if (type === 'platform2')
		{
			var platform = createPrism(nbRadius*diagFloor, nbFloors*floorHeight, nbFaces);
			platform.getObject().setMaterial(wallMaterial);
			platform.add(new Translation(0.0, 0.0, offsetHeight + nbFloors*floorHeight/2.0));
			platform.add(new Rotation(180.0/nbFaces, 'z'));
			group.add(platform);

			var theta = 2.0*Math.PI/nbFaces;
			var faceDistance = (nbRadius*diagFloor-0.15)*Math.cos(theta/2.0);
			var faceWidth = 2.0*(nbRadius*diagFloor-0.15)*Math.sin(theta/2.0);

			var regularPolygon = new RegularPolygon(nbRadius*diagFloor-0.15, nbFaces);
			var instancePointsList = regularPolygon.samplePoints(Math.round(nbFaces*(faceWidth/0.2)));

			var cylinder = new Cylinder(0.02, 0.02, 1.2);
			cylinder.setMaterial(metalMaterial);

			var bars = cylinder.instancesToPoints(instancePointsList);
			var barsGroup = new Group();
			barsGroup.add(bars);
			barsGroup.add(new Translation(0.0, 0.0, 0.6+offsetHeight + nbFloors*floorHeight));
			barsGroup.add(new Rotation(180.0/nbFaces, 'z'));

			group.add(barsGroup);

			var ringProfilPoints = [[nbRadius*diagFloor-0.1, 0.0, 0.0], 
										[nbRadius*diagFloor, 0.0, 0.0], 
										[nbRadius*diagFloor, 0.05, 0.0], 
										[nbRadius*diagFloor-0.1, 0.05, 0.0]];

			var ring = new PrismRevolution(ringProfilPoints, nbFaces, 30.0);
			ring.setMaterial(metalMaterial);
			ring.add(new Translation(0.0, 0.0, 1.2 + offsetHeight + nbFloors*floorHeight));
			ring.add(new Rotation(180.0/nbFaces, 'z'));
			group.add(ring);
		}
		else if (type === 'platform3')
		{
			var platform = new Cylinder(nbRadius*diagFloor, nbRadius*diagFloor, nbFloors*floorHeight);
			platform.setMaterial(wallMaterial);
			platform.add(new Translation(0.0, 0.0, offsetHeight + nbFloors*floorHeight/2.0));
			platform.add(new Rotation(180.0/nbFaces, 'z'));
			group.add(platform);
		}
		else if (type === 'platform4')
		{
			var platform = new Cylinder(nbRadius*diagFloor, nbRadius*diagFloor, nbFloors*floorHeight);
			platform.setMaterial(wallMaterial);
			platform.add(new Translation(0.0, 0.0, offsetHeight + nbFloors*floorHeight/2.0));
			platform.add(new Rotation(180.0/nbFaces, 'z'));
			group.add(platform);

			var circle = new Circle(nbRadius*diagFloor-0.15);
			var instancePointsList = circle.samplePoints(Math.round(2.0*Math.PI*nbRadius*diagFloor/0.2));

			var cylinder = new Cylinder(0.02, 0.02, 1.2);
			cylinder.setMaterial(metalMaterial);

			var bars = cylinder.instancesToPoints(instancePointsList);
			var barsGroup = new Group();
			barsGroup.add(bars);
			barsGroup.add(new Translation(0.0, 0.0, 0.6+offsetHeight + nbFloors*floorHeight));
			barsGroup.add(new Rotation(180.0/nbFaces, 'z'));

			group.add(barsGroup);

			var ringProfilPoints = [[nbRadius*diagFloor-0.1, 0.0, 0.0], 
										[nbRadius*diagFloor, 0.0, 0.0], 
										[nbRadius*diagFloor, 0.05, 0.0], 
										[nbRadius*diagFloor-0.1, 0.05, 0.0]];

			var ring = new Revolution(ringProfilPoints, 360.0,'', 32, 30.0);
			ring.setMaterial(metalMaterial);
			ring.add(new Translation(0.0, 0.0, 1.2 + offsetHeight + nbFloors*floorHeight));
			ring.add(new Rotation(180.0/nbFaces, 'z'));
			group.add(ring);
		}

		offsetHeight = offsetHeight + nbFloors*floorHeight;
	}

	group.height = offsetHeight;

	//group.add(new Rotation(45.0, 'z'));

	return group;
};

