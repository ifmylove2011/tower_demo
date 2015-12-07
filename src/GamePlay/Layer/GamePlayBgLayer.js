/**
 * Created by XTER on 2015/12/4.
 * 游戏主场景背景层
 */

var GamePlayBgLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.loadBg();
        return true;
    },
    loadBg: function () {
        var instance = GameManager.getInstance();
        var bgName = "res/" + instance.getCurBgName();
        var bgSprite = new cc.Sprite(bgName);
        bgSprite.attr({
            x:GC.w_mid,
            y:GC.h_mid
        });
        this.addChild(bgSprite);
    }
});
