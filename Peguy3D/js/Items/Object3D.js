function Object3D()
{
	///////////////
	// Attributs //
	///////////////

    var type = 'object';

    var transformList = [];
    var joinList = [];
    var material = new Material();

    var glObject = null;

	//////////////
	// Méthodes //
	//////////////

    this.add = function($input)
    {
        var type = $input.getType();

        if (type === 'object')
            joinList.push($input);
        else if (type === 'transform')
            transformList.push($input);
    };

    this.emptyTransformations = function() { transformList = []; };

    this.computeSVG = function($svgObject)
    {
        var transformCommand = '';

        for (var i = 0; i < transformList.length; i++)
            transformCommand = transformCommand + transformList[i].transform();

        if (transformCommand !== '')
            $svgObject.setAttributeNS(null, 'transform', transformCommand);
        
        //$svgObject.setAttributeNS(null, 'style', 'fill: ' + fillColor + '; stroke: ' + borderColor + '; stroke-width: ' + borderWidth + 'px;');
    };

    this.compute3D = function($glObject)
    {
        if (utils.isset($glObject) && $glObject.getType() === 'instance' && utils.isset($glObject.getObject().setMaterial))
        {
            console.log(material.getName());
            $glObject.getObject().setMaterial(material.getGLMaterial());
        }

        var groupList = [];

        for (var i = 0; i < transformList.length; i++)
            groupList.push(transformList[i].compute3D());
        
        var group = new GLGroup();
        group.addInstance($glObject);

        for (var i = 0; i < joinList.length; i++)
            group.addInstance(joinList[i].compute3D());

        var outputGroup = group;

        if (groupList.length > 0)
        {
            for (var i = groupList.length-1; i > 0; i--)
                groupList[i-1].addInstance(groupList[i]);
            
            outputGroup = groupList[0];
            groupList[groupList.length-1].addInstance(group);
        }

        return outputGroup;
    };

    this.instancesToPoints = function($points)
    {
        var instancesList = [];

        for (var i = 0; i < $points.length; i++)
        {
            var instance = new Instance($this);

            console.log("POINT : ");
            console.log($points[i]);

            if (utils.isset($points[i].point))
            {
                instance.add(new Translation($points[i].point[0], $points[i].point[1], $points[i].point[2]));
            }
            else
                instance.add(new Translation($points[i][0], $points[i][1], $points[i][2]));

            instancesList.push(instance);
        }

        return instancesList;
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
    this.getType = function() { return type; };

    this.getTransformList = function() { return transformList; };
    this.getMaterial = function() { return material; };

    this.getGlObject = function() { return glObject; };
    this.getInstance = function() { return new Instance($this); };

	// SET
	
    this.setTransformList = function($transformList) { transformList = $transformList; };
    this.setMaterial = function($material) { material = $material; };
    this.setGlObject = function($glObject) { glObject = $glObject; };
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("object-3d");