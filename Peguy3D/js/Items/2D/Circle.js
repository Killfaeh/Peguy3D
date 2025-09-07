function Circle($radius)
{
	///////////////
	// Attributs //
	///////////////

    var radius = $radius;
	var angle = 360.0;
	var radiusResolution = 10;
	var thetaResolution = Doc.resolution;
	
	if (!utils.isset(radius))
        radius = 1.0;
	else if (radius <= 0.0)
		radius = 0.000001;

	var curve = new Path([]);

	//////////////
	// Méthodes //
	//////////////

	var updatePath = function()
    {
		curve.setOperations([]);

		if (angle < 360.0)
		{
			var radAngle = angle/180.0*Math.PI;
			var endX = radius*Math.cos(radAngle);
			var endY = radius*Math.sin(radAngle);
			var flag2 = 0;
			var flag3 = 0;

			if (angle > 180.0)
				flag2 = 1;

			curve.moveTo([radius, 0.0]);
			curve.arc([radius, radius], 0, flag2, flag3, [endX, endY]);
			curve.lineTo([0.0, 0.0]);
			curve.close();
		}
		else
		{
			curve.moveTo([radius, 0.0]);
			curve.arc([radius, radius], 0, 0, 0, [-radius, 0.0]);
			curve.arc([radius, radius], 0, 0, 1, [radius, 0.0]);
			//curve.close();
		}
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
			//var object = new GLDisc(radius, 360.0, parseInt(10*radius)+1, 64);
			var object = new GLDisc(radius, angle, radiusResolution, thetaResolution);
			object.setVertexShaderName('vertex-normals');
			object.setFragmentShaderName('fragment-modeling');
			glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.computeTransforms(glObject);
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
	this.getAngle = function() { return angle; };

	// SET
	
    this.setRadius = function($radius)
    {
        radius = $radius;

        if (!utils.isset(radius))
            radius = 1.0;

		updatePath();
    };

    this.radius = function($radius)
	{
		if (utils.isset($radius))
			$this.setRadius($radius);

		return radius;
	};

	this.setAngle = function($angle)
    {
        angle = $angle;

        if (!utils.isset(angle))
            angle = 360.0;

		updatePath();
    };

    this.angle = function($angle)
	{
		if (utils.isset($angle))
			$this.setAngle($angle);

		return angle;
	};

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	updatePath();
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("circle");