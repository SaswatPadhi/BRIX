// LOW BRIX

/* BEGIN :: AUTO-INIT VALUES */
	var DOMCanvas = 0;
	var ctxBoard = 0;
	var CWidth = 0;
	var CHeight = 0;
	var BWidth = 0;
	var BHeight = 0;
	var TWidth = 0;
	var THeight = 0;

	var GUDPowers = new Array();
	var BADPowers = new Array();
/* ENDOF :: AUTO-INIT VALUES */

/* BEGIN :: MEDIA VALUES */
	var TheBallz = new Image();
	var BacBallz = new Image();
	var AllTypes = new Image();
	var PaddleBar = new Image();

	var WallB = new Audio();
	var PadlB = new Audio();
	var GOSnd = new Audio();
	var LCSnd = new Audio();
	var Bounce = new Audio();
	var GUDSnd = new Audio();
	var BADSnd = new Audio();
	var BGTrack = new Audio();
/* ENDOF :: MEDIA VALUES */

/* BEGIN :: PRESET VALUES */
	var YBlocks = 7;
	var XBlocks = 13;
	var MaxBalls = 8;
	var StartLife = 3;
	var BallSize = 12;
	var PowerSize = 20;
	var MinBrickProb = 0.8;
	var BrickProbRate = 0.02;
	var DOMReqList = document.getElementById('ReqsList');
/* ENDOF :: PRESET VALUES */

/* BEGIN :: LOAD VALUES */
	var Loaded = 0;
	var LoadMax = 0;
/* ENDOF :: LOAD VALUES */

var INTROSCREEN = {
	/* BEGIN :: AUTO-INIT VALUES */
		IntroText : "BRIX",
		CtxFont   : "80px Futura, Helvetica, sans-serif",
		MaxJitter : 12,
		OffsetX   : 20,
		OffsetY   : 0,
		JitterDel : 50,
		BlurVal   : 0,
		TimerID   : 0,
		KTimerID  : 0,
		Metrics   : 0,
		GradientX : 0,
		GradientL : 0,
		CallBackX : 0,
		ShowBar   : 0,
		Transpar  : 0,
	/* ENDOF :: AUTO-INIT VALUES */

	fInitialise : function (fCallback) {
		this.BlurVal = getBlurValue(100);

		this.Metrics = getMetrics(this.IntroText, this.CtxFont);
		this.OffsetX = (CWidth - this.Metrics.width)/2;
		this.OffsetY = 0;

		ctxBoard.font = "20px Comic Sans MS";
		ctxBoard.fillStyle = "#fff";
		ctxBoard.fillText("-: BRIX LOW Ver 1.01b [08-07-2011] :-", this.OffsetX - 70, this.OffsetY + this.Metrics.height+80);
		ctxBoard.fillText("Designed & created by SASWAT PADHI.", this.OffsetX-84, this.OffsetY + this.Metrics.height + 120);

		ctxBoard.font = "24px Times New Roman";
		ctxBoard.fillText("LOADING", 8, CHeight - 64);
		ctxBoard.fillStyle = "#111";
		ctxBoard.strokeStyle = "#aaa";
		ctxBoard.fillRect(126,CHeight - 84,460,24);
		ctxBoard.strokeRect(126,CHeight - 84,460,24);
		this.ShowBar = 1;

		var i;
		ctxBoard.font = this.CtxFont;
		this.GradientL = ctxBoard.createLinearGradient(126,CHeight - 84,460,24);
		for(i = 0; i <= 20; i++) {
			if(i % 2)	this.GradientL.addColorStop(i/20, "rgba(0, 0, 0, 1)");
			else		this.GradientL.addColorStop(i/20, "rgba(0, 255, 255, 1)");
		}

		this.GradientX = ctxBoard.createLinearGradient(this.OffsetX, this.OffsetY, this.OffsetX + this.Metrics.width, this.OffsetY);
		this.GradientX.addColorStop(0, "rgba(0, 0, 0, 1)");
		this.GradientX.addColorStop(0.2, "rgba(255, 0, 0, 1)");
		this.GradientX.addColorStop(0.3, "rgba(255, 255, 0, 1)");
		this.GradientX.addColorStop(0.4, "rgba(0, 255, 0, 1)");
		this.GradientX.addColorStop(0.5, "rgba(0, 255, 255, 1)");
		this.GradientX.addColorStop(0.6, "rgba(0, 0, 255, 1)");
		this.GradientX.addColorStop(0.7, "rgba(255, 0, 255, 1)");
		this.GradientX.addColorStop(0.8, "rgba(255, 0, 0, 1)");
		this.GradientX.addColorStop(1, "rgba(0, 0, 0, 1)");

		this.CallBackX = fCallback;

		this.fUpdScreen();
	},

	fUpdScreen : function () {
		ctxBoard.save();
		ctxBoard.clearRect(INTROSCREEN.OffsetX - 1 - INTROSCREEN.MaxJitter/2, INTROSCREEN.OffsetY, INTROSCREEN.Metrics.width + INTROSCREEN.OffsetX, INTROSCREEN.Metrics.height + INTROSCREEN.OffsetY);
		ctxBoard.rect(INTROSCREEN.OffsetX - INTROSCREEN.BlurVal/2, INTROSCREEN.OffsetY - INTROSCREEN.BlurVal/2, INTROSCREEN.OffsetX + INTROSCREEN.Metrics.width + INTROSCREEN.BlurVal, INTROSCREEN.Metrics.height + INTROSCREEN.BlurVal);
		ctxBoard.clip();
		ctxBoard.save();
		ctxBoard.fillStyle = "#fff";
		ctxBoard.shadowColor = "rgba(0,0,0,1)";
		ctxBoard.shadowOffsetX = INTROSCREEN.Metrics.width + INTROSCREEN.BlurVal;
		ctxBoard.shadowOffsetY = 0;
		ctxBoard.shadowBlur = INTROSCREEN.BlurVal;
		ctxBoard.fillText(INTROSCREEN.IntroText, - INTROSCREEN.Metrics.width + INTROSCREEN.OffsetX - INTROSCREEN.BlurVal, INTROSCREEN.OffsetY + INTROSCREEN.Metrics.top);
		ctxBoard.restore();
		ctxBoard.globalCompositeOperation = "source-atop";
		ctxBoard.fillStyle = INTROSCREEN.GradientX;
		ctxBoard.fillRect(INTROSCREEN.OffsetX - INTROSCREEN.MaxJitter/2, INTROSCREEN.OffsetY, INTROSCREEN.Metrics.width + INTROSCREEN.OffsetX, INTROSCREEN.Metrics.height + INTROSCREEN.OffsetY);
		ctxBoard.globalCompositeOperation = "lighter";
		ctxBoard.fillStyle = "rgba(255,255,255,0.95)";
		ctxBoard.fillText(INTROSCREEN.IntroText, INTROSCREEN.OffsetX, INTROSCREEN.OffsetY + INTROSCREEN.Metrics.top);
		ctxBoard.lineWidth = 0.80;
		ctxBoard.strokeStyle = "rgba(255,255,255,0.25)";
		var i = 10; while(i--) {
		  var left = INTROSCREEN.MaxJitter / 2 - Math.random() * INTROSCREEN.MaxJitter;
		  var top = INTROSCREEN.MaxJitter / 2 - Math.random() * INTROSCREEN.MaxJitter;
		  ctxBoard.strokeText(INTROSCREEN.IntroText, left + INTROSCREEN.OffsetX, top + INTROSCREEN.OffsetY + INTROSCREEN.Metrics.top);
		}
		ctxBoard.strokeStyle = "rgba(0,0,0,0.20)";
		ctxBoard.strokeText(INTROSCREEN.IntroText, INTROSCREEN.OffsetX, INTROSCREEN.OffsetY + INTROSCREEN.Metrics.top);
		ctxBoard.restore();

		if(INTROSCREEN.ShowBar) {
			ctxBoard.fillStyle = INTROSCREEN.GradientL;
			ctxBoard.fillRect(126,CHeight - 84,(460*Loaded)/LoadMax,24);
		}

		INTROSCREEN.TimerID = setTimeout(INTROSCREEN.fUpdScreen,INTROSCREEN.JitterDel);
	},

	fKillIntro : function () {
		BGTrack.play();

		TWidth = AllTypes.width;
		THeight = AllTypes.height/4;

		DOMReqList.innerHTML = "";
		var myElement = document.createElement('button');
		myElement.setAttribute('id','DECButton');
		myElement.setAttribute('style','font-size: 16px;');
		myElement.addEventListener('click',function(e){stopEvent(e); BGTrack.volume = BGTrack.volume - 0.09999; document.getElementById("VolNoSpan").innerHTML = " " + Math.floor(100*BGTrack.volume).toString() + " "; document.getElementById("INCButton").removeAttribute('disabled'); if(BGTrack.volume < 0.00001) {document.getElementById("DECButton").disabled = "yup";}},false);
		myElement.innerHTML = "-";
		DOMReqList.appendChild(myElement);
		var myElement = document.createElement('span');
		myElement.setAttribute('id','BGVolumeSpan');
		myElement.innerHTML = " MUSIC VOLUME : ";
		DOMReqList.appendChild(myElement);
		var myElement = document.createElement('span');
		myElement.setAttribute('id','VolNoSpan');
		myElement.innerHTML = " 100 ";
		DOMReqList.appendChild(myElement);
		var myElement = document.createElement('button');
		myElement.setAttribute('id','INCButton');
		myElement.setAttribute('style','font-size: 16px;');
		myElement.setAttribute('disabled','yup');
		myElement.addEventListener('click',function(e){stopEvent(e); BGTrack.volume = BGTrack.volume + 0.09999; document.getElementById("VolNoSpan").innerHTML = " " + Math.floor(100*BGTrack.volume).toString() + " "; document.getElementById("DECButton").removeAttribute('disabled'); if(BGTrack.volume > 0.99999) {document.getElementById("INCButton").disabled = "yup";}},false);
		myElement.innerHTML = "+";
		DOMReqList.appendChild(myElement);

		var myElement = document.createElement('span');
		myElement.setAttribute('id','PAUSEMsg');
		myElement.setAttribute('style','font-size: 20px; font-weight: bold; color: #fff;');
		myElement.innerHTML = " ~ [ CLICK OUTSIDE GAME AREA TO PAUSE ] ~ ";
		DOMReqList.appendChild(myElement);

		var myElement = document.createElement('button');
		myElement.setAttribute('id','FXDECButton');
		myElement.setAttribute('style','font-size: 16px;');
		myElement.addEventListener('click',function(e){
									stopEvent(e);
									Bounce.volume = Bounce.volume - 0.099;
									WallB.volume = WallB.volume - 0.099;
									PadlB.volume = PadlB.volume - 0.099;
									GUDSnd.volume = GUDSnd.volume - 0.099;
									BADSnd.volume = BADSnd.volume - 0.099;
									GOSnd.volume = GOSnd.volume - 0.099;
									LCSnd.volume = LCSnd.volume - 0.099;
									document.getElementById("FXVolNoSpan").innerHTML = " " + Math.floor(100*LCSnd.volume).toString() + " ";
									document.getElementById("FXINCButton").removeAttribute('disabled');
									if(LCSnd.volume < 0.001) {document.getElementById("FXDECButton").disabled = "yup";}}
								,false);
		myElement.innerHTML = "-";
		DOMReqList.appendChild(myElement);
		var myElement = document.createElement('span');
		myElement.setAttribute('id','FXVolumeSpan');
		myElement.innerHTML = " EFFECT VOLUME : ";
		DOMReqList.appendChild(myElement);
		var myElement = document.createElement('span');
		myElement.setAttribute('id','FXVolNoSpan');
		myElement.innerHTML = " 100 ";
		DOMReqList.appendChild(myElement);
		var myElement = document.createElement('button');
		myElement.setAttribute('id','FXINCButton');
		myElement.setAttribute('style','font-size: 16px;');
		myElement.setAttribute('disabled','yup');
		myElement.addEventListener('click',function(e){
									stopEvent(e);
									Bounce.volume = Bounce.volume + 0.099;
									WallB.volume = WallB.volume + 0.099;
									PadlB.volume = PadlB.volume + 0.099;
									GUDSnd.volume = GUDSnd.volume + 0.099;
									BADSnd.volume = BADSnd.volume + 0.099;
									GOSnd.volume = GOSnd.volume + 0.099;
									LCSnd.volume = LCSnd.volume + 0.099;
									document.getElementById("FXVolNoSpan").innerHTML = " " + Math.floor(100*LCSnd.volume).toString() + " ";
									document.getElementById("FXDECButton").removeAttribute('disabled');
									if(LCSnd.volume > 0.999) {document.getElementById("FXINCButton").disabled = "yup";}}
								,false);
		myElement.innerHTML = "+";
		DOMReqList.appendChild(myElement);

		ctxBoard.fillStyle = this.GradientL;
		ctxBoard.fillRect(126,CHeight - 84,(460*Loaded)/LoadMax,24);
		this.ShowBar = 0;
		this.Transpar = 10;
		this.fHideLoadShowPlay();
	},

	fHideLoadShowPlay : function () {
		INTROSCREEN.Transpar--;
		ctxBoard.save();
		ctxBoard.fillStyle = "rgba(0,0,0,0.3)";
		ctxBoard.fillRect(8, CHeight - 90, 780, 40);
		ctxBoard.restore();
		if(INTROSCREEN.Transpar)
			INTROSCREEN.KTimerID = setTimeout(INTROSCREEN.fHideLoadShowPlay,INTROSCREEN.Transpar*5);
		else {
			ctxBoard.save();
			ctxBoard.globalAlpha = 0.2;
			ctxBoard.lineWidth = 3;
			ctxBoard.fillStyle = INTROSCREEN.GradientX;
			ctxBoard.fillRect(INTROSCREEN.OffsetX, CHeight - 96, INTROSCREEN.Metrics.width, 64);
			ctxBoard.globalAlpha = 1;
			ctxBoard.font = "48px Comic Sans MS";
			ctxBoard.fillStyle = "#afa";
			ctxBoard.strokeStyle = "#070";
			ctxBoard.strokeText("~ PLAY ~", INTROSCREEN.OffsetX + 12, CHeight - 48);
			ctxBoard.fillText("~ PLAY ~", INTROSCREEN.OffsetX + 12, CHeight - 48);
			ctxBoard.restore();
			DOMCanvas.addEventListener("click",INTROSCREEN.fHandleMouseClick,false);
		}
	},

	fHandleMouseClick : function (e) {
		stopEvent(e);
		var Z = offsetOf(DOMCanvas);
		var Kx = e.pageX - Z[0];
		var Ky = e.pageY - Z[1];
		if(Kx > INTROSCREEN.OffsetX + 12 && Ky > CHeight - 100 && Kx < INTROSCREEN.OffsetX + 216 && Ky < CHeight - 24) {
			clearTimeout(INTROSCREEN.KTimerID);
			clearTimeout(INTROSCREEN.TimerID);
			DOMCanvas.removeEventListener("click",INTROSCREEN.fHandleMouseClick,false);

			GUDPowers.push(GUD_Life);
			GUDPowers.push(GUD_PadW);
			GUDPowers.push(GUD_Slow);
			BADPowers.push(BAD_Fast);
			BADPowers.push(BAD_Kill);
			BADPowers.push(BAD_PadW);

			INTROSCREEN.CallBackX();
		}
	}
}

function genBrick(C,V) {
	this.V = V;
	this.C = C;

	return this;
}

function genBallz(D,V,X,Y,Vx,Vy) {
	this.D = D,
	this.V = V;
	this.X = X;
	this.Y = Y;
	this.Vx = Vx;
	this.Vy = Vy;
	this.V0 = Math.sqrt((Vx*Vx)+(Vy*Vy));

	return this;
}

function genPowerProto(V,P,X,Y,Vy) {
	this.V = V;
	this.P = P;
	this.X = X;
	this.Y = Y;
	this.Vy = Vy;
	this.Snd = 0;
	this.Pnt = 0;

	return this;
}

var BAD_Kill = {
	ImageO : new Image(),
	Action : function () { BRIXGAME.fLoseLife(); },
}

var GUD_Life = {
	ImageO : new Image(),
	Action : function () { BRIXGAME.fGiveLife(); },
}

var BAD_PadW = {
	ImageO : new Image(),
	Action : function () { BRIXGAME.fLosePWid(); },
}

var GUD_PadW = {
	ImageO : new Image(),
	Action : function () { BRIXGAME.fGivePWid(); },
}

var BAD_Fast = {
	Msg    : "Fast ball",
	ImageO : new Image(),
	Action : function () { BRIXGAME.fSpeedUp(); },
}

var GUD_Slow = {
	Msg    : "Slow ball",
	ImageO : new Image(),
	Action : function () { BRIXGAME.fSlowDown(); },
}

function ImageLoader(ImageObj, ImageSrc) {
	++LoadMax;

	ImageObj.onload = function () {
		Loaded++;
		DOMReqList.removeChild(document.getElementById(this.getAttribute("alt")));
		if(Loaded == LoadMax)	INTROSCREEN.fKillIntro();
	};

	var NameExt = ImageSrc.substr(ImageSrc.lastIndexOf("/")+1);
	var FileDesc = NameExt.substr(0, NameExt.lastIndexOf("."));
	var myElement = document.createElement('span');
	myElement.setAttribute('id',FileDesc);
	myElement.innerHTML = "[ " + FileDesc + " Image ]";
	DOMReqList.appendChild(myElement);

	ImageObj.setAttribute("alt",FileDesc);
	ImageObj.src = GlobalDataSource + ImageSrc;
}

function SFXLoader(SFXObj, SFXSrc) {
	++LoadMax;

	SFXObj.addEventListener("canplaythrough", function() {
		try {
			DOMReqList.removeChild(document.getElementById(this.title));
			Loaded++;
			if(Loaded == LoadMax)	INTROSCREEN.fKillIntro();
		} catch (err) {;}
	}, false);

	var NameExt = SFXSrc.substr(SFXSrc.lastIndexOf("/")+1);
	var FileDesc = NameExt.substr(0, NameExt.lastIndexOf("."));
	var myElement = document.createElement('span');
	myElement.setAttribute('id',FileDesc);
	myElement.innerHTML = "[ " + FileDesc + " Sound ]";
	DOMReqList.appendChild(myElement);

	SFXObj.setAttribute("title",FileDesc);
	SFXObj.src = GlobalDataSource + SFXSrc;
}

var BRIXGAME = {
	InvFPS  : 16,
	V0X     : 6,
	V0Y     : -5,
	PVY     : 2,
	PVr     : 0.1,

	/* BEGIN :: AUTO-INIT VALUES */
		BAreaX   : 0,
		BAreaY   : 0,
		PaddleX  : 0,
		PaddleY  : 0,
		PaddleW  : 90,
		MinPadW  : 60,
		MaxPadW  : 180,
		PaddleH  : 0,
		FullGrad : 0,
	/* ENDOF :: AUTO-INIT VALUES */

	/* BEGIN :: GAME-SPEC VALUES */
		NowLevel   : 1,
		BrickCount : 0,
		BCBackUp   : 0,
		BrickProb  : MinBrickProb,
		LivesLeft  : 0,
		PointsNow  : 0,
		PauseGame  : 0,
		Pausable   : 0,
		arrBricks  : 0,
		arrBalls   : 0,
	/* ENDOF :: GAME-SPEC VALUES */

	/* BEGIN :: POWER VALUES */
		Magnetics  : 0,
		SpUpMult   : 1.2,
		SpDnMult   : 0.9,
		PowerUpP   : 0.65,
		GUDPowerP  : 0.45,
		BalanceP   : 0.01,
		ActivePows : 0,
		arrPowers  : 0,
	/* ENDOF :: POWER VALUES */

	/* BEGIN :: TIMER VALUES */
		DynaTimer  : 0,
	/* ENDOF :: TIMER VALUES */

	fInitialise : function (domCanvas, fCallback) {
		if(typeof(domCanvas) == "string")
			domCanvas = document.getElementById(domCanvas);
		DOMCanvas = domCanvas;
		this.Pausable = 0;
		DOMCanvas.offsetParent.addEventListener("click",this.fPauseGame,false);
		DOMCanvas.addEventListener("click",this.fDiscardClick,false);
		ctxBoard = domCanvas.getContext('2d');
		CWidth = domCanvas.width;
		CHeight = domCanvas.height;

		INTROSCREEN.fInitialise(fCallback);

		this.BAreaX = 0.8 * CWidth;
		this.BAreaY = 0.6 * CHeight;
		BWidth = this.BAreaX / (1+XBlocks);
		BHeight = this.BAreaY / (1+YBlocks);

		this.PaddleH = 0.6*BHeight;
		this.PaddleY = CHeight - BHeight;

		this.arrPowers = new Array();
		this.arrBricks = new Array();
		this.arrBalls = new Array();

		this.FullGrad = ctxBoard.createLinearGradient(0, 0, this.BAreaX, this.BAreaY);
		this.FullGrad.addColorStop(0, "rgba(255, 255, 100, 0.4)");
		this.FullGrad.addColorStop(0.5, "rgba(255, 100, 255, 0.4)");
		this.FullGrad.addColorStop(1, "rgba(100, 255, 255, 0.4)");

		var i = 0;
		for(i = 0; i < MaxBalls; ++i)
			this.arrBalls.push(new genBallz(0,0,this.PaddleX + (this.PaddleW/2), this.PaddleY - BallSize, this.V0X, this.V0Y));
		this.arrBalls[0].V = 1;

		var i = 0;
		for(i = 0; i < ((XBlocks+1)*(YBlocks+1)); ++i) {
			this.arrBricks.push(new genBrick(0,0));
			this.arrPowers.push(new genPowerProto(0,0,0,0,0));
		}

		BGTrack.addEventListener("ended", function() {
			this.currentTime = 0;
			this.play();
		}, true);

		ImageLoader(PaddleBar,'GFX/Paddle.png');
		ImageLoader(AllTypes,'GFX/Bricks.png');
		ImageLoader(TheBallz,'GFX/Ball.png');
		ImageLoader(BacBallz,'GFX/Shadow.png');

		ImageLoader(BAD_Kill.ImageO,'GFX/POWERS/Kill.png');
		ImageLoader(GUD_Life.ImageO,'GFX/POWERS/Life.png');
		ImageLoader(BAD_PadW.ImageO,'GFX/POWERS/Shrink.png');
		ImageLoader(GUD_PadW.ImageO,'GFX/POWERS/Stretch.png');
		ImageLoader(BAD_Fast.ImageO,'GFX/POWERS/Fast.png');
		ImageLoader(GUD_Slow.ImageO,'GFX/POWERS/Slow.png');

		SFXLoader(BGTrack, 'SND/Track.ogg');

		SFXLoader(Bounce, 'SND/SFX/Bounce.ogg');
		SFXLoader(WallB, 'SND/SFX/WallB.ogg');
		SFXLoader(PadlB, 'SND/SFX/PaddleB.ogg');
		SFXLoader(GUDSnd, 'SND/SFX/GUDPower.ogg');
		SFXLoader(BADSnd, 'SND/SFX/BADPower.ogg');
		SFXLoader(GOSnd, 'SND/SFX/GameOver.ogg');
		SFXLoader(LCSnd, 'SND/SFX/LEVELClear.ogg');
	},

	f2Dto1D : function (X,Y) {
		return ((Y*(XBlocks+1))+X);
	},

	fGenerBoard : function () {
		var Xi = 0;
		var Yi = 0;
		this.BrickCount = 0;

		for(Xi = 0; Xi <= (XBlocks/2); ++Xi) {
			for(Yi = 0; Yi <= (YBlocks/2); ++Yi) {
				if(Math.random() > (this.BrickProb-(this.NowLevel*BrickProbRate))) {
					this.BrickCount += 4;
					var Vi = 1;
					var Ci = Math.floor(Math.random()*500);
					if(Ci > 460-(5*this.NowLevel))
						Ci = 0;
					else if(Ci > 400-(6*this.NowLevel))
						Ci = 1;
					else if(Ci > 300-(7*this.NowLevel))
						Ci = 2;
					else
						Ci = 3;

					this.arrBricks[this.f2Dto1D(Xi,Yi)].V = Vi;
					this.arrBricks[this.f2Dto1D(Xi,YBlocks-Yi)].V = Vi;
					this.arrBricks[this.f2Dto1D(XBlocks-Xi,Yi)].V = Vi;
					this.arrBricks[this.f2Dto1D(XBlocks-Xi,YBlocks-Yi)].V = Vi;

					this.arrBricks[this.f2Dto1D(Xi,Yi)].C = Ci;
					this.arrBricks[this.f2Dto1D(Xi,YBlocks-Yi)].C = Ci;
					this.arrBricks[this.f2Dto1D(XBlocks-Xi,Yi)].C = Ci;
					this.arrBricks[this.f2Dto1D(XBlocks-Xi,YBlocks-Yi)].C = Ci;
				}
				else {
					var Vi = 0;

					this.arrBricks[this.f2Dto1D(Xi,Yi)].V = Vi;
					this.arrBricks[this.f2Dto1D(Xi,YBlocks-Yi)].V = Vi;
					this.arrBricks[this.f2Dto1D(XBlocks-Xi,Yi)].V = Vi;
					this.arrBricks[this.f2Dto1D(XBlocks-Xi,YBlocks-Yi)].V = Vi;
				}
			}
		}
		this.BCBackUp = this.BrickCount;
	},

	fPaintBricks : function () {
		this.arrBricks.forEach(
			function (val, ind, arr) {
				if(val.V)
					ctxBoard.drawImage(AllTypes, 0, val.C * THeight, TWidth, THeight, (ind % (XBlocks+1))*BWidth, Math.floor(ind / (1+XBlocks))*BHeight, BWidth, BHeight);
			}
		);
	},

	fPaintPaddle : function () {
		ctxBoard.drawImage(PaddleBar, this.PaddleX, this.PaddleY, this.PaddleW, this.PaddleH);
	},

	fResetPaddle : function () {
		DOMCanvas.removeEventListener("click",this.fMouseClicker,false);

		this.PaddleW = 90;

		this.PaddleX = (this.BAreaX-this.PaddleW)/2;
		this.Magnetics = 1;
		this.PauseGame = 1;
		this.arrBalls.forEach( function (val, ind, arr) {	val.V = 0; } );
		this.arrPowers.forEach( function (val, ind, arr) {	val.V = 0; } );
		this.ActivePows = 0;

		this.arrBalls[0].V = 1;
		this.arrBalls[0].X = this.PaddleX + (this.PaddleW/2) - (BallSize/2);
		this.arrBalls[0].Y = this.PaddleY - BallSize;
		this.arrBalls[0].Vx = this.V0X;
		this.arrBalls[0].Vy = this.V0Y;

		this.Pausable = 0;
		DOMCanvas.removeEventListener("click",this.fDiscardClick,false);
		DOMCanvas.addEventListener("click",this.fMouseClicker,false);
	},

	fStartBRIXGame : function () {
		this.LivesLeft = StartLife;
		this.PointsNow = 0;
		this.NowLevel = 1;
		DOMCanvas.style.cursor = "url('" + GlobalDataSource + "GFX/Blank.png'), none";
		this.fStartLevel();
	},

	fStartLevel : function () {
		ctxBoard.clearRect(0, 0, CWidth, CHeight);

		this.fResetPaddle();

		this.fGenerBoard();
		this.fGenerSideB();
		this.fRunLevelDynamics();

		DOMCanvas.addEventListener("mousemove",this.fMouseMover,false);
	},

	fPaintDBallz : function () {
		this.arrBalls.forEach(
			function (val, ind, arr) {
				if(val.V)
					ctxBoard.drawImage(TheBallz, Math.floor(val.X), Math.floor(val.Y), BallSize, BallSize);
			}
		);
	},

	fGenerSideB : function () {
		ctxBoard.fillStyle = "rgb(12,12,12)";
		ctxBoard.fillRect(this.BAreaX, 0, CWidth-this.BAreaX, CHeight);

		ctxBoard.font = "44px Comic Sans MS";
		ctxBoard.fillStyle = "rgb(255,255,200)";
		ctxBoard.fillText("BRIX", this.BAreaX + 2, 44);

		ctxBoard.font = "14px Futura, Helvetica";
		ctxBoard.fillText("[LOW] Ver. 1.01b", this.BAreaX + 16, 64);

		ctxBoard.font = "22px Comic Sans MS";
		ctxBoard.fillText("~ SCORE ~", this.BAreaX + 3, 106);

		ctxBoard.font = "22px Comic Sans MS";
		ctxBoard.fillText("~ LIVES ~", this.BAreaX + 4, 176);

		ctxBoard.fillStyle = "rgb(255,180,180)";
		ctxBoard.font = "24px Comic Sans MS";
		var k = 0;
		var StrX = "";
		for(k = 0; k < Math.floor(this.LivesLeft/4); ++k) {
			StrX = "&#x2764; &#x2764; &#x2764; &#x2764;"
			DOMCanvas.innerHTML = StrX;
			ctxBoard.fillText(DOMCanvas.innerHTML, this.BAreaX + 4, 206+(k*22));
		}
		var j = k;
		StrX = "";
		for(k = 0; k < (this.LivesLeft%4); ++k)
			StrX += "&#x2764; ";
		DOMCanvas.innerHTML = StrX;
		ctxBoard.fillText(DOMCanvas.innerHTML, this.BAreaX + 4, 206+(j*22));
		j += Math.min(k,1);

		ctxBoard.fillStyle = "rgb(255,255,200)";
		ctxBoard.font = "22px Comic Sans MS";
		ctxBoard.fillText("~ LEVEL ~", this.BAreaX + 4, 216+(j*22));
		ctxBoard.font = "38px Comic Sans MS";
		ctxBoard.fillText(this.NowLevel.toString(), this.BAreaX + 43, 256+(j*22));
	},

	fGameOver : function () {
		this.Pausable = 0;
		GOSnd.cuurentTime = 0;
		GOSnd.play();
		clearTimeout(this.DynaTimer);
		ctxBoard.fillStyle = this.FullGrad;
		ctxBoard.fillRect(0, 0, this.BAreaX, CHeight);
		ctxBoard.fillStyle = "yellow";
		ctxBoard.font = "48px Comic Sans MS";
		ctxBoard.fillText("GAME OVER :(", 86, CHeight - 102);
	},

	fLevelClear : function () {
		this.Pausable = 0;
		LCSnd.cuurentTime = 0;
		LCSnd.play();
		clearTimeout(this.DynaTimer);
		ctxBoard.fillStyle = this.FullGrad;
		ctxBoard.fillRect(0, 0, this.BAreaX, CHeight);
		ctxBoard.fillStyle = "yellow";
		ctxBoard.font = "28px Comic Sans MS";
		ctxBoard.fillText("~ LEVEL " + this.NowLevel.toString() + " CLEAR ! ~", 116, CHeight - 172);
		ctxBoard.fillText("LEVEL BONUS : " + (50*this.NowLevel).toString() + " POINTS", 56, CHeight - 132);
		ctxBoard.fillText("<CLICK> TO CONTINUE ...", 90, CHeight - 92);
		this.PointsNow += (50*this.NowLevel);
		this.fPaintSideBar();
		++this.NowLevel;
		DOMCanvas.removeEventListener("click",this.fDiscardClick,false);
		DOMCanvas.addEventListener("click",this.fMouseClickerLvl,false);
	},

	fCollideBallBrick : function (BALL, BRICK, BrickX, BrickY) {
		var BaL = BALL.X;
		var BaR = BALL.X + BallSize;
		var BaT = BALL.Y;
		var BaB = BALL.Y + BallSize;

		var BrL = BrickX*BWidth;
		var BrR = BrL + BWidth;
		var BrT = BrickY*BHeight;
		var BrB = BrT + BHeight;

		if (BaL <= BrR && BaR >= BrL && BaT <= BrB && BaB >= BrT) {
			Bounce.currentTime = 0;
			Bounce.play();

			BALL.D = 1;

			BRICK.C++;
			BRICK.V = BRICK.C % 4;
			if(BRICK.V == 0) {
				--this.BrickCount;
				if(Math.random() > this.PowerUpP) {
					this.arrPowers[this.ActivePows].V = 1;
					this.arrPowers[this.ActivePows].X = BrL;
					this.arrPowers[this.ActivePows].Y = BrT;
					this.arrPowers[this.ActivePows].Vy = this.PVY;

					if(Math.random() > (this.GUDPowerP + (this.NowLevel*this.BalanceP))) {
						this.arrPowers[this.ActivePows].P = GUDPowers[Math.floor(Math.random() * GUDPowers.length)];
						this.arrPowers[this.ActivePows].Snd = GUDSnd;
						this.arrPowers[this.ActivePows].Pnt = 25;
					}
					else {
						this.arrPowers[this.ActivePows].P = BADPowers[Math.floor(Math.random() * BADPowers.length)];
						this.arrPowers[this.ActivePows].Snd = BADSnd;
						this.arrPowers[this.ActivePows].Pnt = 35;
					}

					this.ActivePows++;
				}

			}

			var FlipX = ( (BaR >= BrR) || (BaL <= BrL) );
			var FlipY = ( (BaT <= BrT) || (BaB >= BrB) );

			if(FlipX)	BALL.Vx = - BALL.Vx;
			if(FlipY)	BALL.Vy = - BALL.Vy;

			this.PointsNow += 10;
		}
	},

	fLoseLife : function () {
		this.LivesLeft--;
		if (this.LivesLeft == 0)
			this.fGameOver();
		else
			this.fResetPaddle();
	},

	fGiveLife : function () {
		this.LivesLeft = Math.min(12, this.LivesLeft+1);
	},

	fLosePWid : function () {
		this.PaddleW = Math.max(this.MinPadW,this.PaddleW-20);
	},

	fGivePWid : function () {
		this.PaddleW = Math.min(this.MaxPadW,this.PaddleW+20);
	},

		fSpeedUp : function () {
		this.arrBalls.forEach(
			function (val, ind, arr) {
				if(val.V) {
					val.Vx *= 1.1;
					val.Vy *= 1.1;
					val.V0 = Math.sqrt((val.Vx*val.Vx)+(val.Vy*val.Vy));
				}
			});
	},

	fSlowDown : function () {
		this.arrBalls.forEach(
			function (val, ind, arr) {
				if(val.V) {
					val.Vx *= 0.9;
					val.Vy *= 0.9;
					if(Math.abs(val.Vy) < 0.8)  val.Vy = 0.8 * (val.Vy / Math.abs(val.Vy));
					if(Math.abs(val.Vx) < 0.8)  val.Vx = 0.8 * (val.Vx / Math.abs(val.Vx));
					val.V0 = Math.sqrt((val.Vx*val.Vx)+(val.Vy*val.Vy));
				}
			});
	},

	fPaintPowers : function () {
		this.arrPowers.forEach(
			function (val, ind, arr) {
				if(val.V)
					ctxBoard.drawImage(val.P.ImageO, val.X, val.Y, PowerSize, PowerSize);
			}
		);
	},

	fExecutePower : function () {
		this.arrPowers.forEach(
			function (val, ind, arr) {
				if(val.V) {
					val.Y = Math.floor(val.Vy+val.Y);
					val.Vy += BRIXGAME.PVr;

					if(val.Y >= BRIXGAME.PaddleY - PowerSize && val.Y <= BRIXGAME.PaddleY + BRIXGAME.PaddleH && val.X >= BRIXGAME.PaddleX - PowerSize && val.X < BRIXGAME.PaddleX + BRIXGAME.PaddleW)
					{
						val.V = 0;
						val.P.Action();
						val.Snd.currentTime = 0;
						val.Snd.play();

						BRIXGAME.PointsNow += val.Pnt;
					}
				}
			}
		);
	},

	fExecuteBall : function () {
		this.arrBalls.forEach(
			function (val, ind, arr) {
				if(val.V) {
					if(val.Y >= CHeight) {
						BRIXGAME.fLoseLife();
						return;
					}

					val.X += val.Vx;
					val.Y += val.Vy;

					if (val.X <= 0) {
						val.Vx = - val.Vx;
						val.X = 0;
						WallB.currentTime = 0;
						WallB.play();
					}
					else if (val.X >= BRIXGAME.BAreaX - BallSize) {
						val.Vx = - val.Vx;
						val.X = BRIXGAME.BAreaX - BallSize;
						WallB.currentTime = 0;
						WallB.play();
					}

					if(val.Y <= 0) {
						val.Vy = - val.Vy;
						val.Y = 0;
						WallB.currentTime = 0;
						WallB.play();
					}

					val.D = 0;
					BRIXGAME.arrBricks.forEach(
						function (Brick, ind, arr) {
							if(val.D)		return;
							if(Brick.V)		BRIXGAME.fCollideBallBrick(val, Brick, (ind % (XBlocks+1)), Math.floor(ind / (XBlocks+1)));
						}
					);

					if(val.Vy > 0 && val.X >= BRIXGAME.PaddleX - BallSize && val.X <= BRIXGAME.PaddleX + BRIXGAME.PaddleW && val.Y >= BRIXGAME.PaddleY - BallSize && val.Y <= BRIXGAME.PaddleY) {
						var theta = 70.0*(((BRIXGAME.PaddleX + (BRIXGAME.PaddleW/2)) - val.X)/(BRIXGAME.PaddleW/2));
						theta += 90.0;
						theta /= 180.0;
						theta *= 3.1415;
						val.Vx = val.V0 * Math.cos(theta);
						val.Vy = -(val.V0 * Math.sin(theta));
						if(Math.abs(val.Vy) < 0.8)  val.Vy = 0.8 * (val.Vy / Math.abs(val.Vy));
						PadlB.currentTime = 0;
						PadlB.play();
					}
				}
			}
		);
		if (this.BrickCount == 0)
			this.fLevelClear();
	},

	fPaintSideBar : function () {
		var MinRED = 160;
		var MinGRN = 160;
		var MinBLU = 160;

		if(this.LivesLeft != this.OldLives) {
			this.fGenerSideB();
			this.OldLives = this.LivesLeft;
		}

		ctxBoard.fillStyle = "rgb(12,12,12)";
		ctxBoard.fillRect(this.BAreaX+2, 110, 116, 34);
		ctxBoard.font = "34px Comic Sans MS";
		ctxBoard.fillStyle = "rgb(255,255,200)";
		ctxBoard.fillText(this.PointsNow.toString(), this.BAreaX + 2, 140);
	},

	fRunLevelDynamics : function () {
		ctxBoard.clearRect(0, 0, BRIXGAME.BAreaX, CHeight);
		BRIXGAME.fPaintBricks();
		BRIXGAME.fPaintPaddle();
		BRIXGAME.fPaintDBallz();
		BRIXGAME.fPaintPowers();
		BRIXGAME.fPaintSideBar();
		BRIXGAME.DynaTimer = setTimeout(BRIXGAME.fRunLevelDynamics,BRIXGAME.InvFPS);
		if(BRIXGAME.PauseGame) {
			BRIXGAME.Pausable = 0;
			ctxBoard.fillStyle = BRIXGAME.FullGrad;
			ctxBoard.fillRect(0, 0, BRIXGAME.BAreaX, CHeight);
			ctxBoard.fillStyle = "yellow";
			ctxBoard.font = "28px Comic Sans MS";
			ctxBoard.fillText("<CLICK> TO START :) ", 108, CHeight - 82);
		}
		else {
			BRIXGAME.Pausable = 1;
			BRIXGAME.fExecuteBall();
			BRIXGAME.fExecutePower();
		}
	},

	fPauseGame : function () {
		if(BRIXGAME.Pausable == 0)	return;
		clearTimeout(BRIXGAME.DynaTimer);
		ctxBoard.fillStyle = BRIXGAME.FullGrad;
		ctxBoard.fillRect(0, 0, BRIXGAME.BAreaX, CHeight);
		ctxBoard.fillStyle = "yellow";
		ctxBoard.font = "28px Comic Sans MS";
		ctxBoard.fillText("PAUSED : <CLICK> TO RESUME", 32, CHeight - 82);
		DOMCanvas.style.cursor = "default";
		DOMCanvas.removeEventListener("click",BRIXGAME.fDiscardClick,false);
		DOMCanvas.addEventListener("click",BRIXGAME.fResumeGame,false);
	},

	fResumeGame : function (e) {
		stopEvent(e);
		DOMCanvas.removeEventListener("click",BRIXGAME.fResumeGame,false);
		DOMCanvas.addEventListener("click",BRIXGAME.fDiscardClick,false);
		DOMCanvas.style.cursor = "url('" + GlobalDataSource + "GFX/Blank.png'), none";
		BRIXGAME.DynaTimer = setTimeout(BRIXGAME.fRunLevelDynamics,BRIXGAME.InvFPS);
	},

	fDiscardClick : function (e) {
		stopEvent(e);
	},

	fMouseMover : function(e) {
		var ZOff = offsetOf(DOMCanvas);
		var FinalX;
		FinalX = e.pageX - ZOff[0];
		if(FinalX >= BRIXGAME.BAreaX-BRIXGAME.PaddleW) {
			FinalX = BRIXGAME.BAreaX-BRIXGAME.PaddleW;
		}
		if(BRIXGAME.PauseGame)
			BRIXGAME.arrBalls.forEach(
				function (val, ind, arr) {
					if(val.V)
						val.X += FinalX - BRIXGAME.PaddleX;
				}
			);
		BRIXGAME.PaddleX = FinalX;
	},

	fMouseClicker : function(e) {
		stopEvent(e);
		DOMCanvas.removeEventListener("click",BRIXGAME.fMouseClicker,false);
		DOMCanvas.addEventListener("click",BRIXGAME.fDiscardClick,false);
		BRIXGAME.PauseGame = 0;
		BRIXGAME.Magnetics--;
	},

	fMouseClickerLvl : function(e) {
		stopEvent(e);
		DOMCanvas.removeEventListener("click",BRIXGAME.fMouseClickerLvl,false);
		DOMCanvas.addEventListener("click",BRIXGAME.fDiscardClick,false);
		BRIXGAME.fStartLevel();
	},
}
