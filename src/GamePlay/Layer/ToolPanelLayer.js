/**
 * Created by XTER on 2015/12/5.
 */

var ToolPanelLayer = cc.Layer.extend({
    gm: null,
    toolbar: null,
    maxHp: null,
    moneyLabel: 0,
    groupIndexLabel: null,
    ctor: function () {
        this._super();
        this.initConfig();
        this.initToolbar();
        return true;
    },
    initConfig: function () {
        this.gm = GameManager.getInstance();
        this.maxHp = this.gm.getCurHp();
        trace("===============");
        trace("maxHP: ",this.maxHp);
    },
    initToolbar: function () {
        var toolbar = new cc.Sprite("#gp_toolBg.png");
        toolbar.attr({
            x: GC.w_mid,
            y: GC.h,
            anchorX: 0.5,
            anchorY: 1
        });
        this.addChild(toolbar);

        this.toolbar = toolbar;
    }
});