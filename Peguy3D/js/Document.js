function Document()
{
	///////////////
	// Attributs //
	///////////////

	var filePath = "";
	var saved = true;

	var html = '<div class="document" ></div>';

    var component = new Component(html);

    var grid = new DocGrid();
    component.appendChild(grid);

	var previewPanel = new PreviewPanel();

	var iconsMenuParam = 
	[
		{ name: "run-script", iconFile: "icons", iconName: "right-double-arrow-icon", toolTip: "Run script", action: function() { execProgram(); } },
		{ name: "add-script", iconFile: "icons", iconName: "add-element-icon", toolTip: "Add script", action: function() { addScript(); } },
	];

	var iconsMenu = new IconsMenu(iconsMenuParam, 20);

	grid.getById('toolsPanel').appendChild(iconsMenu);

	var tabManager = new TabManager();
	tabManager.setEditMode(true);

	var mainScriptEditor = new CodeEditor('javascript');

	var mainTab = new Tab('<span>' + "main.js" + '</span>', mainScriptEditor);
	tabManager.addTab(mainTab);

	var script = new Component('<script type="text/javascript" ></script>');
	var errorConsoleHTML = '<pre><code id="errorConsole" ></code></pre>';
	var errorConsole = new Component(errorConsoleHTML);

	grid.getById('rightPanel').appendChild(previewPanel);
	grid.getById('topPanel').appendChild(tabManager);
	grid.getById('bottomPanel').appendChild(errorConsole);

	// Ajouter un bouton pour accéder à une bibliothèque d'assets

	//////////////
	// Méthodes //
	//////////////

	var scriptNameIsOk = function($scriptName)
	{
		var scriptNameOk = false;
		var scriptName = $scriptName.replace(/\.js$/, "");

		if (/^[a-zA-Z0-9]+$/.test(scriptName))
			scriptNameOk = true;

		return scriptNameOk;
	};

	var scriptNameDoesntExist = function($scriptName)
	{
		var scriptNameOk = true;
		var scriptName = $scriptName.replace(/\.js$/, "");

		var tabList = tabManager.getTabList();

		for (var i = 0; i < tabList.length; i++)
		{
			var label = tabList[i].getLabel();
			label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");

			if (label === scriptName)
				scriptNameOk = false;
		}

		return scriptNameOk;
	};

	var addScript = function()
	{
		var addScriptPopup = new ConfirmPopup('<h3>Add script</h3><p><input id="script-name" type="text" placeholder="Script name" /></p>');

		addScriptPopup.onOk = function()
		{
			var ok = false;

			var scriptName = this.getById('script-name').value;

			if (utils.isset(scriptName) && scriptName !== "" && scriptNameIsOk(scriptName) === true && scriptNameDoesntExist(scriptName) === true)
			{
				var newCodeEditor = new CodeEditor('javascript');
				scriptName = scriptName.replace(/\.js$/, "");
				var newTab = new Tab('<span>' + scriptName + '.js</span>', newCodeEditor);
				tabManager.addTab(newTab);

				newTab.onClose = function()
				{
					var close = false;
					var label = this.getLabel();
					label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");
					var removePopup = new ConfirmPopup('<p>Are you sure you want to remove the script "' + label + '" ? </p>');
					document.getElementById('main').appendChild(removePopup);
					removePopup.tabToRemove = this;

					removePopup.onOk = function()
					{
						var removeOk = true;
						this.tabToRemove.onClose = function() { return true; };
						tabManager.removeTab(this.tabToRemove);
						return removeOk;
					};

					return close;
				};

				newTab.onSelect = function($tab) { $tab.getContent().restoreScroll(); };

				newCodeEditor.onChange = function($code) { onChange($code); };

				$this.setSaved(false);
				ok = true;
			}
			else if (scriptNameIsOk(scriptName) !== true)
			{
				ok = false;
				var infoPopup = new InfoPopup('<p>The script name is incorrect (only ASCII characters).</p>');
				document.getElementById('main').appendChild(infoPopup);
			}
			else if (scriptNameDoesntExist(scriptName) !== true)
			{
				ok = false;
				var infoPopup = new InfoPopup('<p>A script with this name already exists.</p>');
				document.getElementById('main').appendChild(infoPopup);
			}
			else
			{
				ok = false;
				var infoPopup = new InfoPopup('<p>The script name can\'t be empty.</p>');
				document.getElementById('main').appendChild(infoPopup);
			}

			return ok;
		};

		document.getElementById('main').appendChild(addScriptPopup);
	};

	this.focusCodeEditor = function()
	{

	};

	this.refresh = function() { previewPanel.refresh(); };

	var execCode = function($code)
	{
		console.log($code);

		var code = $code.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

		var scriptParent = script.parentNode;

		if (utils.isset(scriptParent))
			scriptParent.removeChild(script);
		
		Doc.empty();
		viewManager.refresh();

		script = new Component('<script type="text/javascript" >var scriptToExec = function() { ' + code + '\n};\n try { scriptToExec();\nviewManager.emptyError();\nviewManager.refresh(); }\ncatch($error) { viewManager.displayError($error); } </script>');
		document.getElementById('main').appendChild(script);
	};

	var onChange = function($code)
	{
		$this.setSaved(false);
	};

	var execProgram = function()
	{
		//viewManager.save();

		var codeToExec = mainScriptEditor.getCode();

		var tabList = tabManager.getTabList();

		for (var i = 0; i < tabList.length; i++)
		{
			var label = tabList[i].getLabel();
			label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");
			
			if (label !== 'main')
			{
				var scriptCode = tabList[i].getContent().getCode();
				codeToExec = codeToExec.replace("loadScript('" + label + "')", scriptCode);
				codeToExec = codeToExec.replace("loadScript('" + label + ".js')", scriptCode);
				codeToExec = codeToExec.replace('loadScript("' + label + '")', scriptCode);
				codeToExec = codeToExec.replace('loadScript("' + label + '.js")', scriptCode);
				codeToExec = codeToExec.replaceAll("loadScript('" + label + "')", '');
				codeToExec = codeToExec.replaceAll("loadScript('" + label + ".js')", '');
				codeToExec = codeToExec.replaceAll('loadScript("' + label + '")', '');
				codeToExec = codeToExec.replaceAll('loadScript("' + label + '.js")', '');
			}
			else
			{
				codeToExec = codeToExec.replaceAll("loadScript('main')", '');
				codeToExec = codeToExec.replaceAll("loadScript('main.js')", '');
				codeToExec = codeToExec.replaceAll('loadScript("main")', '');
				codeToExec = codeToExec.replaceAll('loadScript("main.js")', '');
			}
		}

		execCode(codeToExec);

		previewPanel.resize();
	};

	this.insertAsset = function($data)
	{
		var selectedTab = tabManager.getSelected();

		if (utils.isset(selectedTab))
		{
			var selectedScriptEditor = selectedTab.getContent();
			//selectedScriptEditor.getById('editor').appendChild(document.createTextNode('\n\rvar asset = new Asset("' + $data + '");'));
			//selectedScriptEditor.getById('editor').appendChild(new Component('<p style="padding: 0px; margin: 0px; height: 0px;" ></p>'));
			//selectedScriptEditor.getById('editor').appendChild(document.createTextNode('\n\r'));
			//selectedScriptEditor.refresh();
			var codeToInsert = '\n\rvar asset = new Asset("' + $data + '");\n\r';
			selectedScriptEditor.insertCode(codeToInsert);
			$this.setSaved(false);
		}
	};

	this.insertCode = function($code)
	{
		var selectedTab = tabManager.getSelected();

		if (utils.isset(selectedTab))
		{
			var selectedScriptEditor = selectedTab.getContent();
			//selectedScriptEditor.insertCode('\n\r' + $code + '\n\r');
			selectedScriptEditor.insertCode('\n\r' + $code.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>') + '\n\r');
			$this.setSaved(false);
		}
	};

	this.restoreScroll = function()
	{
		var selectedTab = tabManager.getSelected();

		if (utils.isset(selectedTab))
		{
			var selectedScriptEditor = selectedTab.getContent();
			selectedScriptEditor.restoreScroll();
		}
	};

	this.displayError = function($error)
	{
		console.log($error);
		errorConsole.getById('errorConsole').innerHTML = $error.stack;
	};

	this.emptyError = function()
	{
		errorConsole.getById('errorConsole').innerHTML = "";

		var scriptParent = script.parentNode;

		if (utils.isset(scriptParent))
			scriptParent.removeChild(script);
	};

	this.resize = function resize() { previewPanel.resize(); };

	////////////////////////////
	// Gestion des événements //
	////////////////////////////

	mainTab.onClose = function()
	{
		var close = false;
		var infoPopup = new InfoPopup('<p>Main script can\'t be removed.</p>');
		document.getElementById('main').appendChild(infoPopup);
		return close;
	};

	//this.onKeyDown = function($event) { mainScriptEditor.onKeyDown($event); };
	mainScriptEditor.onChange = function($code) { onChange($code); };

	////////////////
	// Accesseurs //
	////////////////

	// GET
	
	this.getFilePath = function() { return filePath; };
	this.isSaved = function() { return saved; };

	this.getCode = function()
	{
		var code = {};

		var tabList = tabManager.getTabList();

		for (var i = 0; i < tabList.length; i++)
		{
			var label = tabList[i].getLabel();
			label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");
			var scriptCode = tabList[i].getContent().getCode();
			code[label] = scriptCode;
		}

		return code;
	};

	this.getOBJdata = function()
	{
		var objData = { v: [], vn: [], vt: [], f: [], materials: [] };

		var scene = previewPanel.getScene();

		if (!utils.isset(scene))
		{
			execProgram();
			scene = previewPanel.getScene();
		}

		var sceneRawData = scene.getRawData();

		objData.vt = sceneRawData.vt;
		objData.f = sceneRawData.f;
		objData.materials = sceneRawData.materials;

		var rotateMatrix = new RotateMatrix(1, 0, 0, 90.0);

		var vertices = sceneRawData.v;
		var nbVertices = vertices.length/3;

		for (var j = 0; j < nbVertices; j++)
		{
			var x = vertices[j*3];
			var y = vertices[j*3+1];
			var z = vertices[j*3+2];
			var outputVector = rotateMatrix.multiplyVect([x, y, z, 1.0]);
			objData.v.push(outputVector[0]);
			objData.v.push(outputVector[1]);
			objData.v.push(outputVector[2]);
		}

		var normals = sceneRawData.vn;

		for (var j = 0; j < nbVertices; j++)
		{
			var x = normals[j*3];
			var y = normals[j*3+1];
			var z = normals[j*3+2];
			var outputVector = rotateMatrix.multiplyVect([x, y, z, 1.0]);
			outputVector = Math.normalizeVector(outputVector);
			objData.vn.push(outputVector[0]);
			objData.vn.push(outputVector[1]);
			objData.vn.push(outputVector[2]);
		}

		return objData;
	};

	this.getCOLLADAdata = function()
	{
		var scene = previewPanel.getScene();

		if (!utils.isset(scene))
		{
			execProgram();
			scene = previewPanel.getScene();
		}

		var colladaInstanceList = scene.getCOLLADAdata();

		var libraryEffectCode = '	<library_effects>\n';
		var libraryMaterials = '	<library_materials>\n';
		var libraryGeometries = '	<library_geometries>\n';
		var libraryScenes = '	<library_visual_scenes>\n		<visual_scene id="Scene" name="Scene">\n';

		for (var key in MATERIALS)
		{
			var matColladaData = MATERIALS[key].getGLMaterial().getCOLLADAdata();
			libraryEffectCode = libraryEffectCode + matColladaData.effectCode;
			libraryMaterials = libraryMaterials + matColladaData.materialCode;
		}

		for (var key in COLLADA_MESH)
			libraryGeometries = libraryGeometries + COLLADA_MESH[key].geometryCode;

		for (var i = 0; i < colladaInstanceList.length; i++)
		{
			var meshID = colladaInstanceList[i].meshID;
			var instanceMatrix = colladaInstanceList[i].transformMatrix;
			var instanceID = (new Date()).getTime() + '' + Math.round(Math.random()*1000000.0);

			var instanceCode = '			<node id="' + instanceID + '" name="' + instanceID + '" type="NODE">\n';
			instanceCode = instanceCode + '				<matrix sid="transform">';

			var matrixArray = instanceMatrix.getMatrix();

			for (var j = 0; j < 4; j++)
			{
				for (var k = 0; k < 4; k++)
				instanceCode = instanceCode + matrixArray[k][j] + ' ';
			}

			instanceCode = instanceCode + '</matrix>\n';
			instanceCode = instanceCode + '				<instance_geometry url="#' + meshID + '-mesh" name="' + instanceID + '">\n';
			instanceCode = instanceCode + '					<bind_material>\n';
			instanceCode = instanceCode + '						<technique_common>\n';
			instanceCode = instanceCode + '							<instance_material symbol="' + colladaInstanceList[i].materialName + '-material" target="#' + colladaInstanceList[i].materialName + '-material">\n';
			instanceCode = instanceCode + '								<bind_vertex_input semantic="UVMap" input_semantic="TEXCOORD" input_set="0"/>\n';
			instanceCode = instanceCode + '							</instance_material>\n';
			instanceCode = instanceCode + '						</technique_common>\n';
			instanceCode = instanceCode + '					</bind_material>\n';
			instanceCode = instanceCode + '				</instance_geometry>\n';
			instanceCode = instanceCode + '			</node>\n';

			libraryScenes = libraryScenes + instanceCode;
		}

		libraryEffectCode = libraryEffectCode + '	</library_effects>\n';
		libraryMaterials = libraryMaterials + '	</library_materials>\n';
		libraryGeometries = libraryGeometries + '	</library_geometries>\n';
		libraryScenes = libraryScenes + '		</visual_scene>\n	</library_visual_scenes>\n';

		var colladaCode = '<?xml version="1.0" encoding="utf-8"?>\n';
		colladaCode = colladaCode + '<COLLADA xmlns="http://www.collada.org/2005/11/COLLADASchema" version="1.4.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n';
		colladaCode = colladaCode + '	<asset>\n';
		colladaCode = colladaCode + '		<contributor>\n';
		colladaCode = colladaCode + '			<author>Péguy 3D User</author>\n';
		colladaCode = colladaCode + '		</contributor>\n';
		colladaCode = colladaCode + '		<unit name="meter" meter="1"/>\n';
		colladaCode = colladaCode + '		<up_axis>Z_UP</up_axis>\n';
		colladaCode = colladaCode + '	</asset>\n';
		colladaCode = colladaCode + libraryEffectCode;
		colladaCode = colladaCode + '	<library_images/>\n';
		colladaCode = colladaCode + libraryMaterials;
		colladaCode = colladaCode + libraryGeometries;
		colladaCode = colladaCode + libraryScenes;
		colladaCode = colladaCode + '	<scene>\n';
		colladaCode = colladaCode + '		<instance_visual_scene url="#Scene"/>\n';
		colladaCode = colladaCode + '	</scene>\n';
		colladaCode = colladaCode + '</COLLADA>\n';

		return colladaCode;
	}
	
	// SET
	
	this.setFilePath = function($filePath) { filePath = $filePath; };

	this.setSaved = function($saved)
	{
		saved = $saved;
		viewManager.updateSavedStatus(saved);

		if (saved === false)
			window.electronAPI.setNotSavedFiles(true);
	};

	this.setCode = function($code)
	{
		console.log($code);

		for (var key in $code)
		{
			if (key === 'main')
				mainScriptEditor.setCode($code['main']);
			else
			{
				var newCodeEditor = new CodeEditor('javascript');
				var newTab = new Tab('<span>' + key + '.js</span>', newCodeEditor);
				tabManager.addTab(newTab);

				newTab.onClose = function()
				{
					var close = false;
					var label = this.getLabel();
					label = label.replace(/<span>/ig, "").replace(/<\/span>$/ig, "").replace(/\.js$/, "");
					var removePopup = new ConfirmPopup('<p>Are you sure you want to remove the script "' + label + '" ? </p>');
					document.getElementById('main').appendChild(removePopup);
					removePopup.tabToRemove = this;

					removePopup.onOk = function()
					{
						var removeOk = true;
						this.tabToRemove.onClose = function() { return true; };
						tabManager.removeTab(this.tabToRemove);
						return removeOk;
					};

					return close;
				};

				newCodeEditor.setCode($code[key]);
				newCodeEditor.onChange = function($code) { onChange($code); };
			}
		}

		tabManager.getTabList()[0].select();
	};
	
	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(component, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("document");
