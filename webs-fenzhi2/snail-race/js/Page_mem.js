var ZgPage = function (ObjID) {
  var that = $(ObjID);
  this.that = that;
  var $this = this;
  var NowPage, EndPage, ToUrl, NowOption;
  var StrAry = {
    select_box: "第 [box] 页",
  }
  this.parse_to = function (ohtml, obj) {
    var html = ohtml;
    for (var i in obj) {
      while (html.indexOf("[" + i + "]") != -1) {
        html = html.replace("[" + i + "]", obj[i]);
      }
    }
    return html;
  }
  this.initPage = function (now_page, end_page, url, option) {
    NowOption = $.extend($this.OptionInit(), option);
    NowPage = now_page;
    EndPage = end_page;
    ToUrl = url;
    $this.CreatePage();
  }
  /*預設的控制項*/
  this.OptionInit = function () {
    var options = {
      link: "js",
      /*url,js*/
      url: false,
      showCount: false,
      now_page: 1,
      end_page: 1,
      change_after: function () { }
    }
    return options;
  }
  this.GoPage = function (Page) {
    switch (NowOption.link) {
      case 'url':
        {
          location.href = parse_to(ToUrl, {
            Page: Page
          });
          break;
        }
      case 'js':
        {
          eval(parse_to(ToUrl, {
            Page: Page
          }));
          break;
        }
    }
  }
  this.CreatePage = function () {
    var d = $("<div/>").addClass("PageClass quotes").css("width:", "98%");
    var ul = $("<ul/>");
    var li = $("<li/>").addClass("ToFirst Link").append("&nbsp;").click(function () {
      $this.GoPage(1);
    });
    ul.append(li);
    var end = 0,
      start = 0;
    if (NowPage != 1) {
      var li = $("<li/>").addClass("ToPrev Link").append("&nbsp;").click(function () {
        $this.GoPage(NowPage - 1);
      });
      ul.append(li);
    } else {
      var li = $("<li/>").addClass("ToPrev Link disabled").append("&nbsp;");
      ul.append(li);
    }
    ul.append(
      $("<li/>").addClass("amount").append(NowPage + " / " + EndPage)
    )
    if (NowPage != EndPage && EndPage != 0) {
      var li = $("<li/>").addClass("ToNext Link").append("&nbsp;").click(function () {
        $this.GoPage(NowPage + 1);
      });
      ul.append(li);
    } else {
      var li = $("<li/>").addClass("ToNext Link disabled").append("&nbsp;");
      ul.append(li);
    }
    var li = $("<li/>").addClass("ToLast Link").append("&nbsp;").click(function () {
      $this.GoPage(EndPage);
    });
    ul.append(li);
    d.append(ul);

    /*NowPage Select*/
    if (EndPage > 10) {
      var dd = $("<div/>").addClass("page_select_div");
      var s = $("<select/>").attr("name", "PageSelect");
      for (var i = 1; i <= EndPage; i++) {
        if (NowPage == i) {
          s.append($("<option Selected></option>").attr("value", i).text(i));
        } else {
          s.append($("<option></option>").attr("value", i).text(i));
        }
      }
      s.change(function () {
        $this.GoPage($(this).val());
      });

      dd.append(parse_to(StrAry.select_box, {
        box: '<span id="SelectBox"></span>',
      }));
      dd.find("#SelectBox").html(s);

      /*dd.append('第 ').append(s).append(" 頁");*/
      d.append(dd);
    }
    d.append($("<div/>").css({
      "clear": "both"
    }))
    that.html(d)
  }
  this.init = function () {
    $this.Ready();
  };
  /*設定相關Size*/
  this.ReSize = function () { }
  this.Ready = function () { }
  this.JoinLanguage = function (Language) {
    $.extend(StrAry, Language);
  }
  this.init();
};

var ZgPage_New = function (ObjID) {
  var that = $(ObjID);
  var $this = this;
  var now_op;
  var parse_to = function (ohtml, obj) {
    var html = ohtml;
    for (var i in obj) {
      while (html.indexOf("[" + i + "]") != -1) {
        html = html.replace("[" + i + "]", obj[i]);
      }
    }
    return html;
  }
  this.initPage = function (option) {
    now_op = $.extend(OptionInit(), option);
    CreatePage(now_op);
  }
  /*預設的控制項*/
  var OptionInit = function () {
    var options = {
      link: "js",
      /*url,js*/
      url: false,
      showCount: false,
      n_page: 1,
      e_page: 1,
      show_total: false,
      count: false
    }
    return options;
  }
  var GoPage = function (Page) {
    switch (now_op.link) {
      case 'url':
        {
          location.href = parse_to(now_op.url, {
            Page: Page
          });
          break;
        }
      case 'js':
        {
          eval(parse_to(now_op.url, {
            Page: Page
          }));
          break;
        }
    }
    now_op.change_after;
  }
  var CreatePage = function (op) {
    var d = $("<div/>").addClass("PageClass quotes").css("width:", "98%");
    var ul = $("<ul/>");
    var li = $("<li/>").append("第一頁").addClass("Link").click(function () {
      GoPage(1);
    });
    ul.append(li);
    var end = 0,
      start = 0;
    if (op.n_page != 1) {
      var li = $("<li/>").append('上一頁').addClass("Link").click(function () {
        GoPage(op.n_page - 1);
      });
      ul.append(li);
    } else {
      var li = $("<li/>").append('上一頁').addClass("disabled");
      ul.append(li);
    }
    if (op.n_page < 7) {
      if (op.e_page > 10) {
        end = 10;
      } else {
        end = op.e_page;
      }
      start = 1;
    } else {
      end = op.n_page + 4;
      if (end > op.e_page) {
        end = op.e_page;
      }
      start = end - 10;
      start = op.n_page - (op.n_page - start - 1);
      if (start <= 0) {
        start = 1;
      }

    }
    for (var i = start; i <= end; i++) {
      if (i == op.n_page) {
        var li = $("<li/>").append(i).addClass("current");
      } else {
        var li = $("<li/>").append(i).addClass("Link").attr("data-page", i).click(function () {
          GoPage($(this).attr("data-page"));
        });
      }
      ul.append(li);
    }
    if (op.n_page != op.e_page && op.e_page != 0) {
      var li = $("<li/>").append('下一頁').addClass("Link").click(function () {
        GoPage(op.n_page + 1);
      });
      ul.append(li);
    }
    var li = $("<li/>").append("最後頁").addClass("Link").click(function () {
      GoPage(op.e_page);
    });
    ul.append(li);
    d.append(ul);

    /*NowPage Select*/
    if (op.e_page > 10) {
      var dd = $("<div/>").addClass("page_select_div");
      var s = $("<select/>").attr("name", "PageSelect");
      for (var i = 1; i <= op.e_page; i++) {
        if (op.n_page == i) {
          s.append($("<option Selected></option>").attr("value", i).text(i));
        } else {
          s.append($("<option></option>").attr("value", i).text(i));
        }
      }
      s.change(function () {
        GoPage($(this).val());
      });
      dd.append('第 ').append(s).append(" 頁");
      d.append(dd);
    }
    if (op.show_total) {
      if (d.find(".page_select_div").length > 0) {
        d.append("，");
      }
      var dd = $("<div/>").addClass("page_count_div");
      dd.append("共 " + op.e_page + " 頁，共 " + op.count + " 筆");
      d.append(dd);
    }
    that.html(d)
  }
  this.init = function () {
    $this.Ready();
  };
  /*設定相關Size*/
  this.ReSize = function () { }
  this.Ready = function () { }
  this.init();
};