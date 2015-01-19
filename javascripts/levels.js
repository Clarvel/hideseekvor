var level0 = function(){
	this.subDiv = 25; // # subdivisions
	this.gravity = -0.2;
	this.shadowRes = 1024;
	this.wide = 60;
	this.leng = 100;
	this.floorH = 10;
	this.floorL = 30;
	this.floorT = 0.5;
	this.rampW = 8;
	this.rampL = (this.floorH + this.floorT) * Math.sqrt(2);

	this.GROUND = [this.wide, this.leng, this.subDiv];
	this.BOUNDS = [{
			ident : "leftPlane",
			scale : [this.leng, this.floorH * 2, 0],
			posit : [-this.wide / 2, this.floorH, 0],
			rotat : [0, -90, 0],
		}, {
			ident : "rightPlane",
			scale : [this.leng, this.floorH * 2, 0],
			posit : [this.wide / 2, this.floorH, 0],
			rotat : [0, 90, 0],
		}, {
			ident : "frontPlane",
			scale : [this.wide, this.floorH * 2, 0],
			posit : [0, this.floorH, this.leng / 2],
			rotat : [0, 0, 0],
		}, {
			ident : "backPlane",
			scale : [this.wide, this.floorH * 2, 0],
			posit : [0, this.floorH, -this.leng / 2],
			rotat : [0, 180, 0],
		}];
	this.TERRAIN = [{
			ident : "secondFloor",
			scale : [this.wide, this.floorT, this.floorL],
			posit : [0, this.floorH, (this.leng - this.floorL) / 2],
			rotat : [0, 0, 0],
		}, {
			ident : "rightRamp",
			scale : [this.rampW, this.floorT, this.rampL],
			posit : [(this.wide - this.rampW) / 2, (this.floorH - this.floorT) / 2, this.leng / 2 - this.floorL - (this.floorH + this.floorT) / 2],
			rotat : [-45, 0, 0],
		}, {
			ident : "leftRamp",
			scale : [this.rampW, this.floorT, this.rampL],
			posit : [-(this.wide - this.rampW) / 2, (this.floorH - this.floorT) / 2, this.leng / 2 - this.floorL - (this.floorH + this.floorT) / 2],
			rotat : [-45, 0, 0],
		}];
	this.LIGHTS = [{
			nametype : "hemi", // hemi, poin, dirc
			ident : "globalLight",
			intensity : 0.2,
			diffuse : [1, 1, 1],
			specular : [0, 0, 0],
			shadowGen : false,
			posit : [0, 0, 0],
			rotat : [0, 1, 0], // for hemi, point to 'sky'
		}, {
			nametype : "dirc",
			ident : "dLight",
			intensity : 0.8,
			diffuse : [1, 1, 1],
			specular : [0, 0, 0],
			shadowGen : true,
			posit : [0, 20, this.leng / 2 - this.floorL],
			rotat : [0, -1, 0], // for spot, directional, rotation of light
		}];
	this.ENEMIES = [{}];
}

var LEVELLIST = [new level0()];
