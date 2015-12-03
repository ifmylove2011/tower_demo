/**
 * Created by XTER on 2015/11/19.
 * ���˵�
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
    /* ���ر��� */
    loadBgLayer: function () {
        this.backgroundLayer = new MainMenuBgLayer();
        this.addChild(this.backgroundLayer);
    },
    /* ��ӿɿز� */
    addTouchLayer: function () {
        this.touchLayer = new MainMenuTouchLayer();
        this.addChild(this.touchLayer);
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});