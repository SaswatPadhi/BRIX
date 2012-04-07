var BRIXtats = new Stats();
BRIXtats.domElement.style.position = "absolute";
BRIXtats.domElement.style.top = "0px";
BRIXtats.domElement.style.left = "0px";
document.body.appendChild( BRIXtats.domElement );
setInterval( function () { BRIXtats.update(); }, 1000 / 60 );

var op_8x8 = createInterlace(8, "#FFF", "#eee");
var image = document.createElement("img");
image.width = 42;
image.height = 1;
image.src = op_8x8.data;
image.style.cssText = "display: inline";

var GlobalDataSource = "../Res/";

BRIXGAME.fInitialise("MainCanvas",ContinueInit);

function ContinueInit(){
	INTROSCREEN = 0;
	BRIXGAME.fStartBRIXGame();
}
