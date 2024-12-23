function Circle($radius)
{
	///////////////
	// Attributs //
	///////////////

    var radius = $radius;
	var angle = 360.0;
	var radiusResolution = 10;
	var thetaResolution = 64;
	
	if (!utils.isset(radius))
        radius = 1.0;
	else if (radius <= 0.0)
		radius = 0.000001;

	var curve = new Curve();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        //var objectCode = '<circle cx="0" cy="0" r="' + radius + '" />';
		var objectCode = '<path d="M -' + radius + ' 0 A ' + radius + ' ' + radius + ' 0 0 0 ' + radius + ' 0 A ' + radius + ' ' + radius + ' 0 0 0 -' + radius + ' 0 Z" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
		var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
			//var object = new GLDisc(radius, 360.0, parseInt(10*radius)+1, 64);
			var object = new GLDisc(radius, angle, radiusResolution, thetaResolution);
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
	Loader.hasLoaded("circle");