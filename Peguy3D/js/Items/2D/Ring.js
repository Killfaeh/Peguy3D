function Ring($radius1, $radius2)
{
	///////////////
	// Attributs //
	///////////////

    var radius1 = $radius1;
    var radius2 = $radius2;
    var angle = 360.0;

    if (!utils.isset(radius1))
        radius1 = 0.5;

	var radius2 = $radius2;

    if (!utils.isset(radius2))
        radius2 = 1.0;

	var curve = new Path([]);

	//////////////
	// Méthodes //
	//////////////

	var updatePath = function()
    {
		curve.setOperations([]);

		var minRadius = Math.min(radius1, radius2);
		var maxRadius = Math.max(radius1, radius2);

		if (angle < 360.0)
		{
			var radAngle = angle/180.0*Math.PI;
			var innerEndX = minRadius*Math.cos(radAngle);
			var innerEndY = minRadius*Math.sin(radAngle);
			var outerEndX = maxRadius*Math.cos(radAngle);
			var outerEndY = maxRadius*Math.sin(radAngle);
			var innerFlag2 = 0;
			var outerFlag2 = 0;

			if (angle > 180.0)
			{
				innerFlag2 = 1;
				outerFlag2 = 1;
			}

			curve.moveTo([maxRadius, 0.0]);
			curve.arc([maxRadius, maxRadius], 0, outerFlag2, 0, [outerEndX, outerEndY]);
			curve.lineTo([innerEndX, innerEndY]);
			curve.arc([minRadius, minRadius], 0, innerFlag2, 0, [minRadius, 0.0]);
			curve.close();
		}
		else
		{
			curve.moveTo([maxRadius, 0.0]);
			curve.arc([maxRadius, maxRadius], 0, 0, 0, [-maxRadius, 0.0]);
			curve.arc([maxRadius, maxRadius], 0, 0, 1, [maxRadius, 0.0]);
			curve.moveTo([minRadius, 0.0]);
			curve.arc([minRadius, minRadius], 0, 0, 0, [-minRadius, 0.0]);
			curve.arc([minRadius, minRadius], 0, 0, 1, [minRadius, 0.0]);
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
			var object = new GLRing(radius1, radius2, angle, Doc.resolution);
			object.setVertexShaderName('vertex-normals');
			object.setFragmentShaderName('fragment-modeling');
			glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new Ring(radius1, radius2, angle);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getRadius1 = function() { return radius1; };
	this.getRadius2 = function() { return radius2; };
	this.getAngle = function() { return angle; };

	// SET
	
    this.setRadius1 = function($radius1)
    {
        radius1 = $radius1;

		if (!utils.isset(radius1))
			radius1 = 0.5;
    };

	this.setRadius2 = function($radius2)
    {
        radius2 = $radius2;

		if (!utils.isset(radius2))
			radius2 = 1.0;
    };

	this.setRadius = function($radius1, $radius2)
    {
        radius1 = $radius1;
        radius2 = $radius2;
    
        if (!utils.isset(radius1))
			radius1 = 0.5;
        
        if (!utils.isset(radius2))
			radius2 = 1.0;

        updatePath();
    };

    this.radius = function($radius1, $radius2)
	{
		if (utils.isset($radius1) && utils.isset($radius2))
			$this.setRadius($radius1, $radius2);

		return [radius1, radius2];
	};

	this.setAngle = function($angle)
    {
        angle = $angle;

		if (!utils.isset(angle))
			angle = 360.0;
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
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("ring");