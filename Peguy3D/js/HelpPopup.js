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
				+ "var circle = new Circle(radius);\n\n"
				
				+ "// Create ellipse\n"
				+ "var rX = 0.5;\n"
				+ "var rY = 0.25;\n"
				+ "var ellipse = new Ellipse(rX, rY);\n\n"
	
				+ "// Create polygon\n"
				+ "var points = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var axis = 'z';\n"
				+ "var polygon = new Polygon(points, axis);\n\n"
				
				+ "// Create rectangle\n"
				+ "var width = 2.0;\n"
				+ "var height = 1.0;\n"
				+ "var rect = new Rect(width, height);\n\n"

				+ "// Create regular polygon\n"
				+ "var radius = 1.0;\n"
				+ "var nbFaces = 3;\n"
				+ 'var regularPolygon = new RegularPolygon(radius, nbFaces);\n\n'

				+ "// Create ring\n"
				+ "var radius1 = 1.0;\n"
				+ "var radius2 = 2.0;\n"
				+ "var angle = 360.0;\n"
				+ 'var ring = new Ring(radius1, radius2, angle);\n\n'

				+"// Create square\n"
				+ "var size = 1.0;\n"
				+ "var square = new Square(size);\n\n"

				+ "// Create line (has curve type)\n"
				+ "var x1 = 0;\n"
				+ "var y1 = 0;\n"
				+ "var x2 = 1.0;\n"
				+ "var y2 = 1.0;\n"
				+ "var line = new Line(x1, y1, x2, y2);\n\n"
				
				+ "// Create path (has curve type)\n"
				+ "var operations = [['M', -0.25, -0.25], ['L', 0.25, -0.25], ['L', 0.0, 0.25], ['Z']];\n"
				+ "var path1 = new Path($operations);\n\n"
				
				+ "var path2 = new Path([]);\n"
				+ "path2.moveTo($x, $y);\n"
				+ "path2.lineTo($x, $y);\n"
				+ "path2.arc($rx, $ry, $rotation, $largeArcFlag, $sweepFlag, $endX, $endY);\n"
				+ "path2.bezierQ($hx, $hy, $endX, $endY);\n"
				+ "path2.bezierQT($hx, $hy, $endX, $endY, $htx, $hty);\n"
				+ "path2.bezierC($h1x, $h1y, $h2x, $h2y, $endX, $endY);\n"
				+ "path2.bezierCS($h1x, $h1y, $h2x, $h2y, $endX, $endY, $hs1x, $hs1y, $hs2x, $hs2y);\n"
				+ "path2.close();\n\n"
				
				+ "// Create polyline (has curve type)\n"
				+ "var points = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var polyline = new Polyline(points);\n\n";

	var code3D = "/////////////////////\n"
				+ "//// 3D Elements ////\n"
				+ "/////////////////////\n\n"

				+ "// Create cube\n"
				+ "var size = 1.0;\n"
				+ "var cube = new Cube(size);\n\n"

				+ "// Create cuboid\n"
				+ "var widthX = 2.0;\n"
				+ "var widthY = 1.0;\n"
				+ "var widthZ = 0.5;\n"
				+ "var cuboid = new Cuboid(widthX, widthY, widthZ);\n\n"

				+ "// Create cone\n"
				+ "var radius = 0.5;\n"
				+ "var height = 2.0;\n"
				+ "var angle = 45.0;\n"
				+ "var deltaX = 0.1;\n"
				+ "var deltaY = 0.1;\n"
				+ "var fill = true;\n"
				+ "var bottomClosed = true;\n"
				+ "var cone = new Cone(radius, height);\n"
				+ "cone.setAngle(angle);\n"
				+ "cone.setDeltaX(deltaX);\n"
				+ "cone.setDeltaY(deltaY);\n"
				+ "cone.setFill(fill);\n"
				+ "cone.setBottomClosed(bottomClosed);\n\n"

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
				+ "cylinder.setAngle(angle);\n"
				+ "cylinder.setDeltaX(deltaX);\n"
				+ "cylinder.setDeltaY(deltaY);\n"
				+ "cylinder.setFill(fill);\n"
				+ "cylinder.setBottomClosed(bottomClosed);\n"
				+ "cylinder.setTopClosed(topClosed);\n\n"

				+ "// Create ellipsoid\n"
				+ "var radiusX = 1.0;\n"
				+ "var radiusY = 0.5;\n"
				+ "var radiusZ = 0.25;\n"
				+ "var ellipsoid = new Ellipsoid(radiusX, radiusY, radiusZ);\n\n"

				+ "// Create extrustion\n"
				+ "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var height = 1.0;\n"
				+ "var axis = 'z';\n"
				+ "var extrusion = new Extrusion(verticesList, height, axis);\n\n"

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
				+ "pipe.setAngle(angle);\n"
				+ "pipe.setDeltaX(deltaX);\n"
				+ "pipe.setDeltaY(deltaY);\n"
				+ "pipe.setFill(fill);\n"
				+ "pipe.setBottomClosed(bottomClosed);\n"
				+ "pipe.setTopClosed(topClosed);\n\n"

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
				+ "prism.setAngle(angle);\n"
				+ "prism.setDeltaX(deltaX);\n"
				+ "prism.setDeltaY(deltaY);\n"
				+ "prism.setFill(fill);\n"
				+ "prism.setBottomClosed(bottomClosed);\n"
				+ "prism.setTopClosed(topClosed);\n\n"

				+ "// Create prism from polygon\n"
				+ "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var height = 2.0;\n"
				+ "var axis = 'z';\n"
				+ "var prism = new PrismFromPolygon(verticesList, height, axis);\n"
				+ "prism.setDeltaX(deltaX);\n"
				+ "prism.setDeltaY(deltaY);\n"
				+ "prism.setBottomClosed(bottomClosed);\n"
				+ "prism.setTopClosed(topClosed);\n\n"

				+ "// Create prism revolution\n"
				+ "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var resolution = 5;\n"
				+ "var smoothTheta = 45.5;\n"
				+ "var angle = 45.0;\n"
				+ 'var revolution = new PrismRevolution(verticesList, resolution, smoothTheta);\n'
				+ "revolution.setAngle(angle);\n\n"

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
				+ "pyramid.setAngle(angle);\n"
				+ "pyramid.setDeltaX(deltaX);\n"
				+ "pyramid.setDeltaY(deltaY);\n"
				+ "pyramid.setFill(fill);\n"
				+ "pyramid.setBottomClosed(bottomClosed);\n\n"

				+ "// Create pyramid from polygon\n"
				+ "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var height = 2.0;\n"
				+ "var deltaX = 0.1;\n"
				+ "var deltaY = 0.1;\n"
				+ "var bottomClosed = true;\n"
				+ 'var pyramid = new PyramidFromPolygon(verticesList, height);\n'
				+ "pyramid.setDeltaX(deltaX);\n"
				+ "pyramid.setDeltaY(deltaY);\n"
				+ "pyramid.setBottomClosed(bottomClosed);\n\n"

				+ "// Create revolution\n"
				+ "var verticesList = [[-0.25, -0.25], [0.25, -0.25], [0.0, 0.25]];\n"
				+ "var resolution = 5;\n"
				+ "var smoothTheta = 45.5;\n"
				+ "var angle = 45.0;\n"
				+ 'var revolution = new Revolution(verticesList, resolution, smoothTheta);\n'
				+ "revolution.setAngle(angle);\n\n"

				+ "// Create sphere\n"
				+ "var radius = 0.5;\n"
				+ "var angleTheta = 45.0;\n"
				+ "var anglePhi = 45.0;\n"
				+ "var offsetAnglePhi = 45.0;\n"
				+ "var sphere = new Sphere(radius);\n"
				+ "sphere.setAngleTheta(angleTheta);\n"
				+ "sphere.setAnglePhi(anglePhi);\n"
				+ "sphere.setOffsetAnglePhi(offsetAnglePhi);\n\n";
			
	var codeInstances = "//////////////////////////////////////\n"
				+ "//// Doc and instances management ////\n"
				+ "//////////////////////////////////////\n\n"

				+ "// Create instance of an object\n"
				+ "var instance = new Instance(element);\n\n"

				+ "// Easy way to create instances of an object on each point of a list\n"
				+ "elementToCopy.instancesToPoints(listOfPoints);\n\n"
				
				+ "// Create group\n"
				+ "var group = new Group();\n\n"
				
				+ "// Add element to group\n"
				+ "group.add(element);\n\n"
				
				+ "// Add element to the document\n"
				+ "Doc.add(element);\n\n";

	var codeProperties =  "/////////////////////////////\n"
				+ "//// Elements properties ////\n"
				+ "/////////////////////////////\n\n"

				+ "// Create material\n"
				+ "var material = new Material('material-name');\n"
				+ "material.setBaseColor([1.0, 0.625, 0.0]);\n"
				+ "material.setSpecularColor([1.0, 1.0, 0.0]);\n"
				+ "material.setSpecular(25.0);\n\n"

				+ "// Define element material\n"
				+ "element.setMaterial(material);\n\n"

				+ "//// Curves properties ////\n\n"

				+ "// Get curve length\n"
				+ "curve.totalLength();\n\n"

				+ "// Get coordinates of the point on the curve at length $t (value between 0. and 1.0)\n"
				+ "var t = 0.5;\n"
				+ "curve.pointAtLength(t);\n\n"

				+ "// Get tangent of the curve at length $t (value between 0. and 1.0)\n"
				+ "var t = 0.5;\n"
				+ "curve.tangentAtLength(t);\n\n"

				+ "// Get normal of the curve at length $t (value between 0. and 1.0)\n"
				+ "var t = 0.5;\n"
				+ "curve.normalAtLength(t);\n\n"

				+ "// Get n points on the curve\n"
				+ "var n = 10;\n"
				+ "curve.samplePoints(n);\n\n"

				+ "// Get n points on the curve with position data, tangent data and normal data\n"
				+ "var n = 10;\n"
				+ "curve.samplePointsWithProperties(n);\n\n";

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
				
	var codePoints = "///////////////////////////\n"
				+ "//// Points utilities ////\n"
				+ "//////////////////////////\n\n"
				
				+ "// Distance between 2 points\n"
				+ "var point1 = [0.0, 0.0, 0.0];\n"
				+ "var point2 = [10.0, 10.0, 10.0];\n"
				+ "var distance = Points.distance(point1, point2);\n\n"

				+ "// Create 2D grid of points\n"
				+ "var width = 5.0;\n"
				+ "var height = 2.5;\n"
				+ "var nX = 10;\n"
				+ "var nY = 5;\n"
				+ "var random = 10;\n"
				+ "Points.createGrid(width, height, nX, nY, random);\n\n"
				
				+ "// Create 2D grid of staggered points\n"
				+ "var width = 5.0;\n"
				+ "var height = 2.5;\n"
				+ "var nX = 10;\n"
				+ "var nY = 5;\n"
				+ "var random = 10;\n"
				+ "Points.createStaggeredGrid(width, height, nX, nY, random);\n\n"
				
				+ "// Create 2D Fibonacci pattern\n"
				+ "var width = 5.0;\n"
				+ "var height = 2.5;\n"
				+ "var nbDots = 100;\n"
				+ "var random = 0.1;\n"
				+ "Points.createFibonacciPattern(width, height, nbDots, random);\n\n"
				
				+ "// Remove points in the shape\n"
				+ "Points.cut($input, $shape);\n\n"
				
				+ "// Get points in the shape\n"
				+ "Points.intersect($input, $shape);\n\n"

				+ "// Union of 2 lists of points\n"
				+ "Points.union($input1, $input2);\n\n"
				
				+ "// Create inflection point\n"
				+ "var inflectionPoint = new InflectionPoint(x, y, angle, handleDistance1, handleDistance2);\n\n";

	var html2D = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + code2D + '</pre>'
				+ '</div>';
	
	var html3D = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + code3D + '</pre>'
				+ '</div>';
	
	var htmlInstances = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + codeInstances + '</pre>'
				+ '</div>';
	
	var htmlProperties = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + codeProperties + '</pre>'
				+ '</div>';

	var htmlTransformations = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + codeTransformations + '</pre>'
				+ '</div>';

	var htmlPoints = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + codePoints + '</pre>'
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

	var tabInstances = new Tab('<span>' + "Doc and instances" + '</span>', new Component(htmlInstances));
	tabManager.addTab(tabInstances);

	var tabProperties = new Tab('<span>' + "Elements properties" + '</span>', new Component(htmlProperties));
	tabManager.addTab(tabProperties);

	var tabTransformations = new Tab('<span>' + "Transformations" + '</span>', new Component(htmlTransformations));
	tabManager.addTab(tabTransformations);

	var tabPoints = new Tab('<span>' + "Points" + '</span>', new Component(htmlPoints));
	tabManager.addTab(tabPoints);

	tab2D.select();

	popup.getById('tabManager').appendChild(tabManager);
	tabManager.style.top = "80px";
	tabManager.style.bottom = "30px";
	tabManager.style.left = "30px";
	tabManager.style.right = "30px";
	tabManager.style.border = "solid 1px rgb(120, 120, 120)";

	hljs.highlightElement(tab2D.getContent().getById('code-content'));
	hljs.highlightElement(tab3D.getContent().getById('code-content'));
	hljs.highlightElement(tabInstances.getContent().getById('code-content'));
	hljs.highlightElement(tabProperties.getContent().getById('code-content'));
	hljs.highlightElement(tabTransformations.getContent().getById('code-content'));
	hljs.highlightElement(tabPoints.getContent().getById('code-content'));
	
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