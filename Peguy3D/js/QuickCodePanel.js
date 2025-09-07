function QuickCodePanel()
{
	///////////////
	// Attributs //
	///////////////
	
	var component = new Component('<div class="quickCodePanel" >'
									+ '<div id="topPanel" class="topPanel" >'
									+ '</div>'
									+ '<div id="bottomPanel" class="panel bottomPanel" >'
									+ '</div>'
								+ '</div>');

	//// Champ de recherche ////

	var searchInput = new InputSearch('text', 'Search code');
	component.getById('topPanel').appendChild(searchInput);

	//// Liste des assets ////

	var codeListBox = new ListBox();
	component.getById('bottomPanel').appendChild(codeListBox);

	//// Liste de codes standards ////

	var codeList = [

		// Code généraliste

		{ 
			label: 'For loop',
			keywords: 'loop, for, block',
			code: 'for (var i = 0; i < n; i++)\n'
					+ '{\n'
					+ '\t\n'
					+ '}\n\r'
		},

		{ 
			label: 'Double for loop',
			keywords: 'loop, for, block',
			code: 'for (var i = 0; i < n; i++)\n'
					+ '{\n'
					+ '\tfor (var j = 0; j < n; j++)\n'
					+ '\t{\n'
					+ '\t\t\n'
					+ '\t}\n'
					+ '}\n\r'
		},

		{ 
			label: 'While loop',
			keywords: 'loop, while, block',
			code: 'var continueLoop = true;\n\r'
					+ 'while (continueLoop)\n'
					+ '{\n'
					+ '\t\n'
					+ '}\n\r'
		},

		{ 
			label: 'If block',
			keywords: 'if, bock',
			code: 'var conditionOk = true;\n\r'
					+ 'if (conditionOk === true)\n'
					+ '{\n'
					+ '\t\n'
					+ '}\n\r'
		},

		{ 
			label: 'Create function without parameters',
			keywords: 'function',
			code: 'var myFunction = function()\n'
					+ '{\n'
					+ '\t\n'
					+ '};\n\r'
		},

		{ 
			label: 'Create function with parameters',
			keywords: 'function',
			code: 'var myFunction = function($param)\n'
					+ '{\n'
					+ '\t\n'
					+ '};\n\r'
		},

		// 2D

		{ 
			label: 'Create circle',
			keywords: '2d, circle',
			code: "var radius = 0.5;\n"
				+ "var circle = new Circle(radius);\n"
				+ "circle.angle(360.0);\n"
		},

		{ 
			label: 'Create ellipse',
			keywords: '2d, ellipse',
			code: "var rX = 0.5;\n"
				+ "var rY = 0.25;\n"
				+ "var rZ = 0.25;\n"
				+ "var ellipse = new Ellipse(rX, rY, rZ);\n"
				+ "ellipse.angle(360.0);\n"
		},

		{ 
			label: 'Create ring',
			keywords: '2d, ring',
			code: "var radius1 = 1.0;\n"
				+ "var radius2 = 2.0;\n"
				+ 'var ring = new Ring(radius1, radius2);\n'
				+ "ring.angle(angle);\n"
		},

		{ 
			label: 'Create square',
			keywords: '2d, square',
			code: 'var square = new Square(1.0);\n'
		},

		{ 
			label: 'Create rectangle',
			keywords: '2d, rectangle',
			code: 'var rect = new Rect(2.0, 1.0);\n'
		},

		{ 
			label: 'Create polygon',
			keywords: '2d, polygon',
			code: "var points = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var axis = 'z';\n"
				+ "var polygon = new Polygon(points, axis);\n"
		},

		{ 
			label: 'Create regular polygon',
			keywords: '2d, polygon, regular',
			code: "var radius = 1.0;\n"
				+ "var nbFaces = 3;\n"
				+ "var regularPolygon = new RegularPolygon(radius, nbFaces);\n"
		},

		{ 
			label: 'Create ribbon from curve',
			keywords: '2d, ribbon, curve, path',
			code: "var points = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var width = 0.1;\n"
				+ "var axis = 'z';\n"
				+ "var cornerMode = 0; // 0: sharp, 1: bevel, 2: round\n"
				+ "var smoothAngle = 30.0;\n"
				+ "var ribbon = new RibbonFromCurve(points, width, axis, cornerMode, smoothAngle);\n"
		},

		// 3D

		{ 
			label: 'Create sphere',
			keywords: '3d, sphere',
			code: "var radius = 0.5;\n"
				+ "var theta = 45.0;\n"
				+ "var phi = 45.0;\n"
				+ "var offsetPhi = 45.0;\n"
				+ "var sphere = new Sphere(radius);\n"
				+ "sphere.theta(theta);\n"
				+ "sphere.anglePhi(phi);\n"
				+ "sphere.offsetPhi(offsetPhi);\n"
		},

		{ 
			label: 'Create ellipsoid',
			keywords: '3d, ellipsoid',
			code: "var radiusX = 1.0;\n"
				+ "var radiusY = 0.5;\n"
				+ "var radiusZ = 0.25;\n"
				+ "var ellipsoid = new Ellipsoid(radiusX, radiusY, radiusZ);\n"
		},

		{ 
			label: 'Create cube',
			keywords: '3d, cube',
			code: "var size = 1.0;\n"
				+ "var cube = new Cube(size);\n"
		},

		{ 
			label: 'Create cuboid',
			keywords: '3d, cuboid',
			code: "var widthX = 2.0;\n"
				+ "var widthY = 1.0;\n"
				+ "var widthZ = 0.5;\n"
				+ "var cuboid = new Cuboid(widthX, widthY, widthZ);\n"
		},

		{ 
			label: 'Create cylinder',
			keywords: '3d, cylinder',
			code: "var radius1 = 0.75;\n"
				+ "var radius2 = 0.5;\n"
				+ "var height = 2.0;\n"
				+ "var angle = 45.0;\n"
				+ "var deltaX = 0.1;\n"
				+ "var deltaY = 0.1;\n"
				+ "var fill = true;\n"
				+ "var bottomClosed = true;\n"
				+ "var topClosed = true;\n"
				+ "var cylinder = new Cylinder(radius1, radius2, height);\n"
				+ "cylinder.angle(angle);\n"
				+ "cylinder.deltaX(deltaX);\n"
				+ "cylinder.deltaY(deltaY);\n"
				+ "cylinder.fill(fill);\n"
				+ "cylinder.bottomClosed(bottomClosed);\n"
				+ "cylinder.topClosed(topClosed);\n"
		},

		{ 
			label: 'Create cone',
			keywords: '3d, cone',
			code: "var radius = 0.5;\n"
				+ "var height = 2.0;\n"
				+ "var angle = 45.0;\n"
				+ "var deltaX = 0.1;\n"
				+ "var deltaY = 0.1;\n"
				+ "var fill = true;\n"
				+ "var bottomClosed = true;\n"
				+ "var cone = new Cone(radius, height);\n"
				+ "cone.angle(angle);\n"
				+ "cone.deltaX(deltaX);\n"
				+ "cone.deltaY(deltaY);\n"
				+ "cone.fill(fill);\n"
				+ "cone.bottomClosed(bottomClosed);\n"
		},

		{ 
			label: 'Create pipe',
			keywords: '3d, pipe',
			code: "var radius1 = 0.75;\n"
				+ "var radius2 = 0.5;\n"
				+ "var radius3 = 1.0;\n"
				+ "var radius4 = 0.75;\n"
				+ "var height = 2.0;\n"
				+ "var angle = 45.0;\n"
				+ "var deltaX = 0.1;\n"
				+ "var deltaY = 0.1;\n"
				+ "var fill = true;\n"
				+ "var bottomClosed = true;\n"
				+ "var topClosed = true;\n"
				+ 'var pipe = new Pipe(radius1, radius2, radius3, radius4, height);\n'
				+ "pipe.angle(angle);\n"
				+ "pipe.deltaX(deltaX);\n"
				+ "pipe.deltaY(deltaY);\n"
				+ "pipe.fill(fill);\n"
				+ "pipe.bottomClosed(bottomClosed);\n"
				+ "pipe.topClosed(topClosed);\n"
		},

		{ 
			label: 'Create pyramid',
			keywords: '3d, pyramid',
			code: "var radius = 0.75;\n"
				+ "var height = 2.0;\n"
				+ "var angle = 45.0;\n"
				+ "var deltaX = 0.1;\n"
				+ "var deltaY = 0.1;\n"
				+ "var thetaResolution = 5;\n"
				+ "var fill = true;\n"
				+ "var bottomClosed = true;\n"
				+ 'var pyramid = new Pyramid(radius, height, thetaResolution);\n'
				+ "pyramid.angle(angle);\n"
				+ "pyramid.deltaX(deltaX);\n"
				+ "pyramid.deltaY(deltaY);\n"
				+ "pyramid.fill(fill);\n"
				+ "pyramid.bottomClosed(bottomClosed);\n"
		},

		{ 
			label: 'Create pyramid from polygon',
			keywords: '3d, pyramid, extrude, extrusion',
			code: "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var height = 2.0;\n"
				+ "var deltaX = 0.1;\n"
				+ "var deltaY = 0.1;\n"
				+ "var bottomClosed = true;\n"
				+ 'var pyramid = new PyramidFromPolygon(verticesList, height);\n'
				+ "pyramid.deltaX(deltaX);\n"
				+ "pyramid.deltaY(deltaY);\n"
				+ "pyramid.bottomClosed(bottomClosed);\n"
		},

		{ 
			label: 'Create prism',
			keywords: '3d, prism',
			code: "var radius1 = 0.75;\n"
				+ "var radius2 = 0.5;\n"
				+ "var height = 2.0;\n"
				+ "var angle = 45.0;\n"
				+ "var deltaX = 0.1;\n"
				+ "var deltaY = 0.1;\n"
				+ "var thetaResolution = 5;\n"
				+ "var fill = true;\n"
				+ "var bottomClosed = true;\n"
				+ "var topClosed = true;\n"
				+ "var prism = new Prism(radius1, radius2, height, thetaResolution);\n"
				+ "prism.angle(angle);\n"
				+ "prism.deltaX(deltaX);\n"
				+ "prism.deltaY(deltaY);\n"
				+ "prism.fill(fill);\n"
				+ "prism.bottomClosed(bottomClosed);\n"
				+ "prism.topClosed(topClosed);\n"
		},

		{ 
			label: 'Create prism from polygon',
			keywords: '3d, prism, extrude, extrusion',
			code: "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var radius1 = 1.5;\n"
				+ "var radius2 = 0.75;\n"
				+ "var height = 2.0;\n"
				+ "var axis = 'z';\n"
				+ "var prism = new PrismFromPolygon(verticesList, height, axis);\n"
				+ "prism.radius1(1.5);\n"
				+ "prism.radius2(0.75);\n"
				+ "prism.deltaX(deltaX);\n"
				+ "prism.deltaY(deltaY);\n"
				+ "prism.bottomClosed(bottomClosed);\n"
				+ "prism.topClosed(topClosed);\n"
		},

		{ 
			label: 'Create extrusion',
			keywords: '3d, extrusion, extrude',
			code: "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var height = 1.0;\n"
				+ "var axis = 'z';\n"
				+ "var extrusion = new Extrusion(verticesList, height, axis);\n"
		},

		{ 
			label: 'Create prism revolution',
			keywords: '3d, prism, revolution',
			code: "var verticesList = [[0.0, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var resolution = 5;\n"
				+ "var smoothTheta = 30.0;\n"
				+ "var angle = 45.0;\n"
				+ 'var revolution = new PrismRevolution(verticesList, resolution, smoothTheta);\n'
				+ "revolution.angle(angle);\n"
		},

		{ 
			label: 'Create revolution',
			keywords: '3d, revolution',
			code: "var verticesList = [[0.0, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var resolution = 5;\n"
				+ "var smoothTheta = 45.5;\n"
				+ "var angle = 45.0;\n"
				+ 'var revolution = new Revolution(verticesList, resolution, smoothTheta);\n'
				+ "revolution.angle(angle);\n"
		},

		{ 
			label: 'Create extrusion from curve',
			keywords: '2d, extrusion, extrude, curve, path',
			code: "var points = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var height = 2.0;\n"
				+ "var width = 0.01;\n"
				+ "var axis = 'z';\n"
				+ "var cornerMode = 0; // 0: sharp, 1: bevel, 2: round\n"
				+ "var cornerAngle = 30.0;\n"
				+ "var extrusion = new ExtrudeCurve(verticesList, height, width, axis, cornerMode, cornerAngle);\n"
		},

		{ 
			label: 'Create pipe from curve',
			keywords: '2d, pipe, curve, path',
			code: "var pipe = new PipeFromCurve($curve, $profileCurve, $width);\n"
		},

		// Paths and curves

		{ 
			label: 'Create line',
			keywords: '2d, line, segment',
			code: 'var line = new Line([-1.0, -1.0, 0.0], [1.0, 1.0, 1.0]);\n'
		},

		{ 
			label: 'Create polyline',
			keywords: '2d, polyline',
			code: 'var polyline = new Polyline([[-1.0, -1.0, 0.5], [1.0, -1.0, 1.0], [0.0, 1.0, 1.5], [-1.0, -1.0, 2.0]]);\n'
		},

		{ 
			label: 'Create path with functions',
			keywords: '2d, path',
			code: 'var path = new Path([]);\n'
				+ 'path.moveTo([x, y, z]);\n'
				+ 'path.lineTo([x, y, z]);\n'
				+ 'path.arc([rx, ry], rotation, largeArcFlag, sweepFlag, [endX, endY, endZ]);\n'
				+ 'path.bezierQ([hx, hy, hz], [endX, endY, endZ]);\n'
				+ 'path.bezierC([h1x, h1y, h1z], [h2x, h2y, h2z], [endX, endY, endZ]);\n'
				+ 'path.close();\n'
		},

		{ 
			label: 'Create path with operations list',
			keywords: '2d, path',
			code: "var path = new Path([['M', [x, y, z]], \n"
                + "				['L', [x, y, z]], \n"
                + "				['A', [rx, ry], rotation, largeArcFlag, sweepFlag, [endX, endY, endZ]], \n"
                + "				['Q', [hx, hy, hz], [endX, endY, endZ]], \n"
                + "				['C', [h1x, h1y, h1z], [h2x, h2y, h2z], [endX, endY, endZ]]);\n"
                + "				['Z']);\n"
		},

		{ 
			label: 'Reverse path orientation',
			keywords: '2d, path, reverse',
			code: "var reversedPath = path.reverse();\n"
		},

		{ 
			label: 'Get symetric path',
			keywords: '2d, path, reverse',
			code: "var symetricPath = path.symetry('yz');\n"
		},

		{ 
			label: 'Repeat path pattern',
			keywords: '2d, path, reverse',
			code: "var repeatPath = path.repeat(n);\n"
		},

		// Points

		{ 
			label: 'Create list of points manually',
			keywords: 'points, list',
			code: "var points = [[-1.0, -1.0, -1.0], [1.0, -1.0, -1.0], [1.0, 1.0, -1.0], [-1.0, 1.0, -1.0],\n"
				+ "			[-1.0, -1.0, 1.0], [1.0, -1.0, 1.0], [1.0, 1.0, 1.0], [-1.0, 1.0, 1.0]];\n"
		},

		{ 
			label: 'Sample from path',
			keywords: 'points, sample',
			code: "var points = path.samplePoints(n);\n"
		},

		{ 
			label: 'Sample from path with properties',
			keywords: 'points, sample',
			code: "var points = path.samplePointsWithProperties(n);\n"
		},

		/*
		{ 
			label: 'Get curve length',
			keywords: 'curve, property, length',
			code: 'curve.totalLength();\n'
		},

		{ 
			label: 'Get point on curve at length',
			keywords: 'curve, property, point, length',
			code: 'curve.pointAtLength(0.5);\n'
		},

		{ 
			label: 'Get tangent on curve at length',
			keywords: 'curve, property, tangent, length',
			code: 'curve.tangentAtLength(0.5);\n'
		},

		{ 
			label: 'Get normal on curve at length',
			keywords: 'curve, property, normal, length',
			code: 'curve.normalAtLength(0.5);\n'
		},
		//*/

		{ 
			label: 'Create grid',
			keywords: 'points, grid, pattern',
			code: "var pattern = new GridPattern(10.0, 10.0, 10.0, 5, 5, 5, false);\n"
				+ "pattern.random(1.0);\n"
				+ "pattern.seed(35);\n"
		},

		{ 
			label: 'Create Fibonacci pattern',
			keywords: 'points, fibonacci, pattern',
			code: "var pattern = new FibonacciPattern(5.0, 100);\n"
				+ "pattern.random(1.0);\n"
				+ "pattern.seed(35);\n"
		},

		/*
		{ 
			label: 'Get distance between 2 points',
			keywords: 'distance, point, property',
			code: "var distance = Points.distance(point1, point2);\n"
		},

		{ 
			label: 'Cut array of points',
			keywords: 'point, array',
			code: "Points.cut($input, $shape);\n"
		},

		{ 
			label: 'Intersect array of points',
			keywords: 'point, array',
			code: "Points.intersect($input, $shape);\n"
		},

		{ 
			label: 'Union array of points',
			keywords: 'point, array',
			code: "Points.union($input1, $input2);\n"
		},

		{ 
			label: 'Create inflection point',
			keywords: 'point, array, inflection',
			code: "var inflectionPoint = new InflectionPoint(0.0, 0.0, 45.0, 1.0, 1.0);\n"
		}
		//*/

		// Instances and groups

		{ 
			label: 'Create instance',
			keywords: 'instance',
			code: 'var instance = new Instance(element);\n'
		},

		{ 
			label: 'Create group',
			keywords: 'group',
			code: "var group = new Group([object1, object2, objet3]);\n"
				+ "group.add(element);\n"
		},

		{ 
			label: 'Create stack',
			keywords: 'stack, group',
			code: "var stack = new Stack([object1, object2, objet3], 'z', 1);\n"
				+ "stack.add(element);\n"
		},

		{ 
			label: 'Instances to points',
			keywords: 'instance, point',
			code: 'elementToCopy.instancesToPoints(listOfPoints, true);\n'
		},
		
		// Transformation

		{ 
			label: 'Add translation',
			keywords: 'transformation, translation',
			code: 'var translation = new Translation(x, y, z);\n'
		},

		{ 
			label: 'Add rotation',
			keywords: 'transformation, rotation',
			code: "var rotation = new Rotation(angle, 'z');\n"
		},

		{ 
			label: 'Add scale',
			keywords: 'transformation, scale',
			code: "var scale = new Scale(scaleX, scaleY, scaleZ);\n"
		},
		
		// Matériaux

		{ 
			label: 'Create material',
			keywords: 'material',
			code: "var material = new Material('material-name');\n"
				+ "material.baseColor([1.0, 0.0, 0.0]);\n"
				+ "material.specularColor([1.0, 1.0, 0.0]);\n"
				+ "material.specular(10.0);\n"
		},

		{ 
			label: 'Define element material',
			keywords: 'property, material',
			code: "element.material(material);\n"
		}		
	];

	//////////////
	// Méthodes //
	//////////////

	var updateCodeList = function()
	{
		var searchCriteria = searchInput.getValue().toUpperCase();

		codeListBox.removeAllElement();

		for (var i = 0; i < codeList.length; i++)
		{
			if (searchCriteria === '' || codeList[i].label.toUpperCase().indexOf(searchCriteria) >= 0 
				|| codeList[i].keywords.toUpperCase().indexOf(searchCriteria) >= 0 
				|| codeList[i].code.toUpperCase().indexOf(searchCriteria) >= 0)
			{
				var itemHTML = '<div class="codeRow" >'
									+ '<div id="preview" class="preview" ></div>'
									+ '<div>' + codeList[i].label + '</div>'
								+ '</div>';

				var item = new ListItem(itemHTML);

				var copyIcon = Loader.getSVG('icons', 'copy-paste-icon', 20, 20);
				item.getById('preview').appendChild(copyIcon);

				item.code = codeList[i].code;
				copyIcon.code = codeList[i].code;

				item.onDblClick = function($event) { viewManager.insertCode(this.code); };
				copyIcon.onClick = function($event) { viewManager.insertCode(this.code); };

				codeListBox.addElement(item);
			}
		}
	};

	///////////////////////////////////
	// Initialisation des événements //
	///////////////////////////////////

	//// Champ de recherche ////

	searchInput.onSearch = function($value) { updateCodeList(); };
	searchInput.onEmpty = function($value) { updateCodeList(); };

	////////////////
	// Accesseurs //
	////////////////
	
	// GET
	
	// SET

	var $this = utils.extend(component, this);
	updateCodeList();
	return $this;
}
	
// A la fin du fichier Javascript, on signale au module de chargement que le fichier a fini de charger.
if (Loader !== undefined && Loader !== null)
	Loader.hasLoaded("quickCodePanel");