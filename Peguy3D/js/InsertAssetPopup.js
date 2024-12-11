function InsertAssetPopup($asset)
{
	///////////////
	// Attributs //
	///////////////

	var asset = $asset;
	var selected = null;

	var svgCode = '<svg id="svg" viewBox="' + asset.viewBox + '" >';

	for (var i = 0; i < asset.flatTree.length; i++)
		svgCode = svgCode + asset.flatTree[i].code;

	svgCode = svgCode + '</svg>';

	var popupHTML = '<h2>Insert asset</h2>'
						+ '<div>'
							+ '<div class="insertSettingsPanel" >'
								+ '<div class="preview" >' + svgCode + '</div>'
								+ '<div style="margin-top: 20px;" >Insert as <span id="typeComboBox" ></span></div>'
							+ '</div>'
							+ '<div id="elementsList" class="elementsList" ></div>'
						+ '</div>';
	
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
				code = code + 'var extrusion = new Extrusion([], 2.0);\n\r';
				code = code + 'extrusion.loadFromAsset("' + asset.id + '", "' + selected.id + '");\n\r';
			}
			else if (type === 'revolution')
			{
				code = code + 'var revolution = new Revolution([], 360.0, "", 32);\n\r';
				code = code + 'revolution.loadFromAsset("' + asset.id + '", "' + selected.id + '");\n\r';
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