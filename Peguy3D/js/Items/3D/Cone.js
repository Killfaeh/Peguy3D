//function Cone($radius, $height, $angle, $deltaX, $deltaY, $fill, $bottomClosed)
function Cone($radius, $height)
{
	///////////////
	// Attributs //
	///////////////

    var radius = $radius;
    var height = $height;
    var angle = 360.0;
    var deltaX = 0.0;
    var deltaY = 0.0;
    var fill = true;
    var bottomClosed = true;

    if (!utils.isset(radius))
		radius = 1.0;

	if (!utils.isset(height))
		height = 2.0;

	/*
	if (!utils.isset(angle))
		angle = 360.0;

	if (!utils.isset(deltaX))
		deltaX = 0.0;

	if (!utils.isset(deltaY))
		deltaY = 0.0;

	if (!utils.isset(fill))
		fill = true;

	if (!utils.isset(bottomClosed))
		bottomClosed = true;
	//*/

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        var objectCode = '<circle cx="0" cy="0" r="' + radius + '" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
			var thetaResolution = 32;
			var heightResolution = 2;
			var radiusResolution = 2;

            var object = new GLCone(radius, height, angle, deltaX, deltaY, thetaResolution, heightResolution, fill, bottomClosed, radiusResolution);
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this['super'].compute3D(glObject.getInstance());
    };

    this.clone = function()
	{
		var clone = new Cone(radius, height, angle, deltaX, deltaY, fill, bottomClosed);
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

	this.setAngle = function($angle)
    {
        angle = $angle;

		if (!utils.isset(angle))
			angle = 360.0;
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

	this.setFill = function($fill)
    {
        fill = $fill;

		if (!utils.isset(fill))
			fill = true;
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
	Loader.hasLoaded("cone");