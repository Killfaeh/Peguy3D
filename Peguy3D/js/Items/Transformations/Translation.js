function Translation($x, $y, $z)
{
	///////////////
	// Attributs //
	///////////////

    var x = $x;
    var y = $y;
    var z = $z;

	if (!utils.isset(x))
		x = 0.0;

	if (!utils.isset(y))
		y = 0.0;

	if (!utils.isset(z))
		z = 0.0;

    var transform = new Transform();

	//////////////
	// Méthodes //
	//////////////

    this.transform = function() { return 'translate(' + x + ',' + y + ') ' };

	this.compute3D = function()
    {
        var group = new GLGroup();
		group.setX(x);
		group.setY(y);
		group.setZ(z);
        return group;
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET

	this.getX = function() { return x; };
    this.getY = function() { return y; };
    this.getZ = function() { return z; };

	// SET
	
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(transform, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("translation");