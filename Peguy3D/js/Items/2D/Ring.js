function Ring($radius1, $radius2, $angle)
{
	///////////////
	// Attributs //
	///////////////

    var radius1 = $radius1;
    var radius2 = $radius2;
    var angle = $angle;

    if (!utils.isset(radius1))
        radius1 = 0.5;

	var radius2 = $radius2;

    if (!utils.isset(radius2))
        radius2 = 1.0;

	if (!utils.isset(angle))
		angle = 360.0;

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
		var radius = Math.max(radius1, radius2);
		
        //var objectCode = '<circle cx="0" cy="0" r="' + radius + '" />';
		var objectCode = '<path d="M -' + radius + ' 0 A ' + radius + ' ' + radius + ' 0 0 0 ' + radius + ' 0 A ' + radius + ' ' + radius + ' 0 0 0 -' + radius + ' 0 Z" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
		var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
			var object = new GLRing(radius1, radius2, angle, Doc.resolution);
			object.setVertexShaderName('vertex-normals');
			object.setFragmentShaderName('fragment-modeling');
			glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new Ring(radius1, radius2, angle);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getRadius1 = function() { return radius1; };
	this.getRadius2 = function() { return radius2; };
	this.getAngle = function() { return angle; };

	// SET
	
    this.setRadius1 = function($radius1)
    {
        radius1 = $radius1;

		if (!utils.isset(radius1))
			radius1 = 0.5;
    };

	this.setRadius2 = function($radius2)
    {
        radius2 = $radius2;

		if (!utils.isset(radius2))
			radius2 = 1.0;
    };

	this.setAngle = function($angle)
    {
        angle = $angle;

		if (!utils.isset(angle))
			angle = 360.0;
    };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("ring");