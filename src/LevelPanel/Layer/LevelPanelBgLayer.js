/**
 * Created by XTER on 2015/12/3.
 * �ؿ�������汳��
 */

var LevelPanelBgLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.loadBg();
        return true;
    },
    loadBg:function(){
        var bg = new cc.Sprite(res.Global_Bg_png);
        bg.attr({
            x:GC.w_mid,
            y:GC.h_mid
        });
        this.addChild(bg);
    }
});