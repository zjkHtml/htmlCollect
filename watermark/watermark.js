// create by zjk on 20170315
// 网页添加水印效果 可单独使用，不依赖任何js
;(function(){

	window.watermark = Watermark;

	function Watermark(option){
		var _config = {
			container:null,
			text:'jiandanjiekuan',
			height:5,
			width:5,
			fontSize:12,
		};
		var _container,
			_canvas = document.createElement('canvas');

		_init(option);

		function _init(option){
		    
			option = option || {};
			_container = option.container;
			_config.fontSize = option.fontSize || _config.fontSize;
			_config.text = (option.text || _config.text).toString();
			_config.width = option.width || _config.width;
			_config.height = option.height || _config.height;
			_autoMinOption(_config);
			


			if(!_container){
				var watermark = document.getElementsByClassName("watermark");
	            if(watermark.length > 0){
	                return;
	            }
				_initStyle();
				_container = document.createElement('div');
				_container.className = 'watermark';
				document.body.appendChild(_container);

				if(_canvas.getContext){
					_fillWithImage(_container);
					return;
				}
				_fillWithText(_container);
				return;
			}
			if(_container.length === 0){
				console.log('sorry, the container is empty');
				return;
			}
			if(!_canvas.getContext){
				console.log('sorry you browser not support watermark');
				return;
			}

			for (var i = 0; i < _container.length; i++) {
				_fillWithImage(_container[i]);
			}
			
		}

		function _autoMinOption(option){
			//比例 3:4:5
			var strLength = option.text.length;
			var minHeight = option.fontSize * 3 / 5 * strLength;
			var minWith = option.fontSize * 4 / 5 * strLength;

			option.width =  minWith + option.width;
			option.height =  minHeight + option.height;
		}

		// append style
		function _initStyle(){
			var waterStyle = document.createElement('style');
			waterStyle.innerHTML = '.watermark{overflow: hidden;position: fixed;z-index:0;top: 0;bottom: 0;left: 0;right: 0;background-repeat: repeat;}\
				.watermark .row{position: absolute;width: 100%;overflow: hidden;height: '+ _config.height +'px;}\
				.watermark .txt{position:absolute;text-align: center;width:'+ _config.width +'px;font-size:'+ _config.fontSize +'px;font-family: "microsoft yahei";line-height: '+ _config.height +'px;vertical-align: middle;color: rgba(0,0,0,0.1);cursor: default;\
                -moz-user-select: none; -webkit-user-select: none;-ms-user-select: none;user-select: none;\
                transform:rotate(-22.5deg);-ms-transform:rotate(-22.5deg);-moz-transform:rotate(-22.5deg);-webkit-transform:rotate(-22.5deg);-o-transform:rotate(-22.5deg);}';
			document.head.appendChild(waterStyle);
		}

		function _fillWithImage(container){
		       _canvas.width = _config.width;
		       _canvas.height = _config.height;
		       var ctx = _canvas.getContext("2d");
		       // 绘制水印
		       ctx.font = _config.fontSize + "px microsoft yahei";
		       ctx.fillStyle = "rgba(0,0,0,0.1)";
		       ctx.rotate(-22.5*Math.PI/180);
		       ctx.fillText(_config.text,0,_config.height - 5);

		       var imgData = _canvas.toDataURL('image/png');
		       container.style.backgroundImage = 'url('+ imgData+')';
		       container.style.backgroundRepeat = 'repeat';
		}

		function _fillWithText(container){
		  container.innerHTML = '';
	      var rowCnt = Math.ceil(container.clientHeight / _config.height),
	          clmCnt = Math.ceil(container.clientWidth / _config.width);
	      for(var i = 0; i < rowCnt; i++){
	        var row = document.createElement('div');
	        row.className = 'row';
	        row.style.top = i * _config.height + 'px';
	        for(var j = 0; j < clmCnt; j++){
	          var column = document.createElement('div');
	          column.className = 'txt';
	          column.style.left = j * _config.width + 'px';
	          column.innerText = _config.text;
	          row.appendChild(column);
	        }
	        container.appendChild(row);
	      }

	      if(window.attachEvent){
				window.attachEvent('onresize',_fillWithText);
			} else {
				window.addEventListener('resize',_fillWithText);
			}
	    }
	}

})();