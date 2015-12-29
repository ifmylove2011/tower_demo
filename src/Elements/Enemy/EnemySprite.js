/**
 * Created by XTER on 2015/12/8.
 * 敌人【精灵】
 */

var EnemySprite = cc.Sprite.extend({
    hp: 0,
    maxHp: 0,
    speed: 200,
    direction: 0,
    posArray: [],
    curPosIndex: 0,
    attackSucceedCallback: null,
    isSucceed: false,
    hpBar: null,//头顶血条
    hpBarBg: null,
    isDie: false,
    money: 0,
    ctor: function (texture) {
        this._super(texture);
        this.initConfig();
        this.initPosition();
        this.initHpBar();
        this.movePos();
        return true;
    },
    /* 载入敌人移动点坐标 */
    initConfig: function () {
        var gm = GameManager.getInstance();
        this.posArray = gm.getPosArray();
    },
    /* 初始化敌人位置 */
    initPosition: function () {
        var pos = this.posArray[0];
        this.setPosition(pos.x, pos.y);
    },
    /* 初始化血条显示 */
    initHpBar: function () {
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
            (this.attackSucceedCallback && typeof(this.attackSucceedCallback) === "function" )&& this.attackSucceedCallback();
            return;
        }

        //下一坐标
        var nextPos = this.posArray[this.curPosIndex + 1];
        //得到现有坐标与下一坐标之间的距离
        var distance = cc.pDistance(this.getPosition(), nextPos);
        //算出移动一段距离所需要的时间
        var time = distance / this.speed;

        trace("当前路径",this.curPosIndex,nextPos.x,nextPos.y);
        trace("需要用时",time,"距离",distance);
        //移动的动作
        var move = cc.moveTo(time, nextPos);
        this.runAction(move);
        //var call = cc.callFunc(this.movePos, this);
        //回调本方法，使精灵连续动作
        //var action = cc.sequence(move, call);
        trace("当前位置",this.x,this.y);
        //方向判断
        this.direction = nextPos.x - this.x >= 0 ? 0 : 1;

        this.onChangeDirection();

        //this.loadAnimation(this.direction);

        //坐标下标前进
        this.curPosIndex++;

        //类似在跳跃前进，跨坐标

        //另一个问题，当坐标只有1个时，为什么会来回动
    },
    /* 改变方向--子类使用 */
    onChangeDirection: function () {
        //用于扩展
        this.loadAnimation(this.direction);
    },
    loadAnimation:function(dir){
        //rewrite
    },
    /* 受伤回调 */
    onHurt: function (hurt) {
        var tmpHp = this.hp - hurt;
        this.hp = tmpHp <= 0 ? 0 : tmpHp;
        this.hpBar.setPercentage(this.hp / this.maxHp * 100);

        if (this.hp <= 0)
            this.onDie();
    },
    /* 死亡回调 */
    onDie: function () {
        this.stopAllActions();
        this.ruinEffect();
    },
    /* 死亡特效--子类使用 */
    ruinEffect: function () {
        this.hpBarBg.setVisible(false);
        this.setAnchorPoint(0.5, 0.25);
    },
    /* 初始血量 */
    setMaxHp: function (hp) {
        this.maxHp = hp;
        this.hp = hp;
    },
    /* 现有血量 */
    getCurHp: function () {
        return this.hp;
    },
    /* 赏金 */
    getMoney: function () {
        return this.money;
    },
    setAttackSucceedCallback:function(callback){
        this.attackSucceedCallback=callback;
    }
});
