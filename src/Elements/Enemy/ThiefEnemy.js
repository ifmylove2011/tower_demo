/**
 * Created by XTER on 2015/12/22.
 */

var ThiefEnemy = EnemySprite.extend({
    ctor:function(){
        this._super("#hero_1R.png");
        this.loadConfig();
        return true;
    },
    loadConfig:function(){
        this._super();
        this.money=500;
    },
    loadAnimation : function(dir){
        this.stopActionByTag(998);
        var frames = [];
        for (var i = 1; i <= 3; i++) {
            var prefix = dir == 0 ? "hero_1L_" : "hero_1R_";
            var str = prefix + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }
        var animation = new cc.Animation(frames, 0.1);
        var animate = cc.animate(animation).repeatForever();
        animate.tag = 998;
        this.runAction(animate);
    },
    onExpload : function(){
        this._super();
        var frames = [];
        for (var i = 1; i <= 3; i++) {
            var prefix = "explode_";
            var str = prefix + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }
        var animation = new cc.Animation(frames, 0.15);
        var animate = cc.animate(animation);
        var callback = cc.callFunc(function(){
            this.isDie = true;
        }.bind(this));
        var action = cc.sequence(animate, callback);
        this.runAction(action);
    }
});