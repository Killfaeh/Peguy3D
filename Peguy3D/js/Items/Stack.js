function Stack($elements, $axis, $align)
{
	///////////////
	// Attributs //
	///////////////

    var elements = $elements;
	var axis = $axis;
	var align = $align;

    if (!utils.isset(elements))
        elements = [];

	if (!utils.isset(axis))
        axis = 'z';

	if (!utils.isset(align))
        align = 1;

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

    this.computeSVG = function computeSVG()
    {
        var svgObject = $this.execSuper('computeSVG', [], computeSVG);
        return svgObject;
    };

    this.compute3D = function()
    {
        var glObjectsList = [];

		for (var i = 0; i < elements.length; i++)
		{
			var glSubObject = elements[i].compute3D();
			//glSubObject = elements[i].getGlObject();
			glObjectsList.push(glSubObject);
		}

		console.log(glObjectsList);

		var glStack = new GLStack(glObjectsList, axis, align);

		var outputGroup = $this['super'].compute3D(glStack);
        return outputGroup;
    };

    this.clone = function()
	{
		var clone = new Stack(elements, axis, align);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	//this.getObjectsList = function() { return objectsList; };

	// SET
	
    //this.setObjectsList = function($objectsList) { objectsList = $objectsList; };

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
				elements.push($input);
			else if (type === 'transform')
				$this['super'].add($input);
		}
	};

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("stack");