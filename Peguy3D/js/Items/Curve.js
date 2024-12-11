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
        var svgObject = $this.computeSVG();
        return svgObject.samplePoints($n);
    };

    this.samplePointsWithProperties = function($n)
    {
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