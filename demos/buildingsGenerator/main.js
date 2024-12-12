loadScript('utils');
loadScript('materials');
loadScript('windows');
loadScript('roofProfiles');
loadScript('roofs');
loadScript('towers');
loadScript('walls');
loadScript('stalinian');
loadScript('config');
loadScript('buildings');
loadScript('random');

//wallMaterial = whiteMaterial;

//var demo1 = createDemo1();
//Doc.add(demo1);

var mainTemple = createMainTemple();
Doc.add(mainTemple);

//var secondTemple = createSecondTemple();
//Doc.add(secondTemple);

//var plateform = createPlateform();
//Doc.add(plateform);

//var lighthouse = createlighthouse();
//Doc.add(lighthouse);

//var miniLighthouse = createMiniLighthouse();
//Doc.add(miniLighthouse);

var nbFaces = selectFrom(nbFaceList);
var windowTypeNum = selectFrom(numWindowList);
var roofType = selectFrom(roofTypeNames);
var roofTypeNum = selectFrom(numRoofList);
roofMaterial = selectFrom(materials);
roofMaterial = turquoiseMaterial;

var fill = true;

if (Math.random() > 0.5)
	fill = false;

var wingData = romanWingData2;
var nodeData = romanNodeData;

if (windowTypeNum === 2)
{
	wingData = gothWingData;
	nodeData = gothNodeData;
}
else if (windowTypeNum === 3)
{
	wingData = orientWingData;
	nodeData = orientNodeData;
}
else if (windowTypeNum === 4)
{
	wingData = triWingData;
	nodeData = triNodeData;
}

var towerData1 = createRandomTower(1, nbFaces, windowTypeNum, roofType, roofTypeNum);
var towerData2 = createRandomTower(1, nbFaces, windowTypeNum, roofType, roofTypeNum);

//var longBuilding = createLongBuilding(3, wingData, nodeData, [towerData1, towerData2]);
//Doc.add(longBuilding);

//var uBuilding = createUBuilding(3, wingData, nodeData, [towerData1, towerData2], true);
//Doc.add(uBuilding);

//var hBuilding = createHBuilding(3, wingData, nodeData, [towerData1, towerData2 ], 1);
//Doc.add(hBuilding);

//var gridBuilding = createGridBuilding(3, 3, wingData, nodeData, [towerData1, towerData2], true, fill);
//Doc.add(gridBuilding);

//var randomTowerData = createFullRandomTower(2.0);
//var randomTower = createTower(randomTowerData);
//Doc.add(randomTower);

//// Style stalinien ////

//var hBuilding = createHBuilding(3, stalinianWingData, null, [stalinianTowerData1, stalinianTowerData5, stalinianTowerData1, stalinianTowerData1, stalinianTowerData1], 3, true);
//Doc.add(hBuilding);

//var gridBuilding = createGridBuilding(3, 3, stalinianWingData, null, [stalinianTowerData5, stalinianTowerData1], true, false);
//Doc.add(gridBuilding);


