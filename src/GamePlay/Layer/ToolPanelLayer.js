/**
 * Created by XTER on 2015/12/5.
 * 工具栏--游戏信息显示
 */

var ToolPanelLayer = cc.Layer.extend({
    gm: null,
    toolbar: null,
    hpBar: null,
    maxHp: null,
    moneyLabel: 0,
    groupIndexLabel: null,
    ctor: function () {
        this._super();
        this.initConfig();
        this.initToolbar();
        this.initMoneyLabel();
        this.initGroupIndexLabel();
        this.initPlayHpBar();
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
        var groupSumLabel = new cc.LabelBMFont("", res.Char_EN_fnt);
        groupSumLabel.attr({
            x: this.toolbar.getContentSize().width / 2,
            y: this.toolbar.getContentSize().height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.toolbar.addChild(groupSumLabel);
        groupSumLabel.setString(this.gm.getGroupNum());

        trace("groupSum", this.gm.getGroupNum());
    },
    /* 关卡血量条 */
    initPlayHpBar: function () {
        var bar = new cc.ProgressTimer(new cc.Sprite("#gp_playHp.png"));
        var toolbarSize = this.toolbar.getContentSize();
        bar.attr({
            x: toolbarSize.width / 5 * 4,
            y: toolbarSize.height / 2,
            type: cc.ProgressTimer.TYPE_BAR,
            midPoint: cc.p(0, 0.5),
            barChangeRate: cc.p(1, 0),
            percentage: 100
        });
        this.toolbar.addChild(bar);

        this.hpBar = bar;

        //var barBg = new cc.Sprite("#gp_playStar.png");
        //barBg.attr({
        //    x: toolbarSize.width / 5 * 4,
        //    y: toolbarSize.height / 2
        //});
        //this.toolbar.addChild(barBg);
    },
    /* 对外可操作 */
    getGroupIndexLabel: function () {
        return this.groupIndexLabel;
    },
    /* 掉血回调 */
    onMinusHp: function (value) {
        var newHp = this.gm.getCurHp() - value;
        this.hpBar.setPercentage(newHp / this.maxHp * 100);
        this.gm.setCurHp(newHp);
    },
    /* 减钱回调 */
    onMinusMoney: function (value) {
        var newMoney = this.gm.getCurMoney() - value;
        this.moneyLabel.setString(newMoney + "");
        this.gm.setCurMoney(newMoney);
    },
    /* 加钱回调 */
    onAddMoney: function (value) {
        var newMoney = this.gm.getCurMoney() + value;
        this.moneyLabel.setString(newMoney + "");
        this.gm.setCurMoney(newMoney);
    }
});