function Line($x1, $y1, $z1, $x2, $y2, $z2)
{
	///////////////
	// Attributs //
	///////////////

    var x1 = $x1;
    var y1 = $y1;
    var z1 = $z1;
    var x2 = $x2;
    var y2 = $y2;
    var z2 = $z2;

	var curve = new Curve();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        //var objectCode = '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" />';
        var objectCode = '<path d="M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2 + '" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
            var object = new GLLine(x1, y1, z1, x2, y2, z2);
            object.setVertexShaderName('vertex-normals');
            object.setFragmentShaderName('fragment-modeling');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this['super'].compute3D(glObject.getInstance());
    };

    this.clone = function()
	{
		var clone = new Line(x1, y1, z1, x2, y2, z2);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getX1 = function() { return x1; };
    this.getY1 = function() { return y1; };
    this.getZ1 = function() { return z1; };
    this.getX2 = function() { return x2; };
    this.getY2 = function() { return y2; };
    this.getZ2 = function() { return z2; };

	// SET
	
    this.setPosition = function($x1, $y1, $z1, $x2, $y2, $z2)
    {
        x1 = $x1;
        y1 = $y1;
        z1 = $z1;
        x2 = $x2;
        y2 = $y2;
        z2 = $z2;
    };

    this.position = function($x1, $y1, $z1, $x2, $y2, $z2) { $this.setPosition($x1, $y1, $z1, $x2, $y2, $z2); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("line");