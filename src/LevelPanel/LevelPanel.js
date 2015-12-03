/**
 * Created by XTER on 2015/12/3.
 * �ؿ��������
 */

var LevelPanelLayer = cc.Layer.extend({
    backgroundLayer:null,
    touchLayer:null,
    ctor: function () {
        this._super();
        this.loadResource();
        this.loadBgLayer();
        this.addTouchLayer();
        return true;
    },
    /* ���ر����� */
    loadBgLayer:function(){
        this.backgroundLayer = new LevelPanelBgLayer();
        this.addChild(this.backgroundLayer);
    },
    /* ��ӿɿز� */
    addTouchLayer:function(){
        this.touchLayer = new LevelPanelTouchLayer();
        this.addChild(this.touchLayer);
    },
    loadResource:function(){
        cc.textureCache.addImage(res.Level_Panel_png);
        cc.spriteFrameCache.addSpriteFrames(res.Level_Panel_plist);
    }
});

var LevelPanelScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new LevelPanelLayer();
        this.addChild(layer);
    }
});
