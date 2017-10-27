var marginY = 0;
var destination = 0;
var speed = 5;
var scroller = nul;

function initScroll(elementsId){
	destination = document.getElementById(elementsId).offsetTop;
	
	scroller = setTimeout(function{
		initScroll(elementsId);
	},1);
	
	marginY = marginY + speed;
	
	if(marginY >= destination){
		clearTimeout(scroller);
	}

	window.scroll(0,marginY);
}
