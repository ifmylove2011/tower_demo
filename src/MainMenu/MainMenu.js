/**
 * Created by XTER on 2015/11/19.
 * 主菜单
 */

var MainMenuLayer = cc.Layer.extend({
    backgroundLayer: null,
    touchLayer: null,
    ctor: function () {
        this._super();
        this.loadBgLayer();
        this.addTouchLayer();
        this.loadResource();
        return true;
    },
    /* 加载背景 */
    loadBgLayer: function () {
        this.backgroundLayer = new MainMenuBgLayer();
        this.addChild(this.backgroundLayer);
    },
    /* 添加可控层 */
    addTouchLayer: function () {
        this.touchLayer = new MainMenuTouchLayer();
        this.addChild(this.touchLayer);
    },
    /* 载入必要资源--后面会用到的 */
    loadResource: function () {
        trace("width", GC.w, "height", GC.h);
        cc.textureCache.addImage(res.Choose_Stage_png);
        cc.spriteFrameCache.addSpriteFrames(res.Choose_Stage_plist);
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});