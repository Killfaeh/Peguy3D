var MATERIALS = {};

function Material($name)
{
	///////////////
	// Attributs //
	///////////////

    var type = 'material';
	var name = $name;

	if (!utils.isset(name) || name === '')
		name = 'default';

    var glMaterial = new GLMaterial(name);

	var baseColor = [0.5, 0.5, 0.5];
	var specularColor = [1.0, 1.0, 1.0];
	var specular = 1.0;

	//////////////
	// Méthodes //
	//////////////

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
    this.getType = function() { return type; };
    this.getName = function() { return name; };
	this.getGLMaterial = function() { return glMaterial; };

	this.getBaseColor = function() { return glMaterial.getBaseColor(); };
	this.getSpecularColor = function() { return glMaterial.getSpecularColor(); };
	this.getSpecular = function() { return glMaterial.getSpecular(); };

	this.getJSON = function()
	{
		var jsonData = { name: name, baseColor: glMaterial.getBaseColor(), specularColor: glMaterial.getSpecularColor(), specular: glMaterial.getSpecular() };
		return jsonData;
	};

	// SET
	
    this.setBaseColor = function($baseColor)
	{
		baseColor = $baseColor;
		glMaterial.setBaseColor(baseColor);
	};

	this.setSpecularColor = function($specularColor)
	{
		specularColor = $specularColor;
		glMaterial.setSpecularColor(specularColor);
	};

	this.setSpecular = function($specular)
	{
		specular = $specular;
		glMaterial.setSpecular(specular);
	};

	this.baseColor = function($baseColor)
	{
		if (utils.isset($baseColor))
			$this.setBaseColor($baseColor);

		return baseColor;
	};

	this.specularColor = function($specularColor)
	{
		if (utils.isset($specularColor))
			$this.setSpecularColor($specularColor);
		
		return specularColor;
	};

	this.specular = function($specular)
	{
		if (utils.isset($specular))
			$this.setSpecular($specular);
		
		return specular;
	};
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = this; 

	MATERIALS[name] = $this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("material");