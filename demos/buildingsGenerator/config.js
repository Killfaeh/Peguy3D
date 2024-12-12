//////////////////
// Tests divers //
//////////////////

var demoTowerData = [];

demoTowerData = 
[
	{ type: 'base3', nbRadius: 4, nbFloors: 4, nbFaces: 4, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'double1', nbRadius: 2, nbFloors: 5, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 1, nbFloors: 1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 1, nbFloors: 3, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 1, nbFloors: 1, nbFaces: 8, windowType1: 5, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'platform4', nbRadius: 1.2, nbFloors: 0.25, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof1', nbRadius: 0, nbFloors: 1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
];

/*
demoTowerData = 
[
	{ type: 'base3', nbRadius: 4, nbFloors: 4, nbFaces: 4, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'double1', nbRadius: 2, nbFloors: 5, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof2', nbRadius: 1, nbFloors: 1.42, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	{ type: 'simple1', nbRadius: 1, nbFloors: 3, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	{ type: 'roof2', nbRadius: 0, nbFloors: 1.42, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
];
//*/

var demoWallData = {};

demoWallData =
{
	nbFloors: 4,
	nbWidth: 1,
	nbDepth: 4,
	roofType: 0,
	borderType: 1,
	borderFloors: 2.75,
	margin: 0.1,
	bottomOffset: 1.0,
	
	windows: 
	[
		{ windowType: 'none' },
		{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		//{ windowType: 'none' },
		{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
	]
};

var demoWingData = { roofType: 0, roofNbWidth: 2, roofNbHeight: 2, roofNbOffset: 3, walls: [] };

for (var i = 0; i < 2; i++)
	demoWingData.walls.push(demoWallData);

var demoNodeData = { nbFaces: 4, nbRadius: 2, nbHeight: 4, wingData: demoWingData };

////////////
// Demo 1 //
////////////

var createDemo0 = function()
{
	var group = new Group();

	// Partie centrale

	var centerTowerData = 
	[
			{ type: 'base3', nbRadius: 2, nbFloors: 2, nbFaces: 4, windowType1: 1, windowType2: 5, roofType: 2, roofHeight: 0.0, roofRadius: null },
	];

	var centerWallData =
	{
		nbFloors: 4,
		nbWidth: 1,
		nbDepth: 4,
		roofType: 0,
		borderType: 1,
		borderFloors: 2.75,
		margin: 0.1,
		bottomOffset: 1.0,
		displayWall: false,
	
		windows: 
		[
			{ windowType: 'none' },
			{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
			//{ windowType: 'none' },
			{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
			{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		]
	};

	var centerWallData2 =
	{
		nbFloors: 2,
		nbWidth: 1,
		nbDepth: 4,
		roofType: 0,
		borderType: 1,
		borderFloors: 1.45,
		margin: 0.1,
		bottomOffset: -0.75,
		displayWall: false,
	
		windows: 
		[
			{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
			{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		]
	};

	var centerTower = createTower(centerTowerData);
	group.add(centerTower);

	var centerWall1 = createWall(centerWallData);
	var centerWall2 = createWall(centerWallData);
	centerWall1.add(new Translation(0.0, 1.375*floorHeight, 0.0));
	centerWall2.add(new Translation(0.0, -1.375*floorHeight, 0.0));
	group.add(centerWall1);
	group.add(centerWall2);

	var centerWall3 = new Cuboid(4*floorHeight, 4*floorHeight, 2*floorHeight);
	centerWall3.setMaterial(wallMaterial);
	centerWall3.add(new Translation(0.0, 0.0, 3*floorHeight));
	group.add(centerWall3);

	var centerWall4 = createWall(centerWallData2);
	centerWall4.add(new Translation(0.0, 0.0, 2*floorHeight));
	group.add(centerWall4);

	var centerRoofData = 
	[
		{ type: 'double2', nbRadius: 1.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'roof1', nbRadius: 0.5, nbFloors: 0.5*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
		{ type: 'simple1', nbRadius: 0.5, nbFloors: 2, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'simple1', nbRadius: 0.5, nbFloors: 0.5, nbFaces: 8, windowType1: 6, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform1', nbRadius: 0.6, nbFloors: 0.15, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'roof1', nbRadius: 0, nbFloors: 0.5*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
	];

	var centerRoof = createTower(centerRoofData);
	centerRoof.add(new Translation(0.0, 0.0, 4*floorHeight));
	group.add(centerRoof);

	// Ailes

	var wingWallData =
	{
		nbFloors: 4,
		nbWidth: 1,
		nbDepth: 2,
		roofType: 4,
		borderType: 1,
		borderFloors: 2.75,
		margin: 0.1,
		bottomOffset: 1.0,
	
		windows: 
		[
			{ windowType: 'none' },
			{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
			//{ windowType: 'none' },
			{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
			{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		]
	};

	var wingData = { roofType: 4, roofNbWidth: 2, roofNbHeight: 1.5, roofNbOffset: 3, walls: [] };

	for (var i = 0; i < 5; i++)
		wingData.walls.push(wingWallData);

	var wing1 = createWing(wingData);
	var wing2 = createWing(wingData);
	wing1.add(new Translation(0.0, wing1.width/2.0+2*floorHeight, 0.0));
	wing2.add(new Translation(0.0, -wing2.width/2.0-2*floorHeight, 0.0));
	group.add(wing1);
	group.add(wing2);

	// Extrêmités

	var farWingData = { roofType: 0, roofNbWidth: 2, roofNbHeight: 1.5, roofNbOffset: 3, walls: [] };

	centerWallData.displayWall = true;

	for (var i = 0; i < 4; i++)
		farWingData.walls.push(centerWallData);

	var farWing1 = createWing(farWingData);
	var farWing2 = createWing(farWingData);
	farWing1.add(new Translation(0.0, farWing1.width/2.0+wing1.width+2*floorHeight, 0.0));
	farWing2.add(new Translation(0.0, -farWing2.width/2.0-wing2.width-2*floorHeight, 0.0));
	group.add(farWing1);
	group.add(farWing2);

	var farTower1 = createTower(centerRoofData);
	var farTower2 = createTower(centerRoofData);
	farTower1.add(new Translation(0.0, farWing1.width/2.0+wing1.width+2*floorHeight, 4*floorHeight));
	farTower2.add(new Translation(0.0, -farWing1.width/2.0-wing1.width-2*floorHeight, 4*floorHeight));
	group.add(farTower1);
	group.add(farTower2);

	//var node = createNode(nodeData);

	return group;
};

////////////
// Demo 2 //
////////////

var stalFrontData = 
{
	width: 15.0,
	height: 20.0,
	nbWindowsWidth: 20,
	nbWindowsHeight: 5,
	verDepth: 0.3,
	horDepth: 0.4,
	verMargin: 0.2,
	horMargin: 0.05,
	marginDepth: 0.6
};

//var stalFront = createStalinianFront(stalFrontData);
//Doc.add(stalFront);

var stalFloorData = { nbRadius: 5, nbFloors: 5, nbFaces: 6, frontData: stalFrontData };

//var stalFloor = createStalinianTowerFloor(stalFloorData);
//Doc.add(stalFloor);

var stalWallData = { nbFloors: 4, nbWidth: 1, nbDepth: 4, roofType: 0, frontData: stalFrontData };

//var stalWall = createStalinianWall(stalWallData);
//Doc.add(stalWall);

var stalWingData = { roofType: 0, roofNbWidth: 3, roofNbDepth: 2, roofNbOffset: 1, roofNbHeight: 1, nbWalls: 2, wallData: stalWallData };

//var stalWing = createStalinianWing(stalWingData);
//Doc.add(stalWing);

var stalNodeData = { nbFaces: 4, nbRadius: 1.5, nbHeight: 5, wingData: stalWingData };

//var stalNode = createStalinianNode(stalNodeData);
//Doc.add(stalNode);

var createDemo1 = function()
{
	var nbBranches = 6;
	var baseNbRadius = 3;
	var baseRadius = baseNbRadius*diagFloor;

	var group = new Group();

	var centerTowerData = 
	[
		{ type: 'platform1', nbRadius: baseNbRadius, nbFloors: 3, nbFaces: nbBranches },
		{ type: 'platform1', nbRadius: baseNbRadius+0.6-0.4, nbFloors: 0.25, nbFaces: nbBranches },
		{ type: 'platform1', nbRadius: baseNbRadius+0.6-0.25, nbFloors: 0.25, nbFaces: nbBranches },
		{ type: 'platform1', nbRadius: baseNbRadius+0.6-0.4, nbFloors: 0.25, nbFaces: nbBranches },
		{ type: 'stalinian', nbRadius: 2.5, nbFloors: 21, nbFaces: nbBranches, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 3,
									nbWindowsHeight: 21,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.5
							} 
		},
		{ type: 'platform1', nbRadius: baseNbRadius-0.4, nbFloors: 0.25, nbFaces: nbBranches },
		{ type: 'platform1', nbRadius: baseNbRadius-0.25, nbFloors: 0.25, nbFaces: nbBranches },
		{ type: 'platform1', nbRadius: baseNbRadius-0.4, nbFloors: 0.25, nbFaces: nbBranches },
		{ type: 'stalinian', nbRadius: 2, nbFloors: 14, nbFaces: nbBranches, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 3,
									nbWindowsHeight: 14,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.5
							} 
		},
		{ type: 'platform1', nbRadius: baseNbRadius-0.9, nbFloors: 0.25, nbFaces: nbBranches },
		{ type: 'platform1', nbRadius: baseNbRadius-0.75, nbFloors: 0.25, nbFaces: nbBranches },
		{ type: 'platform1', nbRadius: baseNbRadius-0.9, nbFloors: 0.25, nbFaces: nbBranches },
	];

	var centerTower = createTower(centerTowerData);
	group.add(centerTower);

	var centerNodeData =
	{
		nbFaces: 4,
		nbRadius: 1.5,
		nbHeight: 20,
		wingData: 
		{
			roofType: 0,
			roofNbWidth: 3,
			roofNbDepth: 2,
			roofNbOffset: 1,
			roofNbHeight: 1,
			nbWalls: 1,
			wallData:
			{
				nbFloors: 19,
				nbWidth: 1.75,
				nbDepth: 4.5,
				roofType: 0,
				frontData: 
				{
					width: 0.0,
					height: 0.0,
					nbWindowsWidth: 2,
					nbWindowsHeight: 9,
					verDepth: 1.0,
					horDepth: 0.4,
					verMargin: 0.2,
					horMargin: 0.05,
					marginDepth: 1.5
				}
			}
		} 
	};

	var centerNode = createStalinianNode(centerNodeData);
	centerNode.add(new Translation(0.0, 0.0, centerTower.height));
	group.add(centerNode);

	var topCenterTowerData = 
	[
		{ type: 'platform1', nbRadius: baseNbRadius-1.3, nbFloors: 0.25, nbFaces: 4 },
		{ type: 'platform1', nbRadius: baseNbRadius-1.15, nbFloors: 0.25, nbFaces: 4 },
		{ type: 'platform1', nbRadius: baseNbRadius-1.3, nbFloors: 0.25, nbFaces: 4 },
	];

	var topCenterTower = createTower(topCenterTowerData);
	topCenterTower.add(new Translation(0.0, 0.0, centerTower.height + 20*floorHeight));
	group.add(topCenterTower);

	var centerRoof = new Prism((baseNbRadius-1.4)*diagFloor, 0.0001, 10*floorHeight, 4);
	centerRoof.setMaterial(roofMaterial);
	centerRoof.add(new Rotation(45.0, 'z'));
	centerRoof.add(new Translation(0.0, 0.0, centerTower.height + 20*floorHeight + topCenterTower.height + 5*floorHeight));
	group.add(centerRoof);

	var wingData = 
	{
		roofType: 4,
		roofNbWidth: 2,
		roofNbDepth: 15,
		roofNbOffset: 4,
		roofNbHeight: 2,
		nbWalls: 9,
		wallData:
		{
			nbFloors: 5,
			nbWidth: 1,
			nbDepth: 3,
			roofType: 4,
			frontData: 
			{
				width: 0.0,
				height: 0.0,
				nbWindowsWidth: 2,
				nbWindowsHeight: 3,
				verDepth: 0.4,
				horDepth: 0.3,
				verMargin: 0.2,
				horMargin: 0.05,
				marginDepth: 0.6
			}
		}
	};

	var wingNodeData =
	{
		nbFaces: 4,
		nbRadius: 1.5,
		nbHeight: 4,
		wingData: 
		{
			roofType: 0,
			roofNbWidth: 1,
			roofNbDepth: 1,
			roofNbOffset: 1,
			roofNbHeight: 1,
			nbWalls: 1,
			wallData:
			{
				nbFloors: 4,
				nbWidth: 5.5,
				nbDepth: 6.7,
				roofType: 0,
				frontData: 
				{
					width: 0.0,
					height: 0.0,
					nbWindowsWidth: 5,
					nbWindowsHeight: 5,
					verDepth: 1.0,
					horDepth: 0.4,
					verMargin: 0.2,
					horMargin: 0.05,
					marginDepth: 1.5
				}
			}
		} 
	};

	var wingTowerData = 
	[
		{ type: 'stalinian', nbRadius: 3.25, nbFloors: 4, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 5,
									nbWindowsHeight: 5,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.2,
									horMargin: 0.05,
									marginDepth: 1.5
							} 
		},
		{ type: 'stalinian', nbRadius: 2, nbFloors: 8, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 3,
									nbWindowsHeight: 8,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.2,
									horMargin: 0.05,
									marginDepth: 1.5
							} 
		},
		{ type: 'platform1', nbRadius: 2.15, nbFloors: 0.25, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 2.3, nbFloors: 0.25, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 2.15, nbFloors: 0.25, nbFaces: 8 },
		{ type: 'stalinian', nbRadius: 1.75, nbFloors: 12, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 12,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.05,
									marginDepth: 1.5
							} 
		},
		{ type: 'platform1', nbRadius: 1.90, nbFloors: 0.25, nbFaces: 4 },
		{ type: 'platform1', nbRadius: 2.05, nbFloors: 0.25, nbFaces: 4 },
		{ type: 'platform1', nbRadius: 1.90, nbFloors: 0.25, nbFaces: 4 },
	];

	var theta = 2.0*Math.PI/nbBranches;
	var faceDistance = baseRadius*Math.cos(theta/2.0);

	for (var i = 0; i < nbBranches; i++)
	{
		var wing = createStalinianWing(wingData);
		wing.add(new Rotation(i*theta/Math.PI*180.0, 'z'));
		wing.add(new Translation(0.0, faceDistance + 7.5*floorHeight, 0.0));
		group.add(wing);

		/*
		var wingNode = createStalinianNode(wingNodeData);
		wingNode.add(new Rotation(i*theta/Math.PI*180.0, 'z'));
		wingNode.add(new Translation(0.0, faceDistance + 5*floorHeight + 20.0, 0.0));
		group.add(wingNode);
		//*/

		var wingTower = createTower(wingTowerData);
		wingTower.add(new Rotation(i*theta/Math.PI*180.0, 'z'));
		wingTower.add(new Translation(0.0, faceDistance + 7.5*floorHeight + 25.5, 0.0));
		group.add(wingTower);

		var wingRoof = new Prism(1.75*diagFloor, 0.0001, 10*floorHeight, 4);
		wingRoof.setMaterial(roofMaterial);
		wingRoof.add(new Rotation(i*theta/Math.PI*180.0, 'z'));
		wingRoof.add(new Translation(0.0, faceDistance + 7.5*floorHeight + 25.5, 5*floorHeight + wingTower.height));
		wingRoof.add(new Rotation(45.0, 'z'));
		group.add(wingRoof);
	}

	return group;
};

//////////////////////
// Temple principal //
//////////////////////

var createMainTemple = function()
{
	roofMaterial = blueMaterial;

	var nbFaces = 6;
	var thetaRad = 2.0*Math.PI/nbFaces;
	var theta = 360.0/nbFaces;

	var group = new Group();

	var centerTowerData1 = 
	[
		{ type: 'base3', nbRadius: 4, nbFloors: 4, nbFaces: nbFaces, windowType1: 5, windowType2: 5, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform1', nbRadius: 4.15, nbFloors: 0.2, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 4.30, nbFloors: 0.2, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 4.45, nbFloors: 0.2, nbFaces: nbFaces },
	];

	var centerTower1 = createTower(centerTowerData1);
	group.add(centerTower1);

	var centerWallData1 = 
	{
		nbFloors: 1.9,
		nbWidth: 1,
		nbDepth: 10.5,
		roofType: 2,
		borderType: 0,
		borderFloors: 1.9,
		margin: 0.15,
		bottomOffset: 0.15,
		displayWall: true,
		windows:
		[
			//{ windowType: 'none' },
			{ windowType: 'double', width: 0.8*floorHeight, height: 1.79*floorHeight, arcHeight: 2.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 }
		]
	};

	var centerWingData = { type: 'default', roofType: 0, roofNbWidth: 5.6, roofNbHeight: 1.5, roofNbOffset: 3, walls: [] };

	for (var i = 0; i < 5; i++)
		centerWingData.walls.push(centerWallData1);

	var centerNodeData = { type: 'default', nbFaces: 6, nbRadius: 4, nbHeight: 2, wingData: centerWingData };

	var centerNode = createNode(centerNodeData);
	centerNode.add(new Translation(0.0, 0.0, centerTower1.height));
	group.add(centerNode);

	var centerTowerData2 = 
	[
		{ type: 'platform3', nbRadius: 3.85, nbFloors: 0.2, nbFaces: nbFaces },
		{ type: 'roof1', nbRadius: 0, nbFloors: 5, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 9, roofHeight: 0.0, roofRadius: 3.8 },
		{ type: 'roof1', nbRadius: 0, nbFloors: 1.5, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 4, roofHeight: 0.0, roofRadius: 0.5 },
	];

	var centerTower2 = createTower(centerTowerData2);
	centerTower2.add(new Translation(0.0, 0.0, centerTower1.height + 2.0*floorHeight));
	group.add(centerTower2);

	var centerStairsData = 
	[
		{ type: 'platform1', nbRadius: 4.75, nbFloors: 0.06, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 4.60, nbFloors: 0.06, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 4.45, nbFloors: 0.06, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 4.30, nbFloors: 0.06, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 4.15, nbFloors: 0.06, nbFaces: nbFaces },
	];

	var centerStairs = createTower(centerStairsData);
	centerStairs.add(new Translation(0.0, 0.0, 3.0));
	group.add(centerStairs);

	var centerWallData2 = 
	{
		nbFloors: 5.6,
		nbWidth: 0.75,
		nbDepth: 13.5,
		roofType: 2,
		borderType: 2,
		borderFloors: 5.5,
		margin: 0.15,
		bottomOffset: 0.15,
		displayWall: true,
		windows: []
	};

	for (var i = 0; i < nbFaces/2; i++)
	{
		var centerWall = createWall(centerWallData2);
		centerWall.add(new Rotation((i+0.5)*theta, 'z'));
		group.add(centerWall);

		var aroundRoof = createOuterWindow5_2(4.1*floorHeight, 3.7*floorHeight, 2.2*floorHeight, 0.4, 35.0);
		aroundRoof.getObject().setMaterial(roofMaterial);
		aroundRoof.add(new Rotation(i*theta, 'z'));
		group.add(aroundRoof);
	}

	var towerData = 
	[
		{ type: 'platform1', nbRadius: 1.50, nbFloors: 0.06, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 1.35, nbFloors: 0.06, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 1.20, nbFloors: 0.06, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 1.05, nbFloors: 0.06, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 0.90, nbFloors: 0.06, nbFaces: nbFaces },
		{ type: 'base1', nbRadius: 0.75, nbFloors: 4, nbFaces: nbFaces, windowType1: 2, windowType2: 2, roofType: 1, roofHeight: 0.0, roofRadius: null },
		{ type: 'roof1', nbRadius: 0.75/2.0, nbFloors: 0.75/2.0*1.35, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
		{ type: 'base1', nbRadius: 0.75/2.0, nbFloors: 4, nbFaces: nbFaces, windowType1: 2, windowType2: 2, roofType: 1, roofHeight: 0.0, roofRadius: null },
		//{ type: 'platform1', nbRadius: 0.75/2.0 + 0.15, nbFloors: 0.1, nbFaces: nbFaces },
		//{ type: 'base1', nbRadius: 0.75/2.0, nbFloors: 1, nbFaces: nbFaces, windowType1: 2, windowType2: 2, roofType: 1, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform1', nbRadius: 0.75/2.0 + 0.15, nbFloors: 0.1, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 0.75/2.0 + 0.30, nbFloors: 0.1, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 0.75/2.0 + 0.45, nbFloors: 0.1, nbFaces: nbFaces },
		{ type: 'platform2', nbRadius: 0.75/2.0 + 0.60, nbFloors: 0.1, nbFaces: nbFaces },
		{ type: 'base2', nbRadius: 0.75/2.0, nbFloors: 2, nbFaces: nbFaces, windowType1: 2, windowType2: 2, roofType: 1, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform1', nbRadius: 0.75/2.0 + 0.15, nbFloors: 0.1, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 0.75/2.0 + 0.30, nbFloors: 0.1, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 0.75/2.0 + 0.15, nbFloors: 0.1, nbFaces: nbFaces },
		{ type: 'roof1', nbRadius: 0.0, nbFloors: 2, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 4, roofHeight: 0.0, roofRadius: 0.45 },
	];

	for (var i = 0; i < 4; i++)
	{
		var distance = 30.0;
		var towerTheta = Math.PI/4.0 + i*Math.PI/2.0;

		if (i === 0)
			towerTheta = thetaRad + Math.PI/2.0;
		else if (i === 1)
			towerTheta = -thetaRad + Math.PI/2.0;
		else if (i === 2)
			towerTheta = Math.PI+thetaRad + Math.PI/2.0;
		else if (i === 3)
			towerTheta = Math.PI-thetaRad + Math.PI/2.0;

		var x = distance*Math.cos(towerTheta);
		var y = distance*Math.sin(towerTheta);

		var tower = createTower(towerData);
		tower.add(new Translation(x, y, 3.0));
		group.add(tower);
	}

	var ground = new Square(500.0);
	ground.add(new Translation(0.0, 0.0, 3.0));
	group.add(ground);

	group.add(new Translation(0.0, 0.0, -3.0));

	return group;
};

///////////////////
// Second temple //
///////////////////

var createSecondTemple = function()
{
	roofMaterial = goldMaterial;

	var group = new Group();

	var nbFaces = 4;
	var thetaRad = 2.0*Math.PI/nbFaces;
	var theta = 360.0/nbFaces;

	var group = new Group();

	// Neffe

	var naveWallData =
	{
		nbFloors: 4,
		nbWidth: 1,
		nbDepth: 6.5,
		roofType: 2,
		borderType: 2,
		borderFloors: 2.75,
		margin: 0.1,
		bottomOffset: 1.0,
	
		windows: 
		[
			{ windowType: 'none' },
			{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
			//{ windowType: 'none' },
			{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
			{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
		]
	};

	var naveData = { roofType: 0, roofNbWidth: 4, roofNbHeight: 6, roofNbOffset: 3, walls: [] };

	for (var i = 0; i < 4; i++)
		naveData.walls.push(naveWallData);

	var nave = createWing(naveData);
	group.add(nave);

	var centerCube = new Cuboid(4.5*floorHeight, 4*floorHeight, 4.076*floorHeight);
	centerCube.add(new Translation(0.0, 0.0, 2.038*floorHeight));
	group.add(centerCube);

	var naveWallData2 =
	{
		nbFloors: 3,
		nbWidth: 1,
		nbDepth: 4.5,
		roofType: 2,
		borderType: 2,
		borderFloors: 1.75,
		margin: 0.1,
		bottomOffset: 1.0,
	
		windows: 
		[
			{ windowType: 'none' },
			{ windowType: 'double', width: 1.6, height: 2.0, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
			//{ windowType: 'none' },
			//{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
			{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
		]
	};

	naveData.walls = [];

	for (var i = 0; i < 2; i++)
		naveData.walls.push(naveWallData2);

	var nave2 = createWing(naveData);
	nave2.add(new Translation(0.0, 0.0, 4*floorHeight));
	group.add(nave2);

	naveWallData2.nbDepth = 4.8;

	var nave3 = createWing(naveData);
	nave3.add(new Rotation(90.0, 'z'));
	nave3.add(new Translation(-1.0*floorHeight, -1.0*floorHeight, 4*floorHeight));

	group.add(nave3);

	//var naveNodeData = { type: 'default', nbFaces: 4, nbRadius: 4, nbHeight: 2, wingData: centerWingData };

	//var nave = createNode(centerNodeData);

	var porche1 = createWindow2_3(4.5*floorHeight, 4.076*floorHeight, 4*floorHeight*0.3, 4*floorHeight*0.3, 4*floorHeight*0.3/2.0, 1.0);
	porche1.add(new Translation(0.0, nave.width/2.0 + 0.5, 0.0));
	porche1.add(new Rotation(90.0, 'z'));
	group.add(porche1);

	var porche2 = createWindow2_3(4.5*floorHeight, 4.076*floorHeight, 4*floorHeight*0.3, 4*floorHeight*0.3, 4*floorHeight*0.3/2.0, 1.0);
	porche2.add(new Translation(0.0, -nave.width/2.0 - 0.5, 0.0));
	porche2.add(new Rotation(-90.0, 'z'));
	group.add(porche2);

	naveWallData.nbDepth = 5.8;
	//naveWallData.displayWall = false;

	var centerWall1 = createWall(naveWallData);
	var centerWall2 = createWall(naveWallData);
	centerWall1.add(new Translation(2.25*floorHeight, 0.0, 0.0));
	centerWall1.add(new Rotation(90.0));
	centerWall2.add(new Translation(-2.25*floorHeight, 0.0, 0.0));
	centerWall2.add(new Rotation(90.0));
	group.add(centerWall1);
	group.add(centerWall2);

	var centerWallData =
	{
		nbFloors: 2,
		nbWidth: 1,
		nbDepth: 4.8,
		roofType: 0,
		borderType: 2,
		borderFloors: 1.55,
		margin: 0.1,
		bottomOffset: -1.0,
		displayWall: false,
	
		windows: 
		[
			{ windowType: 'simple', width: 0.8, height: 1.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 2, outerType: 2 },
			{ windowType: 'porthole', width: 0.8, height: 0.6, arcHeight: 1.0, thickness: 0.1, depth: 0.1, innerType: 1, outerType: 1 },
		]
	};

	var centerWall3 = createWall(centerWallData);
	centerWall3.add(new Translation(-0.5*floorHeight, 0.0, 2*floorHeight));
	centerWall3.add(new Rotation(90.0));
	group.add(centerWall3);

	var centerWall4 = createWall(centerWallData);
	centerWall4.add(new Translation(0.5*floorHeight, 0.0, 2*floorHeight));
	centerWall4.add(new Rotation(90.0));
	group.add(centerWall4);

	// Tour centrale

	var centerTowerData = 
	[
		{ type: 'platform1', nbRadius: 1.1, nbFloors: 0.06, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 1.05, nbFloors: 0.06, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 1.0, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 1.05, nbFloors: 0.06, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 1.1, nbFloors: 0.06, nbFaces: 8 },
		{ type: 'roof2', nbRadius: 0.0, nbFloors: 1.5, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 5, roofHeight: 1.0, roofRadius: 1 },
	];

	var centerTower = createTower(centerTowerData);
	centerTower.add(new Translation(0.0, 0.0, 7.075*floorHeight));
	group.add(centerTower);

	// Tours

	var createCornerTower = function()
	{
		var towerData = 
		[
			{ type: 'platform1', nbRadius: 0.55, nbFloors: 0.06, nbFaces: nbFaces },
			{ type: 'double1', nbRadius: 0.5, nbFloors: 1.5, nbFaces: nbFaces, windowType1: 2, windowType2: 2, roofType: 2, roofHeight: 0.0, roofRadius: null },
			{ type: 'platform1', nbRadius: 0.55, nbFloors: 0.06, nbFaces: nbFaces },
			{ type: 'platform1', nbRadius: 0.6, nbFloors: 0.06, nbFaces: nbFaces },
			{ type: 'platform1', nbRadius: 0.55, nbFloors: 0.06, nbFaces: nbFaces },
			{ type: 'platform1', nbRadius: 0.375, nbFloors: 0.5, nbFaces: 2*nbFaces },
			{ type: 'platform1', nbRadius: 0.4, nbFloors: 0.06, nbFaces: 2*nbFaces },
			{ type: 'platform1', nbRadius: 0.45, nbFloors: 0.06, nbFaces: 2*nbFaces },
			{ type: 'roof2', nbRadius: 0.275, nbFloors: 0.4, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 8, roofHeight: 1.0, roofRadius: 0.15 },
			{ type: 'platform1', nbRadius: 0.3, nbFloors: 0.03, nbFaces: 2*nbFaces },
			{ type: 'platform1', nbRadius: 0.35, nbFloors: 0.03, nbFaces: 2*nbFaces },
			{ type: 'platform1', nbRadius: 0.3, nbFloors: 0.03, nbFaces: 2*nbFaces },
			{ type: 'platform1', nbRadius: 0.25, nbFloors: 0.5, nbFaces: 2*nbFaces },
			{ type: 'platform1', nbRadius: 0.3, nbFloors: 0.03, nbFaces: 2*nbFaces },
			{ type: 'platform1', nbRadius: 0.35, nbFloors: 0.03, nbFaces: 2*nbFaces },
			{ type: 'platform1', nbRadius: 0.3, nbFloors: 0.03, nbFaces: 2*nbFaces },
			{ type: 'roof2', nbRadius: 0.0, nbFloors: 0.7, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 6, roofHeight: 1.0, roofRadius: 0.25 },
		];

		var tower = createTower(towerData);
		tower.add(new Translation(0.0, 0.0, 4.075*floorHeight));

		return tower;
	};

	var tower1 = createCornerTower();
	tower1.add(new Translation((2.25-0.55)*floorHeight, (2-0.55)*floorHeight + 1.0, 0.0));
	group.add(tower1);

	var tower2 = createCornerTower();
	tower2.add(new Translation(-(2.25-0.55)*floorHeight, (2-0.55)*floorHeight + 1.0, 0.0));
	group.add(tower2);

	var tower3 = createCornerTower();
	tower3.add(new Translation((2.25-0.55)*floorHeight, -(2-0.55)*floorHeight - 1.0, 0.0));
	group.add(tower3);

	var tower4 = createCornerTower();
	tower4.add(new Translation(-(2.25-0.55)*floorHeight, -(2-0.55)*floorHeight - 1.0, 0.0));
	group.add(tower4);

	var towerWallData = 
	{
		nbFloors: 2.75,
		nbWidth: 0.5,
		nbDepth: 0.5,
		roofType: 2,
		borderType: 2,
		borderFloors: 2.5,
		margin: 0.15,
		bottomOffset: 0.15,
		displayWall: true,
		windows: []
	};

	var towerWall1 = createWall(towerWallData);
	towerWall1.add(new Translation(2.65*floorHeight, 2.05*floorHeight + 1.0, 0.0));
	group.add(towerWall1);

	var towerWall2 = createWall(towerWallData);
	towerWall2.add(new Translation(-2.65*floorHeight, 2.05*floorHeight + 1.0, 0.0));
	group.add(towerWall2);

	var towerWall3 = createWall(towerWallData);
	towerWall3.add(new Translation(2.65*floorHeight, -2.05*floorHeight - 1.0, 0.0));
	group.add(towerWall3);

	var towerWall4 = createWall(towerWallData);
	towerWall4.add(new Translation(-2.65*floorHeight, -2.05*floorHeight - 1.0, 0.0));
	group.add(towerWall4);

	towerWallData.nbDepth = 5.5;

	var frontWall1 = createWall(towerWallData);
	frontWall1.add(new Translation(-1.36*floorHeight, 0.0, 0.0));
	frontWall1.add(new Rotation(90.0, 'z'));
	group.add(frontWall1);

	var frontWall2 = createWall(towerWallData);
	frontWall2.add(new Translation(1.36*floorHeight, 0.0, 0.0));
	frontWall2.add(new Rotation(90.0, 'z'));
	group.add(frontWall2);

	return group;
};

var createPlateform = function()
{
	var group = new Group();

	var towerData = 
	[
		{ type: 'platform3', nbRadius: 30.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform3', nbRadius: 31.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform3', nbRadius: 32.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform3', nbRadius: 33.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform3', nbRadius: 34.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform4', nbRadius: 35.0, nbFloors: 1.0, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
	];

	var tower = createTower(towerData);

	group.add(tower);

	return group;
};

///////////
// Phare //
///////////

var createlighthouse = function()
{
	var group = new Group();

	var towerData1 = 
	[
		{ type: 'platform2', nbRadius: 12, nbFloors: 3, nbFaces: 8 },
		{ type: 'platform3', nbRadius: 5.75, nbFloors: 0.25, nbFaces: 8 },
		{ type: 'platform3', nbRadius: 5.5, nbFloors: 0.25, nbFaces: 8 },
		{ type: 'platform3', nbRadius: 5.25, nbFloors: 0.25, nbFaces: 8 },
		{ type: 'stalinian', nbRadius: 5, nbFloors: 15, nbFaces: 16, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 3,
									nbWindowsHeight: 15,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
		},
		{ type: 'platform3', nbRadius: 5.25, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'platform3', nbRadius: 5.5, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'platform3', nbRadius: 5.25, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'stalinian', nbRadius: 4, nbFloors: 10, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 3,
									nbWindowsHeight: 10,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
		},
		{ type: 'platform1', nbRadius: 4.25, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 4.5, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 4.25, nbFloors: 0.5, nbFaces: 8 },
	];

	var tower1 = createTower(towerData1);
	group.add(tower1);

	var centerNodeData =
	{
		nbFaces: 4,
		nbRadius: 3.5,
		nbHeight: 20,
		wingData: 
		{
			roofType: 0,
			roofNbWidth: 3,
			roofNbDepth: 8,
			roofNbOffset: 1,
			roofNbHeight: 1,
			nbWalls: 1,
			wallData:
			{
				nbFloors: 20,
				nbWidth: 4,
				nbDepth: 10,
				roofType: 0,
				frontData: 
				{
					width: 0.0,
					height: 0.0,
					nbWindowsWidth: 3,
					nbWindowsHeight: 20,
					verDepth: 1.0,
					horDepth: 0.4,
					verMargin: 0.2,
					horMargin: 0.0,
					marginDepth: 1.5
				}
			}
		} 
	};

	var centerNode = createStalinianNode(centerNodeData);
	centerNode.add(new Translation(0.0, 0.0, tower1.height));
	group.add(centerNode);

	var towerData2 = 
	[
		{ type: 'platform1', nbRadius: 4.25, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 4.5, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 4.25, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'stalinian', nbRadius: 4, nbFloors: 10, nbFaces: 8, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 3,
									nbWindowsHeight: 10,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
		},
		{ type: 'platform1', nbRadius: 4.25, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 4.5, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'platform1', nbRadius: 4.25, nbFloors: 0.5, nbFaces: 8 },
		{ type: 'stalinian', nbRadius: 3.75, nbFloors: 5, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 5,
									nbWindowsHeight: 5,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.1,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
		},
		{ type: 'platform1', nbRadius: 4.0, nbFloors: 0.5, nbFaces: 4 },
		{ type: 'platform1', nbRadius: 4.25, nbFloors: 0.5, nbFaces: 4 },
		{ type: 'platform1', nbRadius: 4.0, nbFloors: 0.5, nbFaces: 4 },
	];

	var tower2 = createTower(towerData2);
	tower2.add(new Translation(0.0, 0.0, tower1.height + 20*floorHeight));
	group.add(tower2);

	var centerRoof = new Prism(3.75*diagFloor, 0.0001, 20*floorHeight, 4);
	centerRoof.setMaterial(roofMaterial);
	centerRoof.add(new Rotation(45.0, 'z'));
	centerRoof.add(new Translation(0.0, 0.0, tower1.height + 20*floorHeight + tower2.height + 10*floorHeight));
	group.add(centerRoof);

	var createCornerTower = function()
	{
		var group = new Group();

		var cornerTowerData = 
		[
			{ type: 'platform2', nbRadius: 4, nbFloors: 3, nbFaces: 8 },
			{ type: 'platform1', nbRadius: 1.8, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'platform1', nbRadius: 1.7, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'platform1', nbRadius: 1.6, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'stalinian', nbRadius: 1.5, nbFloors: 10, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 10,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
			},
			{ type: 'platform1', nbRadius: 1.6, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'platform1', nbRadius: 1.7, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'platform1', nbRadius: 1.6, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'stalinian', nbRadius: 1.3, nbFloors: 5, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 5,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
			},
			{ type: 'platform1', nbRadius: 1.4, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'platform1', nbRadius: 1.5, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'platform1', nbRadius: 1.4, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'stalinian', nbRadius: 1.3, nbFloors: 2, nbFaces: 4, frontData: 
							{
									width: 0.0,
									height: 0.0,
									nbWindowsWidth: 2,
									nbWindowsHeight: 2,
									verDepth: 1.0,
									horDepth: 0.4,
									verMargin: 0.3,
									horMargin: 0.0,
									marginDepth: 1.0
							} 
			},
			{ type: 'platform1', nbRadius: 1.4, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'platform1', nbRadius: 1.5, nbFloors: 0.25, nbFaces: 4 },
			{ type: 'platform1', nbRadius: 1.4, nbFloors: 0.25, nbFaces: 4 },
		];

		var cornerTower = createTower(cornerTowerData);
		group.add(cornerTower);

		var cornerRoof = new Prism(1.3*diagFloor, 0.0001, 10*floorHeight, 4);
		cornerRoof.setMaterial(roofMaterial);
		cornerRoof.add(new Rotation(45.0, 'z'));
		cornerRoof.add(new Translation(0.0, 0.0, cornerTower.height + 5*floorHeight));
		group.add(cornerRoof);

		return group;
	};

	var cornerTower1 = createCornerTower();
	cornerTower1.add(new Translation(18*floorHeight, 18*floorHeight, 0.0));
	group.add(cornerTower1);

	var cornerTower2 = createCornerTower();
	cornerTower2.add(new Translation(-18*floorHeight, 18*floorHeight, 0.0));
	group.add(cornerTower2);

	var cornerTower3 = createCornerTower();
	cornerTower3.add(new Translation(18*floorHeight, -18*floorHeight, 0.0));
	group.add(cornerTower3);

	var cornerTower4 = createCornerTower();
	cornerTower4.add(new Translation(-18*floorHeight, -18*floorHeight, 0.0));
	group.add(cornerTower4);

	return group;
};

/////////////////
// Mini phares //
/////////////////

var createMiniLighthouse = function()
{
	var nbFaces = 6;
	var group = new Group();

	var towerData1 = 
	[

		{ type: 'platform1', nbRadius: 4.25, nbFloors: 0.25, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 4.0, nbFloors: 0.25, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 3.75, nbFloors: 0.25, nbFaces: nbFaces },
		{ type: 'base1', nbRadius: 3, nbFloors: 12, nbFaces: nbFaces, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
		{ type: 'roof1', nbRadius: 1.9, nbFloors: 1.5, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
		{ type: 'base1', nbRadius: 2.0, nbFloors: 12, nbFaces: nbFaces, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform1', nbRadius: 2.15, nbFloors: 0.25, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 2.30, nbFloors: 0.25, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 2.45, nbFloors: 0.25, nbFaces: nbFaces },
		{ type: 'platform2', nbRadius: 2.60, nbFloors: 0.25, nbFaces: nbFaces },
		{ type: 'double2', nbRadius: 2.1, nbFloors: 3, nbFaces: nbFaces, windowType1: 1, windowType2: 1, roofType: 2, roofHeight: 0.0, roofRadius: null },
		{ type: 'platform1', nbRadius: 2.25, nbFloors: 0.25, nbFaces: nbFaces },
		{ type: 'platform1', nbRadius: 2.40, nbFloors: 0.25, nbFaces: nbFaces },
		{ type: 'platform2', nbRadius: 2.25, nbFloors: 0.25, nbFaces: nbFaces },
		{ type: 'roof1', nbRadius: 0.0, nbFloors: 2.3, nbFaces: 8, windowType1: 1, windowType2: 1, roofType: 1, roofHeight: 0.0, roofRadius: 5 },
	];

	var tower1 = createTower(towerData1);
	group.add(tower1);

	return group;
};

