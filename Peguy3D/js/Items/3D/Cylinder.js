function Cylinder($radius1, $radius2, $height)
{
	///////////////
	// Attributs //
	///////////////

    var radius1 = $radius1;
    var radius2 = $radius2;
    var height = $height;
    var angle = 360.0;
    var deltaX = 0.0;
    var deltaY = 0.0;
    var fill = true;
    var bottomClosed = true;
    var topClosed = true;

    if (!utils.isset(radius1))
		radius1 = 1.0;

	if (!utils.isset(radius2))
		radius2 = 1.0;

	if (!utils.isset(height))
		height = 2.0;

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        var objectCode = '<circle cx="0" cy="0" r="' + Math.max(radius1, radius2) + '" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
			var thetaResolution = Doc.resolution;
			var heightResolution = 2;
			var radiusResolution = 2;
			
            var object = new GLCylinder(radius1, radius2, height, angle, deltaX, deltaY, thetaResolution, heightResolution, fill, bottomClosed, topClosed, radiusResolution);
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new Cylinder(radius1, radius2, height, angle, deltaX, deltaY, fill, bottomClosed, topClosed);
		clone.setTransformList(clone.getTransformList());
		return clone;
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

	this.radius1 = function($radius1)
	{
		if (utils.isset($radius1))
			$this.setRadius1($radius1);

		return radius1;
	};

	this.setRadius2 = function($radius2)
    {
        radius2 = $radius2;

		if (!utils.isset(radius2))
			radius2 = 1.0;
    };

	this.radius2 = function($radius2)
	{
		if (utils.isset($radius2))
			$this.setRadius2($radius2);

		return radius2;
	};

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

	this.setAngle = function($angle)
    {
        angle = $angle;

		if (!utils.isset(angle))
			angle = 360.0;
    };

	this.angle = function($angle)
	{
		if (utils.isset($angle))
			$this.setAngle($angle);

		return angle;
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

	this.setFill = function($fill)
    {
        fill = $fill;

		if (!utils.isset(fill))
			fill = true;
    };

	this.fill = function($fill)
	{
		if (utils.isset($fill))
			$this.setFill($fill);

		return fill;
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

	this.setTopClosed = function($topClosed)
    {
        topClosed = $topClosed;

		if (!utils.isset(topClosed))
			topClosed = true;
    };

	this.topClosed = function($topClosed)
	{
		if (utils.isset($topClosed))
			$this.setTopClosed($topClosed);

		return topClosed;
	};

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("cylinder");