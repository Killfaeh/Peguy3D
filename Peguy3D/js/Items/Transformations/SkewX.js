function SkewX($skew)
{
	///////////////
	// Attributs //
	///////////////

    var skew = $skew;

	if (!utils.isset(skew))
		skew = 1.0;

    var transform = new Transform();

	//////////////
	// Méthodes //
	//////////////

    this.transform = function()
    {
        var commande = 'skewX(' + skew + ') ';
        return commande;
    };

	this.compute3D = function()
    {
        var group = new GLGroup();
        return group;
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET

	this.getSkew = function() { return skew; };

	// SET
	
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(transform, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("skewX");