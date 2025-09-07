function HelpPopup()
{
	///////////////
	// Attributs //
	///////////////

	var code2D = "/////////////////////\n"
				+ "//// 2D Elements ////\n"
				+ "/////////////////////\n\n"

				+ "// Create circle\n"
				+ "var radius = 0.5;\n"
				+ "var circle = new Circle(radius);\n"
				+ "circle.angle(360.0);\n\n"
				
				+ "// Create ellipse\n"
				+ "var rX = 0.5;\n"
				+ "var rY = 0.25;\n"
				+ "var rZ = 0.25;\n"
				+ "var ellipse = new Ellipse(rX, rY, rZ);\n"
				+ "ellipse.angle(360.0);\n\n"

				+ "// Create ring\n"
				+ "var radius1 = 1.0;\n"
				+ "var radius2 = 2.0;\n"
				+ 'var ring = new Ring(radius1, radius2);\n'
				+ "ring.angle(360.0);\n\n"

				+"// Create square\n"
				+ "var size = 1.0;\n"
				+ "var square = new Square(size);\n\n"

				+ "// Create rectangle\n"
				+ "var width = 2.0;\n"
				+ "var height = 1.0;\n"
				+ "var rect = new Rect(width, height);\n\n"
	
				+ "// Create polygon\n"
				+ "// Can use a 2D path instead of a list of vertices/points \n"
				+ "var points = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var axis = 'z';\n"
				+ "var polygon = new Polygon(points, axis);\n\n"
				
				+ "// Create regular polygon\n"
				+ "var radius = 1.0;\n"
				+ "var nbFaces = 3;\n"
				+ 'var regularPolygon = new RegularPolygon(radius, nbFaces);\n\n'

				+ "// Create a 2D ribbon from curve\n"
				+ "// Can use a 2D path instead of a list of vertices/points \n"
				+ "var points = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var width = 0.1;\n"
				+ "var axis = 'z';\n"
				+ "var cornerMode = 0; // 0: sharp, 1: bevel, 2: round\n"
				+ "var smoothAngle = 30.0;\n"
				+ "var ribbon = new RibbonFromCurve(points, width, axis, cornerMode, smoothAngle);\n\n";

	var code3D = "/////////////////////\n"
				+ "//// 3D Elements ////\n"
				+ "/////////////////////\n\n"

				+ "// Create sphere\n"
				+ "var radius = 0.5;\n"
				+ "var theta = 45.0;\n"
				+ "var phi = 45.0;\n"
				+ "var offsetPhi = 45.0;\n"
				+ "var sphere = new Sphere(radius);\n"
				+ "sphere.theta(theta);\n"
				+ "sphere.anglePhi(phi);\n"
				+ "sphere.offsetPhi(offsetPhi);\n\n"

				+ "// Create ellipsoid\n"
				+ "var radiusX = 1.0;\n"
				+ "var radiusY = 0.5;\n"
				+ "var radiusZ = 0.25;\n"
				+ "var ellipsoid = new Ellipsoid(radiusX, radiusY, radiusZ);\n\n"

				+ "// Create cube\n"
				+ "var size = 1.0;\n"
				+ "var cube = new Cube(size);\n\n"

				+ "// Create cuboid\n"
				+ "var widthX = 2.0;\n"
				+ "var widthY = 1.0;\n"
				+ "var widthZ = 0.5;\n"
				+ "var cuboid = new Cuboid(widthX, widthY, widthZ);\n\n"

				+ "// Create cylinder\n"
				+ "var radius1 = 0.75;\n"
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
				+ "cylinder.topClosed(topClosed);\n\n"

				+ "// Create cone\n"
				+ "var radius = 0.5;\n"
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
				+ "cone.bottomClosed(bottomClosed);\n\n"

				+ "// Create pipe\n"
				+ "var radius1 = 0.75;\n"
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
				+ "pipe.topClosed(topClosed);\n\n"

				+ "// Create pyramid\n"
				+ "var radius = 0.75;\n"
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
				+ "pyramid.bottomClosed(bottomClosed);\n\n"

				+ "// Create pyramid from polygon\n"
				+ "// Can use a 2D path instead of a list of vertices/points \n"
				+ "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var height = 2.0;\n"
				+ "var deltaX = 0.1;\n"
				+ "var deltaY = 0.1;\n"
				+ "var bottomClosed = true;\n"
				+ 'var pyramid = new PyramidFromPolygon(verticesList, height);\n'
				+ "pyramid.deltaX(deltaX);\n"
				+ "pyramid.deltaY(deltaY);\n"
				+ "pyramid.bottomClosed(bottomClosed);\n\n"

				+ "// Create prism\n"
				+ "var radius1 = 0.75;\n"
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
				+ "prism.topClosed(topClosed);\n\n"

				+ "// Create prism from polygon\n"
				+ "// Can use a 2D path instead of a list of vertices/points \n"
				+ "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
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
				+ "prism.topClosed(topClosed);\n\n"

				+ "// Create extrustion\n"
				+ "// Can use a 2D path instead of a list of vertices/points \n"
				+ "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var height = 1.0;\n"
				+ "var axis = 'z';\n"
				+ "var extrusion = new Extrusion(verticesList, height, axis);\n\n"

				+ "// Create prism revolution\n"
				+ "// Can use a 2D path instead of a list of vertices/points \n"
				+ "var verticesList = [[0.0, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var resolution = 5;\n"
				+ "var smoothTheta = 30.0;\n"
				+ "var angle = 45.0;\n"
				+ 'var revolution = new PrismRevolution(verticesList, resolution, smoothTheta);\n'
				+ "revolution.angle(angle);\n\n"

				+ "// Create revolution\n"
				+ "// Can use a 2D path instead of a list of vertices/points \n"
				+ "var verticesList = [[0.0, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var resolution = 5;\n"
				+ "var smoothTheta = 45.5;\n"
				+ "var angle = 45.0;\n"
				+ 'var revolution = new Revolution(verticesList, resolution, smoothTheta);\n'
				+ "revolution.angle(angle);\n\n"

				+ "// Create an extrusion from curve\n"
				+ "// Can use a 2D path instead of a list of vertices/points \n"
				+ "var points = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var height = 2.0;\n"
				+ "var width = 0.01;\n"
				+ "var axis = 'z';\n"
				+ "var cornerMode = 0; // 0: sharp, 1: bevel, 2: round\n"
				+ "var cornerAngle = 30.0;\n"
				+ "var extrusion = new ExtrudeCurve(verticesList, height, width, axis, cornerMode, cornerAngle);\n\n"

				+ "// Create a pipe from curve\n"
				+ "// Can use a 2D path as width \n"
				+ "var pipe = new PipeFromCurve($curve, $profileCurve, $width);\n\n";
	
	var codePathsCurves = "//////////////////////////\n"
				+ "//// Paths and curves ////\n"
				+ "//////////////////////////\n\n"
				 
				+ "// Create line\n"
				+ "var line = new Line([-1.0, -1.0, 0.0], [1.0, 1.0, 1.0]);\n\n"

				+ "// Create polyline\n"
				+ "var polyline = new Polyline([[-1.0, -1.0, 0.5], [1.0, -1.0, 1.0], [0.0, 1.0, 1.5], [-1.0, -1.0, 2.0]]);\n\n"

				+ "// Create path with functions\n"
				+ "var path = new Path([]);\n"
				+ 'path.moveTo([x, y, z]);\n'
				+ 'path.lineTo([x, y, z]);\n'
				+ 'path.arc([rx, ry], rotation, largeArcFlag, sweepFlag, [endX, endY, endZ]);\n'
				+ 'path.bezierQ([hx, hy, hz], [endX, endY, endZ]);\n'
				+ 'path.bezierC([h1x, h1y, h1z], [h2x, h2y, h2z], [endX, endY, endZ]);\n'
				+ 'path.close();\n\n'

				+ "// Create path width commands\n"
				+ "var path = new Path([['M', [x, y, z]], \n"
                + "				['L', [x, y, z]], \n"
                + "				['A', [rx, ry], rotation, largeArcFlag, sweepFlag, [endX, endY, endZ]], \n"
                + "				['Q', [hx, hy, hz], [endX, endY, endZ]], \n"
                + "				['C', [h1x, h1y, h1z], [h2x, h2y, h2z], [endX, endY, endZ]]);\n"
                + "				['Z']);\n\n"
				
				+ "// Reverse path orientation\n"
				+ "var reversedPath = path.reverse();\n\n"
				
				+ "// Get symetric path\n"
				+ "var symetricPath = path.symetry('yz');\n\n"
				
				+ "// Repeat path pattern\n"
				+ "var repeatPath = path.repeat(n);\n\n";
	
	var codePoints = "////////////////\n"
				+ "//// Points ////\n"
				+ "////////////////\n\n"

				+ "// Create list of points manually\n"
				+ "var points = [[-1.0, -1.0, -1.0], [1.0, -1.0, -1.0], [1.0, 1.0, -1.0], [-1.0, 1.0, -1.0],\n"
				+ "			[-1.0, -1.0, 1.0], [1.0, -1.0, 1.0], [1.0, 1.0, 1.0], [-1.0, 1.0, 1.0]];\n\n"

				+ "// Sample from path\n"
				+ "var points = path.samplePoints(n);\n\n"

				+ "// Sample from path with properties\n"
				+ "var points = path.samplePointsWithProperties(n);\n\n"

				/*
				+ "// Get coordinates of the point on the curve at length $t (value between 0. and 1.0)\n"
				+ "var t = 0.5;\n"
				+ "curve.pointAtLength(t);\n\n"

				+ "// Get tangent of the curve at length $t (value between 0. and 1.0)\n"
				+ "var t = 0.5;\n"
				+ "curve.tangentAtLength(t);\n\n"

				+ "// Get normal of the curve at length $t (value between 0. and 1.0)\n"
				+ "var t = 0.5;\n"
				+ "curve.normalAtLength(t);\n\n"

				+ "// Get curve length\n"
				+ "curve.totalLength();\n\n"
				//*/

				+ "// Create grid\n"
				+ "var pattern = new GridPattern(10.0, 10.0, 10.0, 5, 5, 5, false);\n"
				+ "pattern.random(1.0);\n"
				+ "pattern.seed(35);\n\n"

				+ "// Create Fibonacci pattern\n"
				+ "var pattern = new FibonacciPattern(5.0, 100);\n"
				+ "pattern.random(1.0);\n"
				+ "pattern.seed(35);\n\n";
			
	var codeInstances = "//////////////////////////////////////\n"
				+ "//// Doc and instances management ////\n"
				+ "//////////////////////////////////////\n\n"

				+ "// Create instance of an object\n"
				+ "var instance = new Instance(element);\n\n"

				+ "// Create group\n"
				+ "var group = new Group([object1, object2, objet3]);\n"
				+ "group.add(element);\n\n"

				+ "// Create stack\n"
				+ "var stack = new Stack([object1, object2, objet3], 'z', 1);\n"
				+ "stack.add(element);\n\n"
				
				+ "// Easy way to create instances of an object on each point of a list\n"
				+ "elementToCopy.instancesToPoints(listOfPoints, true);\n\n";

	var codeTransformations = "/////////////////////////\n"
				+ "//// Transformations ////\n"
				+ "/////////////////////////\n\n"
				
				+ "// Create translation\n"
				+ "var x = 5.0;\n"
				+ "var y = 5.0;\n"
				+ "var z = 5.0;\n"
				+ "var translation = new Translation(x, y, z);\n\n"
				
				+ "// Create rotation\n"
				+ "var angle = 45.0;\n"
				+ "var axis = 'z';\n"
				+ "var rotation = new Rotation(angle, axis);\n\n"
				
				+ "// Create scale\n"
				+ "var scaleX = 0.5;\n"
				+ "var scaleY = 1.5;\n"
				+ "var scaleZ = 2.0;\n"
				+ "var scale = new Scale(scaleX, scaleY, scaleZ);\n\n"
				
				//+ "// Create skewX\n"
				//+ "var skew = 25;\n"
				//+ "var skewX = new SkewX(skew);\n\n"
				
				//+ "// Create skewY\n"
				//+ "var skew = 25;\n"
				//+ "var skewY = new SkewY(skew);\n\n"
				
				+ "// Apply transformation to element\n"
				+ "element.add(transformation);\n\n"
				
				+ "// Apply transformation to group\n"
				+ "group.add(transformation);\n\n"
				
				+ "// Apply transformation to the document\n"
				+ "Doc.add(transformation);\n\n";
	
	var codeMaterials = "///////////////////\n"
				+ "//// Materials ////\n"
				+ "///////////////////\n\n"

				+ "// Create material\n"
				+ "var material = new Material('material-name');\n"
				+ "material.baseColor([1.0, 0.0, 0.0]);\n"
				+ "material.specularColor([1.0, 1.0, 0.0]);\n"
				+ "material.specular(10.0);\n\n"
				+ "element.material(material);\n\n";

	var html2D = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + code2D + '</pre>'
				+ '</div>';
	
	var html3D = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + code3D + '</pre>'
				+ '</div>';
	
	var htmlPathsCurve = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + codePathsCurves + '</pre>'
				+ '</div>';

	var htmlPoints = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + codePoints + '</pre>'
				+ '</div>';
	
	var htmlInstances = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + codeInstances + '</pre>'
				+ '</div>';

	var htmlTransformations = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + codeTransformations + '</pre>'
				+ '</div>';

	var htmlMaterials = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + codeMaterials + '</pre>'
				+ '</div>';

	
	
	var popupHTML = '<h2>Help</h2>'
					+ '<div id="tabManager" ></div>';

	var popup = new Popup(popupHTML);
	
	popup.addClass('help-popup');

	var tabManager = new TabManager();
	tabManager.setEditMode(false);

	var tab2D = new Tab('<span>' + "2D elements" + '</span>', new Component(html2D));
	tabManager.addTab(tab2D);

	var tab3D = new Tab('<span>' + "3D elements" + '</span>', new Component(html3D));
	tabManager.addTab(tab3D);

	var tabPathsCurve = new Tab('<span>' + "Paths and curves" + '</span>', new Component(htmlPathsCurve));
	tabManager.addTab(tabPathsCurve);

	var tabPoints = new Tab('<span>' + "Points" + '</span>', new Component(htmlPoints));
	tabManager.addTab(tabPoints);

	var tabInstances = new Tab('<span>' + "Doc and instances" + '</span>', new Component(htmlInstances));
	tabManager.addTab(tabInstances);

	var tabTransformations = new Tab('<span>' + "Transformations" + '</span>', new Component(htmlTransformations));
	tabManager.addTab(tabTransformations);

	var tabMaterials = new Tab('<span>' + "Materials" + '</span>', new Component(htmlMaterials));
	tabManager.addTab(tabMaterials);

	tab3D.select();

	popup.getById('tabManager').appendChild(tabManager);
	tabManager.style.top = "80px";
	tabManager.style.bottom = "30px";
	tabManager.style.left = "30px";
	tabManager.style.right = "30px";
	tabManager.style.border = "solid 1px rgb(120, 120, 120)";

	hljs.highlightElement(tab2D.getContent().getById('code-content'));
	hljs.highlightElement(tab3D.getContent().getById('code-content'));
	hljs.highlightElement(tabPathsCurve.getContent().getById('code-content'));
	hljs.highlightElement(tabPoints.getContent().getById('code-content'));
	hljs.highlightElement(tabInstances.getContent().getById('code-content'));
	hljs.highlightElement(tabTransformations.getContent().getById('code-content'));
	hljs.highlightElement(tabMaterials.getContent().getById('code-content'));
	
	//////////////
	// Méthodes //
	//////////////
	
	////////////////
	// Accesseurs //
	////////////////
	
	// GET
	
	// SET
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(popup, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("helpPopup");