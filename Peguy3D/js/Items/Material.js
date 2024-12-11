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
	
    this.setBaseColor = function($baseColor) { glMaterial.setBaseColor($baseColor); };
	this.setSpecularColor = function($specularColor) { glMaterial.setSpecularColor($specularColor); };
	this.setSpecular = function($specular) { glMaterial.setSpecular($specular); };
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = this; 

	MATERIALS[name] = $this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("material");