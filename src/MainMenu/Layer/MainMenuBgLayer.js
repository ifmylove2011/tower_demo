/**
 * Created by XTER on 2015/11/19.
 * 主菜单背景层
 */

var MainMenuBgLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.loadBg();
        return true;
    },
    /* 载入背景 */
    loadBg:function(){
        var bg = new cc.Sprite(res.Global_Bg_png);
        bg.attr({
            x:GC.w_mid,
            y:GC.h_mid
        });
        this.addChild(bg);
    }
});
