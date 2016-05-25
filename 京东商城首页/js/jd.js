//封装ByclassName方法,兼容ie6+
function getByClassName(oparent,oclass,attr){
	if(oparent.getElementsByClassName){
		return oparent.getElementsByClassName(oclass);
	}
	var oele = oparent.getElementsByTagName(attr);
	var result = [];
	for(var i=0;i<oele.length;i++){
		if( hasClass(oele[i],oclass) ){
			result.push(oele[i]);
		}
	}
	return result;
}
function hasClass(element,oclass){
	var cName = element.className.split(' ');
	for(var i=0;i<cName.length;i++){
		if(cName[i] == oclass){
			return true;
		}
	}
	return false;
}
//封装获取元素到html的距离
function getPos(obj){
	var pos = {left:0,top:0}
	while(obj){
		pos.left += obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return pos;
}
//封装removeClass和addClass方法
//addClass方法
function addClass(obj,className){
	if(!obj.className){
		obj.className = className;
	}else{
		var result = obj.className.split(' ');
		var _index = jiance(result,className);
		if(_index==-1){
			obj.className +=' '+className;
		}
	}
}
//removeClass方法
function removeClass(obj,className){
	if(obj.className){
		var result = obj.className.split(' ');
		var _index = jiance(result,className);
		if(_index!=-1){
			result.splice(_index,1); 		  //从数组中删除
			obj.className = result.join(' '); //数组变为字符串
		}
	}
}		
//判断一个数是否在数组中方法
function jiance(arr,num){
	for(var i=0;i<arr.length;i++){
		if(arr[i] == num){
			return i;   //存在返回索引序号
		}
	}
	return -1;   //不存在
}


//搜索区域
(function(){
	var osearch = document.getElementById('search');
	var otext = getByClassName(osearch,'text','input')[0];
	var oVal = otext.value;
	otext.onfocus = function(){
		if(otext.value==oVal){
			otext.value = '';		
		}
	}
	otext.onblur = function(){
		if(!otext.value){
			otext.value = oVal;
		}
	}
})();
//轮播图区域
(function(){
	var obanner = document.getElementById('banner');
	var oul = obanner.getElementsByTagName('ul')[0];
	var ali = oul.getElementsByTagName('li');
	var ool = obanner.getElementsByTagName('ol')[0];
	var oli = ool.getElementsByTagName('li');
	//var oUp = obanner.getElementsByClassName('up')[0];
	//var oDown = obanner.getElementsByClassName('down')[0];
	var oUp = getByClassName(obanner,'up','a')[0];
	var oDown = getByClassName(obanner,'down','a')[0];
	var iw = ali[0].offsetWidth;
	var iNum = 0;
	var iNum2 = 0;
	var timer = null;
	var onoff = true;
	//ul的宽度
	oul.style.width = iw*ali.length+'px';
	//移入
	obanner.onmouseover=function(){
		clearInterval(timer);
		oUp.style.display = 'block';
		oDown.style.display = 'block';
	}
	//移出
	obanner.onmouseout=function(){
		autoplay();
		oUp.style.display = 'none';
		oDown.style.display = 'none';
	}
	//上一张
	function fnUp(){
		//方法动画没结束前就点击
		if(onoff){
			onoff=false;
			if(iNum==0){
				ali[ali.length-1].style.position='relative';
				ali[ali.length-1].style.left=-(ali.length)*iw+'px';
				iNum=ali.length-1;
			}else{
				iNum--;
			}
			for(var i=0;i<oli.length;i++){
				oli[i].className='';
			}
			oli[iNum].className='active';
			
			iNum2--;
			getmove(oul,{left:-(iw*iNum2)},function(){
				onoff=true;
				if(iNum==ali.length-1){    //当走完的时候
					ali[ali.length-1].style.position='static';
					oul.style.left=-(ali.length-1)*iw+'px';
					iNum2=ali.length-1;
				}
			});
		}
	}
	//下一张
	function fnDown(){
		if(onoff){
			onoff=false;
			if(iNum==ali.length-1){
				ali[0].style.position='relative';
				ali[0].style.left=ali.length*iw+'px';
				iNum=0;
			}else{
				iNum++;
			}
			for(var i=0;i<oli.length;i++){
				oli[i].className='';
			}
			oli[iNum].className='active';
			
			iNum2++;
			getmove(oul,{left:-(iw*iNum2)},function(){
				if(iNum==0){    //当走完的时候
					ali[0].style.position='static';
					oul.style.left='0px';
					iNum2=0;
				}
				onoff=true;
			});
		}
	}
	//下一张按键
	oDown.onclick=function(){
		fnDown();
	}
	//上一张按键
	oUp.onclick=function(){
		fnUp();
	}
	//底部按钮
	for(var i=0;i<oli.length;i++){
		oli[i].index = i;
		//移入
		oli[i].onmouseover=function(){
			for(var i=0;i<oli.length;i++){
				oli[i].className = '';
			}
			this.className = 'active';
			getmove(oul,{left:(-iw*this.index)});
			iNum = this.index;
			iNum2 = this.index;
		}
	}
	//自动播放
	autoplay();
	function autoplay(){
		timer = setInterval(function(){
			fnDown();
		},3000);
	}
})();
//选择地区区域
(function(){
	var ohead = document.getElementById('header');
	//var odist = ohead.getElementsByClassName('dist')[0];
	//var oitem = ohead.getElementsByClassName('item')[0];
	var odist = getByClassName(ohead,'dist','div')[0];
	var oitem = getByClassName(ohead,'item','div')[0];
	var oA = oitem.getElementsByTagName('a');
	var ospan = odist.getElementsByTagName('span')[0];
	var timer = null;
	odist.onmouseover = show;
	odist.onmouseout = hide;
	oitem.onmouseover = show;
	oitem.onmouseout = hide;
	function show(){
		odist.style.background = 'url(img/up.gif) no-repeat 76px 12px #FFFFFF';
		clearTimeout(timer);
		oitem.style.display = 'block';
	}
	function hide(){
		odist.style.background = 'url(img/down.gif) no-repeat 76px 12px';
		timer = setTimeout(function(){
			oitem.style.display = 'none';
		},100);
	}
	for(var i=0;i<oA.length;i++){
		oA[i].onclick=function(){
			for(var i=0;i<oA.length;i++){
				oA[i].className = '';
			}
			this.className = 'active';
			hide();
			ospan.innerHTML = this.innerHTML;
		}
	}
})();
//楼层选项卡区域
(function(){
	fnFloor('wrap1');
	fnFloor('wrap2');
	fnFloor('wrap3');
	fnFloor('wrap4');
	fnFloor('wrap5');
	fnFloor('wrap6');
	fnFloor('wrap7');
	fnFloor('wrap8');
	fnFloor('wrap9');
	fnFloor('wrap10');
	fnFloor('wrap11');
	function fnFloor(id){
		var owrap = document.getElementById(id);
		//var oli = owrap.getElementsByClassName('mytitle')[0].getElementsByTagName('li');
		//var odiv = owrap.getElementsByClassName('mymain');
		var oli = getByClassName(owrap,'mytitle','div')[0].getElementsByTagName('li');
		var odiv = getByClassName(owrap,'mymain','div');
		for(var i=0;i<oli.length;i++){
			oli[i].index = i;
			oli[i].onmouseover=function(){
				for(var i=0;i<oli.length;i++){
					oli[i].className = '';
					odiv[i].style.display = 'none';
				}
				this.className = 'active';
				odiv[this.index].style.display = 'block';
			}
		}
	}
})();
//楼层焦点图播放
(function(){
	fnPlay('wrap1');
	fnPlay('wrap2');
	fnPlay('wrap3');
	fnPlay('wrap4');
	fnPlay('wrap5');
	fnPlay('wrap6');
	fnPlay('wrap7');
	fnPlay('wrap8');
	fnPlay('wrap9');
	fnPlay('wrap10');
	fnPlay('wrap11');
	fnPlay('wrap12');
	fnPlay('wrap13');
	function fnPlay(id){
		var obj = document.getElementById(id);
		var obanner = getByClassName(obj,'myauto','div')[0];
		var oul = obanner.getElementsByTagName('ul')[0];
		var ali = oul.getElementsByTagName('li');
		var ool = obanner.getElementsByTagName('ol')[0];
		var oli = ool.getElementsByTagName('li');
		//var oUp = obanner.getElementsByClassName('up')[0];
		//var oDown = obanner.getElementsByClassName('down')[0];
		var oUp = getByClassName(obanner,'left','a')[0];
		var oDown = getByClassName(obanner,'right','a')[0];
		var iw = ali[0].offsetWidth;
		var iNum = 0;
		var iNum2 = 0;
		var timer = null;
		var onoff = true;
		
		//元素到页面顶端的距离
		var iTop = obanner.getBoundingClientRect().top;
		//可视区的高度
		var sT = document.documentElement.clientHeight;
		//元素的高度
		var iH = obanner.offsetHeight;
		//ul的宽度
		oul.style.width = iw*ali.length+'px';
		//移入
		obanner.onmouseover=function(){
			clearInterval(timer);
			oUp.style.display = 'block';
			oDown.style.display = 'block';
		}
		//移出
		obanner.onmouseout=function(){
			autoplay();
			oUp.style.display = 'none';
			oDown.style.display = 'none';
		}
		//上一张
		function fnUp(){
			//方法动画没结束前就点击
			if(onoff){
				onoff=false;
				if(iNum==0){
					ali[ali.length-1].style.position='relative';
					ali[ali.length-1].style.left=-(ali.length)*iw+'px';
					iNum=ali.length-1;
				}else{
					iNum--;
				}
				for(var i=0;i<oli.length;i++){
					oli[i].className='';
				}
				oli[iNum].className='active';
				
				iNum2--;
				getmove(oul,{left:-(iw*iNum2)},function(){
					onoff=true;
					if(iNum==ali.length-1){    //当走完的时候
						ali[ali.length-1].style.position='static';
						oul.style.left=-(ali.length-1)*iw+'px';
						iNum2=ali.length-1;
					}
				});
			}
		}
		//下一张
		function fnDown(){
			if(onoff){
				onoff=false;
				if(iNum==ali.length-1){
					ali[0].style.position='relative';
					ali[0].style.left=ali.length*iw+'px';
					iNum=0;
				}else{
					iNum++;
				}
				for(var i=0;i<oli.length;i++){
					oli[i].className='';
				}
				oli[iNum].className='active';
				
				iNum2++;
				getmove(oul,{left:-(iw*iNum2)},function(){
					if(iNum==0){    //当走完的时候
						ali[0].style.position='static';
						oul.style.left='0px';
						iNum2=0;
					}
					onoff=true;
				});
			}
		}
		//下一张按键
		oDown.onclick=function(){
			fnDown();
		}
		//上一张按键
		oUp.onclick=function(){
			fnUp();
		}
		//底部按钮
		for(var i=0;i<oli.length;i++){
			oli[i].index = i;
			//移入
			oli[i].onmouseover=function(){
				for(var i=0;i<oli.length;i++){
					oli[i].className = '';
				}
				this.className = 'active';
				getmove(oul,{left:(-iw*this.index)});
				iNum = this.index;
				iNum2 = this.index;
			}
		}
		//自动播放
		autoplay();
		function autoplay(){
			timer = setInterval(function(){
				fnDown();
			},3000);
		}
	}	
})();


//滚动条事件
(function(){
	
	function getTop(id){
		var obj = document.getElementById(id);
		var itop = obj.getBoundingClientRect().top;
		return itop;
	}	
	var obar = document.getElementById('fix_bar');
	var oli = obar.getElementsByTagName('li');
	var ofloor = getByClassName(obar,'floor','a');
	var oinfo = getByClassName(obar,'floor_info','a');
	var num = 0;
	var onoff = true;
	window.onscroll=function(){
		var t = document.documentElement.scrollTop || document.body.scrollTop;
		if(t>=1000){
			obar.style.opacity = 1;
		}else{
			obar.style.opacity = 0;
		}
		
		for(var i=1;i<=12;i++){
			if( getTop('wrap'+i)<=500 ){
				num = i-1;
				for(var j=0;j<oli.length;j++){
					removeClass(oli[j],'hover');
				}
				addClass(oli[num],'hover');
			}
		}
	}
	for(var i=0;i<oli.length;i++){
		oli[i].index = i;
		oli[i].onmouseover=function(){
			for(var i=0;i<oli.length;i++){
				removeClass(oli[i],'hover');
			}
			addClass(oli[this.index],'hover');
		}
		oli[i].onmouseout=function(){
			removeClass(this,'hover');
		}
		oli[i].onclick=function(){
			for(var i=0;i<oli.length;i++){
				ofloor[i].style.display='block';
				oinfo[i].style.display='none';
			}
			ofloor[this.index].style.display='none';
			oinfo[this.index].style.display='block';
		}
	}
	
})();

//固定条事件
//(function(){
//	var obar = document.getElementById('fix_bar');
//	var oli = obar.getElementsByTagName('li');
//	var ofloor = getByClassName(obar,'floor','a');
//	var oinfo = getByClassName(obar,'floor_info','a');
//	for(var i=0;i<oli.length;i++){
//		oli[i].index = i;
//		oli[i].onmouseover=function(){
//			for(var i=0;i<oli.length;i++){
//				removeClass(oli[i],'hover');
//			}
//			addClass(this,'hover');
//		}
//		oli[i].onmouseout=function(){
//			removeClass(this,'hover');
//		}
//		oli[i].onclick=function(){
//			for(var i=0;i<oli.length;i++){
//				ofloor[i].style.display='block';
//				oinfo[i].style.display='none';
//			}
//			ofloor[this.index].style.display='none';
//			oinfo[this.index].style.display='block';
//		}
//	}
//})();

































