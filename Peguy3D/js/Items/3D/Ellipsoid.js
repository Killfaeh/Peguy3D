function Ellipsoid($radiusX, $radiusY, $radiusZ)
{
	///////////////
	// Attributs //
	///////////////

    var radiusX = $radiusX;
    var radiusY = $radiusY;
    var radiusZ = $radiusZ;

    if (!utils.isset(radiusX))
        radiusX = 1.0;

	if (!utils.isset(radiusY))
        radiusY = radiusX;

	if (!utils.isset(radiusZ))
        radiusZ = radiusY;

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
			var resolution = Doc.resolution;

			var object = new GLUVEllipsoid(radiusX, radiusY, radiusZ, resolution);
			object.setVertexShaderName('vertex-material');
			object.setFragmentShaderName('fragment-material');
			glObject = object;
            $this.setGlObject(glObject);
        }

        return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new Ellipsoid(radiusX, radiusY, radiusZ);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getRadiusX = function() { return radiusX; };
	this.getRadiusY = function() { return radiusY; };
	this.getRadiusZ = function() { return radiusZ; };

	// SET
	
    this.setRadiusX = function($radiusX)
    {
        radiusX = $radiusX;

        if (!utils.isset(radiusX))
            radiusX = 1.0;
    };

    this.radiusX = function($radiusX)
	{
		if (utils.isset($radiusX))
			$this.setRadiusX($radiusX);

		return radiusX;
	};

	this.setRadiusY = function($radiusY)
    {
        radiusY = $radiusY;

        if (!utils.isset(radiusY))
            radiusY = 1.0;
    };

    this.radiusY = function($radiusY)
	{
		if (utils.isset($radiusY))
			$this.setRadius($radiusY);

		return radiusY;
	};

	this.setRadiusZ = function($radiusZ)
    {
        radiusZ = $radiusZ;

        if (!utils.isset(radiusZ))
            radiusZ = 1.0;
    };

    this.radiusZ = function($radiusZ)
	{
		if (utils.isset($radiusZ))
			$this.setRadiusZ($radiusZ);

		return radiusZ;
	};

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("ellipsoid");