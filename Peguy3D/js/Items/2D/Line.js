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


    this.samplePoints = function($n)
    {
        var svgObject = $this.computeSVG();

        if (!utils.isset($n) || $n < 2)
        {
            var pointsList = [];
            pointsList.push(svgObject.pointAtLength(0.0));
            pointsList.push(svgObject.pointAtLength(1.0));
            return pointsList;
        }
        else
            return svgObject.samplePoints($n);
    };

    this.samplePointsWithProperties = function($n)
    {
        var svgObject = $this.computeSVG();

        if (!utils.isset($n) || $n < 2)
        {
            var pointsList = [];
            var vertex1 = svgObject.pointAtLength(0.0);
            var vertex2 = svgObject.pointAtLength(1.0);
            var tangent = (new Vector([vertex2[0]-vertex1[0], vertex2[1]-vertex1[1]])).normalize();
            var normal = [tangent.values()[1], -tangent.values()[0]];
            pointsList.push({point: vertex1, tangent: tangent, normal: normal, smooth: false});
            pointsList.push({point: vertex2, tangent: tangent, normal: normal, smooth: false});
            return pointsList;
        }
        else
            return svgObject.samplePointsForWebGL($n);
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