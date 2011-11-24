/**
 * モーダルダイアログ jQuery plugin
 * Copyright 2011 Keisuke Kobayashi (@ksk_kbys)
 */
(function () {

  /**
   * 各種パラメータのデフォルト値
   */
  var WIDTH       = 600;
  var HEIGHT      = 400;
  var MARGIN_TOP  = -200;
  var MARGIN_LEFT = -300;
  var OPACITY     = 0.7;
  var BACKGROUND_COLOR = "black";

  /**
   * モーダルダイアログを表示する
   */
  $.fn.showModal = function (options) {

    var self = this;

    // 設定値
    var width       = WIDTH;
    var height      = HEIGHT;
    var margin_top  = MARGIN_TOP;
    var margin_left = MARGIN_LEFT;
    var opacity     = OPACITY;
    var bg_color    = BACKGROUND_COLOR;
    if (options) {
      width         = options['width'] || WIDTH;
      height        = options['height'] || HEIGHT;
      margin_top    = (-1) * height / 2;
      margin_height = (-1) * width / 2;
      opacity       = options['opacity'] || OPACITY;
      bg_color      = options['background_color'] || BACKGROUND_COLOR;
    }

    // DOMを配置するベース
    var base = $("<div id='overlay-base'></div>");
    base.css({
      "background": "white",
      "overflow": "auto",
      "width": width,
      "height": height,
      "position": "absolute",
      "top": "50%",
      "left": "50%",
      "margin-top": margin_top,
      "margin-left": margin_left,
      "zIndex": "2",
      "padding": "20"
    });
    // 閉じるボタン
    var close = $("<div class='close'><p style='text-align: right'><a href='javascript:$(self).hideModal()'>Close</a></p></div>");
    // DOMをコピー
    var dom = this.clone(true);
    dom.css("display", "block");
    // ベースに追加
    base.append(close);
    base.append(dom);

    // オーバーレイ部分（影）
    var shadow = $("<div id='shadow'></div>");
    shadow.css({
      "width": "100%",
      "height": "100%",
      "background": bg_color,
      "zIndex": "1",
      "top": "0",
      "left": "0",
      "opacity": opacity,
      "position": "absolute"
    });
    // 影をクリックしたらモーダル終了
    shadow.click(function () {
      $("#shadow").remove();
      $(base).remove();
    });

    // bodyに影とダイアログを追加    
    $("body").append(base);
    $("body").append(shadow);
  };

  /**
   * モーダルダイアログを非表示にする
   */
  $.fn.hideModal = function () {
    $("#shadow").remove();
    $("#overlay-base").remove();
  };
})();
