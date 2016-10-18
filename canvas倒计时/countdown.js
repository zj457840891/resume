var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var RADIUS=8;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;
const endtime=new Date(2016,9,9,24,00,00);
var balls=[];
const colors=["red","pink","purple","blue","yellow","orange"];
var curAllSeconds=0;

window.onload=function(){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	curAllSeconds=getNowSeconds();
	setInterval(function(){
		render(context);
		update();
	},50);

	function getNowSeconds(){
		var nowtime=new Date();
		/*origin 倒计时*/
		// var lefttime=(endtime.getTime()-nowtime.getTime())/1000;
		// if(lefttime>0)
		// 	return lefttime;
		// else
		// 	return 0;

		/*self   当前时间*/
		var nowtimeHours=nowtime.getHours();
		var nowtimeMinutes=nowtime.getMinutes();
		var nowtimeSeconds=nowtime.getSeconds();
		//alert(nowtimeHours+":"+nowtimeMinutes+":"+nowtimeSeconds);
		return nowtimeHours*3600+nowtimeMinutes*60+nowtimeSeconds;

	}
	function update(){
		var nextAllSeconds=getNowSeconds();
		var nextHours=parseInt(nextAllSeconds/3600);
		var nextMinutes=parseInt(nextAllSeconds/60%60);
		var nextSeconds=parseInt(nextAllSeconds%60);

		var curHours=parseInt(curAllSeconds/3600);
		var curMinutes=parseInt(curAllSeconds/60%60);
		var curSeconds=parseInt(curAllSeconds%60);

		if(nextAllSeconds!=curAllSeconds)
		{
			if(parseInt(nextHours/10)!=parseInt(curHours/10))
			{
				addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(nextHours/10));
			}
			if(parseInt(nextHours%10)!=parseInt(curHours%10))
			{
				addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(nextHours%10));
			}
			if(parseInt(nextMinutes/10)!=parseInt(curMinutes/10))
			{
				addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes/10));
			}
			if(parseInt(nextMinutes%10)!=parseInt(curMinutes%10))
			{
				addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes%10));
			}
			if(parseInt(nextSeconds/10)!=parseInt(curSeconds/10))
			{
				addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds/10));
			}
			if(parseInt(nextSeconds%10)!=parseInt(curSeconds%10))
			{
				addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));
			}
			curAllSeconds=nextAllSeconds;
		}
		updateBalls();

	}
	function addBalls(x,y,num){
		for(var i=0;i<digit[num].length;i++)
			for(var j=0;j<digit[num][i].length;j++)
			{
				if(digit[num][i][j]==1){
					var aBall={
						x:x+j*2*(RADIUS+1)+(RADIUS+1),
						y:y+i*2*(RADIUS+1)+(RADIUS+1),
						g:1.5+Math.random(),
						vx:Math.pow(-1,Math.ceil(Math.random()*100))*5,
						vy:-5,
						color:colors[Math.floor(Math.random()*colors.length)]
					}
					balls.push(aBall);
				}
			}
	}
	function updateBalls(){
    for(var i=0;i<balls.length;i++)
    {
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;
        if(balls[i].y>WINDOW_HEIGHT-RADIUS){
        	balls[i].y=WINDOW_HEIGHT-RADIUS;
        	balls[i].vy=-balls[i].vy*0.75;
        }

        
    }
	}
	function render(cxt){
			cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
			var hours=parseInt(curAllSeconds/(60*60));
			var minutes=parseInt(curAllSeconds/60%60);
			var seconds=parseInt(curAllSeconds%60);
			rederDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
			rederDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
			rederDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
			rederDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
			rederDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
			rederDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
			rederDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
			rederDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
			for(var i=0;i<balls.length;i++){
				cxt.fillStyle=balls[i].color;
				cxt.beginPath();
				cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
	}
	function rederDigit(x,y,num,cxt){
		cxt.fillStyle="rgb(0,100,150)";
		for(var i=0;i<digit[num].length;i++)
			for(var j=0;j<digit[num][i].length;j++)
			{
				if(digit[num][i][j]==1)
				{
					cxt.beginPath();
					cxt.arc(x+j*(RADIUS+1)*2+(RADIUS+1),y+i*(RADIUS+1)*2+(RADIUS+1),RADIUS,0,2*Math.PI);
					cxt.closePath();
					cxt.fill();
				}
			}
	}

}

