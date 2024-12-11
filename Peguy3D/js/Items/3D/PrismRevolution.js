
//function PrismRevolution($verticesList, $angle, $align, $resolution, $smoothTheta)
function PrismRevolution($verticesList, $resolution, $smoothTheta)
{
	///////////////
	// Attributs //
	///////////////

    var verticesList = $verticesList;
	var angle = 360.0;
	var align = ''; // origine de l'environement, minX, maxX
	var resolution = $resolution;
	var smoothTheta = $smoothTheta;
	
	/*
	if (angle <= 0.0 || angle > 360.0)
		angle = 360.0;
	
	if (!utils.isset(angle))
		angle = 360.0;
	//*/

	/*
	if (!utils.isset(align))
		align = '';
	//*/

	if (resolution < 3)
		resolution = 3;

	if (!utils.isset(resolution))
		resolution = 32;

	if (smoothTheta <= 0.0 || smoothTheta > 180.0)
		smoothTheta = 180.0;

	if (!utils.isset(smoothTheta))
		smoothTheta = 30.0;

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        var objectCode = '<circle cx="0" cy="0" r="1.0" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
			var minX = Number.MAX_SAFE_INTEGER;
			var maxX = Number.MIN_SAFE_INTEGER;
			var minZ = Number.MAX_SAFE_INTEGER;
			var maxZ = Number.MIN_SAFE_INTEGER;

			for (var i = 0; i < verticesList.length; i++)
			{
				if (Math.abs(verticesList[i][0]) < minX)
					minX = verticesList[i][0];
					
				if (Math.abs(verticesList[i][0]) > maxX)
					maxX = Math.abs(verticesList[i][0]);
				
				if (Math.abs(verticesList[i][1]) < minZ)
					minZ = verticesList[i][1];
				
				if (Math.abs(verticesList[i][1]) > maxZ)
					maxZ = verticesList[i][1];
			}
			
			var deltaX = maxX - minX;
			var deltaZ = maxZ - minZ;

			var offsetX = 0.0;

			if (align === 'left')
				offsetX = minX;
			else if (align === 'right')
				offsetX = maxX;

			var glVertices = [];

			console.log("Offset : " + offsetX);
			
			for (var i = 0; i < verticesList.length; i++)
			{
				if (align === 'right')
					glVertices.push({ x: offsetX-verticesList[i][0], y: 0.0, z: verticesList[i][1], smoothZ: false });
				else
					glVertices.push({ x: verticesList[i][0]-offsetX, y: 0.0, z: verticesList[i][1], smoothZ: false });
			}

			console.log(glVertices);

            var object = new GLPrismRevolution(glVertices, angle, smoothTheta, resolution, true, true);
            object.setVertexShaderName('vertex-material');
            object.setFragmentShaderName('fragment-material');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this['super'].compute3D(glObject.getInstance());
    };

    this.clone = function()
	{
		var clone = new Revolution(verticesList, angle, smoothTheta);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	this.loadFromAsset = function($assetId, $nodeId)
    {
        var path = new Path();
		path.loadFromAsset($assetId, $nodeId);
		verticesList = path.samplePoints();

		/*
		var glPointsList = [];

    	for (var i = 0; i < verticesList.length; i++)
        	glPointsList.push({x: verticesList[i][0], y: verticesList[i][1]});
		//*/

		//console.log("LOAD ASSET");
		//console.log(glPointsList);

		/*
		var polygon = new MathPolygon(glPointsList);
		var centroid = polygon.getCentroid();
		var maxRadius = polygon.getMaxRadius();
		//*/

		//console.log("Max radius : " + maxRadius);

		/*
		prism.emptyTransformations();
		prism.setRadius1(maxRadius);
		prism.setRadius2(maxRadius);
		prism.setVerticesList(verticesList);
		prism.add(new Translation(centroid.x, centroid.y, 0.0));
		//*/
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getAngle = function() { return angle; };
	this.getSmoothTheta = function() { return smoothTheta; };

	// SET

	this.setAngle = function($angle)
    {
        angle = $angle;

		if (!utils.isset(angle))
			angle = 360.0;
    };

	this.setSmoothTheta = function($smoothTheta)
    {
        smoothTheta = $smoothTheta;

		if (!utils.isset(smoothTheta))
			smoothTheta = 30.0;
    };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("prismRevolution");