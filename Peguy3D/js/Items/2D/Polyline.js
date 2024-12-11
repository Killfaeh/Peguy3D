function Polyline($points)
{
	///////////////
	// Attributs //
	///////////////

    var points = $points;

    if (!utils.isset(points))
        points = [];

    var curve = new Curve();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        /*
        var pointsSTR = '';

        for (var i = 0; i < points.length; i++)
        {
            if (i > 0)
                pointsSTR = pointsSTR + ' ';

            pointsSTR = pointsSTR + points[i][0] + ',' + points[i][1];
        }

        var objectCode = '<polyline points="' + pointsSTR + '" />';
        //*/

        var pointsSTR = '';

        if (points.length > 0)
        {
            pointsSTR = 'M ' + points[0][0] + ',' + points[0][1];

            for (var i = 1; i < points.length; i++)
                pointsSTR = pointsSTR + ' L' + points[i][0] + ',' + points[i][1];
            
            pointsSTR = pointsSTR + ' ';
        }

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
            var glPointsList = [];

            for (var i = 0; i < points.length; i++)
                glPointsList.push({x: points[i][0], y: points[i][1], z: points[i][2]});

            var object = new GLPolyline(glPointsList);
            object.setVertexShaderName('vertex-normals');
            object.setFragmentShaderName('fragment-modeling');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this['super'].compute3D(glObject.getInstance());
    };

    this.addPoint = function($x, $y)
    {
        points.push([$x, $y]);
    };

    this.loadFromAsset = function($assetId, $nodeId)
    {
        // Construire la liste d'opérations depuis un asset
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
    };

    this.points = function($points) { $this.setPoints($points); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("polyline");