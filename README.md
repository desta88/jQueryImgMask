[jQuery - ImgMask] (https://github.com/desta88/jQueryImgMask)
==========================================

jQuery Plugin for masking image

This is a jQuery plugin for allow add your image / pattern masking to your images.


Installation
------------
1.	Download plugin [jquery.imgMask.min.js](https://raw.githubusercontent.com/desta88/jQueryImgMask/master/assets/js/jquery.imgMask.min.js)

2.	Add the plugin after jQuery library
	<script type="text/javascript" src="jquery.imgMask.min.js"></script>


Usage
------------
1.	Create element for plugin like this, (NOTE : Until this version the selector attribute just using ID not Class)
	<div id="myCanvas"></div>

2.	Initialize plugin
    $('#myCanvas').imgMask({
		type: 'image', //Type have attribute image or pattern
		objMask: 'assets/images/mask.jpg', //It would be base masking object
		source: 'assets/images/source1.png', //Source file into mask, NOTE: it must be transparent
		width: 100,
		height: 100
	});
