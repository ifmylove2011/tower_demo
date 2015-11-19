/**
 * Created by XTER on 2015/11/19.
 */

var ChooseStageBgLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.loadBg();
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