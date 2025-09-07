function FibonacciLatticePattern($radiusX, $radiusY, $radiusZ, $nb)
{
	///////////////
	// Attributs //
	///////////////

	var pattern = new PointsPattern();

	var radiusX = $radiusX;
	var radiusY = $radiusY;
	var radiusZ = $radiusZ;
	var nb = $nb;

	if (!utils.isset(radiusX))
		radiusX = 1.0;

	if (!utils.isset(radiusY))
		radiusY = 1.0;

	if (!utils.isset(radiusZ))
		radiusZ = 1.0;

	if (!utils.isset(nb) || nb < 2)
		nb = 2;

	//////////////
	// Méthodes //
	//////////////

	this.update = function()
	{
		var goldenAngle = Math.PI * (3.0 - Math.sqrt(5.0));

		var pointsList = [];

		for (var i = 0; i < nb; i++)
		{
			var u = i / (nb - 1);
			var r = Math.cbrt(u);

			var z = 1 - 2 * u;
			var rho = Math.sqrt(1 - z * z);

			var theta = i * goldenAngle;

			var x = r * rho * Math.cos(theta);
			var y = r * rho * Math.sin(theta);
			z = -r * z;

			var polar = (new Vector([x, y, z])).normalize().toPolar();
			polar = [1.0, polar.theta + pattern.genRandom(i), polar.phi + pattern.genRandom(11*i)];

			var cartesian = (new Vector(polar)).toCartesian();
			x = cartesian.x;
			y = cartesian.y;
			z = cartesian.z;

			pointsList.push({ point: [radiusX*x, radiusY*y, radiusZ*z],
									tangent: (new Vector([x, y, z])).normalize().values(),
									normal: (new Vector([-y, x, 0])).normalize().values()});
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
	Loader.hasLoaded("fibonacciLatticePattern");