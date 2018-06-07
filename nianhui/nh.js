var pool = [], tmpPool = [], total = 450, pIndex = 5, curPrize, curBatch = 1, timer = {};
    var $container = $('.prize ul'),
        itemTpl = $container.html(),
        $btn = $('.btn');

    // 抽奖配置
    var config = {
        p1:{ name:"一等奖", total:2, batch:1 },
        p2:{ name:"二等奖", total:4, batch:4 },
        p3:{ name:"三等奖", total:8, batch:8 },
        p4:{ name:"四等奖", total:16, batch:8 },
        p5:{ name:"五等奖", total:36, batch:12 },
        p9:{ name:"遗珠奖", total:999, batch:1 }
    };

    // 中奖记录
    var record = {};

    loadCache();
    initPool();
    initPage();

    $("#reset").click(function(){
        localStorage.removeItem('pIndex');
        localStorage.removeItem('curBatch');
        localStorage.removeItem('record');

    });
    $("#next").click(function(){
        next();
    });
    $('#top').click(function(){
        pIndex++;
        if(pIndex > 5){
            pIndex = 5;
        }
        localStorage.setItem('pIndex',pIndex);
        loadCache();
        initPage();
    });

    $('#left').click(function(){
        loadCache();
        curPrize = 'p9';
        curBatch = 1;
        initPage();
    });

    // 初始化奖池
    function initPool(){
        pool = [];
        for (var i = 1; i <= total; i++) {
            pool.push(i);
        }
        // 奖池随机排序
        pool.sort(function(){
            return Math.random() > 0.5 ? -1 : 1;
        });
    }

    // 初始化奖品页面
    function initPage(){
        var items = [],
            pConfig = config[curPrize];


        $('.title').text(pConfig.name);
        if((curBatch*pConfig.batch) > pConfig.total){
            $btn.addClass('disabled');
        } else {
            $btn.removeClass('disabled');
        }
        $container.empty();
        $container.attr('class', curPrize);

        for (var i = 0; i < pConfig.batch; i++) {
            items.push(itemTpl);        
        }
        $container.html(items.join(''));
    }


    $btn.click(function(){
        var $sender = $(this);
        if($sender.hasClass('starting') || $sender.hasClass('stoping')){
            return;
        }

        if($sender.hasClass('finish')){
            $sender.removeClass('finish');
            $sender.text('开始抽奖');
            return;
        }
        if($sender.hasClass('disabled')){
            $sender.text('开始抽奖');
            $sender.removeClass('finish');
            next();
            return;
        }

        if($sender.hasClass('running')){
            $sender.removeClass('running').addClass('stoping');
            stop(function(){
                $sender.removeClass('stoping').addClass('finish');
                $sender.text('恭喜中奖');
                if(curPrize != "p9"){
                    curBatch++;
                    localStorage.setItem('curBatch',curBatch);
                }

                var pConfig = config[curPrize];
                if((pConfig.batch*curBatch) > pConfig.total){
                    $sender.addClass('disabled');
                    return;
                }
            });
            return;
        }

        $sender.addClass('starting');
        $sender.text('抽奖中');
        start(function(){
            $sender.addClass('running').removeClass('starting');
        });
    });

    function next(){
        pIndex--;
        if(pIndex < 1){
            return;
        }
        localStorage.setItem('pIndex',pIndex);
        localStorage.setItem('curBatch',1);
        loadCache();
        initPage();
    }

    function start(callBack){
        var pConfig = config[curPrize],
            $items = $container.find('li');
        for (var i = 0; i < pConfig.batch; i++) {
            (function(i){
                timer['interval'+i] = setInterval(function(){
                    var poolIndex = random();
                    var item = pool[poolIndex];
                    setPrize($items.eq(i), item);
                }, 100);
            })(i);
            if((i+1) == pConfig.batch){
                callBack();
            }
        }
    }

    function stop(callBack){
        var pConfig = config[curPrize],
            $items = $container.find('li');

        var pRecord = [];
        for (var i = 0; i < pConfig.batch; i++) {
            (function(i){
                setTimeout(function(){
                    clearInterval(timer['interval'+i]);
                    var poolIndex = random();
                    var item = pool[poolIndex];
                    while(tmpPool.indexOf(item) > -1){
                        poolIndex = random();
                        item = pool[poolIndex];
                    }
                    tmpPool.push(item);
                    pRecord.push(item);
                    setPrize($items.eq(i), item);
                    // 抽奖结束
                    if((i+1) == pConfig.batch){
                        // 本地保存数据
                        record[curPrize] = record[curPrize] || [];
                        record[curPrize].push(pRecord);
                        localStorage.setItem('record',JSON.stringify(record));
                        callBack();
                    }

                },100*i);
            })(i);
        }
    }

    function random(){
        var a,b;
        if(total > 100){
            a = Math.floor(total / 100) * 100;
        } else if(total > 10){
            a = Math.floor(total / 10) * 10;
        }
        b = total - a;
        var num = Math.floor(Math.random() * a + b);
        return num;
    }

    // 设置中奖号码
    function setPrize($itemContainer,num){
        var numArr = num.toString().split('');
        var $nums = $itemContainer.find('span');
        var numLength = numArr.length;

        for (var i = $nums.length; i > 0; i--) {
            numLength--;
            var num = numArr[numLength];
            $nums[i-1].innerText = num || '0';
        }
    }

    function loadCache(){
        record = JSON.parse(localStorage.getItem('record')) || {};
        curBatch = parseInt(localStorage.getItem('curBatch')) || 1;
        pIndex = parseInt(localStorage.getItem('pIndex')) || 5;
        curPrize = 'p'+pIndex;
        tmpPool = [];
        for(var key in record){
            for (var i = 0; i < record[key].length; i++) {
                var item = record[key][i];
                tmpPool = tmpPool.concat(item);
            }
        }
    }