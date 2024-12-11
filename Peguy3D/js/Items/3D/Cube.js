function Cube($size)
{
	///////////////
	// Attributs //
	///////////////

    var size = $size;

    if (!utils.isset(size))
		size = 1.0;

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        var objectCode = '<rect x="' + -size/2 + '" y="' + -size/2 + '" width="' + size + '" height="' + size + '" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
            var object = new GLCuboid(size, size, size);
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this['super'].compute3D(glObject.getInstance());
    };

    this.clone = function()
	{
		var clone = new Cube(size);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getSize = function() { return size; };

	// SET
	
    this.setSize = function($size)
    {
        size = $size;

		if (!utils.isset(size))
			size = 1.0;
    };

    this.size = function($size) { $this.setSize($size); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("cube");