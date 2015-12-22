/**
 * Created by XTER on 2015/12/22.
 */

var GameOverLayer = cc.Layer.extend({
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
        this.backgroundLayer = new GameOverBgLayer();
        this.addChild(this.backgroundLayer);
    },
    /* 添加触控层 */
    addTouchLayer: function () {
        this.touchLayer = new GameOverTouchLayer();
        this.addChild(this.touchLayer);
    }
});

var GameOverScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addMainLayer();
    },
    addMainLayer: function () {
        var layer = new GameOverLayer();
        this.addChild(layer);
    }
});