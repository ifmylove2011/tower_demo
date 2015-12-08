/**
 * Created by XTER on 2015/12/8.
 * 敌人【精灵】属性
 */

var EnemySprite = cc.Sprite.extend({
    hp: 0,
    maxHp: 0,
    speed: 400,
    direction: 0,
    posArray: [],
    curPosIndex: 0,
    beAttackedCallback: null,
    isSucceed: false,
    hpBar: null,
    hpBarBg: null,
    isDie: false,
    money: 0,
    ctor: function (texture) {
        this._super(texture);
        return true;
    },
    /* 载入敌人移动点坐标 */
    initConfig: function () {
        var instance = GameManager.getInstance();
        this.posArray = instance.getPosArray();
    },
    /* 初始化敌人位置 */
    initPosition: function () {
        var pos = this.posArray[0];
        this.setPosition(pos.x, pos.y);
    },
    /*  */
    loadHpBar: function () {
        var hpBg = new cc.Sprite("#gp_hpBg.png");
        this.addChild(hpBg);
        hpBg.setPosition(this.width / 2, this.height);

        var bar = new cc.ProgressTimer(new cc.Sprite("#gp_hp.png"));
        hpBg.addChild(bar);
        bar.setPosition(hpBg.width / 2, hpBg.height / 3 * 2);
        bar.setType(cc.ProgressTimer.TYPE_BAR);
        bar.setMidpoint(cc.p(0, 0.5));
        bar.setBarChangeRate(cc.p(1, 0));
        bar.setPercentage(100);

        this.hpBar = bar;
        this.hpBarBg = hpBg;
    },
    /* 移动位置 */
    movePos: function () {
        //敌人到达终点
        if (this.curPosIndex == this.posArray.length - 1) {
            this.isSucceed = true;
            (this.beAttackedCallback && typeof(this.beAttackedCallback) === "function" && this.beAttackedCallback());
            return;
        }

        //下一坐标
        var nextPos = this.posArray[this.curPosIndex+1];
        //得到现有坐标与下一坐标之间的距离
        var distance = cc.pDistance(this.getPosition,nextPos);
        var time = distance / this.speed;

    }

});
