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
var canClick=true;
function setCookie(name,value){
	var exp = new Date();exp.setHours(0);exp.setMinutes(0);exp.setSeconds(0);exp.setTime(exp.getTime()+1000 * 86410);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else	return null;
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
function showNochance(){
	$('#alertbg').show();$('#alert .nochance').show();
}
function closeNochance(){
	$('#alertbg').hide();$('#alert .nochance').hide();
}
function showOne(){
	$('#alertbg').show();$('#zhongjiang').show();
}
function closeOne(){
	$('#alertbg').hide();$('#zhongjiang').hide();showIcon();
}

var intchuizi,integg,intstartDo;
function integgfunc(){
	var list = $('.eggs .egg:not(.smashed)');
	var nowindex = list.index($('.eggs .egg.jump'));
	nowindex=nowindex+1;
	if(nowindex>=list.length){
		nowindex=0;
	}
	list.removeClass('jump').eq(nowindex).addClass('jump');
}
function init(){
	intchuizi=setInterval("$('#chuizi').toggleClass('jump')",300);
	integg  =setInterval("integgfunc()",300);
	$('#chuizi').css({top: '-.15rem',left: '2.65rem'});
}
function showend(item,i){
	var topline = Math.ceil((i+1)/3)-1;
	var leftline=i%3;
	$('#chuizi').css({top:(topline*1.15)+'rem',left:(2.65-(2-leftline)*0.93)+'rem'});
	clearInterval(integg);
	clearInterval(intchuizi);
	$('.eggs .egg:not(.smashed)').removeClass('jump');
	$('#chuizi').removeClass('jump');
	intstartDo=setInterval("startDo("+i+")",300);
	intchuizi=setInterval("$('#chuizi').toggleClass('jump')",300);
	$('#nums').text(item.haslimit);
	$('#zhongjiang .logandgo').attr('src',item.imgshow);
	$('#zhongjiang .showonelink').attr('href','/go.php?tag=1&id='+item.id);
	$('#zhongjiang h3').html(item.intro);
				
}
var startIndex=0;
function startDo(i){
	$('.eggs .egg').eq(i).toggleClass('active');
	startIndex++;
	if(startIndex>=7){
		clearInterval(intstartDo);
		clearInterval(intchuizi);
		startIndex=0;
		showOne();
		$('.eggs .egg').eq(i).addClass('active smashed');
		init();
		canClick=true;
	}
}
$(function(){
	init();
	initnums();
	$('#zhongjiang .showonelink').click(function(){
		setTimeout("closeOne();",100);
	});
	$('.eggs .egg').click(function(){
		if($(this).is('.smashed') || !canClick) return false;
		canClick=false;
		actionDo($(this).index());
	});
});
