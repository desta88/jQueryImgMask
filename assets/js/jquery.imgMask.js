(function($){

	//Default options
	$.imgMask = {
		plugin: 'jQuery ImgMask',
		version: '0.1 BETA',
		author: '@dEsta - MD Creative Indonesia',
		option: {
			type: 'image',
			objMask: null,
            source: null,
			width: null,
			height: null
		}
	};
	
	//Load plugin
	$.fn.extend({
		imgMask: function(params){
			return this.each(function(){
				pluginInit();
				
				//Defult variable
				var $this = $(this), canvasOpt = $.extend({},$.imgMask.option, params);
				var attribute = ['#', 'id'];
				var selector = $this.attr(attribute[1]);
				var baseMask = null;
				
				//Check require plugin
				if(!isCanvasSupported()){
					$(attribute[0]+selector).text('Oups, your browser doesnt support canvas');
					return false;
				}else{
					
					//Create canvas
					createCanvas($this, selector, canvasOpt.width, canvasOpt.height);
					var ctx = $(attribute[0]+selector)[0].getContext('2d'); //Selector with native DOM jQuery
					
					//Check object mask
					if(typeof canvasOpt.objMask === 'undefined' || !$.trim(canvasOpt.objMask) || canvasOpt.objMask === null){
						console.error('Object mask not found `objMask`, error:' + canvasOpt.objMask);
						return false;
					}else{
						
						//Create object mask
						drawImage(null, $this, canvasOpt.objMask, ctx, 'objMask', canvasOpt.width, canvasOpt.height);
						
						//Check type masking
						if(canvasOpt.type === 'image' || canvasOpt.type === 'pattern'){
						
							//Create source image
							drawImage(canvasOpt.type, $this, canvasOpt.source, ctx, 'source '+canvasOpt.type+'', canvasOpt.width, canvasOpt.height);
							console.log('Type canvas `'+canvasOpt.type+'` initialize...');
						
						}else{
						
							console.error('Check your `type` canvas ' + canvasOpt.type);
							return false;
						
						}
						
					}
					
				}
				
			});
		},
		//Metchod call drawImage
		call_drawImage: function(type, $this, img, width, height) {
        	drawImage(type, $this, img, $('#'+$this)[0].getContext('2d'), 'source from outside', width, height);
        }
	});
	
	/*Feature function*/
	//Plugin initialize
	function pluginInit(){
		console.info('Plugin Name : '+$.imgMask.plugin);
		console.info('Version : '+$.imgMask.version);
		console.info('Author : '+$.imgMask.author);
	}
	//Canvas suppoeted
	function isCanvasSupported(){
		var elem = document.createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	}
	//Create canvas
	function createCanvas(attribute, selector, width, height){
		$(attribute).css('visibility', 'hidden');
		$(attribute).replaceWith('<canvas id="'+selector+'" width="'+width+'" height="'+height+'"></canvas>');
		console.log('Canvas initialize...');
	}
	//Draw Image function
	function drawImage(type, $this, img, ctx, opt, width, height){
		$this = new Image();
		$this.src = img;
		$($this).load(function(){
			if(type === 'pattern'){
				var pat = ctx.createPattern($this, 'repeat');
				ctx.globalCompositeOperation = 'source-in';
				ctx.rect(0, 0, width, height);
				ctx.fillStyle = pat;
				ctx.fill();
			}else{
				ctx.drawImage($this, 0, 0, width, height);
			}
		});
		console.log('Draw Image for `'+opt+'` initialize...');
		console.log('Destination:'+img);
	}
	/*End feature function*/

}(jQuery));