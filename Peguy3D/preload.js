const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',
{
	setNotSavedFiles: ($isNotSavedFiles) => ipcRenderer.send('setNotSavedFiles', $isNotSavedFiles), 
	loadSettingsInGUI: () => ipcRenderer.invoke('loadSettingsInGUI'),
	refreshPlugIns: () => ipcRenderer.invoke('refreshPlugIns'),
	openFile: () => ipcRenderer.invoke('openFile'),
	openRecentFile: ($filePath) => ipcRenderer.invoke('openRecentFile', $filePath),
	saveFileAs: ($content) => ipcRenderer.invoke('saveFileAs', $content),
	saveFile: ($filePath, $content) => ipcRenderer.invoke('saveFile', $filePath, $content),
	execProgram: ($filePath, $content) => ipcRenderer.invoke('execProgram', $filePath, $content),
	exportToOBJ: ($materials, $content) => ipcRenderer.invoke('exportToOBJ', $materials, $content),
	exportToCOLLADA: ($content) => ipcRenderer.invoke('exportToCOLLADA', $content),
	//exportToPNG: ($content) => ipcRenderer.invoke('exportToPNG', $content),
	saveVectorialAssets: ($assets) => ipcRenderer.invoke('saveVectorialAssets', $assets),
	save3dAssets: ($assets) => ipcRenderer.invoke('save3dAssets', $assets),
	quit: () => ipcRenderer.send('quit'), 
})