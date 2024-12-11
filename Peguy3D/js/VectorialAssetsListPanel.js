function VectorialAssetsListPanel()
{
	///////////////
	// Attributs //
	///////////////
	
	var component = new Component('<div class="vectorialAssetsListPanel" >'
									+ '<div id="topPanel" class="topPanel" >'
									+ '</div>'
									+ '<div id="bottomPanel" class="panel bottomPanel" >'
									+ '</div>'
								+ '</div>');

	//// Champ de recherche ////

	var searchInput = new InputSearch('text', 'Search asset');
	component.getById('topPanel').appendChild(searchInput);

	//// Liste des assets ////

	var vectorialAssetsListBox = new ListBox();
	component.getById('bottomPanel').appendChild(vectorialAssetsListBox);

	//////////////
	// Méthodes //
	//////////////

	this.updateAssetsList = function($assetList)
	{
		var searchCriteria = searchInput.getValue().toUpperCase();
		//var assetList = vectorialAssetsLibrary.getAssetList();
		var assetList = $assetList;

		vectorialAssetsListBox.removeAllElement();

		for (var i = 0; i < assetList.length; i++)
		{
			if (searchCriteria === '' || assetList[i].name.toUpperCase().indexOf(searchCriteria) >= 0 || assetList[i].keywords.toUpperCase().indexOf(searchCriteria) >= 0)
			{
				var svgCode = atob(assetList[i].data.replace('data:image/svg+xml;base64,', ''));
				svgCode = svgCode.replaceAll('\n', '');
				svgCode = svgCode.replaceAll('\t', '');
				svgCode = svgCode.replace(/^<.*\?>/, '');
				svgCode = svgCode.replace(/<!DOCTYPE .*><svg/, '<svg id="svg" ');

				var itemHTML = '<div class="vectorialAssetRow" >'
									+ '<div id="preview" class="preview" >' + svgCode + '</div>'
									+ '<div>' + assetList[i].name + '</div>'
								+ '</div>';

				var item = new ListItem(itemHTML);

				item.asset = assetList[i];
				item.id = assetList[i].id;
				item.flatTree = assetList[i].flatTree;

				item.onDblClick = function($event)
				{
					console.log("Open insert settings...");

					var insertPopup = new InsertAssetPopup(this.asset);
					document.getElementById('main').appendChild(insertPopup);

					insertPopup.onOk = function()
					{
						var codeToInsert = this.getInsertCode();

						console.log(codeToInsert);

						viewManager.insertCode(codeToInsert);
						
						return true;
					};
				};

				vectorialAssetsListBox.addElement(item);
			}
		}
	};

	///////////////////////////////////
	// Initialisation des événements //
	///////////////////////////////////

	//// Champ de recherche ////

	searchInput.onSearch = function($value) { viewManager.updateVectorialAssetsList(); };
	searchInput.onEmpty = function($value) { viewManager.updateVectorialAssetsList(); };

	////////////////
	// Accesseurs //
	////////////////
	
	// GET
	
	// SET

	var $this = utils.extend(component, this);
	return $this;
}
	
// A la fin du fichier Javascript, on signale au module de chargement que le fichier a fini de charger.
if (Loader !== undefined && Loader !== null)
	Loader.hasLoaded("vectorialAssetsListPanel");