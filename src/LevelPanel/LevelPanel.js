/**
 * Created by XTER on 2015/12/3.
 * 关卡详情面板
 */

var LevelPanelLayer = cc.Layer.extend({
    backgroundLayer: null,
    touchLayer: null,
    ctor: function () {
        this._super();
        this.loadBgLayer();
        this.addTouchLayer();
        return true;
    },
    /* 加载背景层 */
    loadBgLayer: function () {
        this.backgroundLayer = new LevelPanelBgLayer();
        this.addChild(this.backgroundLayer);
    },
    /* 添加可控层 */
    addTouchLayer: function () {
        this.touchLayer = new LevelPanelTouchLayer();
        this.addChild(this.touchLayer);
    },

});

var LevelPanelScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.loadResource();
        this.addMainLayer();
    },
    /* 添加主层 */
    addMainLayer: function () {
        var layer = new LevelPanelLayer();
        this.addChild(layer);
    },
    /* 载入必要资源 */
    loadResource: function () {
        cc.textureCache.addImage(res.Level_Panel_png);
        cc.spriteFrameCache.addSpriteFrames(res.Level_Panel_plist);
    }
});
