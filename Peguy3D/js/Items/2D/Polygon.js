function Polygon($points, $axis)
{
	///////////////
	// Attributs //
	///////////////

    var points = $points;
    var axis = $axis;

    if (!utils.isset(points))
        points = [];

    //*
    if (!Array.isArray(points) && utils.isset(points.samplePoints))
		points = points.samplePoints();
    //*/

    if (!utils.isset(axis))
        axis = 'z';

    var curve = new Path([]);

	//////////////
	// Méthodes //
	//////////////

    var updatePath = function()
    {
        curve.setOperations([]);

        for (var i = 0; i < points.length; i++)
        {
            if (axis === 'x')
            {
                if (i === 0)
                    curve.moveTo([0.0, points[i][0], points[i][1]]);
                else 
                    curve.lineTo([0.0, points[i][0], points[i][1]]);
            }
            else if (axis === 'y')
            {
                if (i === 0)
                    curve.moveTo([points[i][0], 0.0, points[i][1]]);
                else 
                    curve.lineTo([points[i][0], 0.0, points[i][1]]);
            }
            else
            {
                if (i === 0)
                    curve.moveTo([points[i][0], points[i][1], 0.0]);
                else 
                    curve.lineTo([points[i][0], points[i][1], 0.0]);
            }
        }

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
            var object = new GLPolygon(points, axis, false);
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this.computeTransforms(glObject);
    };

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

        if (!utils.isset(points))
            points = [];

        updatePath();
    };

    this.points = function($points)
    {
        if (utils.isset($points))
            $this.setPoints($points);

        return points;
    };

    this.setAxis = function($axis)
    {
        axis = $axis;

        if (!utils.isset(axis))
            axis = 'z';

        updatePath();
    };

    this.axis = function($axis)
    {
        if (utils.isset($axis))
            $this.setAxis($axis);

        return axis;
    };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
    updatePath();
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("polygon");