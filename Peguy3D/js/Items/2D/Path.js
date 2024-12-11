function Path($operations)
{
	///////////////
	// Attributs //
	///////////////

    var operations = $operations;

    if (!utils.isset(operations))
        operations = [];

    var curve = new Curve();

	//////////////
	// Méthodes //
	//////////////

	this.computeSVG = function()
    {
        var d = '';

        for (var i = 0; i < operations.length; i++)
        {
            var type = operations[i][0];

            if (type === 'M')
                d = d + 'M ' + operations[i][1] + ',' + operations[i][2] + ' ';
            else if (type === 'L')
                d = d + 'L ' + operations[i][1] + ',' + operations[i][2] + ' ';
            else if (type === 'Z')
                d = d + 'Z ';
            else if (type === 'A')
                d = d + 'A ' + operations[i][1] + ' ' + operations[i][2] + ' ' + operations[i][3] + ' ' + operations[i][4] + ' ' + operations[i][5] + ' ' + operations[i][6] + ',' + operations[i][7] + ' ';
            else if (type === 'Q')
                d = d + 'Q ' + operations[i][1] + ',' + operations[i][2] + ' ' + operations[i][3] + ',' + operations[i][4] + ' ';
            else if (type === 'QT')
                d = d + 'Q ' + operations[i][1] + ',' + operations[i][2] + ' ' + operations[i][3] + ',' + operations[i][4] + ' T ' + operations[i][5] + ',' + operations[i][6] + ' ';
            else if (type === 'C')
                d = d + 'C ' + operations[i][1] + ',' + operations[i][2] + ' ' + operations[i][3] + ',' + operations[i][4] + ' ' + operations[i][5] + ',' + operations[i][6] + ' ';
            else if (type === 'CS')
                d = d + 'C ' + operations[i][1] + ',' + operations[i][2] + ' ' + operations[i][3] + ',' + operations[i][4] + ' ' + operations[i][5] + ',' + operations[i][6] + ' S ' + operations[i][7] + ',' + operations[i][8] + ' ' + operations[i][9] + ',' + operations[i][10] + ' ';
        }

        var objectCode = '<path d="' + d + '" />';

        var svgObject = new Component(objectCode);

        $this['super'].computeSVG(svgObject);

        return svgObject;
    };

    this.compute3D = function()
    {
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
            var closed = false;

            if (operations[operations.length-1][0] === 'Z')
                closed = true;

            var glPointsList = [];
            var samples = $this.samplePointsWithProperties();

            for (var i = 0; i < samples.length; i++)
                glPointsList.push({x: samples[i].point[0], y: samples[i].point[1], z: 0.0});

            var object = new GLPolyline(glPointsList);

            if (closed === true)
                object = new GLPolygon(glPointsList);
            
            object.setVertexShaderName('vertex-normals');
            object.setFragmentShaderName('fragment-modeling');
            glObject = object;
            $this.setGlObject(glObject);
        }

        return $this['super'].compute3D(glObject.getInstance());
    };

    this.moveTo = function($x, $y)
    {
        operations.push(['M', $x, $y]);
        return 'M ' + $x + ',' + $y + ' ';
    };

    this.lineTo = function($x, $y)
    {
        operations.push(['L', $x, $y]);
        return 'L ' + $x + ',' + $y + ' ';
    };

    this.close = function()
    {
        operations.push(['Z']);
        return 'Z ';
    };

    this.arc = function($rx, $ry, $rotation, $largeArcFlag, $sweepFlag, $endX, $endY)
    {
        operations.push(['A', $rx, $ry, $rotation, $largeArcFlag, $sweepFlag, $endX, $endY]);
        return 'A ' + $rx + ' ' + $ry + ' ' + $rotation + ' ' + $largeArcFlag + ' ' + $sweepFlag + ' ' + $endX + ',' + $endY + ' ';
    };

    this.bezierQ = function($hx, $hy, $endX, $endY)
    {
        operations.push(['Q', $hx, $hy, $endX, $endY]);
        return 'Q ' + $hx + ',' + $hy + ' ' + $endX + ',' + $endY + ' ';
    };

    this.bezierQT = function($hx, $hy, $endX, $endY, $htx, $hty)
    {
        operations.push(['QT', $hx, $hy, $endX, $endY, $htx, $hty]);
        return 'Q ' + $hx + ',' + $hy + ' ' + $endX + ',' + $endY + ' T ' + $htx + ',' + $hty + ' ';
    };

    this.bezierC = function($h1x, $h1y, $h2x, $h2y, $endX, $endY)
    {
        operations.push(['C', $h1x, $h1y, $h2x, $h2y, $endX, $endY]);
        return 'C ' + $h1x + ',' + $h1y + ' ' + $h2x + ',' + $h2y + ' ' + $endX + ',' + $endY + ' ';
    };

    this.bezierCS = function($h1x, $h1y, $h2x, $h2y, $endX, $endY, $hs1x, $hs1y, $hs2x, $hs2y)
    {
        operations.push(['CS', $h1x, $h1y, $h2x, $h2y, $endX, $endY, $hs1x, $hs1y, $hs2x, $hs2y]);
        return 'C ' + $h1x + ',' + $h1y + ' ' + $h2x + ',' + $h2y + ' ' + $endX + ',' + $endY + ' S ' + $hs1x + ',' + $hs1y + ' ' + $hs2x + ',' + $hs2y + ' ';
    };

    this.loadFromAsset = function($assetId, $nodeId)
    {
        // Construire la liste d'opérations depuis un asset

        var vectorialAssetsLibrary = viewManager.getVectorialAssetsLibrary();
        var asset = vectorialAssetsLibrary.getAsset($assetId, $nodeId);

        console.log(asset);

        if (utils.isset(asset))
        {
            var svgNode = new Component(asset.code);

            console.log(asset.code);
            console.log(svgNode);

            if (svgNode.tagName === 'rect')
			{
				var x = parseFloat(svgNode.getAttributeNS(null,  'x'));
				var y = parseFloat(svgNode.getAttributeNS(null,  'y'));
				var width = parseFloat(svgNode.getAttributeNS(null,  'width'));
				var height = parseFloat(svgNode.getAttributeNS(null,  'height'));
				
                $this.moveTo(x, y);
                $this.lineTo(x, y+height);
                $this.lineTo(x+width, y+height);
                $this.lineTo(x+width, y);
                $this.lineTo(x, y);
                $this.close();
			}
            else if (svgNode.tagName === 'circle')
			{
				var cx = parseFloat(svgNode.getAttributeNS(null,  'cx'));
				var cy = parseFloat(svgNode.getAttributeNS(null,  'cy'));
				var r = parseFloat(svgNode.getAttributeNS(null,  'r'));

                $this.moveTo(cx, cy-r);
                $this.arc(r, r, 0, 0, 0, cx-r, cy);
                $this.arc(r, r, 0, 0, 0, cx, cy+r);
                $this.arc(r, r, 0, 0, 0, cx+r, cy);
                $this.arc(r, r, 0, 0, 0, cx, cy-r);
                $this.close();
			}
            else if (svgNode.tagName === 'ellipse')
			{
				var cx = parseFloat(originalSVGnode.getAttributeNS(null,  'cx'));
				var cy = parseFloat(originalSVGnode.getAttributeNS(null,  'cy'));
				var rx = parseFloat(originalSVGnode.getAttributeNS(null,  'rx'));
				var ry = parseFloat(originalSVGnode.getAttributeNS(null,  'ry'));
				
				$this.moveTo(cx, cy-rx);
                $this.arc(rx, ry, 0, 0, 0, cx-rx, cy);
                $this.arc(rx, ry, 0, 0, 0, cx, cy+ry);
                $this.arc(rx, ry, 0, 0, 0, cx+rx, cy);
                $this.arc(rx, ry, 0, 0, 0, cx, cy-ry);
                $this.close();
			}
            else if (svgNode.tagName === 'line')
			{
				var x1 = parseFloat(svgNode.getAttributeNS(null,  'x1'));
				var y1 = parseFloat(svgNode.getAttributeNS(null,  'y1'));
				var x2 = parseFloat(svgNode.getAttributeNS(null,  'x2'));
				var y2 = parseFloat(svgNode.getAttributeNS(null,  'y2'));
				
                $this.moveTo(x1, y1);
                $this.lineTo(x2, y2);
			}
            else if (svgNode.tagName === 'polyline' || svgNode.tagName === 'polygon')
			{
				var points = svgNode.getAttributeNS(null,  'points');
				
				if (utils.isset(points.split))
				{
					var pointsArray = points.split(' ');

					for (var i = 0; i < pointsArray.length; i++)
					{
						var vertex = pointsArray[i].split(',');
						var originalVertex = [parseFloat(vertex[0]), parseFloat(vertex[1]), 1.0, 0.0];
						
                        if (i === 0)
                            $this.moveTo(originalVertex[0], originalVertex[1]);
                        else
                            $this.lineTo(originalVertex[0], originalVertex[1]);
					}

                    if (svgNode.tagName === 'polygon')
                        $this.close();
				}
			}
            else if (svgNode.tagName === 'path')
			{
				var d = svgNode.getAttributeNS(null,  'd');
				
				if (utils.isset(d.replace))
				{
					var dWidthSeparator = d.replace(/([a-zA-Z])/gi, ';$1').replace(/^;/, '');
					var dArray = dWidthSeparator.split(';');

					for (var i = 0; i < dArray.length; i++)
					{
						var type = dArray[i][0];
						var commandArray = dArray[i].replace(/^[a-zA-Z]/, '').replace(/^ +/, '').replace(/ +$/, '').split(' ');
						
                        console.log(commandArray);

						//*
						if (type === 'M')
						{
                            console.log(commandArray[0]);
							var moveToVertexArray = commandArray[0].split(',');
                            console.log(moveToVertexArray);
							var moveToVertex = [parseFloat(moveToVertexArray[0]), parseFloat(moveToVertexArray[1]), 1.0, 0.0];
                            $this.moveTo(moveToVertex[0], moveToVertex[1]);
						}
						else if (type === 'L')
						{
							var lineToVertexArray = commandArray[0].split(',');
							var lineToVertex = [parseFloat(lineToVertexArray[0]), parseFloat(lineToVertexArray[1]), 1.0, 0.0];
							$this.lineTo(lineToVertex[0], lineToVertex[1]);
						}
						else if (type === 'H')
						{
							var lineToVertexHArray = commandArray[0].split(',');
							var lineToVertexH = [parseFloat(lineToVertexHArray[0]), parseFloat(lineToVertexHArray[1]), 1.0, 0.0];
							$this.lineTo(lineToVertexH[0], lineToVertexH[1]);
						}
						else if (type === 'V')
						{
							var lineToVertexVArray = commandArray[0].split(',');
							var lineToVertexV = [parseFloat(lineToVertexVArray[0]), parseFloat(lineToVertexVArray[1]), 1.0, 0.0];
							$this.lineTo(lineToVertexV[0], lineToVertexV[1]);
						}
						else if (type === 'A')
						{
							var rx = parseFloat(commandArray[0]);
							var ry = parseFloat(commandArray[1]);
							var param1 = parseFloat(commandArray[2]);
							var param2 = parseFloat(commandArray[3]);
							var param3 = parseFloat(commandArray[4]);
							var endVertexArray = commandArray[5].split(',');
							var endVertex = [parseFloat(endVertexArray[0]), parseFloat(endVertexArray[1]), 1.0, 0.0];
							$this.arc(rx, ry, param1, param2, param3, endVertex[0], endVertex[1]);
						}
						else if (type === 'Q')
						{
							var vertex1Array = commandArray[0].split(',');
							var vertex1 = [parseFloat(vertex1Array[0]), parseFloat(vertex1Array[1]), 1.0, 0.0];
							
							var vertex2Array = commandArray[1].split(',');
							var vertex2 = [parseFloat(vertex2Array[0]), parseFloat(vertex2Array[1]), 1.0, 0.0];

                            if (utils.isset(dArray[i+1]) && dArray[i+1][0] === 'T')
                            {
                                commandArray = dArray[i+1].replace(/^[a-zA-Z]/, '').split(' ');

                                var vertex3Array = commandArray[0].split(',');
							    var vertex3 = [parseFloat(vertex3Array[0]), parseFloat(vertex3Array[1]), 1.0, 0.0];

                                $this.bezierQT(vertex1[0], vertex1[1], vertex2[0], vertex2[1], vertex3[0], vertex3[1]);
                                i++;
                            }
                            else
                                $this.bezierQ(vertex1[0], vertex1[1], vertex2[0], vertex2[1]);
						}
						else if (type === 'C')
						{
							var vertex1Array = commandArray[0].split(',');
							var vertex1 = [parseFloat(vertex1Array[0]), parseFloat(vertex1Array[1]), 1.0, 0.0];
							
							var vertex2Array = commandArray[1].split(',');
							var vertex2 = [parseFloat(vertex2Array[0]), parseFloat(vertex2Array[1]), 1.0, 0.0];
							
							var vertex3Array = commandArray[2].split(',');
							var vertex3 = [parseFloat(vertex3Array[0]), parseFloat(vertex3Array[1]), 1.0, 0.0];
							
							if (utils.isset(dArray[i+1]) && dArray[i+1][0] === 'S')
                            {
                                commandArray = dArray[i+1].replace(/^[a-zA-Z]/, '').split(' ');

                                var vertex4Array = commandArray[0].split(',');
							    var vertex4 = [parseFloat(vertex4Array[0]), parseFloat(vertex4Array[1]), 1.0, 0.0];
							
							    var vertex5Array = commandArray[1].split(',');
							    var vertex5 = [parseFloat(vertex5Array[0]), parseFloat(vertex5Array[1]), 1.0, 0.0];

                                $this.bezierCS(vertex1[0], vertex1[1], vertex2[0], vertex2[1], vertex3[0], vertex3[1], vertex4[0], vertex4[1], vertex5[0], vertex5[1]);
                                i++;
                            }
                            else
                                $this.bezierC(vertex1[0], vertex1[1], vertex2[0], vertex2[1], vertex3[0], vertex3[1]);
						}
                        else if (type === 'Z')
                            $this.close();
						//*/
					}
				}
			}
        }

        console.log("Operations : ");
        console.log(operations);
    };

    this.clone = function()
	{
		var clone = new Path(operations);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

    this.samplePointsWithProperties = function($n)
    {
        var glPointsList = [];

        if (utils.isset($n) && $n !== '' && $n > 0)
        {
            var svgObject = $this.computeSVG();
            glPointsList = svgObject.samplePointsForWebGL($n);
        }
        else
        {
            for (var i = 1; i < operations.length; i++)
            {
                var previousOperation = operations[i-1];
                var previousType = previousOperation[0];
                var Mcoord = [0.0, 0.0];

                if (previousType === 'M')
                    Mcoord = [previousOperation[1], previousOperation[2]];
                else if (previousType === 'L')
                    Mcoord = [previousOperation[1], previousOperation[2]];
                else if (previousType === 'A')
                    Mcoord = [previousOperation[6], previousOperation[7]];
                else if (previousType === 'Q')
                    Mcoord = [previousOperation[3], previousOperation[4]];
                else if (previousType === 'QT')
                    Mcoord = [previousOperation[3], previousOperation[4]];
                else if (previousType === 'C')
                    Mcoord = [previousOperation[5], previousOperation[6]];
                else if (previousType === 'CS')
                    Mcoord = [previousOperation[5], previousOperation[6]];

                var d = 'M ' + Mcoord[0] + ',' + Mcoord[1] + ' ';

                var type = operations[i][0];

                if (type === 'L')
                    d = d + 'L ' + operations[i][1] + ',' + operations[i][2] + ' ';
                else if (type === 'A')
                    d = d + 'A ' + operations[i][1] + ' ' + operations[i][2] + ' ' + operations[i][3] + ' ' + operations[i][4] + ' ' + operations[i][5] + ' ' + operations[i][6] + ',' + operations[i][7] + ' ';
                else if (type === 'Q')
                    d = d + 'Q ' + operations[i][1] + ',' + operations[i][2] + ' ' + operations[i][3] + ',' + operations[i][4] + ' ';
                else if (type === 'QT')
                    d = d + 'Q ' + operations[i][1] + ',' + operations[i][2] + ' ' + operations[i][3] + ',' + operations[i][4] + ' T ' + operations[i][5] + ',' + operations[i][6] + ' ';
                else if (type === 'C')
                    d = d + 'C ' + operations[i][1] + ',' + operations[i][2] + ' ' + operations[i][3] + ',' + operations[i][4] + ' ' + operations[i][5] + ',' + operations[i][6] + ' ';
                else if (type === 'CS')
                    d = d + 'C ' + operations[i][1] + ',' + operations[i][2] + ' ' + operations[i][3] + ',' + operations[i][4] + ' ' + operations[i][5] + ',' + operations[i][6] + ' S ' + operations[i][7] + ',' + operations[i][8] + ' ' + operations[i][9] + ',' + operations[i][10] + ' ';
                else if (type === 'Z')
                    d = d + 'L ' + operations[0][1] + ',' + operations[0][2] + ' ';
                    
                var objectCode = '<path d="' + d + '" />';
                var svgObject = new Component(objectCode);

                // { point: point, tangent: tangent, normal: normal, smooth: true};

                //*
                if (type === 'L')
                {
                    var tangent = Math.normalizeVector([operations[i][1]-Mcoord[0], operations[i][2]-Mcoord[1], 0.0]);
                    var normal = [tangent[1], -tangent[0], 0.0];
                    glPointsList.push({point: [Mcoord[0], Mcoord[1], 0.0], tangent: tangent, normal: normal, smooth: false});
                    glPointsList.push({point: [operations[i][1], operations[i][2], 0.0], tangent: tangent, normal: normal, smooth: false});
                }
                else if (type === 'Z')
                {
                    closed = true;
                    var tangent = Math.normalizeVector([operations[i][1]-Mcoord[0], operations[i][2]-Mcoord[1], 0.0]);
                    var normal = [tangent[1], -tangent[0], 0.0];
                    glPointsList.push({point: [Mcoord[0], Mcoord[1], 0.0], tangent: tangent, normal: normal, smooth: false});
                    glPointsList.push({point: [operations[0][1], operations[0][2], 0.0], tangent: tangent, normal: normal, smooth: false});
                }
                else
                {
                    var totalLength = svgObject.totalLength();
                    var Nsamples = 32;
                    var samples = svgObject.samplePointsForWebGL(Nsamples);

                    for (var j = 0; j < samples.length; j++)
                        glPointsList.push(samples[j]);
                }
                //*/

                /*
                var subSample = 16;

                var totalLength = svgObject.totalLength();
                var Nsamples = subSample;
                var samples = svgObject.samplePointsForWebGL(Nsamples);

                for (var j = 0; j < samples.length; j++)
                    glPointsList.push(samples[j]);
                //*/
            }
        }

        return glPointsList;
    };

    this.samplePoints = function($n)
    {
        var glPointsList = [];
        var samples = $this.samplePointsWithProperties($n);

        for (var i = 0; i < samples.length; i++)
            glPointsList.push([samples[i].point[0], samples[i].point[1], 0.0]);

        return glPointsList;
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getOperations = function() { return operations; };

	// SET
	
    this.setOperations = function($operations)
    {
        operations = $operations;
    };

    this.operations = function($operations) { $this.setOperations($operations); };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("path");