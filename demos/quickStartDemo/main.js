var n = 10;
var angleStep = 2.0*Math.PI/n;
var zOffset = -10.0;
var zStep = 0.5;
var radius = 3.0;

var index = 0;

var group = new Group();
group.add(new Translation(0.0, 0.0, 1.0));

for (var i = 0; i < 3; i++)
{
	for (var j = 0; j < n; j++)
	{
		var x = radius*Math.cos(angleStep*j);
		var y = radius*Math.sin(angleStep*j);
		var material = materials[index%materials.length];
		var sphere = new Sphere(1.0);
		sphere.material(material);
		sphere.add(new Translation(x, y, zOffset));
		group.add(sphere);
		zOffset = zOffset + zStep;
		index = index + 1;
	}
}

Doc.add(group);

