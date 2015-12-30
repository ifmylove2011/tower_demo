/**
 * Created by XTER on 2015/12/24.
 * ������
 */

var TowerSprite = cc.Sprite.extend({
    range: 0,
    attack: 0,
    speed: 0,
    rate: 0,
    money: 0,
    nearestEnemy: null,
    ctor: function (texture) {
        this._super(texture);
        this.initConfig();
        return true;
    },
    initConfig: function () {

    },
    findNearestEnemy: function () {
        var enemyArray = GameManager.getInstance().getEnemyArray();
        var curMinDistance = this.range;
        var sprite = null;

        for (var i = 0; i < enemyArray.length; i++) {
            var enemy = enemyArray[i];
            var distance = cc.pDistance(this.getPosition(), enemy.getPosition());
            if (distance < curMinDistance) {
                curMinDistance = distance;
                sprite = enemy;
            }
        }

        this.nearestEnemy = sprite;
    },
    getMoney:function(){
        return this.money;
    }
});
