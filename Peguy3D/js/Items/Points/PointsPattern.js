function PointsPattern($points)
{
	///////////////
	// Attributs //
	///////////////

	var tmpPoints = $points;

	if (!utils.isset(tmpPoints))
		tmpPoints = [];

	// {point: data[0], tangent: tangent, normal: normal, angle: Math.PI, smooth: false, t: offset/totalLength}

	var points = [];
	var tangents = [];
	var normals = [];
	var angles = [];
	var smoothArray = [];
	var tArray = [];

	var random = 0.0;
	var seed = 0;

	//////////////
	// Méthodes //
	//////////////

	var update = function()
	{
		console.log("Collection tmp points : ");
		console.log(points);

		points = [];
		tangents = [];
		normals = [];
		angles = [];
		smoothArray = [];
		tArray = [];

		if (!Array.isArray(tmpPoints))
		{
			if (utils.isset(tmpPoints.samplePointsWithProperties))
				tmpPoints = tmpPoints.samplePointsWithProperties();
			else if (utils.isset(tmpPoints.samplePoints))
				tmpPoints = tmpPoints.samplePoints();
		}

		for (var i = 0; i < tmpPoints.length; i++)
		{
			var point = [0.0, 0.0, 0.0];
			var tangent = [0.0, 0.0, 1.0];
			var normal = [1.0, 0.0, 0.0];
			var angle = 0.0;
			var smooth = false;
			var t = 0.0;

			if (utils.isset(tmpPoints[i].point))
			{
				point = tmpPoints[i].point;

				if (utils.isset(tmpPoints[i].tangent))
					tangent = tmpPoints[i].tangent;

				if (utils.isset(tmpPoints[i].normal))
					normal = tmpPoints[i].normal;

				if (utils.isset(tmpPoints[i].angle))
					angle = tmpPoints[i].angle;

				if (utils.isset(tmpPoints[i].smooth))
					smooth = tmpPoints[i].smooth;

				if (utils.isset(tmpPoints[i].t))
					t = tmpPoints[i].t;
			}
			else
				point = tmpPoints[i];

			var addToList = true;

			for (var j = 0; j < points.length; j++)
			{
				if (Math.roundToDigit(points[j][0], PEGUY.glPrecision) === Math.roundToDigit(point[0], PEGUY.glPrecision) 
                    && Math.roundToDigit(points[j][1], PEGUY.glPrecision) === Math.roundToDigit(point[1], PEGUY.glPrecision)
                    && Math.roundToDigit(points[j][2], PEGUY.glPrecision) === Math.roundToDigit(point[2], PEGUY.glPrecision))
				{
					addToList = false;
					j = points.length;
				}
			}

			if (addToList === true)
			{
				points.push(point);
				tangents.push(tangent);
				normals.push(normal);
				angles.push(angle);
				smoothArray.push(smooth);
				tArray.push(t);
			}
		}

		console.log("Collection points : ");
		console.log(points);
	};

	this.update = function() { update(); };

	this.genRandom = function($i)
	{
		var result = 0.0;

		if (random !== 0.0)
		{
			if (seed > 0)
			{
				var t = seed + 1654.0*$i;
				result = t%Math.PI;
				result = (result/Math.PI-0.5) * 2.0*random;
			}
			else
				result = 2.0*Math.random()*random - random;
		}

		return result;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET

	this.getPoints = function() { return points; };
	this.getTangents = function() { return tangents; };
	this.getNormals = function() { return normals; };
	this.getAngles = function() { return angles; };
	this.getSmooth = function() { return smoothArray; };
	this.getT = function() { return tArray; };

	this.getData = function()
	{
		var data = [];

		for (var i = 0; i < points.length; i++)
		{
			data.push({
						point: points[i], 
						tangent: tangents[i], 
						normal: normals[i], 
						angle: angles[i], 
						smooth: smoothArray[i], 
						t: tArray[i]
					});
		}

		//console.log("Collection data : ");
		//console.log(data);

		return data;
	};

	this.data = function() { return $this.getData(); };

	this.getRandom = function() { return random; };
	this.getSeed = function() { return seed; };

	// SET

	this.setPoints = function($points)
	{
		tmpPoints = $points;

		if (!utils.isset(tmpPoints))
			tmpPoints = [];

		update();
	};

	/*
	this.setTangents = function($tangents) { tangents = $tangents; };
	this.setNormals = function($normals) { normals = $normals; };
	this.setAngles = function($angles) { angles = $angles; };
	this.setSmooth = function($smoothArray) { smoothArray = $smoothArray; };
	this.setT = function($tArray) { tArray = $tArray; };
	//*/

	this.setRandom = function($random)
	{
		random = $random;
		$this.update();
	};

	this.setSeed = function($seed)
	{
		seed = $seed;
		$this.update();
	};

	this.points = function($points)
	{
		if (utils.isset($points))
			this.setPoints($points);

		return points;
	};

	/*
	this.normals = function($normals)
	{
		if (utils.isset($normals))
			this.setNormals($normals);

		return normals;
	};

	this.angles = function($angles)
	{
		if (utils.isset($angles))
			this.setAngles($angles);

		return angles;
	};

	this.smoothArray = function($smoothArray)
	{
		if (utils.isset($smoothArray))
			this.setSmooth($smoothArray);

		return smoothArray;
	};

	this.t = function($tArray)
	{
		if (utils.isset($tArray))
			this.setT($tArray);

		return tArray;
	};
	//*/

	this.random = function($random)
	{
		if (utils.isset($random))
			this.setRandom($random);

		return random;
	};

	this.seed = function($seed)
	{
		if (utils.isset($seed))
			this.setSeed($seed);

		return seed;
	};

	var $this = this;
	$this.update();
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("pointsPattern");