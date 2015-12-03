/**
 * Created by XTER on 2015/11/19.
 * 选择场景关卡
 */

var ChooseStageLayer = cc.Layer.extend({
    backgroundLayer: null,
    touchLayer: null,
    ctor: function () {
        this._super();
        this.loadResource();
        this.loadBgLayer();
        this.addTouchLayer();
        return true;
    },
    /* 加载背景层 */
    loadBgLayer: function () {
        this.backgroundLayer = new ChooseStageBgLayer();
        this.addChild(this.backgroundLayer);
    },
    /* 添加可触摸层 */
    addTouchLayer: function () {
        this.touchLayer = new ChooseStageTouchLayer();
        this.addChild(this.touchLayer);
    },
    /* 载入必要资源--后面会用到的 */
    loadResource: function () {
        cc.textureCache.addImage(res.Choose_Stage_png);
        cc.spriteFrameCache.addSpriteFrames(res.Choose_Stage_plist);
    }
});

var ChooseStageScene = cc.Scene.extend({
        onEnter: function () {
            this._super();
            var layer = new ChooseStageLayer();
            this.addChild(layer);
        }
});