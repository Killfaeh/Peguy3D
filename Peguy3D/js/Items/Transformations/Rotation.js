function Rotation($angle, $axis)
{
	///////////////
	// Attributs //
	///////////////

    var angle = $angle;
    var axis = $axis;

	if (!utils.isset(angle))
		angle = 0.0;

	if (!utils.isset(axis))
		axis = 'z';

    var transform = new Transform();

	//////////////
	// Méthodes //
	//////////////

    this.transform = function()
    {
        var commande = 'rotate(' + theta + ',' + x + ',' + y + ') ';

        if (!utils.isset(x) || !utils.isset(y))
            commande = 'rotate(' + theta + ') ';

        return commande;
    };

	this.compute3D = function()
    {
        var group = new GLGroup();

		if (axis === 'x')
			group.setOmega(angle);
		else if (axis === 'y')
			group.setPhi(angle);
		else if (axis === 'z')
			group.setTheta(angle);

        return group;
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET

    this.getTheta = function() { return theta; };
	this.getAxis = function() { return axis; };

	// SET
	
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(transform, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("rotation");