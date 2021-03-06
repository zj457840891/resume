var board=new Array();
var score=0;

var startx=0;
var starty=0;
var endx=0;
var endy=0;


$(document).ready(function(){
	prepareForMobile();
	newgame();
});

function newgame(){
	//初始化容器
	init();
	//随机生成2个格子
	generateOneNumber();
	generateOneNumber();
	getScore();
}

function prepareForMobile(){

	if(documentWidth>500){
		gridContainerWidth=500;
		cellSideLength=100;
		cellSpace=20;
	}
	
	$("#grid-container").css("width",gridContainerWidth-2*cellSpace);
	$("#grid-container").css("height",gridContainerWidth-2*cellSpace);
	$("#grid-container").css("padding",cellSpace);
	$("#grid-container").css("border-radius",0.02*gridContainerWidth);

	$(".grid-cell").css("width",cellSideLength);
	$(".grid-cell").css("height",cellSideLength);
	$(".grid-cell").css("border-radius",0.02*gridContainerWidth);

}





function init(){
	//生成默认格子
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		{
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getGridTop(i,j));
			gridCell.css("left",getGridLeft(i,j));
		}
	//board数组初始化
	for(var i=0;i<4;i++){
		board[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
		}
	}

	updateBoardView();



}

function updateBoardView(){
	$(".number-cell").remove();

	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');

			var theNumberCell=$("#number-cell-"+i+"-"+j);
			if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getGridTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getGridLeft(i,j)+cellSideLength/2);
			}
			else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getGridTop(i,j));
				theNumberCell.css('left',getGridLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		}
	$(".number-cell").css("line-height",cellSideLength+"px");
	$(".number-cell").css("font-size",0.6*cellSideLength+"px");
}

function generateOneNumber(){
	if(nospace(board))
		return false;

	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	while(true){
		if(board[randx][randy]==0)
			break;
		randx=parseInt(Math.floor(Math.random()*4));
		randy=parseInt(Math.floor(Math.random()*4));
	}
	//随机一个数字
	var randNumber=Math.random()<0.5?2:4;
	//随机位置显示随机数字
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	return true;

}

$(document).keydown(function(event){
	event.preventDefault();//阻止方向键默认行为
	switch(event.keyCode){
		case 37://left
			//event.preventDefault();
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				getScore();
				setTimeout("isgameover()",400);
			}
			break;
		case 38://up
			//event.preventDefault();
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				getScore();
				setTimeout("isgameover()",400);
			}
			break;
		case 39://right
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				getScore();
				setTimeout("isgameover()",400);
			}
			break;
		case 40://down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				getScore();
				setTimeout("isgameover()",400);
			}
			break;
		default:
			break;
	}
});

document.addEventListener("touchstart",function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});

document.addEventListener("touchend",function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	var deltax=endx-startx;
	var deltay=endy-starty;

	if(Math.abs(deltax)<0.2*documentWidth&&Math.abs(deltay)<0.2*documentWidth){
		return;
	}

	//X
	if(Math.abs(deltax)>=Math.abs(deltay)){
		if(deltax>0){
				//move right
				if(moveRight()){
				setTimeout("generateOneNumber()",210);
				getScore();
				setTimeout("isgameover()",400);
			}
		}
		

		else{
				//move left
				if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				getScore();
				setTimeout("isgameover()",400);
			}

		}
	}
	else{
		if(deltay>0){
				//move down
				if(moveDown()){
				setTimeout("generateOneNumber()",210);
				getScore();
				setTimeout("isgameover()",400);
			}
		}
		

		else{
				//move up
				if(moveUp()){
				setTimeout("generateOneNumber()",210);
				getScore();
				setTimeout("isgameover()",400);
			}
		}
	}
});

function isgameover(){}

function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}

	//moveLeft
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						continue;
					}
				}
			}
		}
		setTimeout("updateBoardView()",200);
		return true;
}

function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}

	//moveRight
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						continue;
					}
				}
			}
		}
		setTimeout("updateBoardView()",200);
		return true;
}

function moveUp(){
	if(!canMoveUp(board)){
		//alert("can not move");
		return false;
	}
	//moveUp
	for(var j=0;j<4;j++)
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						continue;
					}
				}
			}
		}
		setTimeout("updateBoardView()",200);
		return true;
}

function moveDown(){
	if(!canMoveDown(board)){
		//alert("can not move");
		return false;
	}
	//moveDown
	for(var j=0;j<4;j++)
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						continue;
					}
				}
			}
		}
		setTimeout("updateBoardView()",200);
		return true;
}

function getScore(){
	var sum=0;
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			sum+=board[i][j];
		}
	$("#score").text(sum);
}