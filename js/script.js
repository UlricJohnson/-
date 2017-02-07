window.onload = function(){
	var scoreSpan = document.getElementById("_score").getElementsByTagName("span")[0];	
//	var score = parseInt(scoreSpan.innerHTML);
	var timer = null;	// 定时器
	var speed = 4;		// 下移速度
	
	/* 初始化 */
	function init(){
		createrow();	// 创建一个新行
//		createrow();	// 创建一个新行
		timer = setInterval(move, 30);
		
	}
	
	/* 创造一个新行插入到第一行 
	 */
	function createrow(){
		var con = document.getElementById("_con");
		var newRow = document.createElement("div");	// 创建行div
		newRow.id = "_rows";
		newRow.className = "rows";
		for(var i = 0, j = parseInt(Math.random() * 4); i < 4; i++){	// 循环创建4个div，j 为0-3之间的整数
			var newCell = document.createElement("div");
			newCell.id = "_cells";
			if(i == j){		// 若随机数j等于i，则把该div设为黑块
				newCell.className = "cell black";
			}else{
				newCell.className = "cell";
			}
			newRow.appendChild(newCell);
		}
		newRow.style.top = "-198px";
		
		// 将创建的行插入到第1行前面
//		document.getElementById("_con").insertBefore(newRow, this.firstChild);	// 错误！！不能用this
		con.insertBefore(newRow, con.firstChild);
		console.log(this)
	}
	
	/* 若黑块没有触底，则使黑块匀速下移，同时调用
	 * judge()函数判断点击 */
	function move(){
		judge();	// 要放在最前面，否则会出现bug
		var con = document.getElementById("_con");
		var rows = con.children;
//		var score = parseInt(scoreSpan.innerHTML);
		for(var i = 0; i < rows.length; i++){
			rows[i].style.top = rows[i].offsetTop + speed + "px";
		}
		if(rows[0].offsetTop >= -98){
			createrow();
//			console.log("shit")
//			console.log(rows[0].offsetTop)
		}
//		if(score > 0 && score % 10 == 0){
//			speed += 1;
//		}
	}
	
	/* 1、判断是否正确点击，若点击到黑块则分数+1，若点击到白块，
	 * 则游戏结束，调用fail()函数,
	 * 2、判断最后一行是否触底，若触底则游戏失败
	 */
	function judge(){
		var con = document.getElementById("_con");
		var rows = con.children;
		var score = parseInt(scoreSpan.innerHTML);
		if(rows[rows.length - 1].offsetTop >= 300){	// 如果最后一行触底则调用fail()函数
			fail();
		}
		var blacks = document.getElementsByClassName("black");
		for(var i = 0; i < blacks.length; i++){
			blacks[i].onclick = function(){	// 黑块绑定点击事件
				var newScore = score + 1;	// 获得分数
				if(newScore < 10){
					scoreSpan.innerHTML = "0" + newScore;
				}else{
					scoreSpan.innerHTML = "" + newScore;
				}
				this.parentElement.parentElement.removeChild(this.parentElement);
				if(score > 0 && score % 10 == 0){
					speed += 1;
				}
			}
		}
	}
	
	/* 失败，游戏结束，弹出分数 */
	function fail(){
		var score = parseInt(scoreSpan.innerHTML);
		clearInterval(timer);
		alert("YOU FAIL!\nYour final score is " + score);
	}
	
	init();
	
}
