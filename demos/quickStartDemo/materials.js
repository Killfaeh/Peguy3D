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

