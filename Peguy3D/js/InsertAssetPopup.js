function InsertAssetPopup($asset)
{
	///////////////
	// Attributs //
	///////////////

	var asset = $asset;
	var selected = null;

	console.log(asset);

	var svgCode = '<svg id="svg" viewBox="' + asset.viewBox + '" style="width: ' + asset.width + 'px; height: ' + asset.height + 'px; " >';

	for (var i = 0; i < asset.flatTree.length; i++)
		svgCode = svgCode + asset.flatTree[i].code;

	svgCode = svgCode + '</svg>';

	var popupHTML = '<h2>Insert asset</h2>'
						+ '<table>'
							+ '<tr>'
								+ '<td>'
									+ '<div class="insertSettingsPanel" >'
										+ '<div class="preview" >' + svgCode + '</div>'
									+ '</div>'
								+ '</td>'
								+ '<td>'
									+ '<div id="elementsList" class="elementsList" >'
									+ '</div>'
								+ '</td>'
							+ '</tr>'
							+ '<tr>'
								+ '<td style="text-align: left; " >Insert as <span id="typeComboBox" ></span></td>'
								+ '<td style="text-align: right; " >Convert to code <span id="convertToCodeCheckBox" ></span></td>'
							+ '</tr>'
						+ '</table>';
	
	var popup = new ConfirmPopup(popupHTML);
	
	popup.addClass('insert-asset-popup');

	// Liste des éléments du SVG

	var assetsListBox = new ListBox();
	popup.getById('elementsList').appendChild(assetsListBox);

	for (var i = 0; i < asset.flatTree.length; i++)
	{
		var itemSVGCode = '<svg id="svg" viewBox="' + asset.viewBox + '" >' + asset.flatTree[i].code + '</svg>';

		var itemHTML = '<div class="assetRow" >'
							+ '<div id="preview" class="preview" >' + itemSVGCode + '</div>'
							+ '<div>' + asset.flatTree[i].id + '</div>'
						+ '</div>';

		var item = new ListItem(itemHTML);

		item.id = asset.flatTree[i].id;
		item.code = asset.flatTree[i].code;
		item.node = asset.flatTree[i];
		//item.flatTree = assetList[i].flatTree;

		item.onClick = function($event)
		{
			console.log("Open insert settings...");
			deselectAll();
			selected = this;
			this.addClass('selected');
		};

		assetsListBox.addElement(item);
	}

	// Liste des types d'insertion

	var optionsTypes = [
		//{ name: "Polyline", value: "polyline" },
		{ name: "Polygon", value: "polygon" },
		{ name: "Path", value: "path" },
		{ name: "Extrusion", value: "extrusion" },
		{ name: "Revolution", value: "revolution" }
	];

	var comboBoxTypes = new ComboBox("insert_type", optionsTypes, "path", false);
	popup.getById('typeComboBox').appendChild(comboBoxTypes);

	var convertToCodeCheckBox = new CheckBox(true, 25);
	popup.getById("convertToCodeCheckBox").appendChild(convertToCodeCheckBox);
	
	//////////////
	// Méthodes //
	//////////////
	
	var deselectAll = function()
	{
		selected = null;

		var elements = assetsListBox.getElementsList();

		for (var i = 0; i < elements.length; i++)
			elements[i].removeClass('selected');
	};

	///////////////////////////////////
	// Initialisation des événements //
	///////////////////////////////////

	comboBoxTypes.onChange = function($value)
	{
		// Pour afficher des options spécifique dans le cas de la révolution
	};
	
	////////////////
	// Accesseurs //
	////////////////
	
	// GET
	
	this.getInsertCode = function()
	{
		var code = '';

		if (utils.isset(selected))
		{
			var type = comboBoxTypes.getCurrentValue();

			if (convertToCodeCheckBox.isChecked() === true)
			{
				console.log("COUCOU ! ");
				//console.log(selected);
				console.log(selected.code);
				//console.log(selected.node);

				var svgNode = new Component(selected.code);

				console.log(svgNode);

				code = VectorUtils.svgNodeToCode(svgNode);

				if (type === 'extrusion')
				{
					code = code + 'var extrusion = new Extrusion(wire.samplePoints(), 2.0, "z");\n\r';
				}
				else if (type === 'revolution')
				{
					code = code + 'var revolution = new Revolution(wire.samplePoints(), 32, 30.0);\n\r';
					//code = code + 'revolution.setAngle(360.0);\n\r';
				}
			}
			else
			{
				/*
				if (type === 'polyline')
				{
					code = code + 'var polyline = new Polyline();\n\r';
					code = code + 'polyline.loadFromAsset("' + asset.id + '", "' + selected.id + '");\n\r';
				}
				else //*/
				if (type === 'polygon')
				{
					code = code + 'var polygon = new Polygon();\n\r';
					code = code + 'polygon.loadFromAsset("' + asset.id + '", "' + selected.id + '");\n\r';
				}
				else if (type === 'path')
				{
					code = code + 'var path = new Path();\n\r';
					code = code + 'path.loadFromAsset("' + asset.id + '", "' + selected.id + '");\n\r';
					code = code + 'path.close();\n\r';
				}
				else if (type === 'extrusion')
				{
					code = code + 'var extrusion = new Extrusion([], 2.0, "z");\n\r';
					code = code + 'extrusion.loadFromAsset("' + asset.id + '", "' + selected.id + '");\n\r';
				}
				else if (type === 'revolution')
				{
					code = code + 'var revolution = new Revolution([], 32, 30.0);\n\r';
					//code = code + 'revolution.setAngle(360.0);\n\r';
					code = code + 'revolution.loadFromAsset("' + asset.id + '", "' + selected.id + '");\n\r';
				}
			}
		}

		return code;
	};
	
	// SET

	
	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(popup, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("insertAssetPopup");