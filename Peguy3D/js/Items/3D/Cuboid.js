function Cuboid($widthX, $widthY, $widthZ)
{
	///////////////
	// Attributs //
	///////////////

    var widthX = $widthX;
	var widthY = $widthY;
	var widthZ = $widthZ;

    if (!utils.isset(widthX))
		widthX = 1.0;
    
    if (!utils.isset(widthY))
		widthY = 1.0;

	if (!utils.isset(widthZ))
		widthZ = 1.0;

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        var objectCode = '<rect x="' + -widthX/2 + '" y="' + -widthY/2 + '" width="' + widthX + '" height="' + widthY + '" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
            var object = new GLCuboid(widthX, widthY, widthZ);
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this['super'].compute3D(glObject.getInstance());
    };

    this.clone = function()
	{
		var clone = new Cuboid(widthX, widthY, widthZ);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getWidthX = function() { return widthX; };
	this.getWidthY = function() { return widthY; };
	this.getWidthZ = function() { return widthZ; };

	// SET
	
    this.setSize = function($widthX, $widthY, $widthZ)
    {
        widthX = $widthX;
		widthY = $widthY;
		widthZ = $widthZ;

		if (!utils.isset(widthX))
			widthX = 1.0;
		
		if (!utils.isset(widthY))
			widthY = 1.0;

		if (!utils.isset(widthZ))
			widthZ = 1.0;
    };

    this.size = function($widthX, $widthY, $widthZ) { $this.setSize($widthX, $widthY, $widthZ); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("cuboid");