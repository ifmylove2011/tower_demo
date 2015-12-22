/**
 * Created by XTER on 2015/12/22.
 */

var PirateEnemy = EnemySprite.extend({
    ctor:function(){
        this._super("#enemyRight3_1.png");
        this.loadConfig();
        return true;
    },
    loadConfig:function(){
        this._super();
        this.money = 1200;
    }
});