var game_zw, RaceFun;
var GetNumber = function (number) {
  return Math.round(number * 1000) / 1000;
}

var MemberLog = function (GameID) {
  var $this = this;
  var MemberInfo = false;
  var that = $("body");
  var NowGameID = GameID;
  var MemberMoney = 0;
  var MemberMoneyTimer;
  /*會員金額timer*/
  this.TimerByMemberMoney = function () {
    clearTimeout(MemberMoneyTimer);
    CatchMemberMoney();
    MemberMoneyTimer = setTimeout(function () {
      $this.TimerByMemberMoney();
    }, 10000);
  }
  this.StopMoneyTimer = function () {
    clearTimeout(MemberMoneyTimer);
  }
  /*取得會員資料*/
  var CatchMemberInfo = function () {
    $.ajax({
      url: `${config.baseUrl}/Members/Info/Online`,
      type: "POST",
      data: false,
      async: true,
      error: function (xhr) {
        setTimeout(() => {
          CatchMemberInfo()
        }, 3000)
      },
      success: function (rt) {
        var fun = {}
        fun["100"] = function (obj) {
          MemberInfo = obj.UserId;
          that.find("#MemberAct").html(MemberInfo);
        }
        rt.code = "100"
        rt = JSON.stringify(rt)
        my_decode(rt, fun);
      }
    });
  }
  /*取得會員金額*/
  var CatchMemberMoney = function () {
    $.ajax({
      url: `${config.baseUrl}/Members/Info/Online`,
      type: "POST",
      data: false,
      async: true,
      error: function (xhr) { },
      success: function (rt) {
        var fun = {}
        fun["100"] = function (obj) {
          ShowMoney(obj.Money);
        }
        rt.code = "100"
        rt = JSON.stringify(rt)
        my_decode(rt, fun);
      }
    });
  }
  var ShowMoney = function (Money) {
    if (MemberMoney * 1 != Money * 1) {
      var dif = GetNumber(Money - MemberMoney);
      var s_m = that.find("#MemberMoney");
      var s_top = s_m.offset().top;
      var s_left = s_m.offset().left;
      if (dif > 0) {
        var d = $("<div/>").addClass("AddMoneyDiv").css({
          top: s_top + 50,
          left: s_left,
          opacity: 0
        }).html("+" + dif);
        that.append(d);
        d.stop().animate({
          opacity: 1,
          top: "-=50",
        }, 1000, function () {
          MemberMoney = Money;
          s_m.html(MemberMoney);
          d.remove();
        });
      } else {
        MemberMoney = Money;
        s_m.html(MemberMoney);
        var d = $("<div/>").addClass("DelMoneyDiv").css({
          position: "absolute",
          top: s_top,
          left: s_left,
          opacity: 0
        }).html(dif);
        that.append(d);
        d.stop().animate({
          opacity: 1,
          top: "+=50",
        }, 1000, function () {
          d.remove();
        });
      }
    }
  }
  this.GetMemberMoney = function () {
    return MemberMoney;
  }
  this.GetMemberInfo = function () {
    return MemberInfo;
  }
  this.GetLoginInfo = function () {
    return LoginInfo;
  }
  this.reset = function () {
    CatchMemberInfo();
    // CatchMemberMoney();  调用了2次,导致金额动画出现2次
    $this.TimerByMemberMoney();
  }
  var init = function () {
    $this.reset();
  }
  init();
}
var RoomFunction = function () {
  var $this = this;
  var that = $("body");

  /*開獎結果*/
  this.GoLottery = function (game_id) {
    if ($("body").has("#win_GoLottery").length) {
      var win = $("#win_GoLottery");
      if (win.hasClass("small")) {
        win.trigger("ToEnlarge");
        if (game_id) {
          open_lottery.CatchGameInfo(game_id);
          setTimeout(function () {
            win.trigger("ToTop");
          }, 100)
        }
        return;
      }
      if (win.hasClass("big")) {
        win.trigger("ToTopNarrow");
        if (game_id) {
          open_lottery.CatchGameInfo(game_id);
          setTimeout(function () {
            win.trigger("ToTop");
          }, 100)
        }
        return;
      }
    } else {
      window.open("../开奖结果.html", "TrendWin", "width=978, height=600");
    }
  }
  /*訂單管理*/
  var GoOrder = function () {
    if ($("body").has("#win_GoOrder").length) {
      var win = $("#win_GoOrder");
      if (win.hasClass("small")) {
        win.trigger("ToEnlarge");
        return;
      }
      if (win.hasClass("big")) {
        win.trigger("ToTopNarrow");
        return;
      }
    } else {
      loading(true);
      game_zw.OpenWin({
        type: "html",
        html: urldecode(parameter.ddgl),
        title: '<img src="images/nav01_icon.png" width="16"> 订单管理',
        lock: false,
        width: 1200,
        height: 650,
        Classify: "GoOrder",
        id: "win_GoOrder",
        TiedObj: $("#GoOrder"),
        TiedPosition: "center"
      });
      loading(false);
    }
  }
  /*投注报表*/
  var GoReport = function () {
    if ($("body").has("#win_GoReport").length) {
      var win = $("#win_GoReport");
      if (win.hasClass("small")) {
        win.trigger("ToEnlarge");
        return;
      }
      if (win.hasClass("big")) {
        win.trigger("ToTopNarrow");
        return;
      }
    } else {
      loading(true);
      game_zw.OpenWin({
        type: "html",
        html: urldecode(parameter.tzbb),
        title: '<img src="images/nav02_icon.png" width="16"> 投注报表',
        lock: false,
        width: 1200,
        height: 650,
        Classify: "GoReport",
        id: "win_GoReport",
        TiedObj: $("#GoReport"),
        TiedPosition: "center",
        OpenEvent: function () {
        }
      })
      loading(false);
    }
  }
  /*走勢圖*/
  var GoTrend = function (game_id) {
    window.open("../走势图.html", "TrendWin", "width=1030, height=820");
  }
  /*單雙開獎統計*/
  var GoWayvalue = function () {
    if ($("body").has("#win_GoWayvalue").length) {
      var win = $("#win_GoWayvalue");
      if (win.hasClass("small")) {
        win.trigger("ToEnlarge");
        return;
      }
      if (win.hasClass("big")) {
        win.trigger("ToTopNarrow");
        return;
      }
    } else {
      loading(true);
      game_zw.OpenWin({
        type: "html",
        html: urldecode(parameter.ludan),
        title: '<img src="images/nav02_icon.png" width="16"> ' + LG.gstr("lang_game_ladder_btn_lot_record"),
        lock: false,
        width: 1000,
        height: 521,
        Classify: "GoWayvalue",
        id: "win_GoWayvalue",
        TiedObj: $("#GoWayvalue"),
        TiedPosition: "center"
      });
      loading(false);
    }
  }
  /*遊戲說明*/
  var GoExplanation = function () {
    if ($("body").has("#win_GoExplanation").length) {
      var win = $("#win_GoExplanation");
      if (win.hasClass("small")) {
        win.trigger("ToEnlarge");
        return;
      }
      if (win.hasClass("big")) {
        win.trigger("ToTopNarrow");
        return;
      }
    } else {
      loading(true);
      var rt = {
        code: 100,
        view: parameter.shuoming
      }
      var fun = {}
      fun["100"] = function (obj) {
        game_zw.OpenWin({
          type: "html",
          html: urldecode(obj.view),
          title: '<img src="images/nav02_icon.png" width="16"> 游戏说明',
          lock: false,
          width: 747,
          height: 521,
          Classify: "GoExplanation",
          id: "win_GoExplanation",
          TiedObj: $("#GoExplanation"),
          TiedPosition: "center"
        });
      }
      rt = JSON.stringify(rt)
      my_decode(rt, fun);
      loading(false);
    }
  }
  /*开奖统计*/
  var GoStatistics = function () {
    if ($("body").has("#win_GoStatistics").length) {
      var win = $("#win_GoStatistics");
      if (win.hasClass("small")) {
        win.trigger("ToEnlarge");
        return;
      }
      if (win.hasClass("big")) {
        win.trigger("ToTopNarrow");
        return;
      }
    } else {
      loading(true);
      var rt = {
        code: 100,
        view: parameter.kaijiang
      }
      rt = JSON.stringify(rt)
      var fun = {}
      fun["100"] = function (obj) {
        game_zw.OpenWin({
          type: "html",
          html: urldecode(obj.view),
          title: '<img src="images/nav02_icon.png" width="16"> 开奖统计',
          lock: false,
          width: 747,
          height: 566,
          Classify: "GoExplanation",
          id: "win_GoStatistics",
          TiedObj: $("#GoStatistics"),
          TiedPosition: "center"
        });
      }
      my_decode(rt, fun);
      loading(false);
    }
  }
  this.resize = function () {
    //footerReSize();
  }
  var init = function () {
    $(window).resize(function (event) {
      $this.resize();
    });
    that.find("#GoLottery").click(function () {
      $this.GoLottery();
    });
    that.find("#GoOrder").click(function () {
      GoOrder();
    });
    that.find("#GoReport").click(function () {
      GoReport();
    });
    that.find("#GoTrend").click(function () {
      GoTrend();
    });
    that.find("#GoWayvalue").click(function () {
      GoWayvalue();
    });
    that.find('#GoExplanation').click(function () {
      GoExplanation();
    }); GoStatistics
    that.find("#GoStatistics").click(function () {
      GoStatistics();
    });
  }
  init();
}
var OrderFunction = function () {
  var init = function () {
    that = $("body");
  }
  init();
}
var GameControl = function (GameID) {
  var $this = this;
  var that = $("body");
  var NowGameID = GameID;
  var GameInfo = false;
  var GamePlayInfo = false;
  var GameBackWater = false;
  var NowPeriods = false;
  /*即時下單資料*/
  var NowConversionValue = 0;
  var NowImBetNum = 0;
  var NowImBetMoney = 0;
  var NowPlayID = false;
  var NowBetInfo = false;
  var GameClose = false;
  var GamePlayFun;
  var zw, room = false, room_fun = false;
  var CatchGameInfo = function () {
    CreateGameInfo();
  }
  var CreateGameInfo = function () {
    $this.GetGamePeriods();
    $this.GetGameToDayPeriods();

  }
  /*抓取當下的期數*/
  var c_down;
  this.GetGamePeriods = function () {
    var url = `${config.baseUrl}/Lottery/Bet/GetBetResults`;
    var data = {
      lotteryCode: 50000,
      state: 0
    };
    ajax_get(url, data).done(function (rt) {
      console.log(rt)
      var fun = {}
      fun["100"] = function (obj) {
        console.log(obj)
        NowPeriods = {};
        NowPeriods.lottery_id = obj.lottery_id;
        NowPeriods.Periods = obj.Periods;
        NowPeriods.PeriodsStr = obj.IssueCode;
        NowPeriods.CloseTime = obj.Timer;
        NowPeriods.PeriodsInfo = obj.PeriodsInfo;
        CreateGamePeriods();
        // 抓取投注资料
        $this.GetGameChangePeriods(obj.IssueCode);
        // 抓取购买分布
        $this.GetOrderDistribution(obj.IssueCode);
        // 今日胜率
        $this.GetSnailWin(NowPeriods.lottery_id);
        c_down = new CountDown({
          id: ".PeriodsCloseTime",
          // maturity: obj.CloseDateTime,
          second: obj.Timer,
          callback: function (d_time) { },
          callmaturity: function () {
            //console.log("我結束了!")
            that.find("#PeriodsStatus").removeClass("time_icon").addClass("time_icon_out");
            CatchGameNowLottery(obj.IssueCode);
            /*
              過了多少沒有開獎就跳過。
              setTimeout(function(){
                $this.GetGamePeriods();
              }, 10000);
            */
            $('input').each(function () {
              $(this).trigger('blur');
            })
            MemLog.StopMoneyTimer()
            $this.GetGameChangePeriods(obj.IssueCode);

            that.find('#MoneyDialog').trigger("Close");
            SnailGame.play_snd_effect("CloseBet_1")
            setTimeout(function () {
              SnailGame.play_snd_effect("CloseBet_2")
            }, 1000)

            snails.switchbet(true);
          }
        });
      }
      rt = JSON.parse(rt)
      rt.code = "100"
      rt = JSON.stringify(rt)
      my_decode(rt, fun);
    }).fail(function () {
      setTimeout(function () {
        // $this.GetGamePeriods();
      }, 1000);
    })
  }
  this.GetNowPeriods = function () {
    return NowPeriods;
  }
  /*抓取今天期數*/
  this.GetGameToDayPeriods = function () {
    $.ajax({
      url: `${config.baseUrl}/Lottery/Bet/GetBetResults`,
      type: "POST",
      data: {
        lotteryCode: 50000,
        state: 1
      },
      error: function (xhr) { },
      success: function (rt) {
        var fun = {}
        fun["100"] = function (obj) {
          var list = obj.Top5;
          list.unshift({
            IssueCode: that.find('.NowPeriodsNumber').html(),
            Content: []
          })
          var s_pa = that.find("#advance-number.ToDayPeriods");
          var s_pb = that.find("#basic-number.ToDayPeriods");
          s_pa.find("option").remove();
          s_pb.find("option").remove();
          for (var i in list) {
            var info = list[i];
            s_pa.prepend(
              $("<option/>").text(info.IssueCode + ' 期')
            )
            s_pb.prepend(
              $("<option/>").text(info.IssueCode + ' 期')
            )
          }
          s_pa.val(obj.IssueCode)
          s_pb.val(obj.IssueCode)
          s_pa.selectmenu("refresh");
          s_pb.selectmenu("refresh");
        }
        rt.code = '100'
        rt = JSON.stringify(rt)
        setTimeout(() => {
          my_decode(rt, fun);
        }, 500);
      }
    });
  }
  /*抓取現在開獎號碼*/
  var CatchGameNowLotteryTimer;
  var CatchGameNowLottery = function (lottery_id) {
    $.ajax({
      url: `${config.baseUrl}/Lottery/SnailBet/GetSnailBetLastResult`,
      type: "POST",
      error: function (xhr) {
        setTimeout(() => {
          CatchGameNowLottery()
        }, 3000)
      },
      success: function (rt) {
        let code = $('.NowPeriodsNumber').html()
        if (rt.IssueCode !== code || !rt.Content) {
          setTimeout(() => {
            CatchGameNowLottery()
          }, 1500)
          return;
        }
        rt.code = 100
        console.log(rt)
        var fun = {}
        fun["100"] = function (obj) {
          that.find("#LotteryCode").html(obj.Content);
          that.find('#game-wating').hide();
          SnailGame.register_after_show_once(function () {
            snails.ShowWin(obj.Content);
            $this.GetGameChangePeriods(lottery_id, true);
          })
          let number = obj.Content.replace(/\|/g, '')
          switch (number) {
            case '123':
              obj.Script = {
                "1": [0.9, 1, 1.1, 1, 1.3, 1, 1, 0.9, 1, 1.347, 1.2, 1, 1, 1.3, 0.9, 0.9, 1.1, 1.1, 0.9, 1.2, 0.9, 1.2, 1, 0.9, 1.3, 0.8, 1.2, 1.3, 1.3, 1.3, 1.347, 1.3, 0.9, 0.9, 0.8, 1.1, 1.2, 0.9, 0.8, 1.2, 1, 1, 1.1, 1.3, 1.347, 1.2, 0.8, 1, 1.3, 0.9, 1.347, 1, 1.2, 1.1, 1.2, 1.347, 1.347, 1.2, 1.347, 1.3, 1, 1, 1.347, 1.347, 1.347, 1, 0.9, 1.3, 1.3, 1.347, 1.347, 1.1, 0.8, 0.9, 1, 1.347, 1.1, 1.342, 1.2, 1.347, 0.8, 1, 1.1, 1.2, 1.1, 1, 0.8, 0.9, 0.9, 0.8, 0.9],
                "2": [1.2, 1.2, 1.235, 0.8, 1.3, 1, 0.8, 0.8, 0.9, 1.235, 1.1, 1.235, 1.1, 0.8, 0.8, 1.235, 1, 1.2, 0.8, 1, 1.235, 1.3, 1.2, 1.235, 1, 1.235, 1.3, 0.9, 1.1, 1.1, 1, 0.9, 0.8, 1.3, 0.8, 1.235, 1.1, 0.8, 1.1, 1.3, 1.235, 1.2, 1.235, 1.1, 1.3, 1, 1.235, 0.9, 1.235, 1, 1, 1.3, 1, 1.3, 1, 0.8, 0.9, 1.1, 1.1, 1.235, 1.1, 1.1, 1.3, 1.3, 0.8, 1.3, 1, 1.235, 1, 0.8, 1.235, 1.1, 0.8, 1.1, 0.8, 1.1, 1.2, 1.1, 1.2, 0.9, 0.9, 1.3, 0.8, 1.235, 1.24, 1.3, 0.9, 1.1, 1, 1.1, 0.8, 1, 1],
                "3": [0.8, 0.838, 1.2, 1.1, 0.8, 1, 1.3, 0.838, 1.3, 0.8, 0.838, 0.9, 0.838, 0.8, 1.1, 1.1, 1, 1, 1, 0.838, 1.3, 1, 0.838, 0.838, 0.838, 1.2, 1, 1.3, 0.9, 0.9, 1.1, 0.838, 1.2, 0.838, 1, 0.9, 1.3, 1.1, 1.2, 0.8, 1.1, 0.838, 0.838, 1.2, 1, 1.2, 1, 1.3, 0.8, 1.1, 0.9, 0.8, 1.3, 0.838, 1.3, 0.838, 1.1, 1.1, 1.2, 0.9, 1.2, 1.3, 0.9, 1.3, 0.9, 1.3, 0.9, 0.838, 1.2, 0.838, 1.1, 0.9, 1.3, 0.838, 0.8, 0.8, 0.9, 0.838, 0.826, 0.838, 1.2, 0.9, 0.8, 1.1, 1.3, 1.3, 0.838, 0.838, 0.8, 1, 1.1, 0.8, 0.8, 1.2, 1.1, 0.838, 1, 0.9, 1.1, 0.838]

              }
              break;
            case '132':
              obj.Script = {
                "1": [0.9, 1, 1.1, 1, 1.3, 1, 1, 0.9, 1, 1.347, 1.2, 1, 1, 1.3, 0.9, 0.9, 1.1, 1.1, 0.9, 1.2, 0.9, 1.2, 1, 0.9, 1.3, 0.8, 1.2, 1.3, 1.3, 1.3, 1.347, 1.3, 0.9, 0.9, 0.8, 1.1, 1.2, 0.9, 0.8, 1.2, 1, 1, 1.1, 1.3, 1.347, 1.2, 0.8, 1, 1.3, 0.9, 1.347, 1, 1.2, 1.1, 1.2, 1.347, 1.347, 1.2, 1.347, 1.3, 1, 1, 1.347, 1.347, 1.347, 1, 0.9, 1.3, 1.3, 1.347, 1.347, 1.1, 0.8, 0.9, 1, 1.347, 1.1, 1.342, 1.2, 1.347, 0.8, 1, 1.1, 1.2, 1.1, 1, 0.8, 0.9, 0.9, 0.8, 0.9],
                "3": [1.2, 1.2, 1.235, 0.8, 1.3, 1, 0.8, 0.8, 0.9, 1.235, 1.1, 1.235, 1.1, 0.8, 0.8, 1.235, 1, 1.2, 0.8, 1, 1.235, 1.3, 1.2, 1.235, 1, 1.235, 1.3, 0.9, 1.1, 1.1, 1, 0.9, 0.8, 1.3, 0.8, 1.235, 1.1, 0.8, 1.1, 1.3, 1.235, 1.2, 1.235, 1.1, 1.3, 1, 1.235, 0.9, 1.235, 1, 1, 1.3, 1, 1.3, 1, 0.8, 0.9, 1.1, 1.1, 1.235, 1.1, 1.1, 1.3, 1.3, 0.8, 1.3, 1, 1.235, 1, 0.8, 1.235, 1.1, 0.8, 1.1, 0.8, 1.1, 1.2, 1.1, 1.2, 0.9, 0.9, 1.3, 0.8, 1.235, 1.24, 1.3, 0.9, 1.1, 1, 1.1, 0.8, 1, 1],
                "2": [0.8, 0.838, 1.2, 1.1, 0.8, 1, 1.3, 0.838, 1.3, 0.8, 0.838, 0.9, 0.838, 0.8, 1.1, 1.1, 1, 1, 1, 0.838, 1.3, 1, 0.838, 0.838, 0.838, 1.2, 1, 1.3, 0.9, 0.9, 1.1, 0.838, 1.2, 0.838, 1, 0.9, 1.3, 1.1, 1.2, 0.8, 1.1, 0.838, 0.838, 1.2, 1, 1.2, 1, 1.3, 0.8, 1.1, 0.9, 0.8, 1.3, 0.838, 1.3, 0.838, 1.1, 1.1, 1.2, 0.9, 1.2, 1.3, 0.9, 1.3, 0.9, 1.3, 0.9, 0.838, 1.2, 0.838, 1.1, 0.9, 1.3, 0.838, 0.8, 0.8, 0.9, 0.838, 0.826, 0.838, 1.2, 0.9, 0.8, 1.1, 1.3, 1.3, 0.838, 0.838, 0.8, 1, 1.1, 0.8, 0.8, 1.2, 1.1, 0.838, 1, 0.9, 1.1, 0.838]
              }
              break;
            case '213':
              obj.Script = {
                "2": [0.9, 1, 1.1, 1, 1.3, 1, 1, 0.9, 1, 1.347, 1.2, 1, 1, 1.3, 0.9, 0.9, 1.1, 1.1, 0.9, 1.2, 0.9, 1.2, 1, 0.9, 1.3, 0.8, 1.2, 1.3, 1.3, 1.3, 1.347, 1.3, 0.9, 0.9, 0.8, 1.1, 1.2, 0.9, 0.8, 1.2, 1, 1, 1.1, 1.3, 1.347, 1.2, 0.8, 1, 1.3, 0.9, 1.347, 1, 1.2, 1.1, 1.2, 1.347, 1.347, 1.2, 1.347, 1.3, 1, 1, 1.347, 1.347, 1.347, 1, 0.9, 1.3, 1.3, 1.347, 1.347, 1.1, 0.8, 0.9, 1, 1.347, 1.1, 1.342, 1.2, 1.347, 0.8, 1, 1.1, 1.2, 1.1, 1, 0.8, 0.9, 0.9, 0.8, 0.9],
                "1": [1.2, 1.2, 1.235, 0.8, 1.3, 1, 0.8, 0.8, 0.9, 1.235, 1.1, 1.235, 1.1, 0.8, 0.8, 1.235, 1, 1.2, 0.8, 1, 1.235, 1.3, 1.2, 1.235, 1, 1.235, 1.3, 0.9, 1.1, 1.1, 1, 0.9, 0.8, 1.3, 0.8, 1.235, 1.1, 0.8, 1.1, 1.3, 1.235, 1.2, 1.235, 1.1, 1.3, 1, 1.235, 0.9, 1.235, 1, 1, 1.3, 1, 1.3, 1, 0.8, 0.9, 1.1, 1.1, 1.235, 1.1, 1.1, 1.3, 1.3, 0.8, 1.3, 1, 1.235, 1, 0.8, 1.235, 1.1, 0.8, 1.1, 0.8, 1.1, 1.2, 1.1, 1.2, 0.9, 0.9, 1.3, 0.8, 1.235, 1.24, 1.3, 0.9, 1.1, 1, 1.1, 0.8, 1, 1],
                "3": [0.8, 0.838, 1.2, 1.1, 0.8, 1, 1.3, 0.838, 1.3, 0.8, 0.838, 0.9, 0.838, 0.8, 1.1, 1.1, 1, 1, 1, 0.838, 1.3, 1, 0.838, 0.838, 0.838, 1.2, 1, 1.3, 0.9, 0.9, 1.1, 0.838, 1.2, 0.838, 1, 0.9, 1.3, 1.1, 1.2, 0.8, 1.1, 0.838, 0.838, 1.2, 1, 1.2, 1, 1.3, 0.8, 1.1, 0.9, 0.8, 1.3, 0.838, 1.3, 0.838, 1.1, 1.1, 1.2, 0.9, 1.2, 1.3, 0.9, 1.3, 0.9, 1.3, 0.9, 0.838, 1.2, 0.838, 1.1, 0.9, 1.3, 0.838, 0.8, 0.8, 0.9, 0.838, 0.826, 0.838, 1.2, 0.9, 0.8, 1.1, 1.3, 1.3, 0.838, 0.838, 0.8, 1, 1.1, 0.8, 0.8, 1.2, 1.1, 0.838, 1, 0.9, 1.1, 0.838]
              }
              break;
            case '231':
              obj.Script = {
                "2": [0.9, 1, 1.1, 1, 1.3, 1, 1, 0.9, 1, 1.347, 1.2, 1, 1, 1.3, 0.9, 0.9, 1.1, 1.1, 0.9, 1.2, 0.9, 1.2, 1, 0.9, 1.3, 0.8, 1.2, 1.3, 1.3, 1.3, 1.347, 1.3, 0.9, 0.9, 0.8, 1.1, 1.2, 0.9, 0.8, 1.2, 1, 1, 1.1, 1.3, 1.347, 1.2, 0.8, 1, 1.3, 0.9, 1.347, 1, 1.2, 1.1, 1.2, 1.347, 1.347, 1.2, 1.347, 1.3, 1, 1, 1.347, 1.347, 1.347, 1, 0.9, 1.3, 1.3, 1.347, 1.347, 1.1, 0.8, 0.9, 1, 1.347, 1.1, 1.342, 1.2, 1.347, 0.8, 1, 1.1, 1.2, 1.1, 1, 0.8, 0.9, 0.9, 0.8, 0.9],
                "3": [1.2, 1.2, 1.235, 0.8, 1.3, 1, 0.8, 0.8, 0.9, 1.235, 1.1, 1.235, 1.1, 0.8, 0.8, 1.235, 1, 1.2, 0.8, 1, 1.235, 1.3, 1.2, 1.235, 1, 1.235, 1.3, 0.9, 1.1, 1.1, 1, 0.9, 0.8, 1.3, 0.8, 1.235, 1.1, 0.8, 1.1, 1.3, 1.235, 1.2, 1.235, 1.1, 1.3, 1, 1.235, 0.9, 1.235, 1, 1, 1.3, 1, 1.3, 1, 0.8, 0.9, 1.1, 1.1, 1.235, 1.1, 1.1, 1.3, 1.3, 0.8, 1.3, 1, 1.235, 1, 0.8, 1.235, 1.1, 0.8, 1.1, 0.8, 1.1, 1.2, 1.1, 1.2, 0.9, 0.9, 1.3, 0.8, 1.235, 1.24, 1.3, 0.9, 1.1, 1, 1.1, 0.8, 1, 1],
                "1": [0.8, 0.838, 1.2, 1.1, 0.8, 1, 1.3, 0.838, 1.3, 0.8, 0.838, 0.9, 0.838, 0.8, 1.1, 1.1, 1, 1, 1, 0.838, 1.3, 1, 0.838, 0.838, 0.838, 1.2, 1, 1.3, 0.9, 0.9, 1.1, 0.838, 1.2, 0.838, 1, 0.9, 1.3, 1.1, 1.2, 0.8, 1.1, 0.838, 0.838, 1.2, 1, 1.2, 1, 1.3, 0.8, 1.1, 0.9, 0.8, 1.3, 0.838, 1.3, 0.838, 1.1, 1.1, 1.2, 0.9, 1.2, 1.3, 0.9, 1.3, 0.9, 1.3, 0.9, 0.838, 1.2, 0.838, 1.1, 0.9, 1.3, 0.838, 0.8, 0.8, 0.9, 0.838, 0.826, 0.838, 1.2, 0.9, 0.8, 1.1, 1.3, 1.3, 0.838, 0.838, 0.8, 1, 1.1, 0.8, 0.8, 1.2, 1.1, 0.838, 1, 0.9, 1.1, 0.838]
              }
              break;
            case '321':
              obj.Script = {
                "3": [0.9, 1, 1.1, 1, 1.3, 1, 1, 0.9, 1, 1.347, 1.2, 1, 1, 1.3, 0.9, 0.9, 1.1, 1.1, 0.9, 1.2, 0.9, 1.2, 1, 0.9, 1.3, 0.8, 1.2, 1.3, 1.3, 1.3, 1.347, 1.3, 0.9, 0.9, 0.8, 1.1, 1.2, 0.9, 0.8, 1.2, 1, 1, 1.1, 1.3, 1.347, 1.2, 0.8, 1, 1.3, 0.9, 1.347, 1, 1.2, 1.1, 1.2, 1.347, 1.347, 1.2, 1.347, 1.3, 1, 1, 1.347, 1.347, 1.347, 1, 0.9, 1.3, 1.3, 1.347, 1.347, 1.1, 0.8, 0.9, 1, 1.347, 1.1, 1.342, 1.2, 1.347, 0.8, 1, 1.1, 1.2, 1.1, 1, 0.8, 0.9, 0.9, 0.8, 0.9],
                "2": [1.2, 1.2, 1.235, 0.8, 1.3, 1, 0.8, 0.8, 0.9, 1.235, 1.1, 1.235, 1.1, 0.8, 0.8, 1.235, 1, 1.2, 0.8, 1, 1.235, 1.3, 1.2, 1.235, 1, 1.235, 1.3, 0.9, 1.1, 1.1, 1, 0.9, 0.8, 1.3, 0.8, 1.235, 1.1, 0.8, 1.1, 1.3, 1.235, 1.2, 1.235, 1.1, 1.3, 1, 1.235, 0.9, 1.235, 1, 1, 1.3, 1, 1.3, 1, 0.8, 0.9, 1.1, 1.1, 1.235, 1.1, 1.1, 1.3, 1.3, 0.8, 1.3, 1, 1.235, 1, 0.8, 1.235, 1.1, 0.8, 1.1, 0.8, 1.1, 1.2, 1.1, 1.2, 0.9, 0.9, 1.3, 0.8, 1.235, 1.24, 1.3, 0.9, 1.1, 1, 1.1, 0.8, 1, 1],
                "1": [0.8, 0.838, 1.2, 1.1, 0.8, 1, 1.3, 0.838, 1.3, 0.8, 0.838, 0.9, 0.838, 0.8, 1.1, 1.1, 1, 1, 1, 0.838, 1.3, 1, 0.838, 0.838, 0.838, 1.2, 1, 1.3, 0.9, 0.9, 1.1, 0.838, 1.2, 0.838, 1, 0.9, 1.3, 1.1, 1.2, 0.8, 1.1, 0.838, 0.838, 1.2, 1, 1.2, 1, 1.3, 0.8, 1.1, 0.9, 0.8, 1.3, 0.838, 1.3, 0.838, 1.1, 1.1, 1.2, 0.9, 1.2, 1.3, 0.9, 1.3, 0.9, 1.3, 0.9, 0.838, 1.2, 0.838, 1.1, 0.9, 1.3, 0.838, 0.8, 0.8, 0.9, 0.838, 0.826, 0.838, 1.2, 0.9, 0.8, 1.1, 1.3, 1.3, 0.838, 0.838, 0.8, 1, 1.1, 0.8, 0.8, 1.2, 1.1, 0.838, 1, 0.9, 1.1, 0.838]
              }
              break;
            case '312':
              obj.Script = {
                "3": [0.9, 1, 1.1, 1, 1.3, 1, 1, 0.9, 1, 1.347, 1.2, 1, 1, 1.3, 0.9, 0.9, 1.1, 1.1, 0.9, 1.2, 0.9, 1.2, 1, 0.9, 1.3, 0.8, 1.2, 1.3, 1.3, 1.3, 1.347, 1.3, 0.9, 0.9, 0.8, 1.1, 1.2, 0.9, 0.8, 1.2, 1, 1, 1.1, 1.3, 1.347, 1.2, 0.8, 1, 1.3, 0.9, 1.347, 1, 1.2, 1.1, 1.2, 1.347, 1.347, 1.2, 1.347, 1.3, 1, 1, 1.347, 1.347, 1.347, 1, 0.9, 1.3, 1.3, 1.347, 1.347, 1.1, 0.8, 0.9, 1, 1.347, 1.1, 1.342, 1.2, 1.347, 0.8, 1, 1.1, 1.2, 1.1, 1, 0.8, 0.9, 0.9, 0.8, 0.9],
                "1": [1.2, 1.2, 1.235, 0.8, 1.3, 1, 0.8, 0.8, 0.9, 1.235, 1.1, 1.235, 1.1, 0.8, 0.8, 1.235, 1, 1.2, 0.8, 1, 1.235, 1.3, 1.2, 1.235, 1, 1.235, 1.3, 0.9, 1.1, 1.1, 1, 0.9, 0.8, 1.3, 0.8, 1.235, 1.1, 0.8, 1.1, 1.3, 1.235, 1.2, 1.235, 1.1, 1.3, 1, 1.235, 0.9, 1.235, 1, 1, 1.3, 1, 1.3, 1, 0.8, 0.9, 1.1, 1.1, 1.235, 1.1, 1.1, 1.3, 1.3, 0.8, 1.3, 1, 1.235, 1, 0.8, 1.235, 1.1, 0.8, 1.1, 0.8, 1.1, 1.2, 1.1, 1.2, 0.9, 0.9, 1.3, 0.8, 1.235, 1.24, 1.3, 0.9, 1.1, 1, 1.1, 0.8, 1, 1],
                "2": [0.8, 0.838, 1.2, 1.1, 0.8, 1, 1.3, 0.838, 1.3, 0.8, 0.838, 0.9, 0.838, 0.8, 1.1, 1.1, 1, 1, 1, 0.838, 1.3, 1, 0.838, 0.838, 0.838, 1.2, 1, 1.3, 0.9, 0.9, 1.1, 0.838, 1.2, 0.838, 1, 0.9, 1.3, 1.1, 1.2, 0.8, 1.1, 0.838, 0.838, 1.2, 1, 1.2, 1, 1.3, 0.8, 1.1, 0.9, 0.8, 1.3, 0.838, 1.3, 0.838, 1.1, 1.1, 1.2, 0.9, 1.2, 1.3, 0.9, 1.3, 0.9, 1.3, 0.9, 0.838, 1.2, 0.838, 1.1, 0.9, 1.3, 0.838, 0.8, 0.8, 0.9, 0.838, 0.826, 0.838, 1.2, 0.9, 0.8, 1.1, 1.3, 1.3, 0.838, 0.838, 0.8, 1, 1.1, 0.8, 0.8, 1.2, 1.1, 0.838, 1, 0.9, 1.1, 0.838]
              }
              break;
          }
          SnailGame.push_run_script(obj.Script, obj.Content.replace(/\|/g, ','))
        }
        rt = JSON.stringify(rt)
        my_decode(rt, fun);
      }
    });
  }
  var CreateGamePeriods = function () {
    that.find(".NowPeriodsNumber").html(NowPeriods.PeriodsStr);
    that.find("#NowPeriodsCloseTime").html(NowPeriods.CloseTime);
    // 
    $this.GetGameToDayPeriods()
    that.find("#PeriodsStatus").removeClass("time_icon_out").addClass("time_icon");
  }
  var SendBetFun = function () {
    if (GameClose) { return; }
    if (!NowPeriods) { return; }
    var send = {
      'GameID': GameInfo.GameID,
      'BetInfo': []
    }
    that.find('.cbet-money').each(function (index, el) {
      if ($(this).val() == '' || $(this).val() * 1 <= 0) {
        return
      }
      var temp = {};
      temp.money = $(this).val();
      temp.cbet = $(this).attr('data-bet_content');
      send.BetInfo.push(temp)
    });
    if (send.BetInfo.length < 1) {
      ZgCreate.alert(LG.gstr("lang_system_msg"), "请先输入下注金额。");
      return;
    }
    var sentbet_sum = 0;
    for (var i = 0; i < send.BetInfo.length; i++) {
      sentbet_sum += parseInt(send.BetInfo[i]['money'])
    }
    var MemberMoney = MemLog.GetMemberMoney();
    if (MemberMoney < sentbet_sum) {
      ZgCreate.alert(LG.gstr("lang_system_msg"), "金额不足");
      return;
    }
    ZgCreate.confirm("确认投注!?", SendConfirmContent(send), {
      complete: function () {
        loading(true);
        $('.cbet-money,.total-Betting').val('0');
        var sendValue = {
          issueCode: that.find('.NowPeriodsNumber').html(),
          gameType: 'wnsp',
          ...send
        }
        $.ajax({
          url: `${config.baseUrl}/Lottery/SnailBet/CreditBetting`,
          type: "POST",
          data: sendValue,
          async: true,
          error: function (xhr) {
            loading(false);
          },
          success: function (rt) {
            loading(false);
            if (rt.code === 0) {
              rt.code = 100
            }
            var fun = {}
            fun["100"] = function (obj) {
              var err = [];
              for (var i in obj.re_ary) {
                var v = obj.re_ary[i];
                if (v.hasOwnProperty("msg")) {
                  err.push(v.msg)
                }
              }
              var msg = LG.gstr("lang_game_bet_success", {
                number: sendValue.BetInfo.length,
                success_number: sendValue.BetInfo.length,
                err_number: 0
              });
              for (var i in err) {
                if (err.hasOwnProperty(i)) {
                  msg += '<div>' + err[i] + '</div>';
                }
              }
              ZgCreate.alert(LG.gstr("lang_system_msg"), msg);
              $this.GetGameChangePeriods(sendValue.issueCode);  //投注资料
              $this.GetOrderDistribution(sendValue.issueCode);  //投注分布
              MemLog.reset();
              /*mem_bet_order.CatchOrderInfo();*/
              try {
                parent.MemLog.reset();
              } catch (e) { }
            }
            rt = JSON.stringify(rt)
            my_decode(rt, fun);
          }
        });
        $(this).trigger("Close");
      }
    });
  }
  /*送出前的確認資料*/
  var SendConfirmContent = function (betdata) {
    var snailmap = { 'GJ_HO': '红', 'GJ_LV': '绿', 'GJ_LA': '蓝', 'GY_HO': '红', 'GY_LV': '绿', 'GY_LA': '蓝', 'GYJ_HOLVLA': '红绿蓝', 'GYJ_HOLALV': '红蓝绿', 'GYJ_LVHOLA': '绿红蓝', 'GYJ_LVLAHO': '绿蓝红', 'GYJ_LAHOLV': '蓝红绿', 'GYJ_LALVHO': '蓝绿红' }
    var Periods = NowPeriods;
    var PeriodsStr = Periods.PeriodsStr;
    var bet_total = GetTotalBetInfo();
    var bet_num = bet_total.bet_num;
    var bet_money = bet_total.bet_money;
    var data = '';
    var content = $("<div/>").css({
      "line-height": "28px",
      "border": "1px solid #e4e4e4",
      "border-radius": "4px",
      "display": "inline-block"
    })
    content.append(
      $("<div/>").addClass("confirm-tr").append(
        $("<div/>").addClass("confirm-td").html('下注期数')
      ).append(
        $("<div/>").addClass('confirm-td').html(PeriodsStr + '&nbsp;期')
      )
    )
    for (var i in betdata.BetInfo) {
      console.log(i)
      content.append(
        $("<div/>").addClass('confirm-tr').append(
          $("<div/>").addClass("confirm-td").html(snailmap[betdata.BetInfo[i].cbet])
        ).append(
          $("<div/>").addClass("confirm-td").html(betdata.BetInfo[i].money + '&nbsp;元')
        )
      )
    }
    content.append(data)
    return content;
  }
  /*取得準備資料總金額、總注數*/
  var GetTotalBetInfo = function () {
    var info = {};
    info.bet_num = 0;
    info.bet_money = 0;
    for (var k in NowBetInfo) {
      if (NowBetInfo.hasOwnProperty(k)) {
        var v = NowBetInfo[k];
        info.bet_num = info.bet_num.add(v.bet_num);
        info.bet_money = info.bet_money.add(v.total_money);
      }
    }
    return info;
  }
  /*抓取投注資料*/
  this.GetGameChangePeriods = function (LotteryID, GameEnd) {
    that.find(".ToDayPeriods").val(LotteryID);
    var text = that.find('.NowPeriodsNumber').html() + ' 期'
    that.find(".BetInfoForNow").html(text);
    let code
    if (LotteryID) {
      code = LotteryID.slice(0, 11)
    } else {
      code = ''
    }
    $.ajax({
      url: `${config.baseUrl}/Lottery/SnailBet/GetSnailResult`,
      type: "POST",
      data: {
        issueCode: code
      },
      error: function (xhr) { },
      success: function (rt) {
        console.log(rt)
        var fun = {}
        fun["100"] = function (obj) {
          $('.Play_209_1_money').html(obj.GJ_HO)
          $('.Play_209_2_money').html(obj.GJ_LV)
          $('.Play_209_3_money').html(obj.GJ_LA)

          $('.Play_210_1_money').html(obj.GY_HO)
          $('.Play_210_2_money').html(obj.GY_LV)
          $('.Play_210_3_money').html(obj.GY_LA)

          $('.Play_211_123_money').html(obj.GYJ_HOLVLA)
          $('.Play_211_213_money').html(obj.GYJ_LVHOLA)
          $('.Play_211_312_money').html(obj.GYJ_LAHOLV)
          $('.Play_211_132_money').html(obj.GYJ_HOLALV)
          $('.Play_211_231_money').html(obj.GYJ_LVLAHO)
          $('.Play_211_321_money').html(obj.GYJ_LALVHO)

          $('.TotalBetMoney').html(obj.AllBet)
          $('.TotalWinMoney').html(obj.WinOrLose)
        }
        rt.code = 100
        rt = JSON.stringify(rt)
        my_decode(rt, fun);
        if (GameEnd) {
          MemLog.TimerByMemberMoney()
          setTimeout(function () {
            $this.GetGamePeriods();
            snails.switchbet(false);
          }, 3000)
        }
      }
    });
  }
  this.reset_game = function (GameID) {
    c_down.clear_timer();
    NowGameID = GameID;
    CatchGameInfo();
  }
  /*今日胜率*/
  this.GetSnailWin = function (lottery_id) {
    $.ajax({
      url: `${config.baseUrl}/Lottery/SnailBet/GetSnailBetWinRate`,
      type: "POST",
      error: function (xhr) { },
      success: function (rt) {
        rt.code = 100
        var fun = {}
        fun["100"] = function (info) {
          console.log(info.HOWinRate)
          if (info.hasOwnProperty("HOWinRate")) {
            var p = parseInt(info.HOWinRate) * 1;
            that.find(".win_Snail_1").each(function (i) {
              RunNumber($(this), p)
            })
          }
          if (info.hasOwnProperty("LVWinRate")) {
            var p = parseInt(info.LVWinRate) * 1;
            that.find(".win_Snail_2").each(function (i) {
              RunNumber($(this), p)
            })
          }
          if (info.hasOwnProperty("LAWinRate")) {
            var p = parseInt(info.LAWinRate) * 1;
            that.find(".win_Snail_3").each(function (i) {
              RunNumber($(this), p)
            })
          }
        }
        rt = JSON.stringify(rt)
        my_decode(rt, fun);
      }
    });
  }
  /*分怖、胜率 - 跑%*/
  var RunNumber = function (d, p) {
    var Timer;
    var n = d.attr("data-num") * 1;
    Timer = setInterval(function () {
      if (n == p) {
        clearInterval(Timer);
        d.attr("data-num", n)
      } else {
        if (n < p) {
          n++;
        } else {
          n--
        }
        d.html(n + "%");
      }
    }, 10);
  }
  /*抓取购买分布*/
  var GetOrderDistributionTimer;
  this.GetOrderDistribution = function (lottery_id) {
    clearTimeout(GetOrderDistributionTimer)
    $.ajax({
      url: `${config.baseUrl}/Lottery/SnailBet/GetSnailBetPubRate`,
      type: "POST",
      data: {
        issueCode: lottery_id
      },
      error: function (xhr) { },
      success: function (rt) {
        rt.code = 100
        var fun = {}
        fun["100"] = function (obj) {
          if (obj.hasOwnProperty("HORate")) {
            var p = parseInt(obj.HORate) * 1;
            that.find('.bar-inner-1').css('width', p + '%');
            that.find(".Distribution_Snail_1").each(function (i) {
              RunNumber($(this), p)
            })
          }
          if (obj.hasOwnProperty("LVRate")) {
            var p = parseInt(obj.LVRate) * 1;
            that.find('.bar-inner-2').css('width', p + '%');
            that.find(".Distribution_Snail_2").each(function (i) {
              RunNumber($(this), p)
            })
          }
          if (obj.hasOwnProperty("LARate")) {
            var p = parseInt(obj.LARate) * 1;
            that.find('.bar-inner-3').css('width', p + '%');
            that.find(".Distribution_Snail_3").each(function (i) {
              RunNumber($(this), p)
            })
          }
        }
        rt = JSON.stringify(rt)
        my_decode(rt, fun);
      }
    });
    GetOrderDistributionTimer = setTimeout(function () {
      $this.GetOrderDistribution($('.NowPeriodsNumber').html())
    }, 10 * 1000)
  }
  var CloseGame = function () {
    GameClose = true;
    that.find(".game_close_content").show();
  }
  var init = function () {
    //inIframe()
    if (false) {
      zw = parent.zw;
      room = parent;
      room_fun = parent.room;
    } else {
      zw = game_zw;
      room = false;
      room_fun = false;
    }
    CatchGameInfo();
    that.find(".BetBtn").click(function () {
      SendBetFun();
    })
  };
  init();
};
var MemLog, room, OrderFun, RaceFun, snails;
var gcd = document.querySelector("#GameCanvasDiv")
var SnailGame = SnailRace(document.querySelector("#GameCanvasDiv"))
$(SnailGame.el).css({
  // transform:"scale(1.025)",
  display: "table",
  margin: "0 auto",
})
$(gcd).css("margin-top", "60px")
var progress_span = $('.progress-bar span')
SnailGame.register_progress(function (progress) {
  progress_span.css("width", progress + "%")
})
SnailGame.ready(LoadingSnailGame)
function LoadingSnailGame () {
  setTimeout(function () {
    SnailGame.vod_play_eff(true)
    //console.log("Loading - Complete")
  }, 500)
  game_zw = new ZgWindow();
  MemLog = new MemberLog("23");
  room = new RoomFunction();
  OrderFun = new OrderFunction()
  game_gontrol = new GameControl("23");
  $("#game-head").show();
  snails = new snail();
  $('#splash').hide()
}
var snail = function () {
  var $this = this;
  var that = $('body');
  this.ResetBetInput = function () {
    $('.cbet-money,.total-Betting').val("0");
  }
  this.reset = function () {
    NowBetInfo = [];
    that.find('.cbet-money,.total-Betting').val("0");
  }
  var gamemodeswitch = function () {
    var basicmode = that.find('#game-basic');
    basicmode.animate({
      'margin-bottom': 0
    }, 300, function () {
      basicmode.addClass('active game-animated game-bounce');
    });

    that.find('.game-mode-switch').each(function (index, el) {
      $(this).click(function (event) {
        SnailGame.play_snd_effect("Change")
        nowmode = that.find('.game-mode.active');
        newmode = nowmode.siblings('.game-mode');
        nowmode.removeClass('active game-animated game-bounce').animate({
          'margin-bottom': -(nowmode.height())
        }, 400);
        newmode.addClass('active').animate({
          'margin-bottom': 0
        }, 400, function () {
          newmode.addClass('game-animated game-bounce');
        });
        $this.ResetBetInput()
      });
    });
  }
  var soundswitch = function () {
    that.find('.sound-switch').attr('data-original-title', '背景音乐 / 开启').click(function (event) {
      $(this).toggleClass('active');
      if ($(this).hasClass('active')) {
        $(this).attr('data-original-title', '背景音乐 / 开启');
        that.find('#' + $(this).attr('aria-describedby') + ' .tooltip-inner').html('背景音乐 / 开启');
        SnailGame.vod_play_bg(true);
      } else {
        $(this).attr('data-original-title', '背景音乐 / 关闭');
        that.find('#' + $(this).attr('aria-describedby') + ' .tooltip-inner').html('背景音乐 / 关闭');
        SnailGame.vod_play_bg(false);
      }
    });

    that.find('.sound-effects').addClass('active').attr('data-original-title', '音效 / 开启').click(function (event) {
      $(this).toggleClass('active');
      if ($(this).hasClass('active')) {
        $(this).attr('data-original-title', '音效 / 开启');
        that.find('#' + $(this).attr('aria-describedby') + ' .tooltip-inner').html('音效 / 开启');
        SnailGame.vod_play_eff(true);
      } else {
        $(this).attr('data-original-title', '音效 / 关闭');
        that.find('#' + $(this).attr('aria-describedby') + ' .tooltip-inner').html('音效 / 关闭');
        SnailGame.vod_play_eff(false);
      }
    });
  }
  this.switchbet = function (on) {
    var nowbet = that.find('.game-mode.active');
    var betinfo = that.find('#game-betinfo');
    var betbar = that.find('#game-wating');
    SnailGame.play_snd_effect("Change");
    if (on) {
      nowbet.removeClass('game-animated game-bounce').animate({
        'margin-bottom': -(nowbet.height())
      }, 400);
      betinfo.animate({
        'margin-bottom': 0
      }, 400, function () {
        betinfo.addClass('game-animated game-bounce');
      });

      if (!betbar.is(":visible")) {
        betbar.fadeIn(300);
      }
    } else {
      betinfo.removeClass('game-animated game-bounce').animate({
        'margin-bottom': -(betinfo.height())
      }, 400);
      nowbet.animate({
        'margin-bottom': 0
      }, 400, function () {
        nowbet.addClass('game-animated game-bounce');
      });
    }
  }
  var titletip = function () {
    that.find('[data-toggle="tooltip"]').tooltip()
  }
  var WinImage = {
    "1": $("<i/>").addClass("snails snails-snailA"),
    "2": $("<i/>").addClass("snails snails-snailB"),
    "3": $("<i/>").addClass("snails snails-snailC"),
  };
  this.ShowWin = function (Ranking) {
    var ary = Ranking.split("|");
    var podium = that.find("#game-podium");
    var mask = that.find('#game-mask')
    for (var i in ary) {
      podium.find(".Win_" + ((i * 1) + 1)).html(WinImage[ary[i]])
    }
    podium.fadeIn(300);
    mask.fadeIn(300);
    SnailGame.play_snd_effect("Win")
    setTimeout(function () {
      podium.fadeOut(300);
      mask.fadeOut(300);
    }, 5000)
  }
  var init = function () {
    gamemodeswitch();
    soundswitch();
    titletip();
    $(".ToDayPeriods").selectmenu({
      change: function (event, ui) {
        $(this).val(ui.item.value);
        game_gontrol.GetGameChangePeriods(ui.item.value)
      }
    });
    var first = false;
    that.find('.ui-selectmenu-button').click(function () {
      var f = $(this).parent();
      var menu = $("ul[aria-labelledby='" + $(this).attr("id") + "']");
      if (!first) {
        menu.mCustomScrollbar({
          theme: "dark-3"
        });
      }
      var index = f.find("select :selected").index();
      var li_id = menu.find(".mCSB_container li:eq(" + index + ")").attr("id");
      menu.mCustomScrollbar("scrollTo", "#" + li_id, {
        scrollInertia: 0
      });
    });

    $this.reset();
    that.find(".ResetBet").click(function () {
      $this.ResetBetInput()
    });
    that.find(".numf").keyup(function (event) {
      var map = "0123456789"
      var val = this.value
      var chkv = val.toLowerCase()
      for (var i = 0; i < chkv.length; i++) {
        var chr = chkv.charAt(i)
        if (map.indexOf(chr) == -1) {
          val = val.replace(chr, "")
        }
      }
      if (chkv.charAt(0) == "0") {
        if (chkv.charAt(1) != ".") {
          val = val.replace(chkv.charAt(0), "")
        }
      }
      if (val == "") { val = 0 }
      this.value = val
    })
    that.find('.cbet-money').keyup(function (event) {
      var bet_sum = 0;
      that.find('.cbet-money').each(function (index, el) {
        if (!isNaN(parseInt($(this).val()))) {
          bet_sum += parseInt($(this).val())
        }
      })
      that.find('.total-Betting').val(bet_sum);
    });
    that.find(".ButtonAudio").mouseenter(function () {
      SnailGame.play_snd_effect("Button")
    });

    /*快速選取金額*/
    var now_focus;
    var min_money = 0;
    var max_money = 10000;
    that.find("#MoneyDialog").bind("Close", function () {
      $(this).stop(true, true).delay(200).fadeOut(200)
    })
    that.find('.cbet-money').focus(function () {
      var d = that.find("#MoneyDialog");
      var d_height = 191 + 15;
      var d_width = 100 / 2;
      var m_width = $(this).outerWidth() / 2;
      var d_top = $(this).offset().top;
      var d_left = $(this).offset().left;
      d.css({
        top: d_top - d_height,
        left: d_left + m_width - d_width
      }).stop(true, true).delay(200).fadeIn(200)
      now_focus = $(this);
    });

    that.find("#MoneyDialog .minus").click(function () {
      var n_money = now_focus.val() * 1;
      var t_money = $(this).attr("data-money") * 1;
      var next_money = n_money - t_money;
      if (next_money < min_money) {
        next_money = min_money;
      }
      now_focus.val(next_money).trigger("keyup");
    })
    that.find("#MoneyDialog .plus").click(function () {
      var n_money = now_focus.val() * 1;
      var t_money = $(this).attr("data-money") * 1;
      var next_money = n_money + t_money;
      if (next_money > max_money) {
        next_money = max_money;
      }
      now_focus.val(next_money).trigger("keyup");
    })
    $(document).click(function (event) {
      var d = that.find("#MoneyDialog");
      var eobj = $(event.target);
      if (
        eobj.attr('id') == d.attr("id") || eobj.closest("#" + d.attr("id")).length > 0 || eobj.hasClass("cbet-money")
      ) {
        return
      }
      d.trigger("Close");
    });
  }
  init()
}