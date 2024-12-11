function Ellipse($rX, $rY)
{
	///////////////
	// Attributs //
	///////////////

    var rX = $rX;
    var rY = $rY;
    var angle = 360.0;
	var radiusResolution = 10;
	var thetaResolution = 64;

    if (!utils.isset(rX))
        rX = 1.0;
    
    if (!utils.isset(rY))
        rY = 1.0;

    var curve = new Curve();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        //var objectCode = '<ellipse cx="0" cy="0" rx="' + rX + '" ry="' + rY + '" />';
        var objectCode = '<path d="M -' + rX + ' 0 A ' + rX + ' ' + rY + ' 0 0 0 ' + rX + ' 0 A ' + rX + ' ' + rY + ' 0 0 0 -' + rX + ' 0 Z" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

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

        return $this['super'].compute3D(glObject.getInstance());
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
    };

    this.radius = function($rX, $rY) { $this.setRadius($rX, $rY); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("ellipse");