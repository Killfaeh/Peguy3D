function Rect($width, $height)
{
	///////////////
	// Attributs //
	///////////////

    var width = $width;
    var height = $height;

    if (!utils.isset(width))
        width = 1.0;
    
    if (!utils.isset(height))
        height = 1.0;

    var roundX = 0;
    var roundY = 0;

	var curve = new Curve();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        //var objectCode = '<rect x="' + -width/2 + '" y="' + -height/2 + '" width="' + width + '" height="' + height + '" rx="' + roundX + '" ry="' + roundY + '" />';
        var objectCode = '<path d="M -' + (width/2) + ' -' + (height/2) + ' L ' + (width/2) + ' -' + (height/2) + ' L ' + (width/2) + ' ' + (height/2) + ' L -' + (width/2) + ' ' + (height/2)+ ' L -' + (width/2) + ' -' + (height/2) + ' Z" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
            var object = new GLRect(width, height);
            object.setVertexShaderName('vertex-normals');
            object.setFragmentShaderName('fragment-modeling');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this['super'].compute3D(glObject.getInstance());
    };

    this.clone = function()
	{
		var clone = new Rect(width, height);
        clone.setRound(roundX, roundY);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getWidth = function() { return width; };
    this.getHeight = function() { return height; };
    this.getRoundX = function() { return roundX; };
    this.getRoundY = function() { return roundY; };

	// SET
	
    this.setSize = function($width, $height)
    {
        width = $width;
        height = $height;

        if (!utils.isset(width))
            width = 100;
        
        if (!utils.isset(height))
            height = 100;
    };

    this.size = function($width, $height) { $this.setSize($width, $height); };

    this.setRound = function($roundX, $roundY)
    {
        roundX = $roundX;
        roundY = $roundY;
    };

    this.round = function($roundX, $roundY) { $this.setRound($roundX, $roundY); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("rect");