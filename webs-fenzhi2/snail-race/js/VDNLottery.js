/*越南彩 - 開獎框*/
var VDNLottery = function (that, op) {
  var $this = this;
  var openLotteryAry = {};
  var option = $.extend({
    openlottery: false,
    event: false,
    lotteryNum: 18
  }, op);
  var openItem = {
    "18": [[""], [""], [""], ["", ""], ["", "", "", "", "", "", ""], [""], ["", "", ""], [""], [""]],
    "27": [
      [""], [""], ["", ""],
      ["", "", "", "", "", ""], ["", "", "", ""], ["", "", "", "", "", ""],
      ["", "", ""], ["", "", "", ""]
    ]
  }
  var create = function () {
    var mainD = $("<div/>").addClass("VDNLotteryContent");
    var main_t = $("<div>").addClass("vtable mainVTable");
    for (var k in openLotteryAry) {
      var item = openLotteryAry[k];
      var itemHtml = $("<div/>").addClass("vtr")
      var title = k == "0" ? "S" : k;
      var title = LG.gstr("lang_game_vdn_lot_item_" + k, [], title);
      itemHtml.append(
        $("<div/>").html(title).addClass("vtd")
      )
      var cont = $("<div/>").addClass("vtd")
      var tb = $("<div/>").addClass("vtable itemVTable")
      var tdNum = 0;
      for (var itemK in item) {
        tdNum++;
        if (tdNum % 2 == 1) {
          var tr = $("<div>").addClass("vtr")
        }
        tr.append(
          $("<div/>").addClass("vtd").html(function () {
            var d = $("<div/>").addClass("VDNItemNumber");
            var maxNum = item[itemK].length;
            item[itemK].split("").forEach(function (e, i, ary) {
              if ((maxNum - 2) == i) {
                return;
              } else if ((maxNum - 1) == i) {
                d.append(function () {
                  var first = ary[i - 1];
                  var last = e;
                  var span = $("<number/>").append(first + last + "")
                  span.addClass("first" + first + " last" + last);
                  return span;
                });
              } else {
                d.append(
                  $("<number/>").append(e)
                );
              }
            });
            return d;
          })
        )
        if (tdNum % 2 == 0) {
          tb.append(tr)
        }
      }
      if (tdNum % 2 != 0) {
        tb.append(tr)
      }
      cont.append(tb);
      itemHtml.append(cont)
      main_t.append(itemHtml)
      mainD.html(main_t)
    }
    that.append(mainD);
    event();
  }
  var event = function () {
    switch (option.event) {
      case '':
        {
          break;
        }
    }
  }
  var init = function () {
    if (that !== undefined) {
      that.addClass("VDNOpenLottery");
      if (option.openlottery !== false && option.openlottery != "") {
        openLotteryAry = json_decode(option.openlottery);
      } else {
        openLotteryAry = {};
        if (openItem.hasOwnProperty(option.lotteryNum)) {
          openLotteryAry = openItem[option.lotteryNum];
        } else {
          for (var i = 0; i < option.lotteryNum; i++) {
            openLotteryAry[i] = "";
          }
        }
      }
      create();
    }
  }
  init();
}
var VDNOfficial = new function (gameId) {
  var $this = this;
  var VNDofficialGameId = ["146", "147", "148"];
  this.inOfficial = function (gameId) {
    var isTrue = false;
    for (var i in VNDofficialGameId) {
      if (VNDofficialGameId[i] == gameId) {
        isTrue = true;
        break;
      }
    }
    return isTrue;
  }
  this.getPeriodsStr = function (PeriodsStr) {
    return PeriodsStr.split("_")[0];
  }
  this.getPeriodsStrByShow = function (PeriodsStr) {
    var periodAry = PeriodsStr.split("_");
    return periodAry[0] + "-" + LG.gstr("lang_vdn_city_" + periodAry[1]);
  }
  this.getPeriodsStrByShowByAdmin = function (PeriodsStr) {
    var periodAry = PeriodsStr.split("_");
    return PeriodsStr + "(" + LG.gstr("lang_vdn_city_" + periodAry[1]) + ")";
  }
}