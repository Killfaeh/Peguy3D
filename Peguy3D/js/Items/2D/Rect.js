function Rect($width, $height)
{
	///////////////
	// Attributs //
	///////////////

    var width = $width;
    var height = $height;

    if (!utils.isset(width))
        width = 1.0;
    
    if (!utils.isset(height))
        height = 1.0;

    var roundX = 0;
    var roundY = 0;

	var curve = new Path([]);

	//////////////
	// Méthodes //
	//////////////

    var updatePath = function()
    {
        // Faudra ajouter les coins arrondis ! 
        curve.setOperations([]);
        curve.moveTo([-width/2, -height/2]);
        curve.lineTo([width/2, -height/2]);
        curve.lineTo([width/2, height/2]);
        curve.lineTo([-width/2, height/2]);
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
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
            var object = new GLRect(width, height);
            object.setVertexShaderName('vertex-normals');
            object.setFragmentShaderName('fragment-modeling');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new Rect(width, height);
        clone.setRound(roundX, roundY);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getWidth = function() { return width; };
    this.getHeight = function() { return height; };
    this.getRoundX = function() { return roundX; };
    this.getRoundY = function() { return roundY; };

	// SET
	
    this.setSize = function($width, $height)
    {
        width = $width;
        height = $height;

        if (!utils.isset(width))
            width = 100;
        
        if (!utils.isset(height))
            height = 100;

        updatePath();
    };

    this.size = function($width, $height)
	{
		if (utils.isset($width) && utils.isset($height))
			$this.setSize($width, $height);

		return [width, height];
	};

    /*
    this.setRound = function($round)
    {
        round = $round;
        updatePath();
    };

    this.round = function($round)
	{
		if (utils.isset($round))
			$this.setRound($round);

		return round;
	};
    //*/

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
    updatePath();
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("rect");