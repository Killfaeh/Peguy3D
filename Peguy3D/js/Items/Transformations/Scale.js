function Scale($scaleX, $scaleY, $scaleZ)
{
	///////////////
	// Attributs //
	///////////////

    var scaleX = $scaleX;
    var scaleY = $scaleY;
    var scaleZ = $scaleZ;

	if (!utils.isset(scaleX))
		scaleX = 1.0;

	if (!utils.isset(scaleY))
		scaleY = scaleX;

	if (!utils.isset(scaleZ))
		scaleZ = scaleY;

    var transform = new Transform();

	//////////////
	// Méthodes //
	//////////////

    this.transform = function()
    {
        var commande = 'scale(' + scaleX + ',' + scaleY + ') ';
        return commande;
    };

	this.compute3D = function()
    {
        var group = new GLGroup();
		group.setScaleX(scaleX);
		group.setScaleY(scaleY);
		group.setScaleZ(scaleZ);
        return group;
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET

	this.getScaleX = function() { return scaleX; };
    this.getScaleY = function() { return scaleY; };
    this.getScaleZ = function() { return scaleZ; };

	// SET
	
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(transform, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("scale");