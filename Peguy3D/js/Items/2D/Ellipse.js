function Ellipse($rX, $rY)
{
	///////////////
	// Attributs //
	///////////////

    var rX = $rX;
    var rY = $rY;
    var angle = 360.0;
	var radiusResolution = 10;
	var thetaResolution = Doc.resolution;

    if (!utils.isset(rX))
        rX = 1.0;
    
    if (!utils.isset(rY))
        rY = 1.0;

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
            var endX = rX*Math.cos(radAngle);
            var endY = rY*Math.sin(radAngle);
            var flag2 = 0;
            var flag3 = 0;

            if (angle > 180.0)
                flag2 = 1;

            curve.moveTo([rX, 0.0]);
            curve.arc([rX, rY], 0, flag2, flag3, [endX, endY]);
            curve.lineTo([0.0, 0.0]);
            curve.close();
		}
        else
        {
			curve.moveTo([rX, 0.0]);
			curve.arc([rX, rY], 0, 0, 0, [-rX, 0.0]);
			curve.arc([rX, rY], 0, 0, 1, [rX, 0.0]);
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
            //var object = new GLDisc(1.0, 360.0, parseInt(10*Math.max(rX, rY))+1, 64);
            var object = new GLDisc(1.0, angle, radiusResolution, thetaResolution);
            object.setScaleX(rX);
            object.setScaleY(rY);
            object.setVertexShaderName('vertex-normals');
            object.setFragmentShaderName('fragment-modeling');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new Ellipse(rx, ry);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getRadiusX = function() { return rX; };
    this.getRadiusY = function() { return rY; };

	// SET
	
    this.setRadius = function($rX, $rY)
    {
        rX = $rX;
        rY = $rY;
    
        if (!utils.isset(rX))
            rX = 1.0;
        
        if (!utils.isset(rY))
            rY = 1.0;

        updatePath();
    };

    this.radius = function($rX, $rY)
	{
		if (utils.isset($rX) && utils.isset($rY))
			$this.setRadius($rX, $rY);

		return [rX, rY];
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
	Loader.hasLoaded("ellipse");