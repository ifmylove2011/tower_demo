/**
 * Created by XTER on 2015/12/3.
 * 敌人封装类
 * 理论上应该由配置文件来控制敌人种类，敌人数量，敌人血量
 */
var EnemyGroup = cc.class.extend({
    type1Num: 0,
    type1Hp: 0,
    type2Num: 0,
    type2Hp: 0,
    type3Num: 0,
    type3Hp: 0,
    enemySum: 0,
    /* 得想个办法，敌人的种类应该远不止这几种 */
    ctor: function (num1, hp1, num2, hp2, num3, hp3) {
        this.init(num1, hp1, num2, hp2, num3, hp3);
        return true;
    },
    init: function (num1, hp1, num2, hp2, num3, hp3) {
        this.type1Num = num1;
        this.type1Hp = hp1;
        this.type2Num = num1;
        this.type2Hp = hp2;
        this.type3Num = num3;
        this.type3Hp = hp3;
        this.enemySum = this.type1Num + this.type2Num + this.type3Num;
    }
});

/**
 * 查询ID创建精灵
 */
/*
var Enemy = cc.Sprite.extend({
    type: null,
    hp: null,
    ctor: function (id) {

    }
});*/
