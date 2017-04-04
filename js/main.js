/*
*
* HTML5 Canvas tree generator.  
*
*/


LEAF_ISSHOWN = true;
LEAF_LENG = 100;
LEAF_SCALE = 0.15;
LEAF_DENSITY = 1.5;
LEAF_TYPE = Math.ceil(rand(0, LeafMaps.length - 1));

BRANCH_DEFORMATION = 30;
BRANCH_MAXLENGTH = 150;
BRANCH_MAXWIDTH = 20;
BRANCH_OUTGROWTH = 4;
BRANCH_CONSTRICTION = 1.5;
BRANCH_COLOR = '#'+colorMaps[Math.ceil(rand(0,colorMaps.length-1))];

OUTGROWTH_ISSHOWN = true;
OUTGROWTH_BRANCH_WIDTH = 4;

var gWidth, gHeight;

Number.prototype.degree = function() {
	return this * Math.PI / 180;
};

function rand(min, max) {
	return Math.random() * (max - min) + min;
}

function getConfiguartions(){
	var inputs=document.getElementsByTagName('input');

	for(var i=0;i<inputs.length;i++){
		el=inputs[i];
		if(el.key!=undefined){
			window[el.key]=(el.type=='checkbox')?(el.checked):(el.value);
			console.log(el.key+' '+window[el.key]);
		}
	}

	window.LEAF_TYPE = Math.ceil(rand(0, LeafMaps.length - 1));
	window.BRANCH_COLOR = '#'+colorMaps[Math.ceil(rand(0,colorMaps.length-1))];
	
}

function generateTree(width, height, color){

	getConfiguartions();
    if(color) {
	   c.fillStyle=color;
    }
	c.fillRect(0,0,width,height);
    
    var treeWidth = parseInt(width/2);
    var treeHeight = parseInt(height*0.9);
    
	var generator=new TreeGenerator(treeWidth, treeHeight);
	generator.genT(treeWidth, treeHeight);

}

function updateTree() {
    window.c.clearRect(0, 0, gWidth, gHeight);
	generateTree(gWidth, gHeight);    
}

function createConfigurations(){
	var $configurations=document.getElementById('configurations');

		var configurationNames={
			LEAF_ISSHOWN:['Show leafs','c'],
			//LEAF_LENG:['Leaf length','i'],
			LEAF_SCALE:['Leaf size','i'],
			LEAF_DENSITY:['Leaf density','i'],
			
			BRANCH_DEFORMATION:['Curvature of branches','i'],
			BRANCH_MAXLENGTH:['Max length of branch','i'],
			BRANCH_MAXWIDTH:['Max width of branch','i'],
			BRANCH_OUTGROWTH:['Max count of branch outgrowth','i'],
			BRANCH_CONSTRICTION:['Branch constriction to top','i'],

			OUTGROWTH_ISSHOWN:['Show outgrowths','c'],
			OUTGROWTH_BRANCH_WIDTH:['Maximal width of branch with outgrowths','i']
		};

		for (var i in configurationNames) {
			
			var ci=configurationNames[i],

				p=document.createElement('p'),
				
				input=document.createElement('input'),
				
				types={
					'c':'checkbox',
					'i':'number'
				};

			p.textContent = ci[0]+'  ';
			p.appendChild(input);

			input.type=types[ci[1]];
			input.key=i;

			if(input.type=='checkbox' && window[i]==true){
				input.checked=true;
			}else{
				input.value=window[i];
			}
			
			configurations.appendChild(p);

		};

		var generateButton=document.createElement('button');
		generateButton.textContent='Generate!'
		generateButton.onclick=generateTree;

		configurations.appendChild(generateButton);
}

window.onload = function() {

	var canvasElement = document.getElementById('c'),
		c = canvasElement.getContext('2d');

	window.c=c;	
	window.drawer = new Drawer(c);

    var width = $('#c').width();
    var height = $('#c').height();
    
    gWidth = width;
    gHeight = height;
    
	canvasElement.height = width;
	canvasElement.width = height;

	generateTree(width, height, 'rgba(255, 255, 255, 0)');
	
}
