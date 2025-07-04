function Curve()
{
	///////////////
	// Attributs //
	///////////////

    var type = 'curve';

    var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

    this.borderToPath = function($width)
    {
        return new Path([]);
    };

    // https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement

    this.totalLength = function()
    {
        var svgObject = $this.computeSVG();
        return svgObject.totalLength();
    };

    this.pointAtLength = function($t)
    {
        var svgObject = $this.computeSVG();
        return svgObject.pointAtLength($t);
    };

    this.tangentAtLength = function($t)
    {
        var svgObject = $this.computeSVG();
        return svgObject.tangentAtLength($t);
    };

    this.normalAtLength = function($t)
    {
        var svgObject = $this.computeSVG();
        return svgObject.normalAtLength($t);
    };

    this.samplePoints = function($n)
    {
        if (!utils.isset($n))
            $n = 32;
        
        if ($n < 2)
            $n = 2;

        var svgObject = $this.computeSVG();
        return svgObject.samplePoints($n);
    };

    this.samplePointsWithProperties = function($n)
    {
        if (!utils.isset($n))
            $n = 32;
        
        if ($n < 2)
            $n = 2;
        
        var svgObject = $this.computeSVG();
        return svgObject.samplePointsForWebGL($n);
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
    this.getType = function() { return type; };

	// SET
	
	//////////////
	// Héritage //
	//////////////
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("curve");