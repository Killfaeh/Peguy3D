
//function PrismFromPolygon($radius1, $radius2, $height, $deltaX, $deltaY, $verticesList, $bottomClosed, $topClosed, $axis)
function PrismFromPolygon($verticesList, $height, $axis)
{
	///////////////
	// Attributs //
	///////////////

    var radius1 = null;
    var radius2 = null;
    var height = $height;
    var deltaX = 0.0;
    var deltaY = 0.0;
	var verticesList = $verticesList;
    var bottomClosed = true;
    var topClosed = true;
	var axis = $axis;

	/*
    if (!utils.isset(radius1))
		radius1 = 1.0;

	if (!utils.isset(radius2))
		radius2 = 1.0;
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

	//*
	if (!Array.isArray(verticesList) && utils.isset(verticesList.samplePoints))
		verticesList = verticesList.samplePoints();
	//*/

	/*
	if (!utils.isset(bottomClosed))
		bottomClosed = true;

	if (!utils.isset(topClosed))
		topClosed = true;
	//*/

	if (axis !== 'x' && axis !== 'y' && axis !== 'z')
		axis = 'z';

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
			var heightResolution = 2;
            var object = new GLPrismFromPolygon(radius1, radius2, height, deltaX, deltaY, verticesList, heightResolution, bottomClosed, topClosed, 0, axis);
			//object.debug();
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new PrismFromPolygon(radius1, radius2, height, deltaX, deltaY, verticesList, bottomClosed, topClosed);
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
	
	this.getRadius1 = function() { return radius1; };
	this.getRadius2 = function() { return radius2; };
	this.getHeight = function() { return height; };
	this.getAngle = function() { return angle; };
	this.getDeltaX = function() { return deltaX; };
	this.getDeltaY = function() { return deltaY; };
	this.getVerticesList = function() { return verticesList; };
	this.isFilled = function() { return fill; };
	this.isBottomClosed = function() { return bottomClosed; };
	this.isTopClosed = function() { return topClosed; };

	// SET
	
    this.setRadius1 = function($radius1)
    {
        radius1 = $radius1;

		if (!utils.isset(radius1))
			radius1 = 1.0;
    };

	this.setRadius2 = function($radius2)
    {
        radius2 = $radius2;

		if (!utils.isset(radius2))
			radius2 = 1.0;
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

	this.setTopClosed = function($topClosed)
    {
        topClosed = $topClosed;

		if (!utils.isset(topClosed))
			topClosed = true;
    };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("prismFromPolygon");