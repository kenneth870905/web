var AjaxSendAry = {};

function ajax_get (url, data, showLoadingImgFn, option) {
  if (!data) {
    data = {};
  }
  if (!showLoadingImgFn) {
    showLoadingImgFn = function () { };
  }
  var op = $.extend({
    url: url,
    type: "POST",
    data: data,
    async: true,
    dataType: 'html',
    beforeSend: showLoadingImgFn,
    checkRepeat: true
  }, option);
  var mark = url + json_encode(data);
  if (op.checkRepeat) {
    if (AjaxSendAry.hasOwnProperty(mark)) {
      console.log("cancel_request:" + mark);
      return $.ajax().abort();
    }
    AjaxSendAry[mark] = 1;
  }
  return $.ajax(op).fail(function (e) {
    console.log(e)
  }).always(function (e) {
    if (AjaxSendAry.hasOwnProperty(mark)) {
      delete AjaxSendAry[mark];
    }
  })
}
var ctl_data = new Object();
var AjaxSendAry = {};
var ajaxFun = new function () {
  var $this = this;
  var SendAry = {};
  var Defoption = {
    type: "POST",
    async: true,
    dataType: 'html',
    checkRepeat: true, // 是否檢查重覆網址
    beforeSend: function () { }
  };
  var SendFun = {
    done: function (rt) { },
    fail: function (e) { },
    always: function (e) { },
    beforeSend: function () { }
  };
  this.send = function (url, data, eventFun, option) {
    if (!data) {
      data = {};
    }
    var eve = $.extend(SendFun, eventFun);
    var op = $.extend(Defoption, option);
    op.url = url;
    op.data = data;
    op.beforeSend = eve.beforeSend;
    var mark = url + JSON.stringify(data);
    if (op.checkRepeat) {
      if (SendAry.hasOwnProperty(mark)) {
        console.log("cancel_request:" + mark);
        return false;
      }
      SendAry[mark] = 1;
    }
    $.ajax(op).fail(function (e) {
      console.log(e)
    }).always(function (e) {
      if (SendAry.hasOwnProperty(mark)) {
        delete SendAry[mark];
      }
    }).always(eve.always).fail(function (e) {
      eve.fail(e)
    }).done(function (rt) {
      eve.done(rt)
    })
  }
}
var access_code = "";

function urldecode (str) {
  return decodeURIComponent((str + '').replace(/\+/g, '%20'));
}

function ipt_bindle (str) {
  $("." + str).keyup(function (event) {
    var map = "0123456789.-"
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
    if (val == "") {
      val = 0
    }
    this.value = val
  })
}

function json_encode (obj) {
  return $.stringify(obj)
}

function json_decode (str) {
  return $.parseJSON(str)
}

function parse_to (ohtml, obj) {
  var html = ohtml;
  for (var i in obj) {
    while (html.indexOf("[" + i + "]") != -1) {
      html = html.replace("[" + i + "]", obj[i])
    }
  }
  return html
}

function lvl_set (lvl) {
  $(".lvl").hide()
  var str = ".lvl_" + lvl
  $(str).show()
}
jQuery.extend({
  stringify: function stringify (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
      if (t == "string") obj = '"' + obj + '"';
      return String(obj);
    } else {
      var n, v, json = [],
        arr = (obj && obj.constructor == Array);
      for (n in obj) {
        v = obj[n];
        t = typeof (v);
        if (obj.hasOwnProperty(n)) {
          if (t == "string") v = '"' + v + '"';
          else if (t == "object" && v !== null) v = jQuery.stringify(v);
          json.push((arr ? "" : '"' + n + '":') + String(v));
        }
      }
      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
  }
});

function getSize () {
  var rt = Array()
  var myWidth = 0,
    myHeight = 0;
  if (typeof (window.innerWidth) == 'number') {
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  rt[0] = myWidth
  rt[1] = myHeight
  return rt
}

function open_win (url, title, scale, ratio, onopen, t_type) {
  if (ratio == null) {
    ratio = [1024, 768]
  }
  if (scale == null) {
    scale = 0.9
  }
  if (t_type == null) {
    t_type = "top"
  }
  $.fancybox({
    href: url,
    type: "iframe",
    maxWidth: $(window).innerWidth() * scale,
    maxHeight: $(window).innerHeight() * scale,
    fitToView: false,
    width: $(window).innerWidth() * scale,
    height: $(window).innerHeight() * scale,
    autoSize: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    padding: 6,
    iframe: {
      preload: false
    },
    helpers: {
      title: {
        type: t_type
      }
    },
    beforeLoad: function () {
      this.title = title
    },
    afterLoad: function (current, previous) {
      if (onopen != null) {
        onopen(current, previous)
      }
    }
  });
}

function open_win_wh (url, title, w, h, onopen) {
  $.fancybox({
    href: url,
    type: "iframe",
    maxWidth: w,
    maxHeight: h,
    fitToView: false,
    width: w,
    height: h,
    autoSize: false,
    closeBtn: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    padding: 6,
    iframe: {
      preload: false
    },
    helpers: {
      overlay: {
        showEarly: true
      },
      title: {
        type: 'top'
      }
    },
    beforeLoad: function () {
      this.title = title
    },
    afterLoad: function (current, previous) {
      if (onopen != null) {
        onopen(current, previous)
      }
    }
  });
}

function chk_emp_bycls (cls) {
  var err = false
  $("." + cls).each(function () {
    $(this).tooltip("destroy");
  })
  $("." + cls).each(function () {
    if ($.trim(this.value) == "") {
      err = true
      $(this).attr("data-original-title", $($(this).parent().parent().find("td")[0]).html() + "未填")
      $(this).tooltip({
        "placement": "right",
        "trigger": "manual"
      }).tooltip("show");
      $(this).focus()
    } else {

    }
  })
  return err
}

function get_data_bycls (cls) {
  var obj = {};
  $("." + cls).each(function () {
    obj[this.id] = $(this).val();
  })
  return obj;
}

function my_decode (raw, funs) {
  try {
    var obj = json_decode(raw)
    console.log(obj)
  } catch (err) {
    console.log(raw)
    console.log("parsing error!");
  }
  try {
    LG.gstr("test");
  } catch (e) {
    var LG = new function () {
      var Lauguage = {
        "lang_system_msg": "系统讯息",
        "lang_error_109": "资料短缺",
        "lang_error_9999": "该帐号投注功能暂时关闭，如有问题请洽线上客服。",
        "lang_error_7778": "您无权使用。",
        "lang_error_998": "请重新登入。(998)",
        "lang_error_999": "网络错误，请刷新页面。"
      }
      this.gstr = function (key, ary) {
        if (Lauguage.hasOwnProperty(key)) {
          var str = Lauguage[key];
          if (ary) {
            for (var k in ary) {
              var v = ary[k];
              while (str.indexOf("[" + k + "]") != -1) {
                str = str.replace("[" + k + "]", v)
              }
            }
          }
          return str;
        } else {
          return key;
        }
      }
    }
  }
  if (!obj) {
    return false
  }
  if (funs[obj.code]) {
    funs[obj.code](obj)
    return
  }
  if (obj.code == "109") {
    if (ZgCreate) {
      ZgCreate.alert(LG.gstr("lang_system_msg"), LG.gstr("lang_error_109"))
    } else {
      alert(LG.gstr("lang_error_109"))
    }
  }
  if (obj.code == "9999") {
    if (ZgCreate) {
      ZgCreate.alert(LG.gstr("lang_system_msg"), LG.gstr("lang_error_9999"))
    } else {
      /*线路异常，请联络客服。(代码：9999)*/
      alert(LG.gstr("lang_error_9999"));
    }
  }
  if (obj.code == "7778") {
    if (ZgCreate) {
      ZgCreate.alert(LG.gstr("lang_system_msg"), LG.gstr("lang_error_7778"))
    } else {
      alert(LG.gstr("lang_error_7778"));
    }
  }
  if (obj.code == "998") {
    if (ZgCreate) {
      /*您的帐号被重覆登入。<br>请查看是否使用其他装置登入。<br>如果不是您做的動作请尽快联络客服。*/
      ZgCreate.alert(LG.gstr("lang_system_msg"), LG.gstr("lang_error_998"), {
        complete: function () {
          global_logout()
        }
      })
    } else {
      alert(LG.gstr("lang_error_998"))
      global_logout()
    }
  }
  if (obj.code == "999") {
    if (ZgCreate) {
      ZgCreate.alert(LG.gstr("lang_system_msg"), LG.gstr("lang_error_999"), {
        complete: function () {
          global_logout()
        }
      })
    } else {
      alert(LG.gstr("lang_error_999"))
      global_logout()
    }
  }
  return obj
}

function global_logout () {
  loading(true);
  var pass = true;
  if (typeof UseIOS !== 'undefined') {
    if (typeof localStorage !== 'undefined') {
      var json = json_encode({
        "action": "logout"
      })
      localStorage.setItem('action', json);
      pass = false;
    }
  } else {
    if (typeof AndroidApp !== 'undefined') {
      if (AndroidApp) {
        var json = json_encode({
          "action": "LogOut"
        })
        window.parent.postMessage(json, "*")
        pass = false;
      }
    }
  }
  console.log(pass)
  if (pass) {
    location.reload(true);
  }
}
/*數字千位分*/
function formatFloat_str (num) {
  num = num + "";
  var re = /(-?\d+)(\d{3})/
  while (re.test(num)) {
    num = num.replace(re, "$1,$2")
  }
  return num;
}

function number_format (number, decimals, dec_point, thousands_sep) {
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
/*確認數字鍵*/
function fild_valid (number) {
  var re = /^\d+$/;
  if (number != "" && !re.test(number)) {
    return false;
  } else {
    return true;
  }
}

function nl2br (str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
/*四捨五入*/
function formatFloat (num, pos) {
  var size = Math.pow(10, pos);
  return Math.round(num * size) / size;
}

function inIframe () {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function padLeft (str, lenght) {
  str = String(str);
  if (str.length >= lenght)
    return str;
  else
    return padLeft("0" + str, lenght);
}
/*取得該日期的資訊*/
function GetDateInf (Day) {
  var DateInf = new Array();
  var y = Day.getYear() + 1900;
  var n = Day.getMonth() + 1;
  var m = ((n < 10) ? "0" : "") + n;
  var d = Day.getDate();
  d = ((d < 10) ? "0" : "") + d;
  var w = Day.getDay();
  var H = Day.getHours();
  H = ((H < 10) ? "0" : "") + H;
  var i = Day.getMinutes();
  i = ((i < 10) ? "0" : "") + i;
  var s = Day.getSeconds();
  s = ((s < 10) ? "0" : "") + s;
  var day_list = ['日', '一', '二', '三', '四', '五', '六'];
  //console.log(Day,y +" 年 "+m +" 月 " + d + " 日  星期" + day_list[w]);
  DateInf['Y'] = y;
  DateInf['n'] = n;
  DateInf['m'] = m;
  DateInf['d'] = d;
  DateInf['w'] = w;
  DateInf['H'] = H;
  DateInf['i'] = i;
  DateInf['s'] = s;
  return DateInf;
}