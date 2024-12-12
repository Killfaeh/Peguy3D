var n = 12;
var angleStep = 2.0*Math.PI/n;
var zOffset = -10.0;
var zStep = 0.5;
var radius = 3.0;

var materialRed = new Material('material-red');
materialRed.setBaseColor([1.0, 0.0, 0.0]);

var materialYellow = new Material('material-yellow');
materialYellow.setBaseColor([1.0, 0.8, 0.0]);

var materialGreen = new Material('material-green');
materialGreen.setBaseColor([0.0, 1.0, 0.0]);

var materialCyan = new Material('material-cyan');
materialCyan.setBaseColor([0.0, 1.0, 1.0]);

var materialBlue = new Material('material-blue');
materialBlue.setBaseColor([0.0, 0.0, 1.0]);

var materialMagenta = new Material('material-magenta');
materialMagenta.setBaseColor([1.0, 0.0, 1.0]);

var materials = [materialRed, materialYellow, materialGreen, 
					materialCyan, materialBlue, materialMagenta];

for (var i = 0; i < materials.length; i++)
{
	materials[i].setSpecularColor([1.0, 0.7, 0.0]);
	materials[i].setSpecular(10.0);
}

var index = 0;

for (var i = 0; i < 3; i++)
{
	for (var j = 0; j < n; j++)
	{
		var x = radius*Math.cos(angleStep*j);
		var y = radius*Math.sin(angleStep*j);
		var material = materials[index%materials.length];
		var sphere = new Sphere(1.0);
		sphere.setMaterial(material);
		sphere.add(new Translation(x, y, zOffset));
		Doc.add(sphere);
		zOffset = zOffset + zStep;
		index = index + 1;
	}
}

