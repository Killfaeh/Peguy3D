function Align($reference)
{
	///////////////
	// Attributs //
	///////////////

    var reference = $reference;

	if (!utils.isset(reference))
		reference = [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]];

    var transform = new Transform();

	//////////////
	// Méthodes //
	//////////////

    this.transform = function() { return 'translate(' + x + ',' + y + ') ' };

	this.compute3D = function()
    {
		var matrix = new Matrix();

		matrix.setMatrix([
				[reference[0][0], reference[0][1], reference[0][2], 0.0],
				[reference[1][0], reference[1][1], reference[1][2], 0.0],
				[reference[2][0], reference[2][1], reference[2][2], 0.0],
				[0.0, 0.0, 0.0, 1.0]
			]);

        var group = new GLGroup();
		group.setAlignMatrix(matrix);

        return group;
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET

	this.getReference = function() { return reference; };

	// SET
	
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(transform, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("align");