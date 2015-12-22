/**
 * Created by XTER on 2015/12/22.
 * 游戏结束背景层
 */

var GameOverBgLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.loadBg();
        return true;
    },
    loadBg: function () {
        var bg = new cc.Sprite(res.Global_Bg_png);
        bg.attr({
            x: GC.w_mid,
            y: GC.h_mid
        });
        this.addChild(bg);
    }
});