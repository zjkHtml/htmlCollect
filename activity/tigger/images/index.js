function showIcon(){
	if(typeof nexticon=="undefined" || nexticon.canshow!='1') return false;
	var nowLimit = nexticon.lucklimit*1-$('#nums').text()*1;
	if(isNaN(nowLimit)) return false;
	var styles = 'position:fixed;display:none;z-index:999;margin-top:-'+nexticon.h+'rem;';
	if(nowLimit==3 || nowLimit==4 || nowLimit>=3 && $('#iconnext').length<1) {
		if($('#iconnext').length<1){
			$('body').append('<a onclick="location.replace(\''+nexticon.url+'\');" id="iconnext" style="'+styles+'"><img src="'+nexticon.src+'" style="width:'+nexticon.w+'rem;height:'+nexticon.h+'rem;"></a>');
		}
		var rdttt = Math.floor(Math.random()*4);
		if(rdttt==0){
			$('#iconnext').css({'top':0,'right':0}).show();
		}else if(rdttt==1){
			$('#iconnext').css({'top':0,'right':0}).show();
			$('#iconnext').animate({ top: "40%",'right':(3.2-nexticon.w)+'rem'},1000);
		}else if(rdttt==2){
			$('#iconnext').css({'top':0,'right':(3.2-nexticon.w)+'rem'}).show();
		}else{
			$('#iconnext').css({'top':'85%','right':(3.2-nexticon.w)+'rem'}).show();
		}
		$('#iconnext').animate({top:'85%','right':0},1000);
	}
}
 function initnums(){
   $.ajax({
             url:ajaxUrl.leftnum,
             type:'get',
	     dataType:'string',
	     success:function(data){
	     $('#nums').html(data);
	     showIcon();
 	}})}
function setTime(className,i){
	$(className).animate({top:"0rem"},{duration:1000,easing:'linear',complete:function(){
		$(className).css('top',"-8.8rem");
		if(i<1){
			setTime(className,++i);
		}else{
			$(className).animate({top:"-2.64rem"},{duration:1500,easing:'linear'});
		}
		}
	});
}
function rotateFn(item){
	var tmpreel =parseFloat($('.reel-1').css('top'))-4.4;
	$('.reel-1').css('top',tmpreel+"rem");
	
	var tmpreel =parseFloat($('.reel-2').css('top'))-4.4;
	$('.reel-2').css('top',tmpreel+"rem");
	
	var tmpreel =parseFloat($('.reel-3').css('top'))-4.4;
	$('.reel-3').css('top',tmpreel+"rem");
	
	setTime('.reel-1',0);
	$('.reel-2').delay(500);setTime('.reel-2',0);
	$('.reel-3').delay(1000);setTime('.reel-3',0);
	setTimeout("showOne();",5000);
	$('#nums').text(item.haslimit);
	$('#zhongjiang .logandgo').attr('src',item.imgshow);
	$('#zhongjiang .showonelink').attr('href','/go.php?tag=1&id='+item.id);
	$('#zhongjiang h3').html(item.intro);
}
function showWifi(){
	$('#alertbg').show();$('#alert .wifialert').show();
}
function showRule(){
$.ajax({
             url:ajaxUrl.rule,
	     type:'get',
	     dataType:'string',
	     success:function(data){
	      $('.rulecontent').html(data)
	     }
		})
	$('#alertbg').show();$('#alert .rulealert').show();
}
function closeRule(){
	$('#alertbg').hide();$('#alert .rulealert').hide();
}
function showOne(){
	$('#alertbg').show();$('#zhongjiang').show();setCanClick();
}
function closeOne(){
	$('#alertbg').hide();$('#zhongjiang').hide();initScroll(0);showIcon();
}
function showNochance(){
	$('#alertbg').show();$('#alert .nochance').show();
}
function closeNochance(){
	$('#alertbg').hide();$('#alert .nochance').hide();
}
function initScroll(i){
	if(i>4)i=i-5;
	it = i*-0.88;
	var reel1 =parseFloat($('.reel-1').css('top'))/0.88;
		reel1 = ((reel1<-4?reel1+5:reel1)-5)*0.88;
	var reel2 =parseFloat($('.reel-2').css('top'))/0.88;
		reel2 = ((reel2<-4?reel2+5:reel2)-5)*0.88;
	var reel3 =parseFloat($('.reel-3').css('top'))/0.88;
		reel3 = ((reel3<-4?reel3+5:reel3)-5)*0.88;
	$('.reel-1').css('top',reel1+"rem");
	$(".reel-1").animate({top:it+"rem"},{duration:4000,complete:function(){
		$('.reel-2').css('top',reel2+"rem");
		$(".reel-2").animate({top:it+"rem"},{duration:4000,complete:function(){
			$('.reel-3').css('top',reel3+"rem");
			$(".reel-3").animate({top:it+"rem"},{duration:4000,complete:function(){initScroll(i+1);}});
		}}
		);
	}});
}
function initText(){
	var texts = $('.reel-1').html();
	$('.reel-1').append(texts).append(texts);
	$('.reel-2').append(texts).append(texts).append(texts);
	$('.reel-3').append(texts).append(texts).append(texts);
}
function initDe(){
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android÷’∂À
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios÷’∂À
	if(isiOS) $('#apple').show();
}
$(function(){
	initScroll(0);
	initDe();
	initnums();
	$('#zhongjiang .showonelink').click(function(){
		setTimeout("closeOne();",100);
	});
});