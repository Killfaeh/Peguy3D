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
			code: 'var circle = new Circle(1.0);\n'
		},

		{ 
			label: 'Create ellipse',
			keywords: '2d, ellipse',
			code: 'var ellipse = new Ellipse(2.0, 1.0);\n'
		},

		{ 
			label: 'Create polygon',
			keywords: '2d, polygon',
			code: "var polygon = new Polygon([[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]], 'z');\n"
		},

		{ 
			label: 'Create rectangle',
			keywords: '2d, rectangle',
			code: 'var rect = new Rect(2.0, 1.0);\n'
		},

		{ 
			label: 'Create regular polygon',
			keywords: '2d, polygon, regular',
			code: 'var regularPolygon = new RegularPolygon(1.0, 3);\n'
		},

		{ 
			label: 'Create ring',
			keywords: '2d, ring',
			code: 'var ring = new Ring(radius1, radius2, angle);\n'
		},

		{ 
			label: 'Create square',
			keywords: '2d, square',
			code: 'var square = new Square(1.0);\n'
		},

		{ 
			label: 'Create line',
			keywords: '2d, line, segment',
			code: 'var line = new Line(0.0, 0.0, 1.0, 1.0);\n'
		},

		{ 
			label: 'Create path with operations list',
			keywords: '2d, path',
			code: "var path = new Path([['M', -0.25, -0.25], ['L', 0.25, -0.25], ['L', 0.0, 0.25], ['Z']];);\n"
		},

		{ 
			label: 'Create path with functions',
			keywords: '2d, path',
			code: 'var path = new Path([]);\n'
					+ 'path.moveTo($x, $y);\n'
					+ 'path.lineTo($x, $y);\n'
					+ 'path.arc($rx, $ry, $rotation, $largeArcFlag, $sweepFlag, $endX, $endY);\n'
					+ 'path.bezierQ($hx, $hy, $endX, $endY);\n'
					+ 'path.bezierQT($hx, $hy, $endX, $endY, $htx, $hty);\n'
					+ 'path.bezierC($h1x, $h1y, $h2x, $h2y, $endX, $endY);\n'
					+ 'path.bezierCS($h1x, $h1y, $h2x, $h2y, $endX, $endY, $hs1x, $hs1y, $hs2x, $hs2y);\n'
					+ 'path.close();\n'
		},

		{ 
			label: 'Create polyline',
			keywords: '2d, polyline',
			code: 'var polyline = new Polyline([[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]]);\n'
		},

		// 3D

		{ 
			label: 'Create cone',
			keywords: '3d, cone',
			code: 'var cone = new Cone(radius, height);\n'
					+ "cone.setAngle(angle);\n"
					+ "cone.setDeltaX(deltaX);\n"
					+ "cone.setDeltaY(deltaY);\n"
					+ "cone.setFill(fill);\n"
					+ "cone.setBottomClosed(bottomClosed);\n"
		},

		{ 
			label: 'Create cube',
			keywords: '3d, cube',
			code: 'var cube = new Cube(1.0);\n'
		},

		{ 
			label: 'Create cuboid',
			keywords: '3d, cuboid',
			code: 'var cuboid = new Cuboid(2.0, 1.0, 0.5);\n'
		},

		{ 
			label: 'Create cylinder',
			keywords: '3d, cylinder',
			code: 'var cylinder = new Cylinder(radius1, radius2, height);\n'
					+ "cylinder.setAngle(angle);\n"
					+ "cylinder.setDeltaX(deltaX);\n"
					+ "cylinder.setDeltaY(deltaY);\n"
					+ "cylinder.setFill(fill);\n"
					+ "cylinder.setBottomClosed(bottomClosed);\n"
					+ "cylinder.setTopClosed(topClosed);\n"
		},

		{ 
			label: 'Create ellipsoid',
			keywords: '3d, ellipsoid',
			code: 'var ellipsoid = new Ellipsoid(2.0, 1.0, 0.5);\n'
		},

		{ 
			label: 'Create extrusion',
			keywords: '3d, extrusion, extrude',
			code: "var extrusion = new Extrusion([[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]], 1.0, 'z');\n"
		},

		{ 
			label: 'Create pipe',
			keywords: '3d, pipe',
			code: 'var pipe = new Pipe(radius1, radius2, radius3, radius4, height);\n'
					+ "pipe.setAngle(angle);\n"
					+ "pipe.setDeltaX(deltaX);\n"
					+ "pipe.setDeltaY(deltaY);\n"
					+ "pipe.setFill(fill);\n"
					+ "pipe.setBottomClosed(bottomClosed);\n"
					+ "pipe.setTopClosed(topClosed);\n"
		},

		{ 
			label: 'Create prism',
			keywords: '3d, prism',
			code: 'var prism = new Prism(radius1, radius2, height, thetaResolution);\n'
					+ "prism.setAngle(angle);\n"
					+ "prism.setDeltaX(deltaX);\n"
					+ "prism.setDeltaY(deltaY);\n"
					+ "prism.setFill(fill);\n"
					+ "prism.setBottomClosed(bottomClosed);\n"
					+ "prism.setTopClosed(topClosed);\n"
		},

		{ 
			label: 'Create prism from polygon',
			keywords: '3d, prism, extrude, extrusion',
			code: 'var prism = new PrismFromPolygon(verticesList, height, axis);\n'
					+ "prism.setDeltaX(deltaX);\n"
					+ "prism.setDeltaY(deltaY);\n"
					+ "prism.setBottomClosed(bottomClosed);\n"
					+ "prism.setTopClosed(topClosed);\n"
		},

		{ 
			label: 'Create prism revolution',
			keywords: '3d, prism, revolution',
			code: 'var revolution = new PrismRevolution(verticesList, resolution, smoothTheta);\n'
					+ "revolution.setAngle(angle);\n"
		},

		{ 
			label: 'Create pyramid',
			keywords: '3d, pyramid',
			code: 'var pyramid = new Pyramid(radius, height, thetaResolution);\n'
					+ "pyramid.setAngle(angle);\n"
					+ "pyramid.setDeltaX(deltaX);\n"
					+ "pyramid.setDeltaY(deltaY);\n"
					+ "pyramid.setFill(fill);\n"
					+ "pyramid.setBottomClosed(bottomClosed);\n"
		},

		{ 
			label: 'Create pyramid from polygon',
			keywords: '3d, pyramid, extrude, extrusion',
			code: 'var pyramid = new PyramidFromPolygon(verticesList, height);\n'
					+ "pyramid.setDeltaX(deltaX);\n"
					+ "pyramid.setDeltaY(deltaY);\n"
					+ "pyramid.setBottomClosed(bottomClosed);\n"
		},

		{ 
			label: 'Create revolution',
			keywords: '3d, revolution',
			code: 'var revolution = new Revolution(verticesList, resolution, smoothTheta);\n'
					+ "revolution.setAngle(angle);\n"
		},

		{ 
			label: 'Create sphere',
			keywords: '3d, sphere',
			code: 'var sphere = new Sphere(1.0);\n'
		},

		// Doc and instances management

		{ 
			label: 'Create instance',
			keywords: 'instance',
			code: 'var instance = new Instance(element);\n'
		},

		{ 
			label: 'Instances to points',
			keywords: 'instance, point',
			code: 'elementToCopy.instancesToPoints($listOfPoints);\n'
		},
		
		{ 
			label: 'Create group',
			keywords: 'group',
			code: 'var group = new Group();\n'
		},

		// Matériaux

		{ 
			label: 'Create material',
			keywords: 'material',
			code: "var material = new Material('material-name');\n"
					+ 'material.setBaseColor([1.0, 1.0, 1.0]);\n'
					+ 'material.setSpecularColor([1.0, 1.0, 1.0]);\n'
					+ 'material.setSpecular(0.0);\n'
		},

		{ 
			label: 'Define element material',
			keywords: 'property, material',
			code: "element.setMaterial(material);\n"
		},

		// Propriétés

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

		{ 
			label: 'Get n points on the curve',
			keywords: 'curve, array, point, sample',
			code: 'curve.samplePoints(n);\n'
		},

		{ 
			label: 'Get n points on the curve with properties',
			keywords: 'curve, array, point, sample, property',
			code: 'curve.samplePointsWithProperties(n);\n'
		},

		// Transformation

		{ 
			label: 'Add translation',
			keywords: 'transformation, translation',
			code: 'Doc.add(new Translation(x, y, z));\n'
		},

		{ 
			label: 'Add rotation',
			keywords: 'transformation, rotation',
			code: "Doc.add(new Rotation(angle, 'z'));\n"
		},

		{ 
			label: 'Add scale',
			keywords: 'transformation, scale',
			code: "Doc.add(new Scale(scaleX, scaleY, scaleZ));\n"
		},

		// Points

		{ 
			label: 'Get distance between 2 points',
			keywords: 'distance, point, property',
			code: "var distance = Points.distance(point1, point2);\n"
		},

		{ 
			label: 'Create grid of points',
			keywords: 'point, array, grid',
			code: "Points.createGrid(width, height, nX, nY, random);\n"
		},

		{ 
			label: 'Create staggered grid of points',
			keywords: 'point, array, grid',
			code: "Points.createStaggeredGrid(width, height, nX, nY, random);\n"
		},

		{ 
			label: 'Create Fibonacci pattern of points',
			keywords: 'point, array, grid, fibonacci',
			code: "Points.createFibonacciPattern(width, height, nbDots, random);\n"
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