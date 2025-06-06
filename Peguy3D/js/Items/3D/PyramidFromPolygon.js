
//function PyramidFromPolygon($radius, $height, $deltaX, $deltaY, $verticesList, $bottomClosed)
function PyramidFromPolygon($verticesList, $height)
{
	///////////////
	// Attributs //
	///////////////

    var radius = null;
    var height = $height;
    var deltaX = 0.0;
    var deltaY = 0.0;
	var verticesList = $verticesList;
    var bottomClosed = true;

	/*
    if (!utils.isset(radius))
		radius = 1.0;
	//*/

	if (!utils.isset(height))
		height = 2.0;

	/*
	if (!utils.isset(deltaX))
		deltaX = 0.0;

	if (!utils.isset(deltaY))
		deltaY = 0.0;
	//*/

	if (!utils.isset(verticesList))
		verticesList = [];

	/*
	if (!utils.isset(bottomClosed))
		bottomClosed = true;
	//*/

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

	// A retoucher
	this.computeSVG = function()
    {
        var pointsSTR = '';

        if (verticesList.length > 0)
        {
            pointsSTR = 'M ' + verticesList[0][0] + ',' + verticesList[0][1];

            for (var i = 1; i < verticesList.length; i++)
                pointsSTR = pointsSTR + ' L' + verticesList[i][0] + ',' + verticesList[i][1];
            
            pointsSTR = pointsSTR + ' Z';
        }

        var objectCode = '<path d="' + pointsSTR + '" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
		console.log("POUET ! 1");

        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
			var glPointsList = [];

            for (var i = 0; i < verticesList.length; i++)
                glPointsList.push({x: verticesList[i][0], y: verticesList[i][1]});

			var heightResolution = 2;
			
			console.log("POUET ! 2");
			console.log(glPointsList);
			console.log(radius);

            var object = new GLPyramidFromPolygon(radius, height, deltaX, deltaY, glPointsList, heightResolution, bottomClosed);
			object.debug();
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.execSuper('compute3D', [glObject.getInstance()]);
    };

    this.clone = function()
	{
		var clone = new PyramidFromPolygon(radius, height, deltaX, deltaY, verticesList, bottomClosed);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	this.loadFromAsset = function($assetId, $nodeId)
    {
        var path = new Path();
		path.loadFromAsset($assetId, $nodeId);
		verticesList = path.samplePoints();
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getRadius = function() { return radius; };
	this.getHeight = function() { return height; };
	this.getAngle = function() { return angle; };
	this.getDeltaX = function() { return deltaX; };
	this.getDeltaY = function() { return deltaY; };
	this.getVerticesList = function() { return verticesList; };
	this.isFilled = function() { return fill; };
	this.isBottomClosed = function() { return bottomClosed; };

	// SET
	
    this.setRadius = function($radius)
    {
        radius = $radius;

		if (!utils.isset(radius))
			radius = 1.0;
    };

	this.setHeight = function($height)
    {
        height = $height;

		if (!utils.isset(height))
			height = 2.0;
    };

	this.setDeltaX = function($deltaX)
    {
        deltaX = $deltaX;

		if (!utils.isset(deltaX))
			deltaX = 0.0;
    };

	this.setDeltaY = function($deltaY)
    {
        deltaY = $deltaY;

		if (!utils.isset(deltaY))
			deltaY = 0.0;
    };

	this.setVerticesList = function($verticesList)
	{
		verticesList = $verticesList;

		if (!utils.isset(verticesList))
			verticesList = [];
	};

	this.setBottomClosed = function($bottomClosed)
    {
        bottomClosed = $bottomClosed;

		if (!utils.isset(bottomClosed))
			bottomClosed = true;
    };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("pyramidFromPolygon");