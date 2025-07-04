loadScript('materials');

var n = 12;
var angleStep = 2.0*Math.PI/n;
var zOffset = -10.0;
var zStep = 0.5;
var radius = 3.0;

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


