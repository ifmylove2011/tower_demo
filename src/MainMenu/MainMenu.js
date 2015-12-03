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
        this.loadResource();
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
    },
    /* �����Ҫ��Դ--������õ��� */
    loadResource: function () {
        trace("width", GC.w, "height", GC.h);
        cc.textureCache.addImage(res.Choose_Stage_png);
        cc.spriteFrameCache.addSpriteFrames(res.Choose_Stage_plist);
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});