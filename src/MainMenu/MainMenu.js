/**
 * Created by XTER on 2015/11/19.
 *  主菜单
 */

var MainMenuLayer = cc.Layer.extend({
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
        this.backgroundLayer = new MainMenuBgLayer();
        this.addChild(this.backgroundLayer);
    },
    /* 添加可控层 */
    addTouchLayer: function () {
        this.touchLayer = new MainMenuTouchLayer();
        this.addChild(this.touchLayer);
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addMainLayer();
    },
    /* 添加主层 */
    addMainLayer: function () {
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});