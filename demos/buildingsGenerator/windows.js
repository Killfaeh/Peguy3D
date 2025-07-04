var glassThickness = 0.02;

////////////////////////////////////////
// Fenêtres avec arche en demi cercle //
////////////////////////////////////////

var createInnerWindow1 = function($width, $height, $depth)
{
	var ID = 'createInnerWindow1' + $width + $height + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$width/2.0]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$width/2.0]);
		path.arc([$width/2.0, $width/2.0], 1, 0, 1, [-$width/2.0, $height-$width/2.0]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}
		
	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createOuterWindow1_1 = function($width, $height, $thickness, $depth)
{
	var ID = 'createOuterWindow1_1' + $width + $height + $thickness + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$width/2.0]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([-$width/2.0+$thickness, 0.0]);
		path.lineTo([-$width/2.0+$thickness, $height-$width/2.0]);
		path.lineTo([$width/2.0-$thickness, $height-$width/2.0]);
		path.lineTo([$width/2.0-$thickness, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$width/2.0]);
		path.arc([$width/2.0, $width/2.0], 1, 0, 1, [-$width/2.0, $height-$width/2.0]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowBorderMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow1_1 = function($width, $height, $thickness, $depth)
{
	var innerWindow = createInnerWindow1($width-$thickness, $height-$thickness/2.0, glassThickness);
	var outerWindow = createOuterWindow1_1($width, $height, $thickness, $depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0));
	//outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);

	return group;
};

var createOuterWindow1_2 = function($width, $height, $thickness, $depth)
{
	var ID = 'createOuterWindow1_2' + $width + $height + $thickness + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$width/2.0]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([-$width/2.0+$thickness, 0.0]);
		path.lineTo([-$width/2.0+$thickness, $height-$width/2.0]);
		path.arc([$width/2.0-$thickness, $width/2.0-$thickness], 1, 0, 0, [$width/2.0-$thickness, $height-$width/2.0]);
		path.lineTo([$width/2.0-$thickness, $height-$width/2.0]);
		path.lineTo([$width/2.0-$thickness, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$width/2.0]);
		path.arc([$width/2.0, $width/2.0], 1, 0, 1, [-$width/2.0, $height-$width/2.0]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowBorderMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow1_2 = function($width, $height, $thickness, $depth)
{
	var innerWindow = createInnerWindow1($width-$thickness, $height-$thickness/2.0, 0.02);
	var outerWindow = createOuterWindow1_2($width, $height, $thickness, $depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0));
	//outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);

	return group;
};

var createOuterWindow1_3 = function($outerWidth, $outerHeight, $innerWidth, $innerHeight, $depth)
{
	var ID = 'createOuterWindow1_3' + $outerWidth + $outerHeight + $innerWidth + $innerHeight + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$outerWidth/2.0, $outerHeight]);
		path.lineTo([-$outerWidth/2.0, 0.0]);
		path.lineTo([-$innerWidth/2.0, 0.0]);
		path.lineTo([-$innerWidth/2.0, $innerHeight-$innerWidth/2.0]);
		path.arc([$innerWidth/2.0, $innerWidth/2.0], 1, 0, 0, [$innerWidth/2.0, $innerHeight-$innerWidth/2.0]);
		path.lineTo([$innerWidth/2.0, 0.0]);
		path.lineTo([$outerWidth/2.0, 0.0]);
		path.moveTo([$outerWidth/2.0, $outerHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(wallMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow1_3 = function($outerWidth, $outerHeight, $innerWidth, $innerHeight, $depth)
{
	var thickness = $innerWidth/15.0;
	var depth = thickness*2.0/3.0;

	var innerWindow = createInnerWindow1($innerWidth+0.01, $innerHeight+0.01, glassThickness);
	var outerWindow = createOuterWindow1_3($outerWidth, $outerHeight, $innerWidth, $innerHeight, $depth);
	var outerWindow2 = createOuterWindow1_2($innerWidth+2.0*thickness, $innerHeight+thickness, thickness, depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(wallMaterial);
	outerWindow2.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0-$depth));
	//outerWindow.add(new Translation(0.0, 0.0, -$depth/2.0));
	//outerWindow2.add(new Translation(0.0, 0.0, depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);
	group.add(outerWindow2);

	return group;
};

//////////////////////////////////
// Fenêtres avec arche gothique //
//////////////////////////////////

var createInnerWindow2 = function($width, $height, $arcHeight, $depth)
{
	var ID = 'createInnerWindow2' + $width + $height + $arcHeight + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$arcHeight]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$arcHeight]);
		path.bezierQ([$width/2.0, $height-$arcHeight/3.0], [0.0, $height]);
		path.bezierQ([-$width/2.0, $height-$arcHeight/3.0], [-$width/2.0, $height-$arcHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createOuterWindow2_1 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var ID = 'createOuterWindow2_1' + $width + $height + $arcHeight + $thickness + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$arcHeight]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([-$width/2.0+$thickness, 0.0]);
		path.lineTo([-$width/2.0+$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$arcHeight]);
		path.bezierQ([$width/2.0, $height-$arcHeight/3.0], [0.0, $height]);
		path.bezierQ([-$width/2.0, $height-$arcHeight/3.0], [-$width/2.0, $height-$arcHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowBorderMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow2_1 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var innerWindow = createInnerWindow2($width-$thickness, $height-$thickness/2.0, $arcHeight-$thickness/2.0, glassThickness);
	var outerWindow = createOuterWindow2_1($width, $height, $arcHeight, $thickness, $depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0));
	//outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);

	return group;
};

var createOuterWindow2_2 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var ID = 'createOuterWindow2_2' + $width + $height + $arcHeight + $thickness + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var arcThickness = 1.175*$thickness;
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$arcHeight]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([-$width/2.0+$thickness, 0.0]);
		path.lineTo([-$width/2.0+$thickness, $height-$arcHeight]);
		path.bezierQ([-$width/2.0+$thickness, $height-arcThickness-($arcHeight-arcThickness)/3.0], [0.0, $height-arcThickness]);
		path.bezierQ([$width/2.0-$thickness, $height-arcThickness-($arcHeight-arcThickness)/3.0], [$width/2.0-$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$arcHeight]);
		path.bezierQ([$width/2.0, $height-$arcHeight/3.0], [0.0, $height]);
		path.bezierQ([-$width/2.0, $height-$arcHeight/3.0], [-$width/2.0, $height-$arcHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowBorderMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow2_2 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var innerWindow = createInnerWindow2($width-$thickness, $height-$thickness/2.0, $arcHeight-$thickness/2.0, glassThickness);
	var outerWindow = createOuterWindow2_2($width, $height, $arcHeight, $thickness, $depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0));
	//outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);

	return group;
};

var createOuterWindow2_3 = function($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth)
{
	var ID = 'createOuterWindow2_3' + $outerWidth + $outerHeight + $innerWidth + $innerHeight + $arcHeight + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$outerWidth/2.0, $outerHeight]);
		path.lineTo([-$outerWidth/2.0, 0.0]);
		path.lineTo([-$innerWidth/2.0, 0.0]);
		path.lineTo([-$innerWidth/2.0, $innerHeight-$arcHeight]);
		path.bezierQ([-$innerWidth/2.0, $innerHeight-$arcHeight/3.0], [0.0, $innerHeight]);
		path.bezierQ([$innerWidth/2.0, $innerHeight-$arcHeight/3.0], [$innerWidth/2.0, $innerHeight-$arcHeight]);
		path.lineTo([$innerWidth/2.0, 0.0]);
		path.lineTo([$outerWidth/2.0, 0.0]);
		path.moveTo([$outerWidth/2.0, $outerHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(wallMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow2_3 = function($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth)
{
	var thickness = $innerWidth/15.0;
	var depth = thickness*2.0/3.0;

	var innerWindow = createInnerWindow2($innerWidth+0.01, $innerHeight+0.01, $arcHeight+0.01, glassThickness);
	var outerWindow = createOuterWindow2_3($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth);
	var outerWindow2 = createOuterWindow2_2($innerWidth+2.0*thickness, $innerHeight+thickness, $arcHeight+thickness, thickness, depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(wallMaterial);
	outerWindow2.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0-$depth));
	//outerWindow.add(new Translation(0.0, 0.0, -$depth/2.0));
	//outerWindow2.add(new Translation(0.0, 0.0, depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);
	group.add(outerWindow2);

	return group;
};

///////////////////////////////////
// Fenêtres avec arche orientale //
///////////////////////////////////

var createInnerWindow3 = function($width, $height, $arcHeight, $depth)
{
	var ID = 'createInnerWindow3' + $width + $height + $arcHeight + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$arcHeight]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$arcHeight]);
		path.bezierC([$width/2.0, $height-$arcHeight/3.0], [$width/12.0, $height-$arcHeight/3.0], [0.0, $height]);
		path.bezierC([-$width/12.0, $height-$arcHeight/3.0], [-$width/2.0, $height-$arcHeight/3.0], [-$width/2.0, $height-$arcHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createOuterWindow3_1 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var ID = 'createOuterWindow3_1' + $width + $height + $arcHeight + $thickness + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$arcHeight]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([-$width/2.0+$thickness, 0.0]);
		path.lineTo([-$width/2.0+$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$arcHeight]);
		path.bezierC([$width/2.0, $height-$arcHeight/3.0], [$width/12.0, $height-$arcHeight/3.0], [0.0, $height]);
		path.bezierC([-$width/12.0, $height-$arcHeight/3.0], [-$width/2.0, $height-$arcHeight/3.0], [-$width/2.0, $height-$arcHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowBorderMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow3_1 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var innerWindow = createInnerWindow3($width-$thickness, $height-$thickness/2.0, $arcHeight-$thickness/2.0, glassThickness);
	var outerWindow = createOuterWindow3_1($width, $height, $arcHeight, $thickness, $depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0));
	//outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);

	return group;
};

var createOuterWindow3_2 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var ID = 'createOuterWindow3_2' + $width + $height + $arcHeight + $thickness + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var arcThickness = 1.85*$thickness;
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$arcHeight]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([-$width/2.0+$thickness, 0.0]);
		path.lineTo([-$width/2.0+$thickness, $height-$arcHeight]);
		path.bezierC([-$width/2.0+$thickness, $height-arcThickness-($arcHeight-arcThickness)/3.0], [-$width/12.0, $height-arcThickness-($arcHeight-arcThickness)/3.0], [0.0, $height-arcThickness]);
		path.bezierC([$width/12.0, $height-arcThickness-($arcHeight-arcThickness)/3.0], [$width/2.0-$thickness, $height-arcThickness-($arcHeight-arcThickness)/3.0], [$width/2.0-$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$arcHeight]);
		path.bezierC([$width/2.0, $height-$arcHeight/3.0], [$width/12.0, $height-$arcHeight/3.0], [0.0, $height]);
		path.bezierC([-$width/12.0, $height-$arcHeight/3.0], [-$width/2.0, $height-$arcHeight/3.0], [-$width/2.0, $height-$arcHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowBorderMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow3_2 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var innerWindow = createInnerWindow3($width-$thickness, $height-$thickness/2.0, $arcHeight-$thickness/2.0, glassThickness);
	var outerWindow = createOuterWindow3_2($width, $height, $arcHeight, $thickness, $depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0));
	//outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);

	return group;
};

var createOuterWindow3_3 = function($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth)
{
	var ID = 'createOuterWindow3_3' + $outerWidth + $outerHeight + $innerWidth + $innerHeight + $arcHeight + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$outerWidth/2.0, $outerHeight]);
		path.lineTo([-$outerWidth/2.0, 0.0]);
		path.lineTo([-$innerWidth/2.0, 0.0]);
		path.lineTo([-$innerWidth/2.0, $innerHeight-$arcHeight]);
		path.bezierC([-$innerWidth/2.0, $innerHeight-($arcHeight)/3.0], [-$innerWidth/12.0, $innerHeight-($arcHeight)/3.0], [0.0, $innerHeight]);
		path.bezierC([$innerWidth/12.0, $innerHeight-($arcHeight)/3.0], [$innerWidth/2.0, $innerHeight-($arcHeight)/3.0], [$innerWidth/2.0, $innerHeight-$arcHeight]);
		path.lineTo([$innerWidth/2.0, 0.0]);
		path.lineTo([$outerWidth/2.0, 0.0]);
		path.moveTo([$outerWidth/2.0, $outerHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(wallMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow3_3 = function($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth)
{
	var thickness = $innerWidth/15.0;
	var depth = thickness*2.0/3.0;

	var innerWindow = createInnerWindow3($innerWidth+0.01, $innerHeight+0.01, $arcHeight+0.01, glassThickness);
	var outerWindow = createOuterWindow3_3($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth);
	var outerWindow2 = createOuterWindow3_2($innerWidth+2.0*thickness, $innerHeight+thickness, $arcHeight+thickness, thickness, depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(wallMaterial);
	outerWindow2.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0-$depth));
	//outerWindow.add(new Translation(0.0, 0.0, -$depth/2.0));
	//outerWindow2.add(new Translation(0.0, 0.0, depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);
	group.add(outerWindow2);

	return group;
};

//////////////////////////////////////
// Fenêtres avec arche triangulaire //
//////////////////////////////////////

var createInnerWindow4 = function($width, $height, $arcHeight, $depth)
{
	var ID = 'createInnerWindow4' + $width + $height + $arcHeight + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$arcHeight]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$arcHeight]);
		path.lineTo([0.0, $height]);
		path.lineTo([-$width/2.0, $height-$arcHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createOuterWindow4_1 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var ID = 'createOuterWindow4_1' + $width + $height + $arcHeight + $thickness + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$arcHeight]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([-$width/2.0+$thickness, 0.0]);
		path.lineTo([-$width/2.0+$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$arcHeight]);
		path.lineTo([0.0, $height]);
		path.lineTo([-$width/2.0, $height-$arcHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowBorderMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow4_1 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var innerWindow = createInnerWindow4($width-$thickness, $height-$thickness/2.0, $arcHeight-$thickness/2.0, glassThickness);
	var outerWindow = createOuterWindow4_1($width, $height, $arcHeight, $thickness, $depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0));
	//outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);

	return group;
};

var createOuterWindow4_2 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var ID = 'createOuterWindow4_2' + $width + $height + $arcHeight + $thickness + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var theta = Math.arctan($width/2.0, $arcHeight);
		var arcThickness = $thickness/Math.sin(theta);
		var path = new Path([]);
		path.moveTo([-$width/2.0, $height-$arcHeight]);
		path.lineTo([-$width/2.0, 0.0]);
		path.lineTo([-$width/2.0+$thickness, 0.0]);
		path.lineTo([-$width/2.0+$thickness, $height-$arcHeight]);
		path.lineTo([0.0, $height-arcThickness]);
		path.lineTo([$width/2.0-$thickness, $height-$arcHeight]);
		path.lineTo([$width/2.0-$thickness, 0.0]);
		path.lineTo([$width/2.0, 0.0]);
		path.moveTo([$width/2.0, $height-$arcHeight]);
		path.lineTo([0.0, $height]);
		path.lineTo([-$width/2.0, $height-$arcHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowBorderMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow4_2 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var innerWindow = createInnerWindow4($width-$thickness, $height-$thickness/2.0, $arcHeight-$thickness/2.0, glassThickness);
	var outerWindow = createOuterWindow4_2($width, $height, $arcHeight, $thickness, $depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0));
	//outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);

	return group;
};

var createOuterWindow4_3 = function($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth)
{
	var ID = 'createOuterWindow4_3' + $outerWidth + $outerHeight + $innerWidth + $innerHeight + $arcHeight + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var path = new Path([]);
		path.moveTo([-$outerWidth/2.0, $outerHeight]);
		path.lineTo([-$outerWidth/2.0, 0.0]);
		path.lineTo([-$innerWidth/2.0, 0.0]);
		path.lineTo([-$innerWidth/2.0, $innerHeight-$arcHeight]);
		path.lineTo([0.0, $innerHeight]);
		path.lineTo([$innerWidth/2.0, $innerHeight-$arcHeight]);
		path.lineTo([$innerWidth/2.0, 0.0]);
		path.lineTo([$outerWidth/2.0, 0.0]);
		path.moveTo([$outerWidth/2.0, $outerHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(wallMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow4_3 = function($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth)
{
	var thickness = $innerWidth/15.0;
	var depth = thickness*2.0/3.0;

	var innerWindow = createInnerWindow4($innerWidth+0.01, $innerHeight+0.01, $arcHeight+0.01, glassThickness);
	var outerWindow = createOuterWindow4_3($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth);
	var outerWindow2 = createOuterWindow4_2($innerWidth+2.0*thickness, $innerHeight+thickness, $arcHeight+thickness, thickness, depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(wallMaterial);
	outerWindow2.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0-$depth));
	//outerWindow.add(new Translation(0.0, 0.0, -$depth/2.0));
	//outerWindow2.add(new Translation(0.0, 0.0, depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);
	group.add(outerWindow2);

	return group;
};

////////////////////////////////////
// Fenêtres arches moyen orient 2 //
////////////////////////////////////

var createInnerWindow5 = function($width, $height, $arcHeight, $depth)
{
	var ID = 'createInnerWindow5' + $width + $height + $arcHeight + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var innerRadius = $width/2.0;
		var bump = innerRadius*0.5;

		var path = new Path([]);
		path.moveTo([-innerRadius, 0.0]);
		path.lineTo([-innerRadius, $height-$arcHeight]);
		path.bezierQ([-innerRadius-bump*0.6, $height-$arcHeight + $arcHeight*0.8], [0.0, $height]);
		path.bezierQ([innerRadius+bump*0.6, $height-$arcHeight + $arcHeight*0.8], [innerRadius, $height-$arcHeight]);
		path.lineTo([innerRadius, 0.0]);
		path.lineTo([-innerRadius, 0.0]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createOuterWindow5_1 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var ID = 'createOuterWindow5_1' + $width + $height + $arcHeight + $thickness + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var innerRadius = $width/2.0;
		var bump = innerRadius*0.5;

		var path = new Path([]);
		path.moveTo([-innerRadius, 0.0]);
		path.lineTo([-innerRadius, $height-$arcHeight]);
		path.bezierQ([-innerRadius-bump*0.6, $height-$arcHeight + $arcHeight*0.8], [0.0, $height]);
		path.bezierQ([innerRadius+bump*0.6, $height-$arcHeight + $arcHeight*0.8], [innerRadius, $height-$arcHeight]);
		path.lineTo([innerRadius, 0.0]);
		path.lineTo([innerRadius-$thickness, 0.0]);
		path.lineTo([innerRadius-$thickness, $height-$arcHeight]);
		path.lineTo([-innerRadius+$thickness, $height-$arcHeight]);
		path.lineTo([-innerRadius+$thickness, 0.0]);
		path.lineTo([-innerRadius, 0.0]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowBorderMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow5_1 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var innerWindow = createInnerWindow5($width-$thickness, $height-$thickness/2.0, $arcHeight-$thickness/2.0, glassThickness);
	var outerWindow = createOuterWindow5_1($width, $height, $arcHeight, $thickness, $depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0));
	//outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);

	return group;
};

var createOuterWindow5_2 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var ID = 'createOuterWindow5_2' + $width + $height + $arcHeight + $thickness + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var innerRadius = $width/2.0;
		var bump = innerRadius*0.5;

		var path = new Path([]);
		path.moveTo([-innerRadius, 0.0]);
		path.lineTo([-innerRadius, $height-$arcHeight]);
		path.bezierQ([-innerRadius-bump*0.6, $height-$arcHeight + $arcHeight*0.8], [0.0, $height]);
		path.bezierQ([innerRadius+bump*0.6, $height-$arcHeight + $arcHeight*0.8], [innerRadius, $height-$arcHeight]);
		path.lineTo([innerRadius, 0.0]);
		path.lineTo([innerRadius-$thickness, 0.0]);
		path.lineTo([innerRadius-$thickness, $height-$arcHeight]);
		path.bezierQ([innerRadius-$thickness+bump*0.6, $height-$arcHeight + ($arcHeight-$thickness)*0.8], [0.0, $height-$thickness]);
		path.bezierQ([-innerRadius+$thickness-bump*0.6, $height-$arcHeight + ($arcHeight-$thickness)*0.8], [-innerRadius+$thickness, $height-$arcHeight]);
		path.lineTo([-innerRadius+$thickness, 0.0]);
		path.lineTo([-innerRadius, 0.0]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(windowBorderMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow5_2 = function($width, $height, $arcHeight, $thickness, $depth)
{
	var innerWindow = createInnerWindow5($width-$thickness, $height-$thickness/2.0, $arcHeight-$thickness/2.0, glassThickness);
	var outerWindow = createOuterWindow5_2($width, $height, $arcHeight, $thickness, $depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0));
	//outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);

	return group;
};

var createOuterWindow5_3 = function($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth)
{
	var ID = 'createOuterWindow5_3' + $outerWidth + $outerHeight + $innerWidth + $innerHeight + $arcHeight + $depth;
	var instance = originalInstances[ID];
	var extrusion  = null;

	if (utils.isset(instance))
		extrusion = new Instance(instance);
	else
	{
		var innerRadius = $innerWidth/2.0;
		var bump = innerRadius*0.5;

		var path = new Path([]);
		path.moveTo([-$outerWidth/2.0, $outerHeight]);
		path.lineTo([-$outerWidth/2.0, 0.0]);
		path.lineTo([-$innerWidth/2.0, 0.0]);
		path.lineTo([-$innerWidth/2.0, $innerHeight-$arcHeight]);
		path.bezierQ([-innerRadius-bump*0.6, $innerHeight-$arcHeight + $arcHeight*0.8], [0.0, $innerHeight]);
		path.bezierQ([innerRadius+bump*0.6, $innerHeight-$arcHeight + $arcHeight*0.8], [innerRadius, $innerHeight-$arcHeight]);
		path.lineTo([$innerWidth/2.0, 0.0]);
		path.lineTo([$outerWidth/2.0, 0.0]);
		path.moveTo([$outerWidth/2.0, $outerHeight]);
		path.close();
	
		var pointsList = path.samplePoints();

		var extrusion = new Extrusion(pointsList, $depth, 'x');
		extrusion.setMaterial(wallMaterial);

		originalInstances[ID] = extrusion;

		extrusion = new Instance(extrusion);
	}

	//extrusion.add(new Rotation(90.0, 'z'));
	//extrusion.add(new Rotation(-90.0, 'x'));

	return extrusion;
};

var createWindow5_3 = function($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth)
{
	var thickness = $innerWidth/15.0;
	var depth = thickness*2.0/3.0;

	var innerWindow = createInnerWindow5($innerWidth+0.01, $innerHeight+0.01, $arcHeight+0.01, glassThickness);
	var outerWindow = createOuterWindow5_3($outerWidth, $outerHeight, $innerWidth, $innerHeight, $arcHeight, $depth);
	var outerWindow2 = createOuterWindow5_2($innerWidth+2.0*thickness, $innerHeight+thickness, $arcHeight+thickness, thickness, depth);

	innerWindow.setMaterial(windowMaterial);
	outerWindow.setMaterial(wallMaterial);
	outerWindow2.setMaterial(windowBorderMaterial);

	//innerWindow.add(new Translation(0.0, 0.0, glassThickness/2.0-$depth));
	//outerWindow.add(new Translation(0.0, 0.0, -$depth/2.0));
	//outerWindow2.add(new Translation(0.0, 0.0, depth/2.0));

	var group = new Group();

	group.add(innerWindow);
	group.add(outerWindow);
	group.add(outerWindow2);

	return group;
};

/////////////////////
// Fanêtres double //
/////////////////////

var createDoubleWindow1 = function($width, $height, $arcHeight, $thickness, $depth, $innerType, $outerType)
{
	var outerWindow = null;
	var innerWindow1 = null;
	var innerWindow2 = null;

	var innerWidth = $width/2.0-$thickness;
	var innerHeight = $height-$arcHeight/2.0;
	var innerArcHeight = $arcHeight/2.0;
	var innerThickness = $thickness/2.0;
	var innerDepth = $depth/2.0;

	if ($outerType === 1)
	{
		outerWindow = createOuterWindow1_2($width, $height, $thickness, $depth);

		innerHeight = $height-$width/3.0;
		innerArcHeight = $width/3.0;
	}
	else if ($outerType === 2)
	{
		outerWindow = createOuterWindow2_2($width, $height, $arcHeight, $thickness, $depth);
	}
	else if ($outerType === 3)
	{
		outerWindow = createOuterWindow3_2($width, $height, $arcHeight, $thickness, $depth);
	}
	else if ($outerType === 4)
	{
		outerWindow = createOuterWindow4_2($width, $height, $arcHeight, $thickness, $depth);

		var theta = Math.arctan($width/2.0, $arcHeight);
		var arcThickness = $thickness/Math.sin(theta);
		innerHeight = $height-$arcHeight/2.0-arcThickness/2.0;
		innerArcHeight = $arcHeight/2.0-arcThickness/2.0;
	}
	else if ($outerType === 5)
	{
		outerWindow = createOuterWindow5_2($width, $height, $arcHeight, $thickness, $depth);
	}

	if ($innerType === 1)
	{
		if ($outerType === 2 || $outerType === 3)
			innerHeight = $height-0.75*$arcHeight;
		else if ($outerType === 4)
			innerHeight = $height-0.9*$arcHeight;

		innerWindow1 = createWindow1_2(innerWidth, innerHeight, innerThickness, innerDepth);
		innerWindow2 = createWindow1_2(innerWidth, innerHeight, innerThickness, innerDepth);
	}
	else if ($innerType === 2)
	{
		if ($outerType === 4)
			innerHeight = $height-0.8*$arcHeight;

		innerWindow1 = createWindow2_2(innerWidth, innerHeight, innerArcHeight, innerThickness, innerDepth);
		innerWindow2 = createWindow2_2(innerWidth, innerHeight, innerArcHeight, innerThickness, innerDepth);
	}
	else if ($innerType === 3)
	{
		if ($outerType === 4)
			innerHeight = $height-0.75*$arcHeight;

		innerWindow1 = createWindow3_2(innerWidth, innerHeight, innerArcHeight, innerThickness, innerDepth);
		innerWindow2 = createWindow3_2(innerWidth, innerHeight, innerArcHeight, innerThickness, innerDepth);
	}
	else if ($innerType === 4)
	{
		innerWindow1 = createWindow4_2(innerWidth, innerHeight, innerArcHeight, innerThickness, innerDepth);
		innerWindow2 = createWindow4_2(innerWidth, innerHeight, innerArcHeight, innerThickness, innerDepth);
	}
	else if ($innerType === 5)
	{
		innerWindow1 = createWindow5_2(innerWidth, innerHeight, innerArcHeight, innerThickness, innerDepth);
		innerWindow2 = createWindow5_2(innerWidth, innerHeight, innerArcHeight, innerThickness, innerDepth);
	}

	outerWindow.setMaterial(windowBorderMaterial);

	outerWindow.add(new Translation(0.0, 0.0, $depth/2.0));
	innerWindow1.add(new Translation(0.0, ($width/2.0-$thickness)/2.0, 0.0));
	innerWindow2.add(new Translation(0.0, ($thickness-$width/2.0)/2.0, 0.0));

	var group = new Group();

	group.add(outerWindow);
	group.add(innerWindow1);
	group.add(innerWindow2);

	return group;
};

/////////////
// Hublots //
/////////////

var createPorthole = function($radius, $thickness, $depth)
{
	var group = new Group();

	var IDpipe = 'createPorthole_Pipe' + $radius + $thickness + $depth;
	var IDcylinder = 'createPorthole_Cylinder' + $radius + $thickness + $depth;
	var pipeInstance = originalInstances[IDpipe];
	var cylinderInstance = originalInstances[IDcylinder];
	var pipe  = null;
	var cylinder = null;

	if (utils.isset(pipeInstance))
		pipe = new Instance(pipeInstance);
	else
	{
		pipe = new Pipe($radius, $radius-$thickness, $radius, $radius-$thickness, $depth);
		pipe.setMaterial(windowBorderMaterial);
		originalInstances[IDpipe] = pipe;
		pipe = new Instance(pipe);
	}

	pipe.add(new Rotation(90.0, 'z'));
	pipe.add(new Rotation(-90.0, 'x'));
	pipe.add(new Translation(0.0, 0.0, $depth/2.0));

	group.add(pipe);

	if (utils.isset(cylinderInstance))
		cylinder = new Instance(cylinderInstance);
	else
	{
		cylinder = new Cylinder($radius-$thickness+0.05, $radius-$thickness+0.05, glassThickness);
		cylinder.setMaterial(windowMaterial);
		originalInstances[IDcylinder] = cylinder;
		cylinder = new Instance(cylinder);
	}

	//cylinder.add(new Rotation(90.0, 'z'));
	cylinder.add(new Rotation(90.0, 'y'));
	cylinder.add(new Translation(0.0, 0.0, glassThickness));

	group.add(cylinder);

	return group;
};

