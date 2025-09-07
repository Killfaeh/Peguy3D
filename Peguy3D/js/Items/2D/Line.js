function Line($start, $end)
{
	///////////////
	// Attributs //
	///////////////

    var start = $start;
    var end = $end;

	var curve = new Path([]);

	//////////////
	// Méthodes //
	//////////////

	var updatePath = function()
    {
		curve.setOperations([]);
		curve.moveTo(start);
		curve.lineTo(end);
    };

	this.computeSVG = function computeSVG()
    {
        updatePath();
        var svgObject = $this.execSuper('computeSVG', [], computeSVG);
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

        //return $this['super'].compute3D(glObject.getInstance());
        //return $this.execSuper('compute3D', [glObject.getInstance()], compute3D);
        return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new Line(x1, y1, z1, x2, y2, z2);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

    this.borderToPath = function($width)
    {
        return new Path([]);
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
    /*
	this.getX1 = function() { return x1; };
    this.getY1 = function() { return y1; };
    this.getZ1 = function() { return z1; };
    this.getX2 = function() { return x2; };
    this.getY2 = function() { return y2; };
    this.getZ2 = function() { return z2; };
    //*/

	// SET
	
    /*
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
    //*/

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("line");