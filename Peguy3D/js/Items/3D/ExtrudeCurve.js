function ExtrudeCurve($verticesList, $height, $width, $axis, $cornerMode, $cornerAngle)
{
	///////////////
	// Attributs //
	///////////////

    var radius1 = null;
    var radius2 = null;
    var height = $height;
    var width = $width;
    var deltaX = 0.0;
    var deltaY = 0.0;
	var verticesList = $verticesList;
    var bottomClosed = true;
    var topClosed = true;
	var axis = $axis;
	var cornerMode = $cornerMode;
	var cornerAngle = $cornerAngle;

	if (!utils.isset(height))
		height = 2.0;

	var width = Math.abs($width);

	if (!utils.isset(width))
		width = 0.1;

	if (!utils.isset(verticesList))
		verticesList = [];

	//*
	if (!Array.isArray(verticesList) && utils.isset(verticesList.samplePoints))
		verticesList = verticesList.samplePoints();
	//*/

	if (axis !== 'x' && axis !== 'y' && axis !== 'z')
		axis = 'z';

	// 0: On laisse l'angle naturel
	// 1: Mode biseauté
	// 2: Mode arrondi
	var cornerMode = $cornerMode;

	var cornerAngle = $cornerAngle;

	if (!utils.isset(cornerAngle))
		cornerAngle = 0.0;

	if (cornerAngle >= 180.0)
		cornerAngle = 180.0-PEGUY.glPrecision;

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

	// A retoucher
	this.computeSVG = function()
    {
        var pointsSTR = '';

        if (verticesList.length > 0)
        {
            pointsSTR = 'M ' + verticesList[0][0] + ',' + verticesList[0][1];

            for (var i = 1; i < verticesList.length; i++)
                pointsSTR = pointsSTR + ' L' + verticesList[i][0] + ',' + verticesList[i][1];
            
            pointsSTR = pointsSTR + ' Z';
        }

        var objectCode = '<path d="' + pointsSTR + '" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

	this.compute3D = function()
    {
		console.log("POUET ! 1");

        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
			var heightResolution = 2;
            var object = new GLPrismFromCurve(radius1, radius2, width, height, deltaX, deltaY, verticesList, heightResolution, bottomClosed, topClosed, 0, axis, cornerMode, cornerAngle, Math.round(Doc.resolution/2));
			//object.debug();
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new ExtrudeCurve(verticesList, height, width, axis, cornerMode, cornerAngle);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	this.loadFromAsset = function($assetId, $nodeId)
    {
        var path = new Path();
		path.loadFromAsset($assetId, $nodeId);
		verticesList = path.samplePoints();
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET

	// SET

	this.setDeltaX = function($deltaX) {};
	this.setDeltaY = function($deltaY) {};
	this.setBottomClosed = function($bottomClosed) {};
	this.setTopClosed = function($topClosed) {};

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("extrudeCurve");