/**
 * Created by XTER on 2015/12/25.
 */

var AttackTower = TowerSprite.extend({
    ctor: function () {
        this._super("#gp_attackTower.png");
        this.initConfig();
        this.schedule(this.shoot, 0.8);
    },
    /* 参数初始化 */
    initConfig: function () {
        this._super();
        this.attack = 2;
        this.range = 500;
        this.speed = 2;
        this.money = 300;
    },
    /* 攻击逻辑--射击计算 */
    shoot: function () {
        var gm = GameManager.getInstance();
        this.findNearestEnemy();

        if (this.nearestEnemy != null && this.nearestEnemy.getCurHp() > 0) {
            var curBullet = this.createTowerBullet();
            this.addChild(curBullet);
            gm.getBulletArray().push(curBullet);

            var shootVector = cc.pNormalize(cc.pSub(this.nearestEnemy.getPosition(), this.getPosition()));
            var normalizedShootVector = cc.pNeg(shootVector);


            var farthestDistance = GC.w;
            var overshotVector = cc.pMult(normalizedShootVector, farthestDistance);
            var offscreenPoint = cc.pSub(curBullet.getPosition(), overshotVector);

            var move = cc.moveTo(this.speed, offscreenPoint);

            var callback = cc.callFunc(this.removeBullet, this);
            var action = cc.sequence(move, callback);
            curBullet.runAction(action);
        }
    },
    /* 装填弹药 */
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
        sender.setIsDie(true);
    }
});