function FibonacciPattern($radius, $nb)
{
	///////////////
	// Attributs //
	///////////////

	var pattern = new PointsPattern();

	var radius = $radius;
	var nb = $nb;

	if (!utils.isset(radius))
		radius = 1.0;

	if (!utils.isset(nb) || nb < 2)
		nb = 2;

	//////////////
	// Méthodes //
	//////////////

	this.update = function()
	{
		var goldenAngle = Math.PI * (3.0 - Math.sqrt(5.0));
		var is3D = false;

		if (Array.isArray(radius) && radius.length === 3)
			is3D = true;

		var pointsList = [];

		if (is3D === true)
		{
			var radiusX = radius[0];
			var radiusY = radius[1];
			var radiusZ = radius[2];

			for (var i = 0; i < nb; i++)
			{
				var z = 1 - (2 * i) / (nb - 1);
				var r = Math.sqrt(1 - z * z);
				var theta = i * goldenAngle;
				var x = Math.cos(theta) * r;
				var y = Math.sin(theta) * r;

				var polar = (new Vector([x, y, z])).normalize().toPolar();
				polar = [1.0, polar.theta + pattern.genRandom(i), polar.phi + pattern.genRandom(11*i)];

				var cartesian = (new Vector(polar)).toCartesian();
				x = cartesian.x;
				y = cartesian.y;
				z = cartesian.z;

				pointsList.push({ point: [radiusX*x, radiusY*y, radiusZ*z],
									tangent: (new Vector([radiusX*x, radiusY*y, radiusZ*z])).normalize().values(),
									normal: (new Vector([-radiusX*y, radiusY*x, 0])).normalize().values()});
			}
		}
		else
		{
			var maxR = Math.sqrt(nb);

			var radiusX = 1.0;
			var radiusY = 1.0;

			if (Array.isArray(radius))
			{
				radiusX = radius[0];
				radiusY = radius[1];
			}
			else
			{
				radiusX = radius;
				radiusY = radius;
			}

			for (var i = 0; i < nb; i++)
			{
				var theta = i * goldenAngle;
				var rX = radiusX * Math.sqrt(i)/maxR;
				var rY = radiusY * Math.sqrt(i)/maxR;
				var x = rX * Math.cos(theta) + pattern.genRandom(i);
    			var y = rY * Math.sin(theta) + pattern.genRandom(11*i);

				pointsList.push({ point: [x, y, 0.0],
									tangent: (new Vector([x, y, 0.0])).normalize().values(),
									normal: (new Vector([-y, x, 0])).normalize().values()});
			}
		}

		pattern.setPoints(pointsList);

		return pointsList;
	};

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(pattern, this);
	$this.update();
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("fibonacciPattern");