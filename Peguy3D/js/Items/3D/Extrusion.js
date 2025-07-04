function Extrusion($verticesList, $height, $axis)
{
	///////////////
	// Attributs //
	///////////////

    var height = $height;
	var verticesList = $verticesList;
	var axis = $axis;

	if (!utils.isset(verticesList))
		verticesList = [];

	//*
	if (!Array.isArray(verticesList) && utils.isset(verticesList.samplePoints))
		verticesList = verticesList.samplePoints();
	//*/

	if (!utils.isset(height))
		height = 2.0;

	var polygon = new MathPolygon(verticesList);
	var centroid = polygon.getCentroid();
	var maxRadius = polygon.getMaxRadius();

	//var prism = new PrismFromPolygon(null, null, height, 0.0, 0.0, verticesList, true, true, axis);
	var prism = new PrismFromPolygon(verticesList, height, axis);
	//prism.add(new Translation(centroid.x, centroid.y, 0.0));

	//////////////
	// Méthodes //
	//////////////

    this.clone = function()
	{
		var clone = new Extrusion(verticesList, height);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	this.loadFromAsset = function($assetId, $nodeId)
    {
        var path = new Path();
		path.loadFromAsset($assetId, $nodeId);
		verticesList = path.samplePoints();
		var polygon = new MathPolygon(verticesList);
		var centroid = polygon.getCentroid();
		var maxRadius = polygon.getMaxRadius();

		//console.log("Max radius : " + maxRadius);

		prism.emptyTransformations();
		//prism.setRadius1(maxRadius);
		//prism.setRadius2(maxRadius);
		prism.setVerticesList(verticesList);
		//prism.add(new Translation(centroid.x, centroid.y, 0.0));
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
	
	var $this = utils.extend(prism, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("extrusion");