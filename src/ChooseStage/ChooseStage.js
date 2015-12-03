/**
 * Created by XTER on 2015/11/19.
 * 选择场景关卡
 */

var ChooseStageLayer = cc.Layer.extend({
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
        this.backgroundLayer = new ChooseStageBgLayer();
        this.addChild(this.backgroundLayer);
    },
    /* 添加可触摸层 */
    addTouchLayer: function () {
        this.touchLayer = new ChooseStageTouchLayer();
        this.addChild(this.touchLayer);
    }
});

var ChooseStageScene = cc.Scene.extend({
        onEnter: function () {
            this._super();
            var layer = new ChooseStageLayer();
            this.addChild(layer);
        }
});