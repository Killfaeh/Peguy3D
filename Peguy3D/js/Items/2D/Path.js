function Path($operations)
{
	///////////////
	// Attributs //
	///////////////

    var operations = [];
    var portions = [];
    var totalLength = 0.0;
    var closed = false;

    if (utils.isset($operations))
    {
        for (var i = 0; i < $operations.length; i++)
        {
            if (Array.isArray($operations[i]))
                operations.push($operations[i]);
            else
            {
                var subOperations = $operations[i].getOperations();

                for (var j = 0; j < subOperations.length; j++)
                {
                    if (j === 0 && operations.length > 0)
                    {
                        var prevOperation = operations[operations.length-1];
                        var prevPoint = subOperations[0][1];

                        if (prevOperation[0] === 'Z')
                            prevOperation = operations[operations.length-2];

                        if (prevOperation[0] === 'L' || prevOperation[0] === 'H' || prevOperation[0] === 'V' 
                            || prevOperation[0] === 'A' || prevOperation[0] === 'Q' || prevOperation[0] === 'C' 
                            || prevOperation[0] === 'QT' || prevOperation[0] === 'CS')
                        {
                            prevPoint = prevOperation[prevOperation.length-1];
                        }
                        /*
                        else if (prevOperation[0] === 'QT')
                            prevPoint = prevOperation[2];
                        else if (prevOperation[0] === 'CS')
                            prevPoint = prevOperation[3];
                        //*/

                        if (prevPoint[0] !== subOperations[0][1][0] || prevPoint[1] !== subOperations[0][1][1] || (utils.isset(prevPoint[2]) && utils.isset(subOperations[0][1][2]) && prevPoint[2] !== subOperations[0][1][2]))
                            operations.push(['L', subOperations[0][1]]);
                    }
                    else
                        operations.push(subOperations[j]);
                }
            }
        }
    }

    var curve = new Curve();

	//////////////
	// Méthodes //
	//////////////

    var init = function()
    {
        portions = [];
        totalLength = 0.0;
        startPoint = [0.0, 0.0, 0.0];

        for (var i = 0; i < operations.length; i++)
        {
            if (!utils.isset(startPoint[2]))
                startPoint.push(0.0);

            var operation = operations[i];
            var opType = operation[0];

            if (opType === 'M')
                startPoint = operation[1];
            else
            {
                var length = 0.0;
                var portion = { type: opType, data: [startPoint], length: length };

                if (opType === 'L' || opType === 'H' || opType === 'V')
                {
                    if (!utils.isset(operation[1][2]))
                        operation[1].push(0.0);

                    portion.data.push(operation[1]);
                    length = Vectors.distance(new Vector(startPoint), new Vector(operation[1]));
                }
                else if (opType === 'Z')
                {
                    if (!utils.isset(operations[0][1][2]))
                        operations[0][1].push(0.0);

                    portion.data.push(operations[0][1]);
                    length = Vectors.distance(new Vector(startPoint), new Vector(operations[0][1]));
                }
                else if (opType === 'Q')
                {
                    var curve = new BezierQuadratic(startPoint, operation[1], operation[2]);
                    portion.data = curve;
                    length = curve.totalLength();
                }
                else if (opType === 'QT')
                {
                    var curve = new BezierQuadratic(startPoint, operation[1], operation[2]);
                    portion.data = curve;
                    length = curve.totalLength();
                    portion.length = length;
                    totalLength = totaLength + length;
                    portions.push(portion);

                    var delta = Vectors.delta(new Vector(operations[i][1]), new Vector(operations[i][2]));
                    var handler = Vectors.sum([new Vector(operations[i][2]), delta]).values();

                    portion = { type: opType, data: [startPoint], length: length };
                    var curve = new BezierQuadratic(operation[2], handler, operation[3]);
                    portion.data = curve;
                    length = curve.totalLength();
                }
                else if (opType === 'C')
                {
                    var curve = new BezierCubic(startPoint, operation[1], operation[2], operation[3]);
                    portion.data = curve;
                    length = curve.totalLength();
                }
                else if (opType === 'CS')
                {
                    var curve = new BezierCubic(startPoint, operation[1], operation[2], operation[3]);
                    portion.data = curve;
                    length = curve.totalLength();
                    portion.length = length;
                    totalLength = totaLength + length;
                    portions.push(portion);

                    var delta = Vectors.delta(new Vector(operations[i][2]), new Vector(operations[i][3]));
                    var handler = Vectors.sum([new Vector(operations[i][3]), delta]).values();

                    portion = { type: opType, data: [startPoint], length: length };
                    var curve = new BezierCubic(operation[3], handler, operation[4], operation[5]);
                    portion.data = curve;
                    length = curve.totalLength();
                }
                else if (opType === 'A')
                {
                    var curve = new EllipseArc(startPoint, operation[5], operation[1], operation[2], operation[3], operation[4]);
                    portion.data = curve;
                    length = curve.totalLength();
                }

                portion.length = length;
                totalLength = totalLength + length;
                portions.push(portion);
                startPoint = operation[operation.length-1];
            }
        }

        //console.log("PORTIONS : ");
        //console.log(portions);
        //console.log("TOTAL LENGTH : " + totalLength);
    };

	this.computeSVG = function computeSVG()
    {
        if (portions.length <= 0)
            init();

        var d = '';

        for (var i = 0; i < operations.length; i++)
        {
            var type = operations[i][0];

            if (type === 'M')
                d = d + 'M ' + operations[i][1][0] + ',' + operations[i][1][1] + ' ';
            else if (type === 'L')
                d = d + 'L ' + operations[i][1][0] + ',' + operations[i][1][1] + ' ';
            else if (type === 'Z')
                d = d + 'Z ';
            else if (type === 'A')
                d = d + 'A ' + operations[i][1][0] + ' ' + operations[i][1][1] + ' ' + operations[i][2] + ' ' + operations[i][3] + ' ' + operations[i][4] + ' ' + operations[i][5][0] + ',' + operations[i][5][1] + ' ';
            else if (type === 'Q')
                d = d + 'Q ' + operations[i][1][0] + ',' + operations[i][1][1] + ' ' + operations[i][2][0] + ',' + operations[i][2][1] + ' ';
            else if (type === 'QT')
                d = d + 'Q ' + operations[i][1][0] + ',' + operations[i][1][1] + ' ' + operations[i][2][0] + ',' + operations[i][2][1] + ' T ' + operations[i][3][0] + ',' + operations[i][3][1] + ' ';
            else if (type === 'C')
                d = d + 'C ' + operations[i][1][0] + ',' + operations[i][1][1] + ' ' + operations[i][2][0] + ',' + operations[i][2][1] + ' ' + operations[i][3][0] + ',' + operations[i][3][1] + ' ';
            else if (type === 'CS')
                d = d + 'C ' + operations[i][1][0] + ',' + operations[i][1][1] + ' ' + operations[i][2][0] + ',' + operations[i][2][1] + ' ' + operations[i][3][0] + ',' + operations[i][3][1] + ' S ' + operations[i][4][0] + ',' + operations[i][4][1] + ' ' + operations[i][5][0] + ',' + operations[i][5][1] + ' ';
        }

        var objectCode = '<path d="' + d + '" />';

        var svgObject = new Component(objectCode);

        $this.execSuper('render', [svgObject], computeSVG);

        console.log("SVG LENGTH : " + svgObject.totalLength());

        return svgObject;
    };

    this.compute3D = function()
    {
        var glObject = $this.getGlObject();

        if (!utils.isset(glObject))
        {
            closed = false;

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

        return $this.computeTransforms(glObject);
    };

    this.addOperation = function($operation)
    {
        operations.push($operation);
        portions = [];
    };

    this.moveTo = function($point)
    {
        operations.push(['M', $point]);
        portions = [];
        return 'M ' + $point[0] + ',' + $point[1] + ' ';
    };

    this.lineTo = function($point)
    {
        operations.push(['L', $point]);
        portions = [];
        return 'L ' + $point[0] + ',' + $point[1] + ' ';
    };

    this.close = function()
    {
        operations.push(['Z']);
        return 'Z ';
    };

    this.arc = function($r, $rotation, $largeArcFlag, $sweepFlag, $end)
    {
        operations.push(['A', $r, $rotation, $largeArcFlag, $sweepFlag, $end]);
        portions = [];
        return 'A ' + $r[0] + ' ' + $r[1] + ' ' + $rotation + ' ' + $largeArcFlag + ' ' + $sweepFlag + ' ' + $end[0] + ',' + $end[1] + ' ';
    };

    this.bezierQ = function($h, $end)
    {
        operations.push(['Q', $h, $end]);
        portions = [];
        return 'Q ' + $h[0] + ',' + $h[1] + ' ' + $end[0] + ',' + $end[1] + ' ';
    };

    this.bezierQT = function($h, $end, $ht)
    {
        operations.push(['QT', $h, $end, $ht]);
        portions = [];
        return 'Q ' + $h[0] + ',' + $h[1] + ' ' + $end[0] + ',' + $end[1] + ' T ' + $ht[0] + ',' + $ht[1] + ' ';
    };

    this.bezierC = function($h1, $h2, $end)
    {
        operations.push(['C', $h1, $h2, $end]);
        portions = [];
        return 'C ' + $h1[0] + ',' + $h1[1] + ' ' + $h2[0] + ',' + $h2[1] + ' ' + $end[0] + ',' + $end[1] + ' ';
    };

    this.bezierCS = function($h1, $h2, $end, $hs1, $hs2)
    {
        operations.push(['CS', $h1, $h2, $end, $hs1, $hs2]);
        portions = [];
        return 'C ' + $h1[0] + ',' + $h1[1] + ' ' + $h2[0] + ',' + $h2[1] + ' ' + $end[0] + ',' + $end[1] + ' S ' + $hs1[0] + ',' + $hs1[1] + ' ' + $hs2[0] + ',' + $hs2[1] + ' ';
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
				
                $this.moveTo([x, y]);
                $this.lineTo([x, y+height]);
                $this.lineTo([x+width, y+height]);
                $this.lineTo([x+width, y]);
                $this.lineTo([x, y]);
                $this.close();
			}
            else if (svgNode.tagName === 'circle')
			{
				var cx = parseFloat(svgNode.getAttributeNS(null,  'cx'));
				var cy = parseFloat(svgNode.getAttributeNS(null,  'cy'));
				var r = parseFloat(svgNode.getAttributeNS(null,  'r'));

                $this.moveTo([cx, cy-r]);
                $this.arc([r, r], 0, 0, 0, [cx-r, cy]);
                $this.arc([r, r], 0, 0, 0, [cx, cy+r]);
                $this.arc([r, r], 0, 0, 0, [cx+r, cy]);
                $this.arc([r, r], 0, 0, 0, [cx, cy-r]);
                $this.close();
			}
            else if (svgNode.tagName === 'ellipse')
			{
				var cx = parseFloat(originalSVGnode.getAttributeNS(null,  'cx'));
				var cy = parseFloat(originalSVGnode.getAttributeNS(null,  'cy'));
				var rx = parseFloat(originalSVGnode.getAttributeNS(null,  'rx'));
				var ry = parseFloat(originalSVGnode.getAttributeNS(null,  'ry'));
				
				$this.moveTo([cx, cy-rx]);
                $this.arc([rx, ry], 0, 0, 0, [cx-rx, cy]);
                $this.arc([rx, ry], 0, 0, 0, [cx, cy+ry]);
                $this.arc([rx, ry], 0, 0, 0, [cx+rx, cy]);
                $this.arc([rx, ry], 0, 0, 0, [cx, cy-ry]);
                $this.close();
			}
            else if (svgNode.tagName === 'line')
			{
				var x1 = parseFloat(svgNode.getAttributeNS(null,  'x1'));
				var y1 = parseFloat(svgNode.getAttributeNS(null,  'y1'));
				var x2 = parseFloat(svgNode.getAttributeNS(null,  'x2'));
				var y2 = parseFloat(svgNode.getAttributeNS(null,  'y2'));
				
                $this.moveTo([x1, y1]);
                $this.lineTo([x2, y2]);
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
                            $this.moveTo([originalVertex[0], originalVertex[1]]);
                        else
                            $this.lineTo([originalVertex[0], originalVertex[1]]);
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
						
                        //console.log(commandArray);

						//*
						if (type === 'M')
						{
                            //console.log(commandArray[0]);
							var moveToVertexArray = commandArray[0].split(',');
                            //console.log(moveToVertexArray);
							var moveToVertex = [parseFloat(moveToVertexArray[0]), parseFloat(moveToVertexArray[1]), 1.0, 0.0];
                            $this.moveTo([moveToVertex[0], moveToVertex[1]]);
						}
						else if (type === 'L')
						{
							var lineToVertexArray = commandArray[0].split(',');
							var lineToVertex = [parseFloat(lineToVertexArray[0]), parseFloat(lineToVertexArray[1]), 1.0, 0.0];
							$this.lineTo([lineToVertex[0], lineToVertex[1]]);
						}
						else if (type === 'H')
						{
							var lineToVertexHArray = commandArray[0].split(',');
							var lineToVertexH = [parseFloat(lineToVertexHArray[0]), parseFloat(lineToVertexHArray[1]), 1.0, 0.0];
							$this.lineTo([lineToVertexH[0], lineToVertexH[1]]);
						}
						else if (type === 'V')
						{
							var lineToVertexVArray = commandArray[0].split(',');
							var lineToVertexV = [parseFloat(lineToVertexVArray[0]), parseFloat(lineToVertexVArray[1]), 1.0, 0.0];
							$this.lineTo([lineToVertexV[0], lineToVertexV[1]]);
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
							$this.arc([rx, ry], param1, param2, param3, [endVertex[0], endVertex[1]]);
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

                                $this.bezierQT([vertex1[0], vertex1[1]], [vertex2[0], vertex2[1]], [vertex3[0], vertex3[1]]);
                                i++;
                            }
                            else
                                $this.bezierQ([vertex1[0], vertex1[1]], [vertex2[0], vertex2[1]]);
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

                                $this.bezierCS([vertex1[0], vertex1[1]], [vertex2[0], vertex2[1]], [vertex3[0], vertex3[1]], [vertex4[0], vertex4[1]], [vertex5[0], vertex5[1]]);
                                i++;
                            }
                            else
                                $this.bezierC([vertex1[0], vertex1[1]], [vertex2[0], vertex2[1]], [vertex3[0], vertex3[1]]);
						}
                        else if (type === 'Z')
                            $this.close();
						//*/
					}
				}
			}
        }

        portions = [];
    };

    this.clone = function()
	{
		var clone = new Path(operations);
		clone.setTransformList(clone.getTransformList());
		return clone;
	};

    this.reverse = function()
    {
        var finishWithZ = false;
        var mPoint = [0.0, 0.0];
        var endPoint = [0.0, 0.0];

        var endOperation = operations[operations.length-1];

        if (endOperation[0] === 'Z')
            endOperation = operations[operations.length-2];

        //if (endOperation[0] === 'L' || endOperation[0] === 'H' || endOperation[0] === 'V' || endOperation[0] === 'Q' || endOperation[0] === 'C')
        if (endOperation[0] === 'M' || endOperation[0] === 'L' || endOperation[0] === 'H' || endOperation[0] === 'V' 
            || endOperation[0] === 'A' || endOperation[0] === 'Q' || endOperation[0] === 'C' 
            || endOperation[0] === 'QT' || endOperation[0] === 'CS')
        {
            mPoint = endOperation[endOperation.length-1];
            endPoint = endOperation[endOperation.length-1];
        }
        /*
        else if (endOperation[0] === 'QT')
        {
            mPoint = endOperation[2];
            endPoint = endOperation[2];
        }
        else if (endOperation[0] === 'CS')
        {
            mPoint = endOperation[3];
            endPoint = endOperation[3];
        }
        //*/

        var newOperations = [['M', mPoint]];

        for (var i = operations.length-1; i >= 0; i--)
        {
            var opType = operations[i][0];

            var nextOp = operations[i-1];

            if (!utils.isset(nextOp))
                nextOp = operations[0];

            if (nextOp[0] === 'Z')
                nextOp = operations[1];

            if (opType === 'Z')
                finishWithZ = true;
            else
            {
                var operation = [opType];
                endPoint = nextOp[nextOp.length-1];

                if (opType === 'M' || opType === 'L' || opType === 'H' || opType === 'V')
                    operation.push(endPoint);
                else if (opType === 'Q')
                {
                    operation.push(operations[i][1]);
                    operation.push(endPoint);
                }
                else if (opType === 'QT')
                {
                    var delta = Vectors.delta(new Vector(endPoint), new Vector(operations[i][1]));
                    var handler = Vectors.sum([new Vector(operations[i][1]), delta]).values();
                    operation.push(handler);
                    operation.push(operations[i][2]);
                    operation.push(endPoint);
                }
                else if (opType === 'C')
                {
                    operation.push(operations[i][2]);
                    operation.push(operations[i][1]);
                    operation.push(endPoint);
                }
                else if (opType === 'CS')
                {
                    var delta = Vectors.delta(new Vector(endPoint), new Vector(operations[i][2]));
                    var handler = Vectors.sum([new Vector(operations[i][2]), delta]).values();
                    operation.push(operations[i][4]);
                    operation.push(handler);
                    operation.push(operations[i][3]);
                    operation.push(operations[i][1]);
                    operation.push(endPoint);
                }
                else if (opType === 'A')
                {
                    operation.push(operations[i][1]);
                    //operation.push(operations[i][2]);

                    if (operations[i][2] === 0)
                        operation.push(1);
                    else
                        operation.push(0);

                    operation.push(operations[i][3]);
                    operation.push(operations[i][4]);
                    operation.push(endPoint);
                }

                newOperations.push(operation);
            }
        }

        if (finishWithZ === true)
            newOperations.push(['Z']);

        var newPath = new Path(newOperations);
        return newPath;
    };

    this.symetry = function($axis)
    {
        if (!utils.isset($axis))
            $axis = 'yz';

        var newOperations = [];

        for (var i = 0; i < operations.length; i++)
        {
            var operation = [];

            for (var j = 0; j < operations[i].length; j++)
            {
                if (Array.isArray(operations[i][j]))
                {
                    var point = [0.0, 0.0];

                    if ($axis === 'xy')
                    {
                        point[0] = operations[i][j][0];
                        point[1] = operations[i][j][1];

                        if (utils.isset(operations[i][j][2]))
                            point.push(-operations[i][j][2]);
                    }
                    else if ($axis === 'xz')
                    {
                        point[0] = operations[i][j][0];
                        point[1] = -operations[i][j][1];

                        if (utils.isset(operations[i][j][2]))
                            point.push(operations[i][j][2]);
                    }
                    else
                    {
                        point[0] = -operations[i][j][0];
                        point[1] = operations[i][j][1];

                        if (utils.isset(operations[i][j][2]))
                            point.push(operations[i][j][2]);
                    }

                    operation.push(point);
                }
                else
                    operation.push(operations[i][j]);
            }

            newOperations.push(operation);
        }

        return new Path(newOperations);
    };

    this.repeat = function($n)
    {
        var finishWithZ = false;

        var startOffset = [0.0, 0.0, 0.0];
        var nextOffset = [0.0, 0.0, 0.0];
        
        var newOperations = [];

        var endOperation = operations[operations.length-1];

        if (endOperation[0] === 'Z')
        {
            finishWithZ = true;
            endOperation = operations[operations.length-2];
        }

        for (var i = 0; i < operations.length; i++)
            newOperations.push(operations[i]);

        startOffset = operations[0][1];
        nextOffset = endOperation[endOperation.length-1];

        for (var i = 1; i < $n; i++)
        {
            for (var j = 0; j < operations.length; j++)
            {
                var originalOp = operations[j];
                var opType = originalOp[0];

                if (opType !== 'Z')
                {
                    if (opType === 'M')
                        opType = 'L';

                    var operation = [opType];

                    if (opType === 'L' || opType === 'H' || opType === 'V' || opType === 'Q' || opType === 'C' || opType === 'QT' || opType === 'CS')
                    {
                        for (var k = 1; k < originalOp.length; k++)
                        {
                            var point =
                            [
                                originalOp[k][0] - startOffset[0] + nextOffset[0],
                                originalOp[k][1] - startOffset[1] + nextOffset[1]
                            ];

                            if (utils.isset(originalOp[k][2]) && utils.isset(startOffset[2]) && utils.isset(nextOffset[2]))
                                point.push(originalOp[k][2] - startOffset[2] + nextOffset[2]);

                            operation.push(point);
                        }
                    }
                    else if (opType === 'A')
                    {
                        operation.push(originalOp[1]);
                        operation.push(originalOp[2]);
                        operation.push(originalOp[3]);
                        operation.push(originalOp[4]);

                        var point =
                        [
                            originalOp[5][0] - startOffset[0] + nextOffset[0],
                            originalOp[5][1] - startOffset[1] + nextOffset[1]
                        ];

                        if (utils.isset(originalOp[5][2]) && utils.isset(startOffset[2]) && utils.isset(nextOffset[2]))
                            point.push(originalOp[5][2] - startOffset[2] + nextOffset[2]);

                        operation.push(point);
                    }

                    newOperations.push(operation);
                }
            }

            //startOffset = nextOffset;
            nextOffset = newOperations[newOperations.length-1][newOperations[newOperations.length-1].length-1];
        }

        if (finishWithZ === true)
            newOperations.push(['Z']);

        return new Path(newOperations);
    };

    this.samplePointsWithProperties = function($n)
    {
        closed = false;
        var svgObject = $this.computeSVG();
        var glPointsList = [];

        if (utils.isset($n) && $n !== '' && $n > 0)
        {
            // Corriger le calcul des normales
            var n = $n;

            if (n < 2)
                n = 2;

            var lastType = portions[portions.length-1][0];

            if (lastType === 'Z')
                n = n+1;
            else
            {
                var firstPoint = [0.0, 0.0, 0.0];
                var lastPoint = [0.0, 0.0, 0.0];

                if (utils.isset(portions[0].data.pointAtLength))
                    firstPoint = portions[0].data.pointAtLength(0.0);
                else
                    firstPoint = portions[0].data[0];

                if (utils.isset(portions[portions.length-1].data.pointAtLength))
                    lastPoint = portions[portions.length-1].data.pointAtLength(1.0);
                else
                    lastPoint = portions[portions.length-1].data[1];

                console.log(firstPoint);
                console.log(lastPoint);

                if (Math.roundToDigit(firstPoint[0], PEGUY.glPrecision) === Math.roundToDigit(lastPoint[0], PEGUY.glPrecision) 
                    && Math.roundToDigit(firstPoint[1], PEGUY.glPrecision) === Math.roundToDigit(lastPoint[1], PEGUY.glPrecision)
                    && Math.roundToDigit(firstPoint[2], PEGUY.glPrecision) === Math.roundToDigit(lastPoint[2], PEGUY.glPrecision))
                {
                    n = n+1;
                }
            }

            //console.log("n : " + n);

            var stepLength = totalLength/(n-1);

            for (var i = 0; i < n; i++)
            {
                var step = i*stepLength;
                var offset = 0.0;

                for (var j = 0; j < portions.length; j++)
                {
                    var portion = portions[j];
                    var type = portion.type;
                    var data = portion.data;

                    if (step >= offset && step < offset + portion.length)
                    {
                        var t = (step - offset)/portion.length;

                        if (type === 'L' || type === 'H' || type === 'V' || type === 'Z')
                        {
                            if (type === 'Z')
                                closed = true;

                            var delta = Vectors.delta(new Vector(data[0]), new Vector(data[1])).values();
                            var point = [data[0][0] + t*delta[0], data[0][1] + t*delta[1], data[0][2] + t*delta[2]];
                            var tangent = (new Vector([data[1][0]-data[0][0], data[1][1]-data[0][1], data[1][2]-data[0][2]])).normalize().values();
                            var normal = [tangent.values()[1], -tangent.values()[0], tangent.values()[2]];
                            glPointsList.push({point: point, tangent: tangent, normal: normal, smooth: false, t: step/totalLength});
                        }
                        else
                        {
                            var point = data.pointAtLength(t);
                            var tangent = data.tangentAtLength(t);
                            var normal = Vectors.crossProduct(new Vector(tangent), new Vector([0.0, 0.0, 1.0])).values();
                            glPointsList.push({point: point, tangent: tangent, normal: normal, smooth: false, t: step/totalLength});
                        }

                        j = portions.length;
                    }

                    offset = offset + portion.length;
                }
            }
        }
        else
        {
            var Nsamples = Doc.resolution;
            var offset = 0.0;

            for (var i = 0; i < portions.length; i++)
            {
                var portion = portions[i];
                var type = portion.type;
                var data = portion.data;

                if (type === 'L' || type === 'H' || type === 'V')
                {
                    var delta = [data[1][0]-data[0][0], data[1][1]-data[0][1], data[1][2]-data[0][2]];
                    //var halfVertex = [(data[1][0]+data[0][0])/2.0, (data[1][1]+data[0][1])/2.0, (data[1][2]+data[0][2])/2.0];
                    var tangent = (new Vector(delta)).normalize().values();
                    var normal = [tangent[1], -tangent[0], tangent[2]];

                    if (i > 0 && portions[i-1].type !== 'L' && portions[i-1].type !== 'H' && portions[i-1].type !== 'V')
                    {
                        normal = glPointsList[glPointsList.length-1].normal;
                        var yAxis = Vectors.crossProduct(tangent, normal).normalize();
                        normal = Vectors.crossProduct(yAxis, tangent).normalize();
                    }

                    glPointsList.push({point: data[0], tangent: tangent, normal: normal, angle: Math.PI, smooth: false, t: offset/totalLength});
                    //glPointsList.push({point: halfVertex, tangent: tangent, normal: normal, angle: Math.PI, smooth: true, t: offset/totalLength});

                    for (var j = 1; j < Nsamples; j++)
                    {
                        var subVertex = [data[0][0] + j*delta[0]/Nsamples, data[0][1] + j*delta[1]/Nsamples, data[0][2] + j*delta[2]/Nsamples];
                        glPointsList.push({point: subVertex, tangent: tangent, normal: normal, angle: Math.PI, smooth: true, t: offset/totalLength});
                    }

                    if (i === portions.length-1)
                        glPointsList.push({point: data[1], tangent: tangent, normal: normal, angle: Math.PI, smooth: false, t: 1.0});
                }
                else if (type === 'Z')
                {
                    closed = true;

                    if (Math.abs(data[1][0]-data[0][0]) > Math.pow(10, -PEGUY.glPrecision) || Math.abs(data[1][1]-data[0][1]) > Math.pow(10, -PEGUY.glPrecision) || Math.abs(data[1][2]-data[0][2]) > Math.pow(10, -PEGUY.glPrecision))
                    {
                        var delta = [data[1][0]-data[0][0], data[1][1]-data[0][1], data[1][2]-data[0][2]];
                        //var halfVertex = [(data[1][0]+data[0][0])/2.0, (data[1][1]+data[0][1])/2.0, (data[1][2]+data[0][2])/2.0];
                        var tangent = (new Vector(delta)).normalize().values();
                        var normal = [tangent[1], -tangent[0], tangent[2]];

                        if (i > 0 && portions[i-1].type !== 'L' && portions[i-1].type !== 'H' && portions[i-1].type !== 'V')
                        {
                            normal = glPointsList[glPointsList.length-1].normal;
                            var yAxis = Vectors.crossProduct(tangent, normal).normalize();
                            normal = Vectors.crossProduct(yAxis, tangent).normalize();
                        }

                        glPointsList.push({point: data[0], tangent: tangent, normal: normal, angle: Math.PI, smooth: false, t: offset/totalLength});
                        //glPointsList.push({point: halfVertex, tangent: tangent, normal: normal, angle: Math.PI, smooth: true, t: offset/totalLength});

                        if (Math.roundToDigit(glPointsList[0].point[0], PEGUY.glPrecision) !== Math.roundToDigit(glPointsList[glPointsList.length-1].point[0], PEGUY.glPrecision) 
                            || Math.roundToDigit(glPointsList[0].point[1], PEGUY.glPrecision) !== Math.roundToDigit(glPointsList[glPointsList.length-1].point[1], PEGUY.glPrecision)
                            || Math.roundToDigit(glPointsList[0].point[2], PEGUY.glPrecision) !== Math.roundToDigit(glPointsList[glPointsList.length-1].point[2], PEGUY.glPrecision))
                        {
                            for (var j = 1; j < Nsamples; j++)
                            {
                                var subVertex = [data[0][0] + j*delta[0]/Nsamples, data[0][1] + j*delta[1]/Nsamples, data[0][2] + j*delta[2]/Nsamples];
                                glPointsList.push({point: subVertex, tangent: tangent, normal: normal, angle: Math.PI, smooth: true, t: offset/totalLength});
                            }
                        }

                        glPointsList.push({point: data[1], tangent: tangent, normal: normal, angle: Math.PI, smooth: false, t: 1.0});
                    }
                }
                else
                {
                    var samples = data.samplePointsForWebGL(Nsamples);
                    var endIndex = samples.length;

                    if (i !== portions.length-1)
                        endIndex = samples.length-1;

                    for (var j = 0; j < endIndex; j++)
                    {
                        samples[j].t = (offset + samples[j].t*portion.length)/totalLength
                        glPointsList.push(samples[j]);
                    }

                    //console.log("Portion sample : ");
                    //console.log(samples);
                }

                offset = offset + portion.length;
            }

            //console.log("POINTS : ");
            //console.log(glPointsList);

            for (var i = 0; i < glPointsList.length; i++)
            {
                if (Math.abs(glPointsList[i].point[0]) < Math.pow(10, -PEGUY.glPrecision))
                    glPointsList[i].point[0] = 0.0;

                if (Math.abs(glPointsList[i].point[1]) < Math.pow(10, -PEGUY.glPrecision))
                    glPointsList[i].point[1] = 0.0;

                if (utils.isset(glPointsList[i].point[2]) && Math.abs(glPointsList[i].point[2]) < Math.pow(10, -PEGUY.glPrecision))
                    glPointsList[i].point[2] = 0.0;
            }
        }

        // Correction des normales
        for (var i = 1; i < glPointsList.length; i++)
        {
            var tangentDot = Vectors.dotProduct(glPointsList[i-1].tangent, glPointsList[i].tangent);
            var normalDot = Vectors.dotProduct(glPointsList[i-1].normal, glPointsList[i].normal);
            
            /*
            console.log("Index " + i);
            console.log("NORMAL DOT : " + normalDot);
            console.log("TANGENT DOT : " + tangentDot);
            console.log(glPointsList[i-1].tangent);
            console.log(glPointsList[i].tangent);
            console.log(glPointsList[i-1].normal);
            console.log(glPointsList[i].normal);
            //*/

            //if (normalDot < 0.0)
            if (tangentDot > 0.0 && normalDot < 0.0)
            {
                glPointsList[i].normal = (new Vector(glPointsList[i].normal)).opposite().values();
            }

            if (tangentDot > 0.0 && tangentDot < 1.0 && normalDot !== 0.0)
            //if (tangentDot > 0.0 && normalDot !== 0.0)
            //if (normalDot !== 0.0)
            {
                // Tourner la normale
                var yAxis = Vectors.crossProduct(glPointsList[i].tangent, glPointsList[i-1].normal).normalize();
                glPointsList[i].normal = Vectors.crossProduct(yAxis, glPointsList[i].tangent).normalize().values();
            }
            else
            {

            }

            if (i < glPointsList.length-1)
            {
                var prevDelta = Vectors.delta(glPointsList[i].point, glPointsList[i-1].point);
                var nextDelta = Vectors.delta(glPointsList[i].point, glPointsList[i+1].point);
                var angle = Vectors.angle(prevDelta, nextDelta);
                glPointsList[i].angle = angle;
            }
        }

        if (closed === true)
        {
            /*
            if (Math.roundToDigit(glPointsList[0].point[0], PEGUY.glPrecision) === Math.roundToDigit(glPointsList[glPointsList.length-1].point[0], PEGUY.glPrecision) 
                && Math.roundToDigit(glPointsList[0].point[1], PEGUY.glPrecision) === Math.roundToDigit(glPointsList[glPointsList.length-1].point[1], PEGUY.glPrecision)
                && Math.roundToDigit(glPointsList[0].point[2], PEGUY.glPrecision) === Math.roundToDigit(glPointsList[glPointsList.length-1].point[2], PEGUY.glPrecision))
            {
                glPointsList.splice(glPointsList.length-1, 1);
            }
            //*/

            var prevDelta = Vectors.delta(glPointsList[0].point, glPointsList[glPointsList.length-2].point);
            var nextDelta = Vectors.delta(glPointsList[0].point, glPointsList[1].point);
            var angle = Vectors.angle(prevDelta, nextDelta);
            glPointsList[0].angle = angle;
            glPointsList[glPointsList.length-1].angle = angle;
        }

        if (closed === false && Math.roundToDigit(glPointsList[0].point[0], PEGUY.glPrecision) === Math.roundToDigit(glPointsList[glPointsList.length-1].point[0], PEGUY.glPrecision) 
                && Math.roundToDigit(glPointsList[0].point[1], PEGUY.glPrecision) === Math.roundToDigit(glPointsList[glPointsList.length-1].point[1], PEGUY.glPrecision)
                && Math.roundToDigit(glPointsList[0].point[2], PEGUY.glPrecision) === Math.roundToDigit(glPointsList[glPointsList.length-1].point[2], PEGUY.glPrecision))
        {
            closed = true;

            //console.log("Très proche ! On ferme ! ");

            var tangentDot = Vectors.dotProduct(glPointsList[glPointsList.length-2].tangent, glPointsList[0].tangent);
            var normalDot = Vectors.dotProduct(glPointsList[glPointsList.length-2].normal, glPointsList[0].normal);

            if (tangentDot > 0.0 && normalDot < 0.0)
            {
                glPointsList[0].normal = (new Vector(glPointsList[0].normal)).opposite().values();
                glPointsList[glPointsList.length-1].normal = glPointsList[0].normal;
            }

            if (tangentDot > 0.0 && tangentDot < 1.0 && normalDot !== 0.0)
            //if (normalDot !== 0.0)
            {
                // Tourner la normale
                var yAxis = Vectors.crossProduct(glPointsList[0].tangent, glPointsList[glPointsList.length-2].normal).normalize();
                glPointsList[0].normal = Vectors.crossProduct(yAxis, glPointsList[0].tangent).normalize().values();
            }
            else
            {

            }

            var prevDelta = Vectors.delta(glPointsList[0].point, glPointsList[glPointsList.length-2].point);
            var nextDelta = Vectors.delta(glPointsList[0].point, glPointsList[1].point);
            var angle = Vectors.angle(prevDelta, nextDelta);
            glPointsList[0].angle = angle;
            glPointsList[glPointsList.length-1].angle = angle;
        }

        //console.log("POINTS : ");
        //console.log(glPointsList);

        return glPointsList;
    };

    this.samplePoints = function($n)
    {
        var glPointsList = [];
        var samples = $this.samplePointsWithProperties($n);

        for (var i = 0; i < samples.length; i++)
        {
            if (i === 0 
                || Math.roundToDigit(samples[i].point[0], PEGUY.glPrecision) !== Math.roundToDigit(samples[i-1].point[0], PEGUY.glPrecision) 
                || Math.roundToDigit(samples[i].point[1], PEGUY.glPrecision) !== Math.roundToDigit(samples[i-1].point[1], PEGUY.glPrecision)
                || Math.roundToDigit(samples[i].point[2], PEGUY.glPrecision) !== Math.roundToDigit(samples[i-1].point[2], PEGUY.glPrecision))
            {
                glPointsList.push([samples[i].point[0], samples[i].point[1], samples[i].point[2]]);
            }
        }

        return glPointsList;
    };

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getOperations = function() { return operations; };
	this.getCommands = function() { return operations; };

	// SET
	
    this.setOperations = function($operations)
    {
        operations = $operations;
        portions = [];
    };

    this.setCommands = function($operations)
    {
        operations = $operations;
        portions = [];
    };

    this.commands = function($operations)
    {
        if (utils.isset($operation))
            $this.setOperations($operations);

        return operations;
    };

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(curve, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("path");