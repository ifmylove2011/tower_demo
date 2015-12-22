/**
 * Created by XTER on 2015/12/22.
 */

var ThiefEnemy = EnemySprite.extend({
    ctor:function(){
        this._super("#enemyRight1_1.png");
        this.loadConfig();
        return true;
    },
    loadConfig:function(){
        this._super();
        this.money=500;
    }
});