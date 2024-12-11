function Square($size)
{
	///////////////
	// Attributs //
	///////////////

    var size = $size;

    if (!utils.isset(size))
        size = 1.0;

    var round = 0;

	var curve = new Curve();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        //var objectCode = '<rect x="' + -size/2 + '" y="' + -size/2 + '" width="' + size + '" height="' + size + '" rx="' + round + '" ry="' + round + '" />';
        var objectCode = '<path d="M -' + (size/2) + ' -' + (size/2) + ' L ' + (size/2) + ' -' + (size/2) + ' L ' + (size/2) + ' ' + (size/2) + ' L -' + (size/2) + ' ' + (size/2)+ ' L -' + (size/2) + ' -' + (size/2) + ' Z" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
            var object = new GLRect(size, size);
            object.setVertexShaderName('vertex-normals');
            object.setFragmentShaderName('fragment-modeling');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this['super'].compute3D(glObject.getInstance());
    };

    this.clone = function()
	{
		var clone = new Square(size);
        clone.setRound(roundX);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getSize = function() { return size; };
    this.getRound = function() { return round; };

	// SET
	
    this.setSize = function($size)
    {
        size = $size;

        if (!utils.isset(size))
            size = 100;
    };

    this.size = function($size) { $this.setSize($size); };

    this.setRound = function($round)
    {
        round = $round;
    };

    this.round = function($round) { $this.setRound($round); };

    this.clone = function()
	{
		var clone = Square(size);
		clone.setTransformList(clone.getTransformList());
        clone.fill(clone.getFillColor());
        clone.round(round);
        clone.border(clone.getBorderColor(), clone.getBorderWidth());
		return clone;
	};

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("square");