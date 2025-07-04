function RegularPolygon($radius, $nbSides)
{
	///////////////
	// Attributs //
	///////////////

    var radius = $radius;

    if (!utils.isset(radius))
        radius = 1.0;

	var nbSides = $nbSides;

	if (!utils.isset(nbSides) || nbSides < 3)
		nbSides = 3;

	var curve = new Path([]);

	//////////////
	// Méthodes //
	//////////////

	var updatePath = function()
    {
		var stepTheta = 2.0*Math.PI/nbSides;

        curve.setOperations([]);
		curve.moveTo([radius, 0.0]);

        for (var i = 1; i <= nbSides; i++)
            curve.lineTo([radius*Math.cos(i*stepTheta), radius*Math.sin(i*stepTheta)]);

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
			var object = new GLDisc(radius, 360.0, 2, nbSides);
			object.setVertexShaderName('vertex-normals');
			object.setFragmentShaderName('fragment-modeling');
			glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new RegularPolygon(radius, nbSides);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getRadius = function() { return radius; };
	this.getNbSides = function() { return nbSides; };

	// SET
	
    this.setRadius = function($radius)
    {
        radius = $radius;

        if (!utils.isset(radius))
            radius = 1.0;

		updatePath();
    };

    this.radius = function($radius) { $this.setRadius($radius); };

	this.setNbSides = function($nbSides)
    {
        var nbSides = $nbSides;

		if (!utils.isset(nbSides) || nbSides < 3)
			nbSides = 3;

		updatePath();
    };

	this.nbSides = function($nbSides) { $this.setNbSides($nbSides); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	updatePath();
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("regularPolygon");