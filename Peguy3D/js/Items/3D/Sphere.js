SPHERE_TYPES = 
{
	UV: 0,
	CUBOID: 1,
	OCTAHEDRIC: 2
};

//function Sphere($radius, $angleTheta, $anglePhi, $offsetAnglePhi)
function Sphere($radius)
{
	///////////////
	// Attributs //
	///////////////

	var mapping = SPHERE_TYPES.UV;

    var radius = $radius;
    var angleTheta = 360.0;
    var anglePhi = 180.0;
    var offsetAnglePhi = 0.0;

    if (!utils.isset(radius))
        radius = 1.0;

	/*
	if (!utils.isset(angleTheta))
        angleTheta = 360.0;

	if (!utils.isset(anglePhi))
        anglePhi = 180.0;

	if (!utils.isset(offsetAnglePhi))
        offsetAnglePhi = 0.0;
	//*/

	var object3D = new Object3D();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        var objectCode = '<circle cx="0" cy="0" r="' + radius + '" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
		var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
			var thetaResolution = Doc.resolution;
			var phiResolution = Doc.resolution;

			var object = new GLUVSphere(radius, angleTheta, anglePhi, offsetAnglePhi, thetaResolution, phiResolution);
			object.setVertexShaderName('vertex-material');
			object.setFragmentShaderName('fragment-material');
			glObject = object;
            $this.setGlObject(glObject);
        }

		return $this.computeTransforms(glObject);
    };

    this.clone = function()
	{
		var clone = new Sphere(radius, angleTheta, anglePhi, offsetAnglePhi);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getMapping = function() { return mapping; };
	this.getRadius = function() { return radius; };
	this.getAngleTheta = function() { return angleTheta; };
	this.getAnglePhi = function() { return anglePhi; };
	this.getOffsetAnglePhi = function() { return offsetAnglePhi; };

	// SET

	this.setMapping = function($mapping) { mapping = $mapping; };
	
    this.setRadius = function($radius)
    {
        radius = $radius;

        if (!utils.isset(radius))
            radius = 1.0;
    };

    this.radius = function($radius) { $this.setRadius($radius); };

	this.setAngleTheta = function($angleTheta)
    {
        angleTheta = $angleTheta;

        if (!utils.isset(angleTheta))
			angleTheta = 360.0;
    };

	this.setAnglePhi = function($anglePhi)
    {
        anglePhi = $anglePhi;

        if (!utils.isset(anglePhi))
			anglePhi = 180.0;
    };

	this.setOffsetAnglePhi = function($offsetAnglePhi)
    {
        offsetAnglePhi = $offsetAnglePhi;

        if (!utils.isset(offsetAnglePhi))
			offsetAnglePhi = 0.0;
    };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(object3D, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("sphere");