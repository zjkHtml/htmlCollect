function Dialog(s, a) {
    this.urlHead = "https://buy.bianxianmao.com", this.cont = "/award/countInfo", this.urlHead2 = "https://ads.bianxianmao.com", this.cont2 = "/award/saveRedisCount", this.GP = s.GP, this.id = s.id, this.cardbgId = s.cardbgId, this.title = s.title, this.ticket = s.ticket, this.content = s.content, this.btntext = s.btntext, this.awardlink = s.awardlink, this.isclick = !0, this.clickUrl = s.clickUrl, this.param = s.param, this.ele = a.ele, this.cardbg = "", this.callback = a.callback, this.dialog_init()
}
Dialog.prototype = {
    constructor: Dialog,
    dialog_init: function() {
        switch (this.cardbgId) {
            case 0:
                this.cardbg = "https://buyimg.bianxianmao.com/dist/dialogModel/images/cardbg_turntable.png";
                break;
            case 1:
                this.cardbg = "https://buyimg.bianxianmao.com/dist/dialogModel/images/cardbg_goldegg.png";
                break;
            case 2:
                this.cardbg = "https://buyimg.bianxianmao.com/dist/dialogModel/images/cardbg_universal.png"
        }
        switch (this.id) {
            case 1:
                this.dialog_1();
                break;
            case 2:
                this.dialog_2();
                break;
            case 3:
                this.dialog_3();
                break;
            case 4:
                this.dialog_4();
                break;
            case 5:
                this.dialog_5();
                break;
            default:
                this.dialog_2()
        }
        this.dialog_close()
    },
    dialog_close: function() {
        $(document).off("click", ".modal-body").on("click", ".modal-body", function() {
            if (this.isclick) {
                this.isclick = !1;
            }
            
            var a = $(".showPrize-dialog").offset(),
                i = a.left + a.width / 2 + "px",
                n = a.top + a.height / 2 + "px";
            $(document).find(".showPrize-dialog,.card-sunshine").animate({
                transform: "translate3d(" + i + ",-" + n + ",0) scale(0.1)",
                "-webkit-transform": "translate3d(" + i + ",-" + n + ",0) scale(0.1)"
            }, 300, "linear", function() {
                $(".popShowPrize").remove()
            });
            if (this.clickUrl) {
                var times = 0
                var $this = this
                window.Logarr = []
                for(var i = 0; i < this.clickUrl.length; i ++) {
                    window.Logarr[i] = new Image();
                    window.Logarr[i].src = this.clickUrl[i] + '&times=' + i;
                    window.Logarr[i].addEventListener('error', function(){
                        times += 1
                    })
                }
                var timer = setInterval(function(){
                    if(times == $this.clickUrl.length) {
                        window.Logarr = null
                        if(navigator.userAgent.match(/iPhone|iPad/)) {
                            window.location.href = $this.awardlink
                        } else {
                            var a = document.createElement('a');
                            a.setAttribute('href', $this.awardlink);
                            a.setAttribute('target', '_blank');
                            a.setAttribute('id', $this.cid);
                            a.click();
                        }
                        clearInterval(timer)
                    }
                },100)
            }
        }.bind(this)), $(document).on("click", this.ele, function(s) {
            if (s.stopPropagation(), this.callback && "function" == typeof this.callback) {
                this.callback();
                var a = $(".showPrize-dialog").offset(),
                    i = a.left + a.width / 2 + "px",
                    n = a.top + a.height / 2 + "px";
                $(document).find(".showPrize-dialog,.card-sunshine").animate({
                    transform: "translate3d(" + i + ",-" + n + ",0) scale(0.1)",
                    "-webkit-transform": "translate3d(" + i + ",-" + n + ",0) scale(0.1)"
                }, 300, "linear", function() {
                    $(".popShowPrize").remove()
                })
            }
        }.bind(this))
    },
    dialog_1: function() {
        var s = '<div class="popShowPrize"><div class="dialog_1-showPrize-bg"><img src="https://bxm-guide.oss-cn-shanghai.aliyuncs.com/dist/dollModel/images/tcbg.png" alt="" /></div><div class="dialog_1-showPrize-sunshine"><img src="https://bxm-guide.oss-cn-shanghai.aliyuncs.com/dist/dollModel/images/sunshinetop.png" /></div><div class="dialog_1-showPrize-circle"><img src="https://bxm-guide.oss-cn-shanghai.aliyuncs.com/dist/dollModel/images/sunshinebg.png" /></div><div class="dialog_1-showPrize-dialog"><div class="dialog_1-modal-header"></div><div class="dialog_1-modal-body modal-body"><h3 class="dialog_1-prizecontent">' + this.title + '</h3><div class="dialog_1-coupon-wrapper"><div class="dialog_1-coupon-image"><img src="' + this.ticket + '"></div><div class="dialog_1-coupon-detail">' + this.content + '</div><div class="dialog_1-coupon-date">有效期:<span>' + this.GP + '</span></div></div><div class="goto dialog_1-goto">' + this.btntext + '</div></div><span class=" dialog_1-closetc closetc"></span></div></div>';
        $("body").append(s)
    },
    dialog_2: function() {
        var s = '<div class="popShowPrize"><span class="dialog_2-closetc closetc iconfont">&#xe649;</span><div class="dialog_2-showPrize-sunshine"><img src="https://bxm-guide.oss-cn-shanghai.aliyuncs.com/dist/awardModel/images/circle.png" /></div><div class="dialog_2-showPrize-circle"><img src="https://bxm-guide.oss-cn-shanghai.aliyuncs.com/dist/awardModel/images/sunshine.png" /></div><div class="dialog_2-showPrize-dialog"><div class="dialog_2-modal-header"><img src="https://bxm-guide.oss-cn-shanghai.aliyuncs.com/dist/awardModel/images/winhead.png" alt="" /><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span></div><div class="dialog_2-modal-body modal-body"><h3 class="dialog_2-prizecontent">' + this.title + '</h3><div class="dialog_2-coupon-wrapper"><div class="dialog_2-coupon-image"><img src="' + this.ticket + '"><div class="sawtooth-up flex flex-hr"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="sawtooth-down flex flex-hr"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div><div class="dialog_2-coupon-detail">' + this.content + '</div><div class="dialog_2-coupon-date"></div></div><div class="goto dialog_2-goto">' + this.btntext + '</div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>';
        $("body").append(s)
    },
    dialog_3: function() {
        console.log("暂无弹窗")
    },
    dialog_4: function() {
        var s = '<div class="popShowPrize" id="dialog4"><div class="sunshine"></div> <div class="guang"></div><div class="showPrize-dialog modal-body"><div class="tickitImg"><img src="' + this.ticket + '" alt=""></div><div class="detail"><div class="topic">' + this.title + '</div><div class="goto">' + this.btntext + '</div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div><span class="closetc iconfont">&#xe649;</span></div>';
        $("body").append(s)
    },
    dialog_5: function() {
        var s = '<div class="popShowPrize" id="dialog5"><div class="card-sunshine"></div><div class="showPrize-dialog modal-body"><div class="card-bg" style="background-image: url(' + this.cardbg + ')"><img src="' + this.ticket + '" alt=""/></div><div class="red-bg"></div><div class="detail"><div class="topic">' + this.title + '</div><div class="goto">' + this.btntext + '</div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div><span class="close-btn closetc iconfont">&#xe649;</span></div>';
        $("body").append(s)
    }
};