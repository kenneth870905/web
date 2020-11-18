var Zg_Create = function () {
  var $this = this;
  this.alert = function (Title, Content, option) {
    try {
      var str = LG.gstr("lang_close");
    } catch (e) {
      var str = "关闭";
    }
    var op = $.extend({
      ok_str: str,
      id: "ZgCreateAlert",
      size: "static",
      position: "middle",
      repeat: true,
      complete: function () { },
      BeforeShow: function () { }
    }, option);
    var modal_size = "";
    var modal_div = $("<div/>").addClass("modal fade").attr("id", op.id);
    if (op.size == "Large") {
      modal_size = "modal-lg";
    }
    if (op.size == "small") {
      modal_size = "modal-sm";
    }
    var dialog = $("<div/>").addClass("modal-dialog " + modal_size);
    var content = $("<div/>").addClass("modal-content");

    var head = $("<div/>").addClass("modal-header");
    var cls_but = $("<button/>").addClass("close").attr({
      "data-dismiss": "modal",
      "aria-label": "Close"
    }).html('<span aria-hidden="true">&times;</span>');
    head.append(cls_but);
    head.append('<h4 class="modal-title">' + Title + '</h4>');

    var body = $("<div/>").addClass("modal-body");
    body.append(Content);

    var footer = $("<div/>").addClass("modal-footer");
    var btn = $("<button/>").addClass("btn btn-primary").html(op.ok_str)
    btn.click(op.complete);
    btn.bind("Close", function () {
      modal_div.modal('hide');
    })
    btn.click(function () {
      $(this).trigger("Close");
    });
    footer.append(btn);


    content.append(head).append(body).append(footer);
    dialog.append(content);
    modal_div.append(dialog);
    modal_div.on('hide.bs.modal', function (e) {
      setTimeout(function () {
        modal_div.remove();
      }, 800);
    })
    modal_div.on('show.bs.modal', function () {
      modal_div.find("button.close").hide();
      switch (op.position) {
        case 'middle': {
          var $this = $(this);
          var $modal_dialog = $this.find('.modal-dialog');
          $this.css('display', 'block');
          $modal_dialog.css({ 'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
          break;
        }
      }
    });
    modal_div.on('shown.bs.modal', function () {
      modal_div.find("button.close").hide();
      btn.focus()
    })
    modal_div.on('show.bs.modal', function () {
      op.BeforeShow();
    });

    if ($("body").find("#" + op.id).length > 0) {
      if (op.repeat) {
        var myVar = setInterval(function () {
          if (!$("body").find("#" + op.id).length) {
            clearInterval(myVar);
            $("body").append(modal_div);
            modal_div.modal({
              backdrop: "static"
            })
            //modal_div.modal('show');
          }
        }, 200);
      }
    } else {
      $("body").append(modal_div);
      modal_div.modal({
        backdrop: "static",
        keyboard: false
      })
      //modal_div.modal('show');
    }
  }
  this.confirm = function (Title, Content, option) {
    try {
      var str_confirm = LG.gstr("lang_confirm");
      var str_cancel = LG.gstr("lang_cancel");
    } catch (e) {
      var str_confirm = "确认";
      var str_cancel = "取消";
    }
    var op = $.extend({
      ok_str: str_confirm,
      close_str: str_cancel,
      size: "static",
      position: "middle",
      id: "ZgCreateConfirm",
      complete: function () { },
      BeforeShow: function () { }
    }, option);
    var modal_div = $("<div/>").addClass("modal fade").attr("id", op.id);
    var modal_size = "";
    if (op.size == "Large") {
      modal_size = "modal-lg";
    }
    if (op.size == "small") {
      modal_size = "modal-sm";
    }
    var dialog = $("<div/>").addClass("modal-dialog " + modal_size);
    var content = $("<div/>").addClass("modal-content");

    var head = $("<div/>").addClass("modal-header");

    head.append('<h4 class="modal-title">' + Title + '</h4>');
    var cls_but = $("<button/>").addClass("close").attr({
      "data-dismiss": "modal",
      "aria-label": "Close"
    }).html('<span aria-hidden="true">&times;</span>');
    head.append(cls_but);

    var body = $("<div/>").addClass("modal-body");
    body.append(Content);

    var footer = $("<div/>").addClass("modal-footer");
    var btn = $("<button/>").addClass("btn btn-primary").append(op.ok_str);
    btn.click(op.complete);
    btn.bind("Close", modal_div, function (e) {
      var m = e.data;
      m.modal('hide');
    })
    btn.click(function () {
      $(this).trigger("Close");
    });
    footer.append(btn);
    footer.append(
      $("<button/>").addClass("btn btn-danger").attr("data-dismiss", "modal").html(op.close_str)
    );

    content.append(head).append(body).append(footer);
    dialog.append(content);
    modal_div.append(dialog);
    modal_div.on('hide.bs.modal', function (e) {
      setTimeout(function () {
        modal_div.remove();
      }, 800);
    })
    modal_div.on('show.bs.modal', function () {
      op.BeforeShow();
    });
    switch (op.position) {
      case 'middle': {
        modal_div.on('show.bs.modal', function () {
          var $this = $(this);
          var $modal_dialog = $this.find('.modal-dialog');
          $this.css('display', 'block');
          $modal_dialog.css({ 'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
        });
        break;
      }
    }

    modal_div.on('shown.bs.modal', function () {
      btn.focus()
    })
    if ($("body").find("#" + op.id).length > 0) {
      var myVar = setInterval(function () {
        if (!$("body").find("#" + op.id).length) {
          clearInterval(myVar);
          $("body").append(modal_div);
          modal_div.modal({
            backdrop: "static"
          })
          //modal_div.modal('show');
        }
      }, 200);
    } else {
      $("body").append(modal_div);
      modal_div.modal({
        backdrop: "static",
        keyboard: false
      });
      //modal_div.modal('show');
    }
  }
};
var ZgCreate = new Zg_Create();