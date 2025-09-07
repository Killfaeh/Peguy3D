function Collection($elementsList)
{
	///////////////
	// Attributs //
	///////////////

    var elementsList = $elementsList;

    if (!utils.isset(elementsList))
        elementsList = [];

	var weights = [];
	var random = false;
	var seed = 0;

	//////////////
	// Méthodes //
	//////////////

	var genRandom = function($i)
	{
		var result = 0.0;

		if (random !== 0.0)
		{
			if (seed > 0)
			{
				result = (2.0*Math.scie(seed + 1000*$i)+1.0) * 10000.0;
				result = (2.0*Math.sin(seed + 1000*$i)+1.0) * 10000.0;
				result = result - Math.floor(result);

				//var t = seed + 1654.0*$i;
				//result = t%Math.PI;
				//result = Math.abs(result/Math.PI);

				console.log("Gen random : " + seed + ', ' + $i + ', ' + result);
			}
			else
				result = Math.random();
		}

		return result;
	};

	var pick = function($n)
	{
		var element = elementsList[$n%elementsList.length];

		var totalWeights = 0;
		var extendedList = [];

		for (var i = 0; i < weights.length; i++)
		{
			totalWeights = totalWeights + weights[i];

			if (utils.isset(elementsList[i]))
			{
				for (var j = 0; j < weights[i]; j++)
					extendedList.push(elementsList[i]);
			}
		}

		if (random === true)
		{
			if (totalWeights > 0)
				element = extendedList[Math.floor(extendedList.length*genRandom($n))];
			else
				element = elementsList[Math.floor(elementsList.length*genRandom($n))];
		}
		else if (totalWeights > 0)
			element = extendedList[$n%extendedList.length];

		return element;
	};

	this.instancesToPoints = function($points, $align)
    {
        var points = $points;

        if (!utils.isset(points))
    		points = [];

        if (!Array.isArray(points))
		{
			if (utils.isset(points.samplePointsWithProperties))
				points = points.samplePointsWithProperties();
			else if (utils.isset(points.samplePoints))
				points = points.samplePoints();
            else if (utils.isset(points.data))
				points = points.data();
		}

        var instancesList = [];

        for (var i = 0; i < points.length; i++)
        {
			var element = pick(i);

			if (utils.isset(element))
			{
				var instance = new Instance(element);

				if (utils.isset(points[i].point))
				{
					instance.add(new Translation(points[i].point[0], points[i].point[1], points[i].point[2]));

					if ($align === true)
					{
						var zAxis = points[i].tangent;
						var xAxis = points[i].normal;
						var yAxis = Vectors.crossProduct((new Vector(zAxis)).normalize(), (new Vector(xAxis)).normalize()).normalize().values();

						instance.add(new Align([xAxis, yAxis, zAxis]));
					}
				}
				else
					instance.add(new Translation(points[i][0], points[i][1], points[i][2]));

				instancesList.push(instance);
			}
        }

        return instancesList;
    };

	this.add = function($input)
    {
        if (Array.isArray($input))
        {
            for (var i = 0; i < $input.length; i++)
                $this.add($input[i]);
        }
        else
        {
            var type = $input.getType();

            if (type === 'object')
                elementsList.push($input);
        }
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET

	this.getElements = function() { return elementsList; };
	this.getWeights = function() { return weights; };
	this.getRandom = function() { return random; };
	this.getSeed = function() { return seed; };

	// SET

	this.setElements = function($elementsList)
	{
		elementsList = $elementsList;

		if (!utils.isset(elementsList))
			elementsList = [];
	};

	this.setWeights = function($weights)
	{
		weights = $weights;

		if (!utils.isset(weights))
			weights = [];
	};

	this.setRandom = function($random) { random = $random; };
	this.setSeed = function($seed) { seed = $seed; };

	this.elements = function($elementsList)
	{
		if (utils.isset($elementsList))
			this.setElements($elementsList);

		return elementsList;
	};

	this.weights = function($weights)
	{
		if (utils.isset($weights))
			this.setWeights($weights);

		return weights;
	};

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

	//////////////
	// Héritage //
	//////////////
	
	var $this = this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("collection");