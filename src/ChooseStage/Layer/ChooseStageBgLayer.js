/**
 * Created by XTER on 2015/11/19.
 * 选择关卡页面的背景层
 */

var ChooseStageBgLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.loadBg();
        return true;
    },
    /* 载入背景 */
    loadBg: function () {
        var bg = new cc.Sprite(res.Global_Bg_png);
        bg.attr({
            x: GC.w_mid,
            y: GC.h_mid
        });
        this.addChild(bg);
    }
});