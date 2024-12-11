function Instance($object)
{
	///////////////
	// Attributs //
	///////////////

    var object = $object;

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        var objectCode = '<g></g>';

        var svgObject = new Component(objectCode);

        for (var i = 0; i < elementsList.length; i++)
            svgObject.appendChild(elementsList[i].computeSVG());

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
        var group = new GLGroup();
        group.addInstance(object.compute3D());
        var outputGroup = $this['super'].compute3D(group);
        return outputGroup;
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

            if (type === 'transform')
                $this['super'].add($input);
        }
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET

    this.getObject = function() { return object; };

	// SET

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("instance");