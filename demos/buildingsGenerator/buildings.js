///////////////
// Fonctions //
///////////////

var createLongBuilding = function($nbBranches, $wingData, $nodeData, $towerData)
{
	var group = new Group();

	// Calcul des dimensions

	var wingLength = 0.0;
	var nodeRadius = 0.0;

	if (utils.isset($nodeData))
		nodeRadius = $nodeData.nbRadius*floorHeight;
	else if (utils.isset($towerData))
		nodeRadius = $towerData[0][0].nbRadius*floorHeight;

	if (utils.isset($wingData))
	{
		if (utils.isset($wingData.walls))
		{
			for (var i = 0; i < $wingData.walls.length; i++)
				wingLength = wingLength + $wingData.walls[i].nbWidth*floorHeight;
		}
		else if (utils.isset($wingData.roofNbDepth))
			wingLength = $wingData.roofNbDepth*floorHeight;
	}

	var fullLength = ($nbBranches-1)*2.0*nodeRadius + ($nbBranches-1)*wingLength;
	var step = fullLength/($nbBranches-1);

	//console.log('Dimensions : ' + wingLength + ', ' + nodeRadius + ', ' + fullLength + ', ' + step);

	// Génération des éléments du bâtiment

	// Ailes

	for (var i = 0; i < $nbBranches-1; i++)
	{
		if (utils.isset($wingData))
		{
			var wing = null;

			if ($wingData.type === 'stalinian')
				wing = createStalinianWing($wingData);
			else
				wing = createWing($wingData);

			wing.add(new Translation(0.0, -fullLength/2.0 + (i+0.5)*step, 0.0));
			group.add(wing);
		}
	}

	// Noeuds

	for (var i = 0; i < $nbBranches; i++)
	{
		if (utils.isset($nodeData))
		{
			var node = null;

			if ($nodeData.type === 'stalinian')
				node = createStalinianNode($nodeData);
			else
				node = createNode($nodeData);

			node.add(new Translation(0.0, -fullLength/2.0 + i*step, 0.0));
			group.add(node);
		}

		// Tours

		if (utils.isset($towerData))
		{
			var towerData = $towerData[i%$towerData.length];
			var tower = null;
			tower = createTower(towerData);
			tower.add(new Translation(0.0, -fullLength/2.0 + i*step, 0.0));
			group.add(tower);

			if (utils.isset($nodeData))
				tower.add(new Translation(0.0, 0.0, $nodeData.nbHeight*floorHeight));
		}
	}

	group.wingLength = wingLength;
	group.nodeRadius = nodeRadius;
	group.fullLength = fullLength;
	group.step = step;

	return group;
};

var createUBuilding = function($nbBranches, $wingData, $nodeData, $towerData, $staggered)
{
	var group = new Group();

	var longBuilding = createLongBuilding($nbBranches, $wingData, $nodeData, $towerData);
	group.add(longBuilding);

	var wingLength = longBuilding.wingLength;
	var nodeRadius = longBuilding.nodeRadius;
	var fullLength = longBuilding.fullLength;
	var step = longBuilding.step;

	// Ailes

	for (var i = 0; i < $nbBranches; i++)
	{
		if (utils.isset($wingData))
		{
			var wing = null;

			if ($wingData.type === 'stalinian')
			{
				wing = createStalinianWing($wingData);
				wing.add(new Translation(wingLength/2.0+nodeRadius, (-fullLength)/2.0 + i*step, 0.0));
			}
			else
			{
				wing = createWing($wingData);
				wing.add(new Translation(nodeRadius, (wingLength-fullLength)/2.0 + i*step, 0.0));
			}
			
			wing.add(new Rotation(90.0, 'z'));
			group.add(wing);
		}
	}

	// Noeuds

	for (var i = 0; i < $nbBranches; i++)
	{
		if (utils.isset($nodeData))
		{
			var node = null;

			if ($nodeData.type === 'stalinian')
				node = createStalinianNode($nodeData);
			else
				node = createNode($nodeData);

			node.add(new Translation(step, -fullLength/2.0 + i*step, 0.0));
			group.add(node);
		}

		// Tours

		if (utils.isset($towerData))
		{
			var towerData = $towerData[i%$towerData.length];

			if ($staggered === true)
				towerData = $towerData[(i+1)%$towerData.length];

			var tower = null;
			tower = createTower(towerData);
			tower.add(new Translation(step, -fullLength/2.0 + i*step, 0.0));
			group.add(tower);

			if (utils.isset($nodeData))
				tower.add(new Translation(0.0, 0.0, $nodeData.nbHeight*floorHeight));
		}
	}

	return group;
};

var createHBuilding = function($nbBranches, $wingData, $nodeData, $towerData, $staggered)
{
	var group = new Group();

	var longBuilding = createLongBuilding($nbBranches, $wingData, $nodeData, $towerData);
	group.add(longBuilding);

	var wingLength = longBuilding.wingLength;
	var nodeRadius = longBuilding.nodeRadius;
	var fullLength = longBuilding.fullLength;
	var step = longBuilding.step;

	// Ailes

	for (var i = 0; i < $nbBranches; i++)
	{
		if (utils.isset($wingData))
		{
			var wing1 = null;
			var wing2 = null;

			if ($wingData.type === 'stalinian')
			{
				wing1 = createStalinianWing($wingData);
				wing2 = createStalinianWing($wingData);
				wing1.add(new Translation(wingLength/2.0+nodeRadius, (-fullLength)/2.0 + i*step, 0.0));
				wing2.add(new Translation(-wingLength/2.0-nodeRadius, (-fullLength)/2.0 + i*step, 0.0));
			}
			else
			{
				wing1 = createWing($wingData);
				wing2 = createWing($wingData);
				wing1.add(new Translation(nodeRadius, (wingLength-fullLength)/2.0 + i*step, 0.0));
				wing2.add(new Translation(-nodeRadius, (wingLength-fullLength)/2.0 + i*step, 0.0));
			}


			wing1.add(new Rotation(90.0, 'z'));
			group.add(wing1);

			wing2.add(new Rotation(-90.0, 'z'));
			group.add(wing2);
		}
	}

	// Noeuds

	for (var i = 0; i < $nbBranches; i++)
	{
		if (utils.isset($nodeData))
		{
			var node1 = null;
			var node2 = null;

			if ($nodeData.type === 'stalinian')
			{
				node1 = createStalinianNode($nodeData);
				node2 = createStalinianNode($nodeData);
			}
			else
			{
				node1 = createNode($nodeData);
				node2 = createNode($nodeData);
			}

			node1.add(new Translation(step, -fullLength/2.0 + i*step, 0.0));
			group.add(node1);

			node2.add(new Translation(-step, -fullLength/2.0 + i*step, 0.0));
			group.add(node2);
		}

		// Tours

		if (utils.isset($towerData))
		{
			var towerData = $towerData[i%$towerData.length];

			if (utils.isset($staggered) && $staggered > 0)
				towerData = $towerData[(i+$staggered)%$towerData.length];

			var tower1 = null;
			var tower2 = null;
			tower1 = createTower(towerData);
			tower2 = createTower(towerData);
			tower1.add(new Translation(step, -fullLength/2.0 + i*step, 0.0));
			tower2.add(new Translation(-step, -fullLength/2.0 + i*step, 0.0));
			group.add(tower1);
			group.add(tower2);

			if (utils.isset($nodeData))
			{
				tower1.add(new Translation(0.0, 0.0, $nodeData.nbHeight*floorHeight));
				tower2.add(new Translation(0.0, 0.0, $nodeData.nbHeight*floorHeight));
			}
		}
	}

	return group;
};

var createStarBuilding = function($nbBranches, $wingData, $nodeData, $towerData)
{
	var group = new Group();

	var theta = 2.0*Math.PI/$nbBranches;
	var faceDistance = Math.cos(theta/2.0);
	var faceWidth = 2.0*Math.sin(theta/2.0);



	return group;
};

var createGridBuilding = function($nbX, $nbY, $wingData, $nodeData, $towerData, $staggered, $fill)
{
	var fill = $fill;

	if (!utils.isset(fill))
		fill = true;

	var group = new Group();

	// Calcul des dimensions

	var wingLength = 0.0;
	var nodeRadius = 0.0;

	if (utils.isset($nodeData))
		nodeRadius = $nodeData.nbRadius*floorHeight;
	else if (utils.isset($towerData))
		nodeRadius = $towerData[0][0].nbRadius*floorHeight;

	if (utils.isset($wingData))
	{
		if (utils.isset($wingData.walls))
		{
			for (var i = 0; i < $wingData.walls.length; i++)
				wingLength = wingLength + $wingData.walls[i].nbWidth*floorHeight;
		}
		else if (utils.isset($wingData.roofNbDepth))
			wingLength = $wingData.roofNbDepth*floorHeight;
	}

	var fullLengthX = ($nbX-1)*2.0*nodeRadius + ($nbX-1)*wingLength;
	var fullLengthY = ($nbY-1)*2.0*nodeRadius + ($nbY-1)*wingLength;
	var stepX = fullLengthX/($nbX-1);
	var stepY = fullLengthY/($nbY-1);

	// Ailes

	for (var i = 0; i < $nbX; i++)
	{
		if (i === 0 || i >= $nbX-1 || fill === true)
		{
			for (var j = 0; j < $nbY-1; j++)
			{
				var wing = null;

				if ($wingData.type === 'stalinian')
					wing = createStalinianWing($wingData);
				else
					wing = createWing($wingData);

				wing.add(new Translation(-fullLengthX/2.0 + i*stepX, -fullLengthY/2.0 + (j+0.5)*stepY, 0.0));
				group.add(wing);
			}
		}
	}

	for (var i = 0; i < $nbX-1; i++)
	{
		for (var j = 0; j < $nbY; j++)
		{
			if (j === 0 || j >= $nbY-1 || fill === true)
			{
				var wing = null;

				if ($wingData.type === 'stalinian')
				{
					wing = createStalinianWing($wingData);
					wing.add(new Translation(wingLength/2.0+nodeRadius-fullLengthX/2.0 + i*stepX, -fullLengthY/2.0 + j*stepY, 0.0));
				}
				else
				{
					wing = createWing($wingData);
					wing.add(new Translation(nodeRadius-fullLengthX/2.0 + i*stepX, (wingLength-fullLengthY)/2.0 + j*stepY, 0.0));
				}

				wing.add(new Rotation(90.0, 'z'));
				group.add(wing);
			}
		}
	}

	// Noeuds

	for (var i = 0; i < $nbX; i++)
	{
		for (var j = 0; j < $nbY; j++)
		{
			if (i === 0 || i >= $nbX-1 || j === 0 || j >= $nbY-1 || fill === true)
			{
				if (utils.isset($nodeData))
				{
					var node = null;
	
					if ($nodeData.type === 'stalinian')
						node = createStalinianNode($nodeData);
					else
						node = createNode($nodeData);

					node.add(new Translation(-fullLengthX/2.0 + i*stepX, -fullLengthY/2.0 + j*stepY, 0.0));
					group.add(node);
				}

				// Tours

				if (utils.isset($towerData))
				{
					var towerData = $towerData[i%$towerData.length];
	
					if ($staggered === true && j%2 === 1)
						towerData = $towerData[(i+1)%$towerData.length];

					var tower = null;
					tower = createTower(towerData);
					tower.add(new Translation(-fullLengthX/2.0 + i*stepX, -fullLengthY/2.0 + j*stepY, 0.0));
					group.add(tower);

					if (utils.isset($nodeData))
						tower.add(new Translation(0.0, 0.0, $nodeData.nbHeight*floorHeight));
				}
			}
		}
	}

	return group;
};

////////////
// Config //
////////////

// Avec fenêtres à voute semi-circulaire

var romanWallData1 =
{
	type: 'default', 
	nbFloors: 4,
	nbWidth: 1,
	nbDepth: 2.5,
	roofType: 4,
	borderType: 1,
	borderFloors: 2.75,
	margin: 0.1,
	bottomOffset: 1.0,
	displayWall: true,
	
	windows: 
	[
		{ windowType: 'none' },
		{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
	]
};

var romanWingData1 = { type: 'default', roofType: 4, roofNbWidth: 2, roofNbHeight: 1.5, roofNbOffset: 3, walls: [] };

for (var i = 0; i < 5; i++)
	romanWingData1.walls.push(romanWallData1);

var romanWallData2 =
{
	type: 'default', 
	nbFloors: 4,
	nbWidth: 1,
	nbDepth: 2.5,
	roofType: 1,
	borderType: 1,
	borderFloors: 2.75,
	margin: 0.1,
	bottomOffset: 1.0,
	displayWall: true,
	
	windows: 
	[
		{ windowType: 'none' },
		{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
	]
};

var romanWingData2 = { type: 'default', roofType: 1, roofNbWidth: 2, roofNbHeight: 1.5, roofNbOffset: 3.5, walls: [] };

for (var i = 0; i < 5; i++)
	romanWingData2.walls.push(romanWallData2);

var noRoofRomanWallData =
{
	type: 'default', 
	nbFloors: 4,
	nbWidth: 1,
	nbDepth: 4,
	roofType: 0,
	borderType: 1,
	borderFloors: 3.5,
	margin: 0.1,
	bottomOffset: 1.0,
	displayWall: true,
	
	windows: 
	[
		{ windowType: 'none' },
		{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
	]
};

var romanNodeData = { type: 'default', nbFaces: 4, nbRadius: 2, nbHeight: 4, wingData: 
																				{ 
																					type: 'default', 
																					roofType: 0, 
																					roofNbWidth: 2, 
																					roofNbHeight: 1.5, 
																					roofNbOffset: 3, 
																					walls: [] 
																				} 
					};

for (var i = 0; i < 4; i++)
	romanNodeData.wingData.walls.push(noRoofRomanWallData);

var romanTowerData1 = 
[
	{ type: 'double2', nbRadius: 1.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0.5, nbFloors: 0.5*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 0.5, nbFloors: 2, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 0.5, nbFloors: 0.5, nbFaces: 8, windowType1: 6, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'platform1', nbRadius: 0.6, nbFloors: 0.15, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0, nbFloors: 0.5*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
];

// Avec fenêtres à voute gothique

var gothWallData =
{
	type: 'default', 
	nbFloors: 4,
	nbWidth: 1,
	nbDepth: 2.5,
	roofType: 2,
	borderType: 2,
	borderFloors: 2.75,
	margin: 0.1,
	bottomOffset: 1.0,
	displayWall: true,
	
	windows: 
	[
		{ windowType: 'none' },
		{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
		{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
		{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
	]
};

var gothWingData = { type: 'default', roofType: 2, roofNbWidth: 2, roofNbHeight: 1.5, roofNbOffset: 3, walls: [] };

for (var i = 0; i < 5; i++)
	gothWingData.walls.push(gothWallData);

var noRoofGothWallData =
{
	type: 'default', 
	nbFloors: 4,
	nbWidth: 1,
	nbDepth: 4,
	roofType: 0,
	borderType: 2,
	borderFloors: 3.5,
	margin: 0.1,
	bottomOffset: 1.0,
	displayWall: true,
	
	windows: 
	[
		{ windowType: 'none' },
		{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
		{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
		{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
	]
};

var gothNodeData = { type: 'default', nbFaces: 4, nbRadius: 2, nbHeight: 4, wingData: 
																				{ 
																					type: 'default', 
																					roofType: 0, 
																					roofNbWidth: 2, 
																					roofNbHeight: 1.5, 
																					roofNbOffset: 3, 
																					walls: [] 
																				} 
					};

for (var i = 0; i < 4; i++)
	gothNodeData.wingData.walls.push(noRoofGothWallData);

var gothTowerData1 = 
[
	{ type: 'double2', nbRadius: 1.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0.5, nbFloors: 0.5*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 0.5, nbFloors: 2, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 0.5, nbFloors: 0.5, nbFaces: 8, windowType1: 6, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'platform1', nbRadius: 0.6, nbFloors: 0.15, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0, nbFloors: 0.5*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
];

// Avec fenêtres à voute orientale

var orientWallData =
{
	type: 'default', 
	nbFloors: 4,
	nbWidth: 1,
	nbDepth: 2.5,
	roofType: 3,
	borderType: 3,
	borderFloors: 2.85,
	margin: 0.1,
	bottomOffset: 1.0,
	displayWall: true,
	
	windows: 
	[
		{ windowType: 'none' },
		{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 3, outerType: 3 },
		{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 3, outerType: 3 },
		{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 3, outerType: 3 },
	]
};

var orientWingData = { type: 'default', roofType: 3, roofNbWidth: 2, roofNbHeight: 1.5, roofNbOffset: 3, walls: [] };

for (var i = 0; i < 5; i++)
	orientWingData.walls.push(orientWallData);

var noRoofOrientWallData =
{
	type: 'default', 
	nbFloors: 4,
	nbWidth: 1,
	nbDepth: 4,
	roofType: 0,
	borderType: 3,
	borderFloors: 3.6,
	margin: 0.1,
	bottomOffset: 1.0,
	displayWall: true,
	
	windows: 
	[
		{ windowType: 'none' },
		{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 3, outerType: 3 },
		{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 3, outerType: 3 },
		{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 3, outerType: 3 },
	]
};

var orientNodeData = { type: 'default', nbFaces: 4, nbRadius: 2, nbHeight: 4, wingData: 
																				{ 
																					type: 'default', 
																					roofType: 0, 
																					roofNbWidth: 2, 
																					roofNbHeight: 1.5, 
																					roofNbOffset: 3, 
																					walls: [] 
																				} 
					};

for (var i = 0; i < 4; i++)
	orientNodeData.wingData.walls.push(noRoofOrientWallData);

var orientTowerData1 = 
[
	{ type: 'double2', nbRadius: 1.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0.5, nbFloors: 0.5*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 0.5, nbFloors: 2, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 0.5, nbFloors: 0.5, nbFaces: 8, windowType1: 6, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'platform1', nbRadius: 0.6, nbFloors: 0.15, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0, nbFloors: 0.5*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
];

// Avec fenêtres à voute triangulaire

var triWallData =
{
	type: 'default', 
	nbFloors: 4,
	nbWidth: 1,
	nbDepth: 2.5,
	roofType: 4,
	borderType: 4,
	borderFloors: 2.85,
	margin: 0.1,
	bottomOffset: 1.0,
	displayWall: true,
	
	windows: 
	[
		{ windowType: 'none' },
		{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 4, outerType: 4 },
		{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 4, outerType: 4 },
		{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 4, outerType: 4 },
	]
};

var triWingData = { type: 'default', roofType: 4, roofNbWidth: 2, roofNbHeight: 1.5, roofNbOffset: 3, walls: [] };

for (var i = 0; i < 5; i++)
	triWingData.walls.push(triWallData);

var noRoofTriWallData =
{
	type: 'default', 
	nbFloors: 4,
	nbWidth: 1,
	nbDepth: 4,
	roofType: 0,
	borderType: 4,
	borderFloors: 3.6,
	margin: 0.1,
	bottomOffset: 1.0,
	displayWall: true,
	
	windows: 
	[
		{ windowType: 'none' },
		{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 4, outerType: 4 },
		{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 4, outerType: 4 },
		{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 4, outerType: 4 },
	]
};

var triNodeData = { type: 'default', nbFaces: 4, nbRadius: 2, nbHeight: 4, wingData: 
																				{ 
																					type: 'default', 
																					roofType: 0, 
																					roofNbWidth: 2, 
																					roofNbHeight: 1.5, 
																					roofNbOffset: 3, 
																					walls: [] 
																				} 
					};

for (var i = 0; i < 4; i++)
	triNodeData.wingData.walls.push(noRoofTriWallData);

var triTowerData1 = 
[
	{ type: 'double2', nbRadius: 1.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0.5, nbFloors: 0.5*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 0.5, nbFloors: 2, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 0.5, nbFloors: 0.5, nbFaces: 8, windowType1: 6, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'platform1', nbRadius: 0.6, nbFloors: 0.15, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0, nbFloors: 0.5*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
];

// Style stalinien

var stalinianWingRoofType = 1;

var stalinianWingData = 
{
	type: 'stalinian', 
	roofType: stalinianWingRoofType,
	roofNbWidth: 3.5,
	roofNbDepth: 12,
	roofNbOffset: 5,
	roofNbHeight: 2,
	nbWalls: 6,
	wallData:
	{
		nbFloors: 6,
		nbWidth: 2,
		nbDepth: 4.5,
		roofType: stalinianWingRoofType,
		frontData: 
		{
			width: 0.0,
			height: 0.0,
			nbWindowsWidth: 3,
			nbWindowsHeight: 5,
			verDepth: 0.6,
			horDepth: 0.4,
			verMargin: 0.2,
			horMargin: 0.05,
			marginDepth: 1.0
		}
	}
};

var stalinianNodeData =
{
	type: 'stalinian', 
	nbFaces: 4,
	nbRadius: 3.5,
	nbHeight: 20,
	wingData: 
	{
		roofType: 0,
		roofNbWidth: 3,
		roofNbDepth: 8,
		roofNbOffset: 1,
		roofNbHeight: 1,
		nbWalls: 1,
		wallData:
		{
			nbFloors: 20,
			nbWidth: 4,
			nbDepth: 10,
			roofType: 0,
			frontData: 
			{
				width: 0.0,
				height: 0.0,
				nbWindowsWidth: 3,
				nbWindowsHeight: 20,
				verDepth: 1.0,
				horDepth: 0.4,
				verMargin: 0.2,
				horMargin: 0.0,
				marginDepth: 1.5
			}
		}
	} 
};

var stalinianTowerData1 = 
[
	{ type: 'stalinian', nbRadius: 4, nbFloors: 5, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 5,
									nbWindowsHeight: 5,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.1,
									horMargin: 0.05,
									marginDepth: 1.5
							} 
	},
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 3.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 3,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 1.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform4', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'roof1', nbRadius: 0, nbFloors: 3.25, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0, nbFloors: 0.75, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 4, roofHeight: 0.0, roofRadius: 0.25 },
];

var stalinianTowerData2 = 
[
	{ type: 'stalinian', nbRadius: 4, nbFloors: 5, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 5,
									nbWindowsHeight: 5,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.1,
									horMargin: 0.05,
									marginDepth: 1.5
							} 
	},
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 1.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform4', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'roof1', nbRadius: 0, nbFloors: 3.25, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0, nbFloors: 0.75, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 4, roofHeight: 0.0, roofRadius: 0.25 },
];


var stalinianTowerData3 = 
[
	{ type: 'stalinian', nbRadius: 4, nbFloors: 5, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 5,
									nbWindowsHeight: 5,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.1,
									horMargin: 0.05,
									marginDepth: 1.5
							} 
	},
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 3.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 3,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 1.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'roof2', nbRadius: 2, nbFloors: 1.5, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 10, roofHeight: 0.0, roofRadius: 0.675 },
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2, nbFloors: 6, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 6,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform4', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 1.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'roof2', nbRadius: 0.0, nbFloors: 9, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 10, roofHeight: 0.0, roofRadius: 1.75 },
	//{ type: 'roof1', nbRadius: 0, nbFloors: 0.75, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 4, roofHeight: 0.0, roofRadius: 2.5 },
];

var stalinianTowerData4 = 
[
	{ type: 'stalinian', nbRadius: 4, nbFloors: 5, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 5,
									nbWindowsHeight: 5,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.1,
									horMargin: 0.05,
									marginDepth: 1.5
							} 
	},
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 3.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 3,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 1.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 2.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'roof2', nbRadius: 2, nbFloors: 1.5, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 10, roofHeight: 0.0, roofRadius: 0.675 },
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2, nbFloors: 10, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 10,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2, nbFloors: 2, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2, nbFloors: 6, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 6,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2, nbFloors: 4, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 4,
									nbWindowsHeight: 4,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.2,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform4', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 1.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'roof2', nbRadius: 0.0, nbFloors: 9, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 10, roofHeight: 0.0, roofRadius: 1.75 },
	//{ type: 'roof1', nbRadius: 0, nbFloors: 0.75, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 4, roofHeight: 0.0, roofRadius: 2.5 },
];

var stalinianTowerData5 = 
[
	{ type: 'stalinian', nbRadius: 4, nbFloors: 5, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 5,
									nbWindowsHeight: 5,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.1,
									horMargin: 0.05,
									marginDepth: 1.5
							} 
	},
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 3.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 3,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 1.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 2.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2, nbFloors: 8, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 8,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2, nbFloors: 2, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.125, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2, nbFloors: 4, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 4,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform4', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'roof1', nbRadius: 0, nbFloors: 3.25, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0, nbFloors: 0.75, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 4, roofHeight: 0.0, roofRadius: 0.25 },
];

var stalinianMinaretData = 
[
	{ type: 'stalinian', nbRadius: 4, nbFloors: 5, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 5,
									nbWindowsHeight: 5,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.1,
									horMargin: 0.05,
									marginDepth: 1.5
							} 
	},
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 3.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 3,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 2.5, nbFloors: 1.5, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.75, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 2.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'roof1', nbRadius: 1, nbFloors: 2, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'platform1', nbRadius: 1.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 1.25, nbFloors: 7, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 7,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 1.375, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 1.5, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 1.375, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 1.25, nbFloors: 2, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform3', nbRadius: 1.375, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 1.5, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform3', nbRadius: 1.375, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 1.25, nbFloors: 3, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 3,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform1', nbRadius: 1.25, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform1', nbRadius: 1.375, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform1', nbRadius: 1.5, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform1', nbRadius: 1.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'stalinian', nbRadius: 1.625, nbFloors: 4, nbFaces: 12, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 4,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
	},
	{ type: 'platform1', nbRadius: 1.625, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'platform1', nbRadius: 1.75, nbFloors: 0.125, nbFaces: 8 },
	//{ type: 'platform1', nbRadius: 1.375, nbFloors: 0.125, nbFaces: 8 },
	{ type: 'roof1', nbRadius: 0, nbFloors: 2.25, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0, nbFloors: 0.75, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 4, roofHeight: 0.0, roofRadius: 0.75 },
];


