
//function Pipe($radius1, $radius2, $radius3, $radius4, $height, $angle, $deltaX, $deltaY, $fill, $bottomClosed, $topClosed)
function Pipe($radius1, $radius2, $radius3, $radius4, $height)
{
	///////////////
	// Attributs //
	///////////////

    var radius1 = $radius1;
    var radius2 = $radius2;
    var radius3 = $radius3;
    var radius4 = $radius4;
    var height = $height;
    var angle = 360.0;
    var deltaX = 0.0;
    var deltaY = 0.0;
    var fill = true;
    var bottomClosed = true;
    var topClosed = true;

    if (!utils.isset(radius1))
		radius1 = 0.5;

	if (!utils.isset(radius2))
		radius2 = 1.0;

	if (!utils.isset(radius3))
		radius3 = 0.5;

	if (!utils.isset(radius4))
		radius4 = 1.0;

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

	if (!utils.isset(topClosed))
		topClosed = true;
	//*/

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
			
            var object = new GLPipe(radius1, radius2, radius3, radius4, height, angle, deltaX, deltaY, thetaResolution, heightResolution, bottomClosed, topClosed, fill);
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new Pipe(radius1, radius2, radius3, radius4, height, angle, deltaX, deltaY, fill, bottomClosed, topClosed);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getRadius1 = function() { return radius1; };
	this.getRadius2 = function() { return radius2; };
	this.getRadius3 = function() { return radius3; };
	this.getRadius4 = function() { return radius4; };
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
			radius1 = 0.5;
    };

	this.setRadius2 = function($radius2)
    {
        radius2 = $radius2;

		if (!utils.isset(radius2))
			radius2 = 1.0;
    };

	this.setRadius3 = function($radius3)
    {
        radius3 = $radius3;

		if (!utils.isset(radius3))
			radius3 = 0.5;
    };

	this.setRadius4 = function($radius4)
    {
        radius4 = $radius4;

		if (!utils.isset(radius4))
			radius4 = 1.0;
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
	Loader.hasLoaded("pipe");