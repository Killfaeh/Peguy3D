function Square($size)
{
	///////////////
	// Attributs //
	///////////////

    var size = $size;

    if (!utils.isset(size))
        size = 1.0;

    var round = 0;

	var curve = new Path([]);

	//////////////
	// Méthodes //
	//////////////

    var updatePath = function()
    {
        // Faudra ajouter les coins arrondis ! 
        curve.setOperations([]);
        curve.moveTo([-size/2, -size/2]);
        curve.lineTo([size/2, -size/2]);
        curve.lineTo([size/2, size/2]);
        curve.lineTo([-size/2, size/2]);
        curve.close();
    };

	this.computeSVG = function computeSVG()
    {
        updatePath();
        var svgObject = $this.execSuper('computeSVG', [], computeSVG);
        return svgObject;
    };

    this.compute3D = function()
    {
        // Faudra ajouter les coins arrondis ! 

        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
            var object = new GLRect(size, size);
            object.setVertexShaderName('vertex-normals');
            object.setFragmentShaderName('fragment-modeling');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new Square(size);
        clone.setRound(roundX);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getSize = function() { return size; };
    this.getRound = function() { return round; };

	// SET
	
    this.setSize = function($size)
    {
        size = $size;

        if (!utils.isset(size))
            size = 100;

        updatePath();
    };

    this.size = function($size) { $this.setSize($size); };

    this.setRound = function($round)
    {
        round = $round;
        updatePath();
    };

    this.round = function($round) { $this.setRound($round); };

    this.clone = function()
	{
		var clone = Square(size);
		clone.setTransformList(clone.getTransformList());
        clone.fill(clone.getFillColor());
        clone.round(round);
        clone.border(clone.getBorderColor(), clone.getBorderWidth());
		return clone;
	};

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
    updatePath();
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("square");