function GridPattern($widthX, $widthY, $widthZ, $nX, $nY, $nZ, $staggered)
{
	///////////////
	// Attributs //
	///////////////

	var pattern = new PointsPattern();

	var widthX = $widthX;
	var widthY = $widthY;
	var widthZ = $widthZ;
	var nX = $nX;
	var nY = $nY;
	var nZ = $nZ;
	var staggered = $staggered;

	if (!utils.isset(widthX) || widthX < 0.0)
		widthX = 0.0;

	if (!utils.isset(widthY) || widthY < 0.0)
		widthY = 0.0;

	if (!utils.isset(widthZ) || widthZ < 0.0)
		widthZ = 0.0;

	if (!utils.isset(nX) || nX <= 0)
		nX = 1;

	if (!utils.isset(nY) || nY <= 0)
		nY = 1;

	if (!utils.isset(nZ) || nZ <= 0)
		nZ = 1;

	if (!utils.isset(staggered))
		staggered = false;

	//////////////
	// Méthodes //
	//////////////

	this.update = function()
	{
		var offsetX = -widthX/2.0;
		var offsetY = -widthY/2.0;
		var offsetZ = -widthZ/2.0;

		var stepX = 0.0;
		var stepY = 0.0;
		var stepZ = 0.0;

		if (nX > 1)
			stepX = widthX/(nX-1);

		if (nY > 1)
			stepY = widthY/(nY-1);

		if (nZ > 1)
			stepZ = widthZ/(nZ-1);

		if (nX === 1)
			offsetX = 0.0;

		if (nY === 1)
			offsetY = 0.0;

		if (nZ === 1)
			offsetZ = 0.0;

		var pointsList = [];

		for (var i = 0; i < nX; i++)
		{
			var x = offsetX + i*stepX;

			for (var j = 0; j < nY; j++)
			{
				var y = offsetY + j*stepY;

				for (var k = 0; k < nZ; k++)
				{
					var z = offsetZ + k*stepZ;
					var tmpX = x;

					if (staggered === true && ((j%2 !== 0 && k%2 === 0) || (j%2 === 0 && k%2 !== 0)))
						tmpX = tmpX + stepX/2.0;

					if ((tmpX <= widthX/2.0 && y <= widthY/2.0 && z <= widthZ/2.0) || pattern.random() !== 0.0)
					{
						var index = pointsList.length;
						pointsList.push([tmpX + pattern.genRandom(index), y + pattern.genRandom(11*index), z + pattern.genRandom(17*index)]);
					}
				}
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
	Loader.hasLoaded("gridPattern");