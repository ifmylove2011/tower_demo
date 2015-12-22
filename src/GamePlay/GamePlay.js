/**
 * Created by XTER on 2015/12/4.
 * 游戏主场景
 */

var GamePlayLayer = cc.Layer.extend({
    backgroundLayer: null,
    touchLayer: null,
    ctor: function () {
        this._super();
        this.loadBgLayer();
        this.addTouchLayer();
        return true;
    },
    /* 载入背景层 */
    loadBgLayer: function () {
        this.backgroundLayer = new GamePlayBgLayer();
        this.addChild(this.backgroundLayer);
    },
    /* 添加可控层 */
    addTouchLayer: function () {
        this.touchLayer = new GamePlayTouchLayer();
        this.addChild(this.touchLayer);
    }
});

var GamePlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.loadResource();
        this.addMainLayer();
    },
    addMainLayer: function () {
        var layer = new GamePlayLayer();
        this.addChild(layer);
    },
    loadResource: function () {
        cc.textureCache.addImage(res.GamePlay_Info_png);
        cc.spriteFrameCache.addSpriteFrames(res.GamePlay_Info_plist);

        cc.textureCache.addImage(res.Enemy_png);
        cc.spriteFrameCache.addSpriteFrames(res.Enemy_plist);
    }
});