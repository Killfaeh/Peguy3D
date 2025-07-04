Doc = 
{
    resolution: 32,
    tolerance: Math.pow(10, -PEGUY.glPrecision),
    elementsList: [],
    transformList: [],

    add: function($input)
    {
        if (Array.isArray($input))
        {
            for (var i = 0; i < $input.length; i++)
                Doc.add($input[i]);
        }
        else
        {
            console.log("Add to Doc : ");
            console.log($input);

            var type = $input.getType();

            console.log("Type : " + $input.getType);

            if (type === 'object' || type === 'curve')
                Doc.elementsList.push($input);
            else if (type === 'transform')
                Doc.transformList.push($input);
        }
    },

    insertInto: function($input, $index)
    {
        var type = $input.getType();

        if (type === 'object' || type === 'curve')
            Doc.elementsList.splice($index, 0, $input);
        else if (type === 'transform')
            Doc.transformList.splice($index, 0, $input);
    },

    remove: function($input)
    {
        var type = $input.getType();

        if (type === 'object')
        {
            var index = Doc.elementsList.indexOf($input);
            
            if (index > -1)
                Doc.elementsList.splice(index, 1);
        }
        else if (type === 'transform')
        {
            var index = Doc.transformList.indexOf($input);
            
            if (index > -1)
                Doc.transformList.splice(index, 1);
        }
    },

    empty: function($element)
    {
        MATERIALS = {};
        Doc.elementsList = [];
        Doc.transformList = [];
    },

    transform: function()
    {
        var transformCommand = '';

        for (var i = 0; i < Doc.transformList.length; i++)
            transformCommand = transformCommand + Doc.transformList[i].transform();
        
        return transformCommand;
    },

    compute3D: function()
    {
        var groupList = [];

        for (var i = 0; i < Doc.transformList.length; i++)
            groupList.push(Doc.transformList[i].compute3D());
        
        var group = new GLGroup();

        for (var i = 0; i < Doc.elementsList.length; i++)
        {
            console.log(Doc.elementsList[i]);
            group.addInstance(Doc.elementsList[i].compute3D());
        }

        var outputGroup = group;

        if (groupList.length > 0)
        {
            for (var i = groupList.length-1; i > 0; i--)
                groupList[i-1].addInstance(groupList[i]);
            
            outputGroup = groupList[0];
            groupList[groupList.length-1].addInstance(group);
        }

        return outputGroup;
    }
};

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("doc");