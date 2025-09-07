function Polyline($points)
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
                curve.moveTo([points[i][0], points[i][1], points[i][2]]);
            else 
                curve.lineTo([points[i][0], points[i][1], points[i][2]]);
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
            var glPointsList = [];

            for (var i = 0; i < points.length; i++)
                glPointsList.push({x: points[i][0], y: points[i][1], z: points[i][2]});

            var object = new GLPolyline(glPointsList);
            object.setVertexShaderName('vertex-normals');
            object.setFragmentShaderName('fragment-modeling');
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
        // Construire la liste d'opérations depuis un asset
        updatePath();
    };

    this.clone = function()
	{
		var clone = new Polyline(points);
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
	Loader.hasLoaded("polyline");