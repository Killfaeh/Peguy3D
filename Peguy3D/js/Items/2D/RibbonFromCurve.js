function RibbonFromCurve($points, $width, $axis, $cornerMode, $cornerAngle)
{
	///////////////
	// Attributs //
	///////////////

    var points = $points;

    if (!utils.isset(points))
        points = [];

    //*
    if (!Array.isArray(points) && utils.isset(points.samplePoints))
		points = points.samplePoints();
    //*/

    var width = Math.abs($width);

	if (!utils.isset(width))
		width = 0.1;

	var axis = $axis;

	if (axis !== 'x' && axis !== 'y' && axis !== 'z')
		axis = 'z';

	var cornerMode = $cornerMode;

	var cornerAngle = $cornerAngle;

	if (!utils.isset(cornerAngle))
		cornerAngle = 0.0;

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
            var object = new GLRibbonFromCurve(points, width, axis, cornerMode, cornerAngle, Math.round(Doc.resolution/2));
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
	Loader.hasLoaded("ribbonFromCurve");