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
        this.add(this.backgroundLayer);
    },
    /* 添加可控层 */
    addTouchLayer: function () {
        this.touchLayer = new GamePlayTouchLayer();
        this.add(this.touchLayer);
    }
});

var GamePlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addMainLayer();
    },
    addMainLayer: function () {
        var layer = new GamePlayLayer();
        this.addChild(layer);
    }
});