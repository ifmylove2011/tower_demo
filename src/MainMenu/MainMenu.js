/**
 * Created by XTER on 2015/11/19.
 */

var MainMenuLayer = cc.Layer.extend({
    backgroundLayer: null,
    touchLayer: null,
    ctor: function () {
        this._super();
        this.loadBgLayer();
        this.addTouchLayer();
        this.showInfo();
    },
    /* º”‘ÿ±≥æ∞ */
    loadBgLayer: function () {
        this.backgroundLayer = new MainMenuBgLayer();
        this.addChild(this.backgroundLayer);
    },
    /* ÃÌº”ø…øÿ≤„ */
    addTouchLayer: function () {
        this.touchLayer = new MainMenuTouchLayer();
        this.addChild(this.touchLayer);
    },
    showInfo: function () {
        trace("width", GC.w, "height", GC.h);
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});