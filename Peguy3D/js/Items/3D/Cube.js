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

		return $this.computeTransforms(glObject);
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

	/*
	this.getBoundingBox = function()
	{
		var boundingBox = object3D.getBoundingBox();

		if (!utils.isset(boundingBox))
		{
			boundingBox =
			{
				minX: -size/2.0, minY: -size/2.0, minZ: -size/2.0,
				maxX: size/2.0, maxY: size/2.0, maxZ: size/2.0,
				widthX: size, widthY: size, widthZ: size
			};

			var transformList = object3D.getTransformList();

			if (transformList.length > 0)
			{
				for (var i = 0; i < transformList.length; i++)
				{
					// Ajouter les calculs de transformations
					// ...
				}
			}

			object3D.setBoundingBox(boundingBox);
		}

		return boundingBox;
	};
	//*/
	
	this.getSize = function() { return size; };

	// SET
	
    this.setSize = function($size)
    {
        size = $size;

		if (!utils.isset(size))
			size = 1.0;
    };

	this.size = function($size)
	{
		if (utils.isset($size))
			$this.setSize($size);

		return size;
	};

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("cube");