/**
 * Created by XTER on 2015/11/19.
 * ÷˜≤Àµ•±≥æ∞≤„
 */

var MainMenuBgLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.loadBg();
        return true;
    },
    /* ‘ÿ»Î±≥æ∞ */
    loadBg:function(){
        var bg = new cc.Sprite(res.Global_Bg_png);
        bg.attr({
            x:GC.w_mid,
            y:GC.h_mid
        });
        this.addChild(bg);
    }
});
