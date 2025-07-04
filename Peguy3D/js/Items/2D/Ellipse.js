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
		curve.moveTo([-rX, 0.0]);
		curve.arc([rX, rY], 0, 0, 0, [rX, 0]);
		curve.arc([rX, rY], 0, 0, 0, [-rX, 0]);
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
	
    this.setRadius = function($rx, $ry)
    {
        rX = $rX;
        rY = $rY;
    
        if (!utils.isset(rX))
            rX = 50;
        
        if (!utils.isset(rY))
            rY = 50;

        updatePath();
    };

    this.radius = function($rX, $rY) { $this.setRadius($rX, $rY); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
    updatePath();
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("ellipse");