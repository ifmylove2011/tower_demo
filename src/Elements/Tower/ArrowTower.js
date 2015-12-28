/**
 * Created by XTER on 2015/12/24.
 */

var ArrowTower = TowerSprite.extend({
    bed: null,
    rotate: null,
    ctor: function () {
        this._super();
        this.loadConfig();
        this.loadBed();
        this.loadRotate();
        this.schedule(this.onRotateAndShoot, 0.5);
    },
    /* 参数初始化 */
    loadConfig: function () {
        this._super();
        this.attack = 2;
        this.range = 120;
        this.speed = 3;
        this.money = 200;
    },
    loadBed: function () {
        var sprite = new cc.Sprite("#gp_basePlate.png");
        this.addChild(sprite);

        this.bed = sprite;
    },
    loadRotate: function () {
        var sprite = new cc.Sprite("#gp_arrow.png");
        sprite.attr({
            x: 0,
            y: this.bed.height / 4
        });
        this.addChild(sprite);

        this.rotate = sprite;
    },
    onRotateAndShoot: function () {
        this.findNearestEnemy();
        if (this.nearestEnemy != null) {
            var rotateBase = cc.pSub(this.nearestEnemy.getPosition(), this.getPosition());
            var rotateRadians = cc.pToAngle(rotateBase);
            var rotateDegrees = cc.radiansToDegrees(-1 * rotateRadians);

            // speed表示炮塔旋转的速度，0.5 / M_PI其实就是 1 / 2PI，它表示1秒钟旋转1个圆
            var speed = 0.5 / cc.PI;
            // rotateDuration表示旋转特定的角度需要的时间，计算它用弧度乘以速度。
            var rotateDuration = Math.abs(rotateRadians * speed);

            var move = cc.rotateTo(rotateDuration, rotateDegrees);
            var callback = cc.callFunc(this.shoot, this);
            var action = cc.sequence(move, callback);
            this.rotate.runAction(action);
        }

    },
    /* 攻击逻辑--射击计算 */
    shoot: function () {
        var gm = GameManager.getInstance();

        //有敌人靠近则发射子弹
        if (this.nearestEnemy != null && this.nearestEnemy.getCurHp() > 0) {
            var curBullet = this.createTowerBullet();
            this.addChild(curBullet);
            gm.bulletArray.push(curBullet);

            var shootVector = cc.pNormalize(cc.pSub(this.nearestEnemy.getPosition(), this.getPosition()));
            var normalizedShootVector = cc.pNeg(shootVector);

            var farthestDistance = GC.w;
            var overshotVector = cc.pMult(normalizedShootVector, farthestDistance);
            var offscreenPoint = cc.pSub(this.rotate.getPosition(), overshotVector);

            trace("offscreenPoint", offscreenPoint);

            var move = cc.moveTo(this.bulletSpeed, offscreenPoint);
            var callback = cc.callFunc(this.removeBullet, this);
            var action = cc.sequence(move, callback);
            curBullet.runAction(action);
        }
    },
    /* 创建弹药 */
    createTowerBullet: function () {
        var sprite = new Bullet("#gp_arrowBullet.png");
        sprite.setAttackValue(this.attack);
        sprite.setPosition(this.rotate.getPosition());
        sprite.setRotation(this.rotate.getRotation());
        return sprite;
    },
    /* 弹药失效 */
    removeBullet: function (sender) {
        sender.setIsDie(true);
    }
});
