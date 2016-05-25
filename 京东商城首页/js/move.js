//重点：解决同时运动的问题  ，主要就是定时器清除的时机 要等所有元素都到达目标点在清除

	function getmove(obj,json,fn){
		clearInterval(obj.timer);
		var icur=0;
		var sudu=0;
		obj.timer=setInterval(function(){
			var ibtn=true;
			
			for(var attr in json){
				
				if(attr == 'opacity'){
					icur=Math.round(getStyle(obj,'opacity')*100);          //每次执行都获取一下  不然没有比较值	
				}else{
					icur=parseInt(getStyle(obj,attr));
				}
				
				sudu=(json[attr]-icur)/8;
				sudu=sudu>0?Math.ceil(sudu):Math.floor(sudu);
				
					if(icur!=json[attr]){
						ibtn=false;
						if(attr == 'opacity'){
							obj.style.opacity=(icur+sudu)/100;
							obj.style.filter='alpha(opacity='+(icur+sudu)+')';
						}else{
							obj.style[attr]=icur+sudu+'px';
						}
					}
					
				}
			
				if(ibtn){
						clearInterval(obj.timer);
						fn && fn.call(obj)        //改变回调函数的this指向  方便调用
					}
				
			
		},30);
	}			

	//获取行间样式函数封装
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	}
			