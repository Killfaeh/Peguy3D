//// Listes de sélection ////

var simpleWindowedStairsNames = [ 'simple1', 'simple2' ];
var doubleWindowedStairsNames = [ 'double1', 'double2' ];
var baseStairsNames = [ 'base1', 'base2', 'base3', 'double2' ];
var margedStairsNames = [ 'simple1',  'double1' ];
//var stairsNames = [ 'simple1', 'simple2', 'double1', 'double2', 'base1', 'base2' ];
var stairsNames = [ 'simple1', 'double1', 'double2' ];
var roofTypeNames = [ 'roof1', 'roof2' ];
var platformTypeNames = [ 'platform1', 'platform3' ];
var nbFaceList = [4, 6, 6, 8, 8];
var numWindowList = [1, 2, 3, 4];
var numRoofList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var getInt = function($start, $end) { return $start + Math.floor(Math.random()*($end-$start)); };

var selectFrom = function($list) { return $list[Math.floor(Math.random()*$list.length)]; };

var concatData = function($mainList, $listToAdd)
{
	for (var i = 0; i < $listToAdd.length; i++)
		$mainList.push($listToAdd[i]);

	return $mainList;
};

//// Fonctions de génération ////

var createTripleBase = function($type, $radius, $nbFaces)
{
	var list = 
	[
		{ type: $type, nbRadius: $radius + 0.5/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
		{ type: $type, nbRadius: $radius + 0.25/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
		{ type: $type, nbRadius: $radius + 0.125/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces }
	];

	return list;
};

var createTripleSection = function($type, $radius, $nbFaces)
{
	var list = 
	[
		{ type: $type, nbRadius: $radius + 0.125/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
		{ type: $type, nbRadius: $radius + 0.25/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
		{ type: $type, nbRadius: $radius + 0.125/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
	];

	return list;
};

var createGrowingTripleSection = function($type, $radius, $nbFaces)
{
	var list = 
	[
		{ type: $type, nbRadius: $radius + 0.125/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
		{ type: $type, nbRadius: $radius + 0.25/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
		{ type: $type, nbRadius: $radius + 0.375/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
	];

	return list;
};

var createWalkingPlatform = function($type, $radius, $nbFaces)
{
	var endType = 'platform2';

	if ($type === 'platform3')
		endType = 'platform4';

	var list = 
	[
		{ type: $type, nbRadius: $radius + 0.125/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
		{ type: $type, nbRadius: $radius + 0.25/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
		{ type: endType, nbRadius: $radius+ 0.5/2.0, nbFloors: 0.125/2.0, nbFaces: $nbFaces },
	];

	return list;
};

var createSectionRoof = function($type, $typeNum, $nbRadius, $nbFaces)
{
	var list = 
	[
		{ type: $type, nbRadius: $nbRadius/2.0, nbFloors: $nbRadius, nbFaces: $nbFaces, roofType: $typeNum, roofRadius: $nbRadius/2.0 },
	];

	return list;
};

var createEndRoof = function($type, $typeNum, $nbRadius, $nbFaces, $nbHeight)
{
	var list = 
	[
		{ type: $type, nbRadius: 0.0, nbFloors: $nbHeight, nbFaces: $nbFaces, roofType: $typeNum, roofRadius: $nbRadius },
	];

	return list;
};

var createBase = function($typeNum, $nbRadius, $nbFaces)
{
	var list = 
	[
		{ type: selectFrom(baseStairsNames), nbRadius: $nbRadius, nbFloors: $nbRadius*1.5, nbFaces: $nbFaces, windowType1: $typeNum, windowType2: $typeNum, roofType: 2, roofHeight: null },
	];

	return list;
};

var createStair = function($typeNum, $nbRadius, $nbFaces, $nbHeight)
{
	var list = 
	[
		{ type: selectFrom(stairsNames), nbRadius: $nbRadius, nbFloors: $nbHeight, nbFaces: $nbFaces, windowType1: $typeNum, windowType2: $typeNum, roofType: 2, roofHeight: null },
	];

	return list;
};

var createDoubleStairs = function($typeNum, $nbRadius, $nbFaces, $nbHeight)
{
	var list = 
	[
		{ type: selectFrom(stairsNames), nbRadius: $nbRadius, nbFloors: $nbHeight, nbFaces: $nbFaces, windowType1: $typeNum, windowType2: $typeNum, roofType: 2, roofHeight: null },
		{ type: 'simple1', nbRadius: $nbRadius, nbFloors: 0.5*$nbHeight, nbFaces: $nbFaces, windowType1: 6, windowType2: 6, roofType: 2, roofHeight: 0.0 },
	];

	return list;
};

var createTripleStairs = function($typeNum, $nbRadius, $nbFaces, $nbHeight)
{
	var section = createTripleSection('platform1', $nbRadius, $nbFaces);

	var list = 
	[
		{ type: selectFrom(stairsNames), nbRadius: $nbRadius, nbFloors: 2.0*$nbHeight, nbFaces: $nbFaces, windowType1: $typeNum, windowType2: $typeNum, roofType: 2, roofHeight: null },
	];

	list = concatData(list, section);
	list.push({ type: 'simple1', nbRadius: $nbRadius, nbFloors: $nbHeight/2.0, nbFaces: $nbFaces, windowType1: 6, windowType2: 6, roofType: 2, roofHeight: null });
	list = concatData(list, section);
	list.push({ type: selectFrom(margedStairsNames), nbRadius: $nbRadius, nbFloors: $nbHeight, nbFaces: $nbFaces, windowType1: $typeNum, windowType2: $typeNum, roofType: 2, roofHeight: null });

	return list;
};

//// Fonction principale ////

var createRandomTower = function($initRadius, $nbFaces, $windowTypeNum, $roofType, $roofTypeNum)
{
	var nbFaces = nbFaces;
	var windowTypeNum = $windowTypeNum;
	var roofType = $roofType;
	var roofTypeNum = $roofTypeNum;

	var stairsList = [];

	var continueLoop = true;
	var countLoop = 0;
	var currentRadius = $initRadius;
	var baseInit = false;

	while (continueLoop)
	{
		if (stairsList.length <= 0)
		{
			if (Math.random() > 0.5)
			{
				var stair = createTripleBase('platform1', currentRadius, nbFaces);
				stairsList = concatData(stairsList, stair);
			}

			var stair = createBase(windowTypeNum, currentRadius, nbFaces, currentRadius);
			stairsList = concatData(stairsList, stair);
			//currentRadius = stairsList[0].nbRadius;
		}
		else 
		{
			if (currentRadius <= $initRadius/2.0)
			{
				//if (Math.random() > 0.5)
				{
					var stair = createTripleSection('platform1', currentRadius, nbFaces);
					stairsList = concatData(stairsList, stair);
				}

				var stair = createEndRoof(roofType, roofTypeNum, currentRadius, nbFaces, 3.0*currentRadius);
				stairsList = concatData(stairsList, stair);
				continueLoop = false;
			}
			else
			{
				if (baseInit === false && Math.random() > 0.75)
				{
					var index = getInt(0, 3);

					//if (Math.random() > 0.5)
					{
						var stair = createTripleSection('platform1', currentRadius, nbFaces);
						stairsList = concatData(stairsList, stair);
					}

					var stair = createSectionRoof(roofType, roofTypeNum, currentRadius, nbFaces);
					stairsList = concatData(stairsList, stair);
					currentRadius = stairsList[stairsList.length-1].nbRadius;

					//if (Math.random() > 0.5)
					{
						var stair = createTripleSection('platform1', currentRadius, nbFaces);
						stairsList = concatData(stairsList, stair);
					}

					if (index === 0)
					{
						var stair = createStair(windowTypeNum, currentRadius, nbFaces, 3.0*currentRadius);
						stairsList = concatData(stairsList, stair);
					}
					else if (index === 1)
					{
						var stair = createDoubleStairs(windowTypeNum, currentRadius, nbFaces, 3.0*currentRadius);
						stairsList = concatData(stairsList, stair);
					}
					else if (index === 2)
					{
						var stair = createTripleStairs(windowTypeNum, currentRadius, nbFaces, 3.0*currentRadius);
						stairsList = concatData(stairsList, stair);
					}
					else
					{
						stairsList.push({ type: 'simple1', nbRadius: $nbRadius, nbFloors: 0.5, nbFaces: $nbFaces, windowType1: 6, windowType2: 6, roofType: 2, roofHeight: 0.0 });
						var stair = createEndRoof(roofType, roofTypeNum, currentRadius, nbFaces, 3.0*currentRadius);
						stairsList = concatData(stairsList, stair);
						continueLoop = false;
					}
				}
				else
				{
					var index = getInt(0, 3);

					if (index === 0 && currentRadius < $initRadius*0.8)
					{
						var stair = createGrowingTripleSection('platform1', currentRadius, nbFaces);
						stairsList = concatData(stairsList, stair);
						currentRadius = stairsList[stairsList.length-1].nbRadius;
					}
					else if (index === 1)
					{
						var stair = createWalkingPlatform('platform1', currentRadius, nbFaces);
						stairsList = concatData(stairsList, stair);
						currentRadius = stairsList[stairsList.length-1].nbRadius-0.5;
					}
					else
					{
						var stair = createTripleSection('platform1', currentRadius, nbFaces);
						stairsList = concatData(stairsList, stair);
						currentRadius = currentRadius - 0.125/2.0;
					}

					index = getInt(0, 6);

					if (index === 0 || countLoop > 3)
					{
						var stair = createEndRoof(roofType, roofTypeNum, currentRadius, nbFaces, 3.0*currentRadius);
						stairsList = concatData(stairsList, stair);
						continueLoop = false;
					}
					else if (index === 1)
					{
						var stair = createDoubleStairs(windowTypeNum, currentRadius, nbFaces, 3.0*currentRadius);
						stairsList = concatData(stairsList, stair);
					}
					else if (index === 2)
					{
						var stair = createTripleStairs(windowTypeNum, currentRadius, nbFaces, 3.0*currentRadius);
						stairsList = concatData(stairsList, stair);
					}
					else if (index === 3)
					{
						var stair = createSectionRoof(roofType, roofTypeNum, currentRadius, nbFaces);
						stairsList = concatData(stairsList, stair);
						currentRadius = stairsList[stairsList.length-1].nbRadius;
					}
					else
					{
						var stair = createStair(windowTypeNum, currentRadius, nbFaces, 3.0*currentRadius);
						stairsList = concatData(stairsList, stair);
					}
				}
			}

			baseInit = true;
		}

		countLoop = countLoop+1;

		if (countLoop > 5)
			continueLoop = false;
	}

	console.log("STAIRS DATA");
	console.log(stairsList);

	return stairsList;
};

var createFullRandomTower = function($initRadius)
{
	var nbFaces = selectFrom(nbFaceList);
	var windowTypeNum = selectFrom(numWindowList);
	var roofType = selectFrom(roofTypeNames);
	var roofTypeNum = selectFrom(numRoofList);

	var stairsList = createRandomTower($initRadius, nbFaces, windowTypeNum, roofType, roofTypeNum);

	return stairsList;
};


