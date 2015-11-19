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
        trace("运行到2");
        return true;
    },
    loadBgLayer: function () {
        this.backgroundLayer = new ChooseStageBgLayer();
        this.addChild(this.backgroundLayer);
    },
    addTouchLayer: function () {
        this.touchLayer = new ChooseStageTouchLayer();
        this.addChild(this.touchLayer);
    }
});

var ChooseStageScene = cc.Scene.extend({
        onEnter: function () {
            this._super();
            trace("运行到1");
            var layer = new ChooseStageLayer();
            this.addChild(layer);
        }
});