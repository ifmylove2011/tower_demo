/**
 * Created by XTER on 2015/12/25.
 */

var ScreenTower = TowerSprite.extend({
    ctor: function () {
        this._super("#gp_multiDirTower.png");
        this.loadConfig();
        this.schedule(this.shoot, 0.2);
    },
    /* 参数初始化 */
    loadConfig: function () {
        this._super();
        this.range = 120;
        this.attack = 2;
        this.speed = 2;
        this.money = 500;
    },
    /* 攻击逻辑--射击计算 */
    shoot: function () {
        var gm = GameManager.getInstance();
        this.findNearestEnemy();

        var dirTotal = 20;
        if (this.nearestEnemy != null && this.nearestEnemy.getCurrHp() > 0) {
            for (var i = 0; i < dirTotal; i++) {
                var curBullet = this.createTowerBullet();
                this.addChild(curBullet);
                gm.getBulletArray().push(curBullet);

                var shootVector = cc.pNormalize(cc.p(1, Math.tan(i * 2 * cc.PI / dirTotal)));
                var normalizedShootVector;
                if (i >= dirTotal / 2) {
                    normalizedShootVector = shootVector;
                } else {
                    normalizedShootVector = cc.pNeg(shootVector);
                }
                var farthestDistance = GC.w;
                var overshotVector = cc.pMult(normalizedShootVector, farthestDistance);
                var offscreenPoint = cc.pSub(curBullet.getPosition(), overshotVector);

                var move = cc.moveTo(this.bulletSpeed, offscreenPoint);
                var callback = cc.callFunc(this.removeBullet, this);
                var action = cc.sequence(move, callback);
                curBullet.runAction(action);
            }
        }
    },
    /* 创建弹药 */
    createTowerBullet: function () {
        var sprite = new Bullet("#gp_bullet.png");
        sprite.attr({
            x: this.getContentSize().width / 2,
            y: this.getContentSize().height * 0.8
        });
        sprite.setAttackValue(this.attack);
        return sprite;
    },
    /* 弹药失效 */
    removeBullet: function (sender) {
        sender.isDie = true;
    }
});