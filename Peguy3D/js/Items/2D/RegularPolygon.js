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

	var curve = new Curve();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
		var stepTheta = 2.0*Math.PI/nbSides;
        var pointsSTR = '';

        pointsSTR = 'M ' + $radius + ',0.0';

        for (var i = 1; i <= nbSides; i++)
            pointsSTR = pointsSTR + ' L' + $radius*Math.cos(i*stepTheta) + ',' + $radius*Math.sin(i*stepTheta);
    
        pointsSTR = pointsSTR + ' Z';

        var objectCode = '<path d="' + pointsSTR + '" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
		var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
			//var object = new GLDisc(radius, 360.0, parseInt(10*radius)+1, nbSides);
			var object = new GLDisc(radius, 360.0, 2, nbSides);
			object.setVertexShaderName('vertex-normals');
			object.setFragmentShaderName('fragment-modeling');
			glObject = object;
            $this.setGlObject(glObject);
        }

        return $this['super'].compute3D(glObject.getInstance());
    };

    this.clone = function()
	{
		var clone = new Circle(radius);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getRadius = function() { return radius; };

	// SET
	
    this.setRadius = function($radius)
    {
        radius = $radius;

        if (!utils.isset(radius))
            radius = 1.0;
    };

    this.radius = function($radius) { $this.setRadius($radius); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("regularPolygon");