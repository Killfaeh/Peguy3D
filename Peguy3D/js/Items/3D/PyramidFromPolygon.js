function PyramidFromPolygon($verticesList, $height, $axis)
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

	if (!utils.isset(height))
		height = 2.0;

	if (!utils.isset(verticesList))
		verticesList = [];

	if (!Array.isArray(verticesList) && utils.isset(verticesList.samplePoints))
		verticesList = verticesList.samplePoints();

	var axis = $axis;

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

            var object = new GLPyramidFromPolygon(radius, height, deltaX, deltaY, verticesList, heightResolution, bottomClosed, 0, axis);
			object.debug();
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new PyramidFromPolygon(verticesList, height, axis);
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

	this.getHeight = function() { return height; };
	this.getAngle = function() { return angle; };
	this.getDeltaX = function() { return deltaX; };
	this.getDeltaY = function() { return deltaY; };
	this.getVerticesList = function() { return verticesList; };
	this.isFilled = function() { return fill; };
	this.isBottomClosed = function() { return bottomClosed; };

	// SET
	
    this.setHeight = function($height)
    {
        height = $height;

		if (!utils.isset(height))
			height = 2.0;
    };

	this.height = function($height)
	{
		if (utils.isset($height))
			$this.setHeight($height);

		return height;
	};

	this.setAxis = function($axis)
    {
        axis = $axis;

        if (!utils.isset(axis))
            axis = 'z';

        updatePath();
    };

    this.axis = function($axis)
    {
        if (utils.isset($axis))
            $this.setAxis($axis);

        return axis;
    };

	this.setDeltaX = function($deltaX)
    {
        deltaX = $deltaX;

		if (!utils.isset(deltaX))
			deltaX = 0.0;
    };

	this.deltaX = function($deltaX)
	{
		if (utils.isset($deltaX))
			$this.setDeltaX($deltaX);

		return deltaX;
	};

	this.setDeltaY = function($deltaY)
    {
        deltaY = $deltaY;

		if (!utils.isset(deltaY))
			deltaY = 0.0;
    };

	this.deltaY = function($deltaY)
	{
		if (utils.isset($deltaY))
			$this.setDeltaY($deltaY);

		return deltaY;
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

	this.bottomClosed = function($bottomClosed)
	{
		if (utils.isset($bottomClosed))
			$this.setBottomClosed($bottomClosed);

		return bottomClosed;
	};

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("pyramidFromPolygon");