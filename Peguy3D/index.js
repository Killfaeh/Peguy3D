
///////////////////////
// Appel des modules //
///////////////////////

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const os = require("os");
const fs = require('fs');

var mainWindow = null;

////////////////////////
// Options par défaut //
////////////////////////

const userHomeDir = os.homedir();

var isNotSavedFiles = false;
var recentFiles = { recentFiles: [] };
var vectorialAssets = { assets: [] };
var threeDAssets = { assets: [] };
var plugIns = [];

///////////////
// Fonctions //
///////////////

//// Utilitaires ////

function updateRecentFiles($filePath)
{
	var index = recentFiles.recentFiles.indexOf($filePath);

	if (index >= 0)
		recentFiles.recentFiles.splice(index, 1);

	recentFiles.recentFiles.push($filePath);

	if (recentFiles.recentFiles.length > 15)
		recentFiles.recentFiles.shift();

	fs.writeFileSync(userHomeDir + '/Documents/Peguy/3D/recentFiles.json', JSON.stringify(recentFiles));

	mainWindow.webContents.executeJavaScript("viewManager.updateRecentFiles(" + JSON.stringify(recentFiles) + ");");
}

//// Appelée par l'interface graphique ////

function handleSetNotSavedFiles($event, $isNotSavedFiles)
{
	isNotSavedFiles = $isNotSavedFiles;
}

async function handleLoadSettingsInGUI()
{
	mainWindow.webContents.executeJavaScript("viewManager.updateRecentFiles(" + JSON.stringify(recentFiles) + ");");
	mainWindow.webContents.executeJavaScript("viewManager.updatePlugIns(" + JSON.stringify({ plugIns: plugIns }) + ");");
	mainWindow.webContents.executeJavaScript("viewManager.updateVectorialAssetManager(" + JSON.stringify(vectorialAssets) + ");");
	//mainWindow.webContents.executeJavaScript("viewManager.update3dAssetManager(" + JSON.stringify(threeDAssets) + ");");
}

function loadPlugIns()
{
	var tmpPluginsPath = userHomeDir + '/Documents/Peguy/3D/PlugIns/tmp'; 

	if (fs.existsSync(tmpPluginsPath))
		fs.rmSync(tmpPluginsPath, { recursive: true, force: true });
		
	fs.mkdirSync(tmpPluginsPath);

	var index = 1;
	var timestamp = (new Date()).getTime();

	plugIns = [];

	var files = fs.readdirSync('PlugIns');

	for (var file of files)
	{
		if (fs.lstatSync('PlugIns/' + file).isDirectory())
		{
			var subFiles = fs.readdirSync('PlugIns/' + file);

			for (var subFile of subFiles)
			{
				if (subFile !== 'main.js')
				{
					var tmpFilePath = tmpPluginsPath + '/plugin-' + timestamp + '-' + index + '.js';
					var filepath = __dirname + '/PlugIns/' + file + '/' + subFile;
					var fileContent = fs.readFileSync(filepath, "utf8");
					fs.writeFileSync(tmpFilePath, fileContent + '\n\nif (Loader !== null && Loader !== undefined)\n\tLoader.hasLoaded("' + tmpFilePath + '");');
					plugIns.push(tmpFilePath);
				}
			}
		}
		else if (/\.js$/.test(file))
		{
			var tmpFilePath = tmpPluginsPath + '/plugin-' + timestamp + '-' + index + '.js';
			var filepath = __dirname + '/' + path.join('PlugIns', file);
			var fileContent = fs.readFileSync(filepath, "utf8");
			fs.writeFileSync(tmpFilePath, fileContent + '\n\nif (Loader !== null && Loader !== undefined)\n\tLoader.hasLoaded("' + tmpFilePath + '");');
			plugIns.push(tmpFilePath);
		}

		index++;
	}

	files = fs.readdirSync(userHomeDir + '/Documents/Peguy/3D/PlugIns');

	for (var file of files)
	{
		if (fs.lstatSync(userHomeDir + '/Documents/Peguy/3D/PlugIns/' + file).isDirectory())
		{
			var subFiles = fs.readdirSync(userHomeDir + '/Documents/Peguy/3D/PlugIns/' + file);

			//console.log(subFiles);

			for (var subFile of subFiles)
			{
				if (!fs.lstatSync(userHomeDir + '/Documents/Peguy/3D/PlugIns/' + file + '/' + subFile).isDirectory() 
					&& subFile !== 'main.js' && subFile !== 'project.json' && subFile !== 'run')
				{
					var tmpFilePath = tmpPluginsPath + '/plugin-' + timestamp + '-' + index + '.js';
					var filepath = userHomeDir + '/Documents/Peguy/3D/PlugIns/' + file + '/' + subFile;
					//console.log(subFile);
					var fileContent = fs.readFileSync(filepath, "utf8");
					fs.writeFileSync(tmpFilePath, fileContent + '\n\nif (Loader !== null && Loader !== undefined)\n\tLoader.hasLoaded("' + tmpFilePath + '");');
					plugIns.push(tmpFilePath);
				}
			}
		}
		else if (/\.js$/.test(file))
		{
			var tmpFilePath = tmpPluginsPath + '/plugin-' + timestamp + '-' + index + '.js';
			var filepath = path.join(userHomeDir + '/Documents/Peguy/3D/PlugIns', file);
			var fileContent = fs.readFileSync(filepath, "utf8");
			fs.writeFileSync(tmpFilePath, fileContent + '\n\nif (Loader !== null && Loader !== undefined)\n\tLoader.hasLoaded("' + tmpFilePath + '");');
			plugIns.push(tmpFilePath);
		}

		index++;
	}
}

async function handleRefreshPlugIns()
{
	loadPlugIns();
	await mainWindow.webContents.executeJavaScript("viewManager.updatePlugIns(" + JSON.stringify({ plugIns: plugIns }) + ");");
	return plugIns;
}

async function handleOpenFile()
{
	var output = [];

	const { canceled, filePaths } = await dialog.showOpenDialog();
	
	if (!canceled)
	{
		for (var i = 0; i < filePaths.length; i++)
		{
			var filePath = filePaths[i];
			filePath = filePath.replace(/\/project.json$/, '').replace(/\\project.json$/, '');

			if (fs.existsSync(filePath) && fs.existsSync(filePath + '/project.json'))
			{
				var tmp = filePath.split('/');
				var fileName = tmp[tmp.length-1];
				var configContent = fs.readFileSync(filePath + '/project.json', "utf8");
				var config = JSON.parse(configContent);
				var filesContent = {};

				for (var i = 0; i < config.scripts.length; i++)
				{
					if (fs.existsSync(filePath + '/' + config.scripts[i] + '.js'))
						filesContent[config.scripts[i]] = fs.readFileSync(filePath + '/' + config.scripts[i] + '.js', "utf8");
				}

				output.push({ name: fileName, path: filePath, content: filesContent});
				updateRecentFiles(filePath);
			}
		}
	}

	return output;
}

async function handleOpenRecentFile($event, $filePath)
{
	var output = null;

	if (fs.existsSync($filePath))
	{
		var tmp = $filePath.split('/');
		var fileName = tmp[tmp.length-1];
		var configContent = fs.readFileSync($filePath + '/project.json', "utf8");
		var config = JSON.parse(configContent);
		var filesContent = {};

		for (var i = 0; i < config.scripts.length; i++)
		{
			if (fs.existsSync($filePath + '/' + config.scripts[i] + '.js'))
				filesContent[config.scripts[i]] = fs.readFileSync($filePath + '/' + config.scripts[i] + '.js', "utf8");
		}

		output = { name: fileName, path: $filePath, content: filesContent};
		updateRecentFiles($filePath);
	}

	return output;
}

async function handleSaveFileAs($event, $content)
{
	var output = null;

	const { canceled, filePath } = await dialog.showSaveDialog(BrowserWindow);

	if (!canceled && filePath)
	{
		var tmp = filePath.split('/');
		var fileName = tmp[tmp.length-1];
		fs.mkdirSync(filePath);

		var projectConfig = { projectName: fileName, scripts: [] };

		for (key in $content)
		{
			projectConfig.scripts.push(key);
			fs.writeFileSync(filePath + '/' + key + '.js', $content[key]);
		}

		fs.writeFileSync(filePath + '/project.json', JSON.stringify(projectConfig));

		output = { name: fileName, path: filePath, content: $content};
		updateRecentFiles(filePath);
	}

	return output;
}

async function handleSaveFile($event, $filePath, $content)
{
	var output = null;

	var tmp = $filePath.split('/');
	var fileName = tmp[tmp.length-1];

	var projectConfig = { projectName: fileName, scripts: [] };

	for (key in $content)
	{
		projectConfig.scripts.push(key);
		fs.writeFileSync($filePath + '/' + key + '.js', $content[key]);
	}

	fs.writeFileSync($filePath + '/project.json', JSON.stringify(projectConfig));

	output = { name: fileName, path: $filePath, content: $content};
	updateRecentFiles($filePath);

	return output;
}

async function handleExecProgram($event, $filePath, $content)
{
	var tmp = $filePath.split('/');
	var fileName = tmp[tmp.length-1];

	if ($filePath === null || $filePath === '')
		$filePath = userHomeDir + '/Documents/Peguy/3D';

	if (fs.existsSync($filePath + '/run'))
		fs.rmSync($filePath + '/run', { recursive: true, force: true });
		
	fs.mkdirSync($filePath + '/run');

	var index = 1;
	var timestamp = (new Date()).getTime();

	if (fileName === null || fileName === '')
		fileName = 'tmp';

	var projectConfig = { projectName: fileName, scripts: [] };

	for (key in $content)
	{
		var tmpFileName = key + '-' + timestamp + '-' + index + '.js';
		var tmpFilePath = $filePath + '/run/' + tmpFileName;
		var codeToSave = $content[key] + '\n\nif (Loader !== null && Loader !== undefined)\n\tLoader.hasLoaded("' + tmpFilePath + '");';
		projectConfig.scripts.push({ name: key, tmpFile: tmpFilePath });
		fs.writeFileSync(tmpFilePath, codeToSave);
		index++;
	}

	return projectConfig;
}

async function handleExportToOBJ($event, $materials, $content)
{
	var output = null;

	const { canceled, filePath } = await dialog.showSaveDialog(BrowserWindow);

	if (!canceled && filePath)
	{
		var tmp = filePath.split('/');
		var fileName = tmp[tmp.length-1].replace(/\.obj$/, '').replace(/\.mtl$/, '');
		var filePath2 = filePath.replace(/\.obj$/, '').replace(/\.mtl$/, '');

		var strMTL = '# Péguy 3D 0.1 \n\n';

		for (var i = 0; i < $materials.length; i++)
		{
			strMTL = strMTL + 'newmtl ' + $materials[i].name + '\n';
			strMTL = strMTL + 'Ns ' + $materials[i].specular + '\n';
			strMTL = strMTL + 'Ka 0.000000 0.000000 0.000000\n';
			strMTL = strMTL + 'Kd ' + $materials[i].baseColor[0] + ' ' + $materials[i].baseColor[1] + ' ' + $materials[i].baseColor[2] + '\n';
			strMTL = strMTL + 'Ks ' + $materials[i].specularColor[0] + ' ' + $materials[i].specularColor[1] + ' ' + $materials[i].specularColor[2] + '\n';
			strMTL = strMTL + 'Ke 0.000000 0.000000 0.000000\n';
			strMTL = strMTL + 'Ni 1.450000\n';
			strMTL = strMTL + 'd 1.000000\n';
			strMTL = strMTL + 'illum 2\n\n';
		}

		var strContent = '# Péguy 3D 0.1 \nmtllib ' + fileName + '.mtl\no Object \n';

		for (var i = 0; i < $content.v.length; i++)
		{
			strContent = strContent + 'v ';

			for (var j = 0; j < 3; j++)
			{
				strContent = strContent + $content.v[i] + ' ';

				if (j < 2)
					i++;
			}

			// strContent = strContent + '1.0 0.0 0.0 '; // Test de colo basique, pas compris par Blender

			strContent = strContent + '\n';
		}

		for (var i = 0; i < $content.vn.length; i++)
		{
			strContent = strContent + 'vn ';

			for (var j = 0; j < 3; j++)
			{
				strContent = strContent + $content.vn[i] + ' ';
				
				if (j < 2)
					i++;
			}

			strContent = strContent + '\n';
		}

		for (var i = 0; i < $content.vt.length; i++)
		{
			strContent = strContent + 'vt ';

			for (var j = 0; j < 2; j++)
			{
				strContent = strContent + $content.vt[i] + ' ';
				
				if (j < 1)
					i++;
			}

			strContent = strContent + '\n';
		}

		var currentMaterial = '';

		//console.log($content.materials);
		//console.log($content.materials.length);

		for (var i = $content.f.length-1; i >= 0; i--)
		{
			if (currentMaterial !== $content.materials[$content.f[i]])
			{
				currentMaterial = $content.materials[$content.f[i]];
				strContent = strContent + 'usemtl ' + currentMaterial + '\n';
			}

			strContent = strContent + 'f ';

			for (var j = 0; j < 3; j++)
			{
				var index = $content.f[i] + 1;
				strContent = strContent + index + '/' + index + '/' + index + ' ';
				
				if (j < 2)
					i--;
			}

			strContent = strContent + '\n';
		}

		fs.writeFileSync(filePath2 + '.mtl', strMTL);
		fs.writeFileSync(filePath2 + '.obj', strContent);
		output = { name: fileName, path: filePath, content: $content};
	}

	return output;
}

async function handleExportToCOLLADA($event, $content)
{
	var output = null;

	const { canceled, filePath } = await dialog.showSaveDialog(BrowserWindow);

	if (!canceled && filePath)
	{
		var tmp = filePath.split('/');
		var fileName = tmp[tmp.length-1].replace(/\.dae$/, '');
		var filePath2 = filePath.replace(/\.dae$/, '');
		fs.writeFileSync(filePath2 + '.dae', $content);
		output = { name: fileName, path: filePath, content: $content};
	}

	return output;
}

/*
async function handleExportToPNG($event, $content)
{
	var output = null;

	const { canceled, filePath } = await dialog.showSaveDialog(BrowserWindow);

	if (!canceled && filePath)
	{
		var tmp = filePath.split('/');
		var fileName = tmp[tmp.length-1];
		fs.writeFileSync(filePath, $content, 'base64');
		output = { name: fileName, path: filePath, content: $content};
	}

	return output;
}
//*/

async function handleSaveVectorialAssets($event, $assets)
{
	vectorialAssets.assets = JSON.parse($assets);
	fs.writeFileSync(userHomeDir + '/Documents/Peguy/3D/vectorialAssets.json', $assets);
};

async function handleSave3dAssets($event, $assets)
{
	threeDAssets.assets = JSON.parse($assets);
	fs.writeFileSync(userHomeDir + '/Documents/Peguy/3D/3dAssets.json', $assets);
};

function handleQuit()
{
	app.quit();
};

////////////////////////////////
// Démarrage de l'application //
////////////////////////////////

// Initialisation des options par défaut

if (!fs.existsSync(userHomeDir + '/Documents/Peguy'))
	fs.mkdirSync(userHomeDir + '/Documents/Peguy');

if (!fs.existsSync(userHomeDir + '/Documents/Peguy/3D'))
	fs.mkdirSync(userHomeDir + '/Documents/Peguy/3D');

if (!fs.existsSync(userHomeDir + '/Documents/Peguy/3D/recentFiles.json'))
	fs.writeFileSync(userHomeDir + '/Documents/Peguy/3D/recentFiles.json', JSON.stringify(recentFiles));
else
{
	var fileContent = fs.readFileSync(userHomeDir + '/Documents/Peguy/3D/recentFiles.json', "utf8");
	recentFiles = JSON.parse(fileContent);
}

if (!fs.existsSync(userHomeDir + '/Documents/Peguy/3D/PlugIns'))
	fs.mkdirSync(userHomeDir + '/Documents/Peguy/3D/PlugIns');

if (!fs.existsSync(userHomeDir + '/Documents/Peguy/3D/vectorialAssets.json'))
	fs.writeFileSync(userHomeDir + '/Documents/Peguy/3D/vectorialAssets.json', JSON.stringify(vectorialAssets));
else
{
	var fileContent = fs.readFileSync(userHomeDir + '/Documents/Peguy/3D/vectorialAssets.json', "utf8");
	vectorialAssets = JSON.parse(fileContent);
}

if (!fs.existsSync(userHomeDir + '/Documents/Peguy/3D/3dAssets.json'))
	fs.writeFileSync(userHomeDir + '/Documents/Peguy/3D/3dAssets.json', JSON.stringify(threeDAssets));
else
{
	var fileContent = fs.readFileSync(userHomeDir + '/Documents/Peguy/3D/3dAssets.json', "utf8");
	threeDAssets = JSON.parse(fileContent);
}

loadPlugIns();

// Fonction de création d'une fenêtre
function createWindow ()
{
	// Création et paramétrage d'une fenêtre
	mainWindow = new BrowserWindow({
		width: 1600,
		height: 1200,
		webPreferences:
		{
			preload: path.join(__dirname, 'preload.js')
		}
	});

	mainWindow.on('close', ($e) => {
		if (isNotSavedFiles === true)
		{
			$e.preventDefault();
			mainWindow.webContents.executeJavaScript("viewManager.confirmCloseApp();");
		}
	});

	// Charger une page HTML dans la fenêtre
	mainWindow.loadFile('index.html');
}

// Déclencher l'ouverture de la fenêtre uniquement lorsqu'électron a fini de se charger.
app.whenReady().then(() =>
{
	ipcMain.on('setNotSavedFiles', handleSetNotSavedFiles);
	ipcMain.handle('loadSettingsInGUI', handleLoadSettingsInGUI);
	ipcMain.handle('refreshPlugIns', handleRefreshPlugIns);
	ipcMain.handle('openFile', handleOpenFile);
	ipcMain.handle('openRecentFile', handleOpenRecentFile);
	ipcMain.handle('saveFileAs', handleSaveFileAs);
	ipcMain.handle('saveFile', handleSaveFile);
	ipcMain.handle('execProgram', handleExecProgram);
	ipcMain.handle('exportToOBJ', handleExportToOBJ);
	ipcMain.handle('exportToCOLLADA', handleExportToCOLLADA);
	//ipcMain.handle('exportToPNG', handleExportToPNG);
	ipcMain.handle('saveVectorialAssets', handleSaveVectorialAssets);
	ipcMain.handle('save3dAssets', handleSave3dAssets);
	ipcMain.on('quit', handleQuit);

	createWindow();
	
	app.on('activate', function ()
	{
		if (BrowserWindow.getAllWindows().length === 0)
			createWindow();
	});
});

app.on('window-all-closed', function () { app.quit(); });