var roofThickness = 0.2;

var createEmptyWall = function($nbFloors, $nbWidth, $nbDepth, $roofType, $borderType, $borderFloors, $margin, $bottomOffset, $displayWall)
{
	var displayWall = $displayWall;

	if (!utils.isset(displayWall))
		displayWall = true;

	var group = new Group();
	var wall = null;
	var roof = null;
	var border = null;

	if (displayWall === true)
	{
		if ($roofType === 0)
		{
			wall = createCuboid($nbDepth*floorHeight, $nbWidth*floorHeight, $nbFloors*floorHeight);
			wall.add(new Translation(0.0, 0.0, $nbFloors*floorHeight/2.0));
		}
		else if ($roofType === 1)
		{
			wall = createInnerWindow1($nbWidth*floorHeight, $nbFloors*floorHeight+0.0001, $nbDepth*floorHeight);
			roof = createOuterWindow1_2($nbWidth*floorHeight+roofThickness, $nbWidth/2.0*floorHeight+roofThickness+0.0001, roofThickness, $nbDepth*floorHeight+2.0*roofThickness);
			roof.add(new Translation(0.0, 0.0, $nbFloors*floorHeight-$nbWidth/2.0*floorHeight));
		}
		else if ($roofType === 2)
		{
			wall = createInnerWindow2($nbWidth*floorHeight, $nbFloors*floorHeight+0.0001, floorHeight, $nbDepth*floorHeight);
			roof = createOuterWindow2_2($nbWidth*floorHeight+roofThickness, floorHeight+roofThickness+0.0001, floorHeight+roofThickness, roofThickness, $nbDepth*floorHeight+2.0*roofThickness);
			roof.add(new Translation(0.0, 0.0, ($nbFloors-1)*floorHeight));
		}
		else if ($roofType === 3)
		{
			wall = createInnerWindow3($nbWidth*floorHeight, $nbFloors*floorHeight+0.0001, floorHeight, $nbDepth*floorHeight);
			roof = createOuterWindow3_2($nbWidth*floorHeight+roofThickness, floorHeight+roofThickness+0.0001, floorHeight+roofThickness, roofThickness, $nbDepth*floorHeight+2.0*roofThickness);
			roof.add(new Translation(0.0, 0.0, ($nbFloors-1)*floorHeight));
		}
		else if ($roofType === 4)
		{
			wall = createInnerWindow4($nbWidth*floorHeight, $nbFloors*floorHeight+0.0001, floorHeight, $nbDepth*floorHeight);
			roof = createOuterWindow4_2($nbWidth*floorHeight+roofThickness, floorHeight+roofThickness+0.0001, floorHeight+roofThickness, roofThickness, $nbDepth*floorHeight+2.0*roofThickness);
			roof.add(new Translation(0.0, 0.0, ($nbFloors-1)*floorHeight));
		}
		else if ($roofType === 5)
		{
			wall = createInnerWindow5($nbWidth*floorHeight, $nbFloors*floorHeight+0.0001, floorHeight, $nbDepth*floorHeight);
			roof = createOuterWindow5_2($nbWidth*floorHeight+roofThickness, floorHeight+roofThickness+0.0001, floorHeight+roofThickness, roofThickness, $nbDepth*floorHeight+2.0*roofThickness);
			roof.add(new Translation(0.0, 0.0, ($nbFloors-1)*floorHeight));
		}

		if (utils.isset(wall.getObject))
			wall.getObject().setMaterial(wallMaterial);
		else
			wall.setMaterial(wallMaterial);

		group.add(wall);

		if (utils.isset(roof))
		{
			roof.getObject().setMaterial(roofMaterial);
			group.add(roof);
		}
	}

	if ($borderType === 1)
		border = createOuterWindow1_2($nbWidth*floorHeight-2.0*$margin, $borderFloors*floorHeight-2.0*$margin, roofThickness, $nbDepth*floorHeight+roofThickness);
	else if ($borderType === 2)
		border = createOuterWindow2_2($nbWidth*floorHeight-2.0*$margin, $borderFloors*floorHeight-2.0*$margin, floorHeight-$margin, roofThickness, $nbDepth*floorHeight+roofThickness);
	else if ($borderType === 3)
		border = createOuterWindow3_2($nbWidth*floorHeight-2.0*$margin, $borderFloors*floorHeight-2.0*$margin, floorHeight-$margin, roofThickness, $nbDepth*floorHeight+roofThickness);
	else if ($borderType === 4)
		border = createOuterWindow4_2($nbWidth*floorHeight-2.0*$margin, $borderFloors*floorHeight-2.0*$margin, floorHeight-$margin, roofThickness, $nbDepth*floorHeight+roofThickness);
	else if ($borderType === 5)
		border = createOuterWindow5_2($nbWidth*floorHeight-2.0*$margin, $borderFloors*floorHeight-2.0*$margin, floorHeight-$margin, roofThickness, $nbDepth*floorHeight+roofThickness);

	if (utils.isset(border))
	{
		border.add(new Translation(0.0, 0.0, $margin + $bottomOffset));
		border.getObject().setMaterial(windowBorderMaterial);
		group.add(border);

		borderBottom = createCuboid($nbDepth*floorHeight+roofThickness, $nbWidth*floorHeight-2.0*$margin-2.0*roofThickness, roofThickness);
		borderBottom.add(new Translation(0.0, 0.0, $margin+roofThickness/2.0 + $bottomOffset));
		borderBottom.getObject().setMaterial(windowBorderMaterial);
		group.add(borderBottom);
	}

	return group;
};

var createWall = function($wallData)
{
	var group = new Group();

	var nbFloors = utils.isset($wallData.nbFloors) ? $wallData.nbFloors : 2;
	var nbWidth = utils.isset($wallData.nbWidth) ? $wallData.nbWidth : 1;
	var nbDepth = utils.isset($wallData.nbDepth) ? $wallData.nbDepth : 1;
	var roofType = utils.isset($wallData.roofType) ? $wallData.roofType : 0;
	var borderType = utils.isset($wallData.borderType) ? $wallData.borderType : 0;
	var borderFloors = utils.isset($wallData.borderFloors) ? $wallData.borderFloors : 1;
	var margin = utils.isset($wallData.margin) ? $wallData.margin : 0.0;
	var bottomOffset = utils.isset($wallData.bottomOffset) ? $wallData.bottomOffset : 0.0;
	var displayWall = utils.isset($wallData.displayWall) ? $wallData.displayWall : true;
	var windows = utils.isset($wallData.windows) ? $wallData.windows : [];

	var base = createEmptyWall(nbFloors, nbWidth, nbDepth, roofType, borderType, borderFloors, margin, bottomOffset, displayWall);
	group.add(base);

	var nbWindows = Math.min(windows.length, nbFloors);

	for (var i = 0; i < nbWindows; i++)
	{
		var windowData = windows[i];

		var windowType = utils.isset(windowData.windowType) ? windowData.windowType : 'none';
		var width = utils.isset(windowData.width) ? windowData.width : floorHeight-2.0*roofThickness;
		var height = utils.isset(windowData.height) ? windowData.height : floorHeight;
		var arcHeight = utils.isset(windowData.arcHeight) ? windowData.arcHeight : floorHeight/2.0;
		var thickness = utils.isset(windowData.thickness) ? windowData.thickness : 0.2;
		var depth = utils.isset(windowData.depth) ? windowData.depth : 0.3;
		var innerType = utils.isset(windowData.innerType) ? windowData.innerType : 1;
		var outerType = utils.isset(windowData.outerType) ? windowData.outerType : 1;

		var window1 = null;
		var window2 = null;

		if (windowType === 'simple')
		{
			if (outerType === 1)
			{
				window1 = createWindow1_2(width, height, thickness, depth);
				window2 = createWindow1_2(width, height, thickness, depth);
			}
			else if (outerType === 2)
			{
				window1 = createWindow2_2(width, height, arcHeight, thickness, depth);
				window2 = createWindow2_2(width, height, arcHeight, thickness, depth);
			}
			else if (outerType === 3)
			{
				window1 = createWindow3_2(width, height, arcHeight, thickness, depth);
				window2 = createWindow3_2(width, height, arcHeight, thickness, depth);
			}
			else if (outerType === 4)
			{
				window1 = createWindow4_2(width, height, arcHeight, thickness, depth);
				window2 = createWindow4_2(width, height, arcHeight, thickness, depth);
			}
			else if (outerType === 5)
			{
				window1 = createWindow5_2(width, height, arcHeight, thickness, depth);
				window2 = createWindow5_2(width, height, arcHeight, thickness, depth);
			}
		}
		else if (windowType === 'double')
		{
			window1 = createDoubleWindow1(width, height, arcHeight, thickness, depth, innerType, outerType);
			window2 = createDoubleWindow1(width, height, arcHeight, thickness, depth, innerType, outerType);
		}
		else if (windowType === 'porthole')
		{
			window1 = createPorthole(height/2.0, thickness, depth);
			window2 = createPorthole(height/2.0, thickness, depth);
		}

		if (utils.isset(window1))
		{
			if (windowType === 'porthole')
				window1.add(new Translation(-nbDepth*floorHeight/2.0, 0.0, i*floorHeight + (floorHeight-height)/2.0));
			else
				window1.add(new Translation(-nbDepth*floorHeight/2.0, 0.0, i*floorHeight));

			group.add(window1);

			if (windowType !== 'porthole')
			{
				var border = createCuboid(depth, width, thickness);
				border.getObject().setMaterial(windowBorderMaterial);
				border.add(new Translation(-nbDepth*floorHeight/2.0-depth/2.0, 0.0, i*floorHeight));
				group.add(border);
			}
		}

		if (utils.isset(window2))
		{
			if (windowType === 'porthole')
				window2.add(new Translation(nbDepth*floorHeight/2.0, 0.0, i*floorHeight + (floorHeight-height)/2.0));
			else
				window2.add(new Translation(nbDepth*floorHeight/2.0, 0.0, i*floorHeight));

			window2.add(new Rotation(180.0, 'z'));
			group.add(window2);

			if (windowType !== 'porthole')
			{
				var border = createCuboid(depth, width, thickness);
				border.getObject().setMaterial(windowBorderMaterial);
				border.add(new Translation(nbDepth*floorHeight/2.0+depth/2.0, 0.0, i*floorHeight));
				group.add(border);
			}
		}
	}

	return group;
};

var createWing = function($wallDataList)
{
	var offsetY = 0.0;
	var group = new Group();
	
	for (var i = 0; i < $wallDataList.walls.length; i++)
	{
		var width = $wallDataList.walls[i].nbWidth*floorHeight;
		var wall = createWall($wallDataList.walls[i]);
		wall.add(new Translation(0.0, offsetY + width/2.0, 0.0));
		//wall.add(new Translation(0.0, offsetY, 0.0));
		group.add(wall);

		offsetY = offsetY + width;
	}

	group.width = offsetY;

	group.add(new Translation(0.0, -offsetY/2.0, 0.0));

	var roofType = utils.isset($wallDataList.roofType) ? $wallDataList.roofType : 0;
	var roofNbWidth = utils.isset($wallDataList.roofNbWidth) ? $wallDataList.roofNbWidth : 1;
	var roofNbHeight = utils.isset($wallDataList.roofNbHeight) ? $wallDataList.roofNbHeight : 1;
	var roofNbOffset = utils.isset($wallDataList.roofNbOffset) ? $wallDataList.roofNbOffset : 1;

	var roofWidth = roofNbWidth*floorHeight;
	var roofHeight = roofNbHeight*floorHeight;

	var roof = null;
	var roofWall = null;

	if (roofType === 1)
	{
		roofWall = createInnerWindow1(roofWidth-roofThickness, roofWidth/2.0+0.0001, offsetY);
		roof = createOuterWindow1_2(roofWidth, roofWidth/2.0+roofThickness+0.0001, roofThickness, offsetY);
	}
	else if (roofType === 2)
	{
		roofWall = createInnerWindow2(roofWidth-roofThickness, roofHeight+0.0001, roofHeight, offsetY);
		roof = createOuterWindow2_2(roofWidth, roofHeight+roofThickness+0.0001, roofHeight+roofThickness, roofThickness, offsetY);
	}
	else if (roofType === 3)
	{
		roofWall = createInnerWindow3(roofWidth-roofThickness, roofHeight+0.0001, roofHeight, offsetY);
		roof = createOuterWindow3_2(roofWidth, roofHeight+roofThickness+0.0001, roofHeight+roofThickness, roofThickness, offsetY);
	}
	else if (roofType === 4)
	{
		roofWall = createInnerWindow4(roofWidth-roofThickness, roofHeight+0.0001, roofHeight, offsetY);
		roof = createOuterWindow4_2(roofWidth, roofHeight+roofThickness+0.0001, roofHeight+roofThickness, roofThickness, offsetY);
	}
	else if (roofType === 5)
	{
		roofWall = createInnerWindow5(roofWidth-roofThickness, roofHeight+0.0001, roofHeight, offsetY);
		roof = createOuterWindow5_2(roofWidth, roofHeight+roofThickness+0.0001, roofHeight+roofThickness, roofThickness, offsetY);
	}

	if (utils.isset(roof))
	{
		roof.getObject().setMaterial(roofMaterial);
		roof.add(new Rotation(90.0, 'z'));
		roof.add(new Translation(-offsetY/2.0, 0.0, roofNbOffset*floorHeight));
		group.add(roof);
	}

	if (utils.isset(roofWall))
	{
		roofWall.getObject().setMaterial(wallMaterial);
		roofWall.add(new Rotation(90.0, 'z'));
		roofWall.add(new Translation(-offsetY/2.0, 0.0, roofNbOffset*floorHeight));
		group.add(roofWall);
	}

	return group;
};

var createNode = function($nodeData)
{
	var group = new Group();

	var nbFaces = utils.isset($nodeData.nbFaces) ? $nodeData.nbFaces : 4;
	var nbRadius = utils.isset($nodeData.nbRadius) ? $nodeData.nbRadius : 1;
	var nbHeight = utils.isset($nodeData.nbHeight) ? $nodeData.nbHeight : 1;
	var wingData = utils.isset($nodeData.wingData) ? $nodeData.wingData : { walls: [] };

	if (nbFaces%2 !== 0)
		nbFaces = nbFaces+1;

	var theta = 360.0/nbFaces;

	var prism = createPrism(nbRadius*diagFloor, nbHeight*floorHeight, nbFaces);
	prism.getObject().setMaterial(wallMaterial);
	prism.add(new Translation(0.0, 0.0, nbHeight*floorHeight/2.0));
	//prism.add(new Rotation(theta/2.0, 'z'));
	group.add(prism);

	for (var i = 0; i < nbFaces/2; i++)
	{
		var wing = createWing(wingData);
		var subGroup = new Group();
		subGroup.add(wing);
		subGroup.add(new Rotation(i*theta, 'z'));
		group.add(subGroup);
	}

	return group;
};
