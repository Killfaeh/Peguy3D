function PipeFromCurve($points, $profile, $width)
{
	///////////////
	// Attributs //
	///////////////

    var points = $points;

    if (!utils.isset(points))
        points = [];

    console.log("CONSTRUCT");
    console.log(points);

    if (!Array.isArray(points) && utils.isset(points.samplePointsWithProperties))
    {
		points = points.samplePointsWithProperties();
        console.log("PATH");
        console.log(points);
    }

    var profile = $profile;

    if (!utils.isset(profile))
        profile = [];

    if (!Array.isArray(profile) && utils.isset(profile.samplePoints))
		profile = profile.samplePoints();

    //*
    var width = $width;

    if (!utils.isset(width))
		width = 1.0;

	if (utils.isset(width) && !Array.isArray(width) && !utils.isset(width.samplePoints))
    {
		width = Math.abs(width);

        if (width > 1.0)
            width = 1.0;
    }
	else if (Array.isArray(width))
	{
		if (width.length < points.length)
        {
            var lastWidth = width[width.length-1];

            for (var i = width.length; i < points.length; i++)
                width.push(lastWidth);
        }
	}
    else if (utils.isset(width.samplePoints))
    {
        var samples = width.samplePoints(points.length);
        width = [];

        for (var i = 0; i < samples.length; i++)
            width.push(samples[i][1]);
    }
    //*/

    var curve = new Path([]);

	//////////////
	// Méthodes //
	//////////////

    var updatePath = function()
    {
        curve.setOperations([]);

        for (var i = 0; i < points.length; i++)
        {
            if (i === 0)
                curve.moveTo([points[i][0], points[i][1]]);
            else 
                curve.lineTo([points[i][0], points[i][1]]);
        }

        //curve.close();
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
            var object = new GLPipeFromCurve(points, profile, width);
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this.computeTransforms(glObject);
    };

    /*
    this.addPoint = function($x, $y)
    {
        points.push([$x, $y]);
        updatePath();
    };

    this.loadFromAsset = function($assetId, $nodeId)
    {
        var path = new Path();
		path.loadFromAsset($assetId, $nodeId);
		points = path.samplePoints();
        updatePath();
    };
    //*/

    this.clone = function()
	{
		var clone = new Polygon(points);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getPoints = function() { return points; };

	// SET
	
    this.setPoints = function($points)
    {
        points = $points;
        updatePath();
    };

    this.points = function($points) { $this.setPoints($points); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
    updatePath();
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("pipeFromCurve");