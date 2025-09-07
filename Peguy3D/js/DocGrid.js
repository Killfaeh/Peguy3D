function DocGrid()
{
	///////////////
	// Attributs //
	///////////////
	
	var html = '<div class="documentGrid" >'
				+ '<div id="leftPanel" class="leftPanel" >'
					+ '<div id="toolsPanel" class="toolsPanel" >'
					+ '</div>'
					+ '<div id="topPanel" class="panel topPanel" >'
					+ '</div>'
					+ '<div id="bottomPanel" class="panel bottomPanel" >'
					+ '</div>'
				+'</div>'
				+ '<div id="rightPanel" class="rightPanel" >'
					+ '<div id="topRightPanel" class="panel topRightPanel" >'
					+ '</div>'
					+ '<div id="bottomRightPanel" class="bottomRightPanel" >'
						+ 'MEMORY: (Buffers: <span id="info-buffers" >0</span>, '
						+ 'Vertices: <span id="info-vertices-mem" >0</span>, '
						+ 'Triangles: <span id="info-triangles-mem" >0</span>)<br /> '
						+ 'VIEWPORT: (Instances: <span id="info-instances" >0</span>, '
						+ 'Vertices: <span id="info-vertices" >0</span>, '
						+ 'Triangles: <span id="info-triangles" >0</span>)'
					+ '</div>'
				+ '</div>'
			+ '</div>';
	
	var component = new Component(html);
	
	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 400);
	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 200);
	
	component.appendChild(slide1);
	component.getById('leftPanel').appendChild(slide2);

	//////////////
	// Méthodes //
	//////////////

	this.updateStat = function()
	{
		component.getById('info-buffers').innerHTML = GL_BUFFERS.length;
		component.getById('info-vertices').innerHTML = NB_GL_VERTICES;
		component.getById('info-triangles').innerHTML = NB_GL_TRIANGLES;
		component.getById('info-instances').innerHTML = NB_GL_INSTANCES;

		var nbMemoryVertices = 0;
		var nbMemoryTriangles = 0;

		for (var i = 0; i < GL_BUFFERS.length; i++)
		{
			nbMemoryTriangles = nbMemoryTriangles + Math.floor(GL_BUFFERS[i].getIndices().length/3);
			nbMemoryVertices = nbMemoryVertices + GL_BUFFERS[i].getNbVertices();
		}

		component.getById('info-vertices-mem').innerHTML = nbMemoryVertices;
		component.getById('info-triangles-mem').innerHTML = nbMemoryTriangles;
	};
	
	///////////////////////////////////
	// Initialisation des événements //
	///////////////////////////////////
	
	slide1.onDrag = function() { Events.resize(); };
	slide2.onDrag = function() { Events.resize(); };
	
	//////////////
	// Héritage //
	//////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== undefined && Loader !== null)
	Loader.hasLoaded("docGrid");