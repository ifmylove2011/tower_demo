/**
 * Created by XTER on 2015/12/9.
 * 子弹
 */

var Bullet = cc.Sprite.extend({
    isDie: false,
    attackValue: 1,
    ctor: function (texture) {
        this._super(texture);
        return true;
    },
    setIsDie: function (isDie) {
        this.isDie = isDie;
    },
    getIsDie: function () {
        return this.isDie;
    },
    setAttackValue: function (value) {
        this.attackValue = value;
    },
    getAttackValue: function () {
        return this.attackValue;
    }
});
