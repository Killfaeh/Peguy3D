/////////////////////////
// Toits en révolution //
/////////////////////////

var createRevRoof1 = function($innerRadius, $height)
{
	var ID = 'createRevRoof1' + $innerRadius + $height;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile1($innerRadius, $height);
		var roof = new Revolution(roofProfilePointsList, 360.0, '', 32, 30.0);
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createRevRoof2 = function($innerRadius, $height, $bump)
{
	var ID = 'createRevRoof2' + $innerRadius + $height + $bump;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile2($innerRadius, $height, $bump);
		var roof = new Revolution(roofProfilePointsList, 32, 30.0);
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createRevRoof3 = function($innerRadius, $height)
{
	var ID = 'createRevRoof3' + $innerRadius + $height;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile3($innerRadius, $height);
		var roof = new Revolution(roofProfilePointsList, 32, 30.0);
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createRevRoof4 = function($innerRadius, $height, $bump)
{
	var ID = 'createRevRoof4' + $innerRadius + $height + $bump;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile4($innerRadius, $height, $bump);
		var roof = new Revolution(roofProfilePointsList, 32, 30.0);
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createRevRoof5 = function($innerRadius, $height, $bump)
{
	var ID = 'createRevRoof5' + $innerRadius + $height + $bump;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile5($innerRadius, $height, $bump);
		var roof = new Revolution(roofProfilePointsList, 32, 30.0);
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createRevRoof6 = function($innerRadius, $height, $bump)
{
	var ID = 'createRevRoof6' + $innerRadius + $height + $bump;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile6($innerRadius, $height, $bump);
		var roof = new Revolution(roofProfilePointsList, 32, 30.0);
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createRevRoof7 = function($innerRadius, $height, $bump)
{
	var ID = 'createRevRoof7' + $innerRadius + $height + $bump;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile7($innerRadius, $height, $bump);
		var roof = new Revolution(roofProfilePointsList, 32, 30.0);
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createRevRoof8 = function($innerRadius, $height, $bump)
{
	var ID = 'createRevRoof8' + $innerRadius + $height + $bump;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile8($innerRadius, $height, $bump);
		var roof = new Revolution(roofProfilePointsList, 32, 30.0);
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createRevRoof9 = function($innerRadius, $height, $bump)
{
	var ID = 'createRevRoof9' + $innerRadius + $height + $bump;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile9($innerRadius, $height, $bump);
		var roof = new Revolution(roofProfilePointsList, 32, 30.0);
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createRevRoof = function($innerRadius, $height, $bump, $roofType)
{
	var roof = null;

	if ($roofType === 2)
		roof = createRevRoof2($innerRadius, $height, $bump);
	else if ($roofType === 3)
		roof = createRevRoof3($innerRadius, $height);
	else if ($roofType === 4)
		roof = createRevRoof4($innerRadius, $height, $bump);
	else if ($roofType === 5)
		roof = createRevRoof5($innerRadius, $height, $bump);
	else if ($roofType === 6)
		roof = createRevRoof6($innerRadius, $height, $bump);
	else if ($roofType === 7)
		roof = createRevRoof7($innerRadius, $height, $bump);
	else if ($roofType === 8)
		roof = createRevRoof8($innerRadius, $height, $bump);
	else if ($roofType === 9)
		roof = createRevRoof9($innerRadius, $height, $bump);
	else if ($roofType === 10)
	{
		roof = new Cylinder($innerRadius+$bump, $innerRadius, $height);
		roof.setMaterial(roofMaterial);
		roof.add(new Translation(0.0, 0.0, $height/2.0));
	}
	else
		roof = createRevRoof1($innerRadius, $height);

	return roof;
};

/////////////////////
// Toits en prisme //
/////////////////////

var createPrismRevRoof1 = function($innerRadius, $height, $nbFaces)
{
	var ID = 'createPrismRevRoof1' + $innerRadius + $height + $nbFaces;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile1($innerRadius, $height, $nbFaces);
		var roof = new PrismRevolution(roofProfilePointsList, $nbFaces, 30.0);
		roof.add(new Rotation(180.0/$nbFaces, 'z'));
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createPrismRevRoof2 = function($innerRadius, $height, $bump, $nbFaces)
{
	var ID = 'createPrismRevRoof2' + $innerRadius + $height + $bump + $nbFaces;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile2($innerRadius, $height, $bump, $nbFaces);
		var roof = new PrismRevolution(roofProfilePointsList, $nbFaces, 30.0);
		roof.add(new Rotation(180.0/$nbFaces, 'z'));
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createPrismRevRoof3 = function($innerRadius, $height, $nbFaces)
{
	var ID = 'createPrismRevRoof3' + $innerRadius + $height + $nbFaces;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile3($innerRadius, $height, $nbFaces);
		var roof = new PrismRevolution(roofProfilePointsList, $nbFaces, 30.0);
		roof.add(new Rotation(180.0/$nbFaces, 'z'));
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createPrismRevRoof4 = function($innerRadius, $height, $bump, $nbFaces)
{
	var ID = 'createPrismRevRoof4' + $innerRadius + $height + $bump + $nbFaces;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile4($innerRadius, $height, $bump, $nbFaces);
		var roof = new PrismRevolution(roofProfilePointsList, $nbFaces, 30.0);
		roof.add(new Rotation(180.0/$nbFaces, 'z'));
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createPrismRevRoof5 = function($innerRadius, $height, $bump, $nbFaces)
{
	var ID = 'createPrismRevRoof5' + $innerRadius + $height + $bump + $nbFaces;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile5($innerRadius, $height, $bump, $nbFaces);
		var roof = new PrismRevolution(roofProfilePointsList, $nbFaces, 30.0);
		roof.add(new Rotation(180.0/$nbFaces, 'z'));
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createPrismRevRoof6 = function($innerRadius, $height, $bump, $nbFaces)
{
	var ID = 'createPrismRevRoof6' + $innerRadius + $height + $bump + $nbFaces;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile6($innerRadius, $height, $bump, $nbFaces);
		var roof = new PrismRevolution(roofProfilePointsList, $nbFaces, 30.0);
		roof.add(new Rotation(180.0/$nbFaces, 'z'));
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createPrismRevRoof7 = function($innerRadius, $height, $bump, $nbFaces)
{
	var ID = 'createPrismRevRoof7' + $innerRadius + $height + $bump + $nbFaces;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile7($innerRadius, $height, $bump, $nbFaces);
		var roof = new PrismRevolution(roofProfilePointsList, $nbFaces, 30.0);
		roof.add(new Rotation(180.0/$nbFaces, 'z'));
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createPrismRevRoof8 = function($innerRadius, $height, $bump, $nbFaces)
{
	var ID = 'createPrismRevRoof8' + $innerRadius + $height + $bump + $nbFaces;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile8($innerRadius, $height, $bump, $nbFaces);
		var roof = new PrismRevolution(roofProfilePointsList, $nbFaces, 30.0);
		roof.add(new Rotation(180.0/$nbFaces, 'z'));
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createPrismRevRoof9 = function($innerRadius, $height, $bump, $nbFaces)
{
	var ID = 'createPrismRevRoof9' + $innerRadius + $height + $bump + $nbFaces;
	var instance = originalInstances[ID];
	var roof  = null;

	if (utils.isset(instance))
		roof = new Instance(instance);
	else
	{
		var roofProfilePointsList = createRoofProfile9($innerRadius, $height, $bump, $nbFaces);
		var roof = new PrismRevolution(roofProfilePointsList, $nbFaces, 30.0);
		roof.add(new Rotation(180.0/$nbFaces, 'z'));
		roof.setMaterial(roofMaterial);

		originalInstances[ID] = roof;
		roof = new Instance(roof);
	}

	return roof;
};

var createPrismRevRoof = function($innerRadius, $height, $bump, $roofType, $nbFaces)
{
	var roof = null;

	if ($roofType === 2)
		roof = createPrismRevRoof2($innerRadius, $height, $bump, $nbFaces);
	else if ($roofType === 3)
		roof = createPrismRevRoof3($innerRadius, $height, $nbFaces);
	else if ($roofType === 4)
		roof = createPrismRevRoof4($innerRadius, $height, $bump, $nbFaces);
	else if ($roofType === 5)
		roof = createPrismRevRoof5($innerRadius, $height, $bump, $nbFaces);
	else if ($roofType === 6)
		roof = createPrismRevRoof6($innerRadius, $height, $bump, $nbFaces);
	else if ($roofType === 7)
		roof = createPrismRevRoof7($innerRadius, $height, $bump, $nbFaces);
	else if ($roofType === 8)
		roof = createPrismRevRoof8($innerRadius, $height, $bump, $nbFaces);
	else if ($roofType === 9)
		roof = createPrismRevRoof9($innerRadius, $height, $bump, $nbFaces);
	else if ($roofType === 10)
	{
		roof = new Prism($innerRadius+$bump, $innerRadius, $height, $nbFaces);
		roof.setMaterial(roofMaterial);
		roof.add(new Translation(0.0, 0.0, $height/2.0));
	}
	else
		roof = createPrismRevRoof1($innerRadius, $height, $nbFaces);

	return roof;
};
