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
        this.initMoneyLabel();
        this.initGroupIndexLabel();
        return true;
    },
    /* 初始化配置 */
    initConfig: function () {
        this.gm = GameManager.getInstance();
        this.maxHp = this.gm.getCurHp();
        trace("===============");
        trace("maxHP", this.maxHp);
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
    /* 初始化金钱标答 */
    initMoneyLabel: function () {
        var moneyLabel = new cc.LabelBMFont("", res.Num_fnt);
        moneyLabel.attr({
            x: this.toolbar.getContentSize().width / 8,
            y: this.toolbar.getContentSize().height / 2,
            anchorX: 0,
            anchorY: 0.5
        });
        this.toolbar.addChild(moneyLabel);
        moneyLabel.setString(this.gm.getCurMoney());

        this.moneyLabel = moneyLabel;
        trace("money", this.gm.getCurMoney());
    },
    /* 初始化敌人波数标签 */
    initGroupIndexLabel: function () {
        //当前波数
        var groupIndexLabel = new cc.LabelBMFont("", res.Char_EN_fnt);
        groupIndexLabel.attr({
            x: this.toolbar.getContentSize().width / 8 * 3,
            y: this.toolbar.getContentSize().height / 2,
            anchorX: 0,
            anchorY: 0.5
        });
        this.toolbar.addChild(groupIndexLabel);
        groupIndexLabel.setString("1");

        this.groupIndexLabel = groupIndexLabel;

        //总波数
        var groupSumLabel = new cc.LabelBMFont("",res.Char_EN_fnt);
        groupSumLabel.attr({
            x:this.toolbar.getContentSize().width/2,
            y:this.toolbar.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.toolbar.addChild(groupSumLabel);
        groupSumLabel.setString(this.gm.getGroupNum());

        trace("groupSum",this.gm.getGroupNum());
    }
});