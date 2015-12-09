/**
 * Created by XTER on 2015/12/5.
 * 工具栏--游戏信息显示
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
    /* 初始化配置 */
    initConfig: function () {
        this.gm = GameManager.getInstance();
        this.maxHp = this.gm.getCurHp();
        trace("===============");
        trace("maxHP: ", this.maxHp);
    },
    /* 初始化工具条 */
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
    },
    /* 初始化金钱标签 */
    initMoneyLabel: function () {
        var moneyLabel = new cc.LabelBMFont("", res.HuangKang_CH_fnt);
        moneyLabel.attr({
            x: this.toolbar.getContentSize().width / 8,
            y: this.toolbar.getContentSize().height / 2,
            anchorX: 0,
            anchorY: 0.5
        });
        this.toolbar.addChild(moneyLabel);
        moneyLabel.setString(this.gm.getCurMoney());

        this.moneyLabel = moneyLabel;
    }
});