/**
 * Created by XTER on 2015/12/4.
 * 游戏主场景可控层
 */

var GamePlayTouchLayer = cc.Layer.extend({
    gm: null,
    map: null,
    bgLayer: null,
    toolPanel: null,
    posArray: null,
    offset: 0,
    curGroupIndex: 0,
    towerPanel: null,
    towerState: new Array(),
    ctor: function () {
        this._super();
        this.initConfig();
        this.loadMap();
        this.initToolPanel();
        this.updatePosArray();
        //this.addTouchListener();
        return true;
    },
    /* 加载必要参数 */
    initConfig: function () {
        this.gm = GameManager.getInstance();

        for (var row = 0; row < GC.MapWidth; row++) {
            for (var col = 0; col < GC.MapHeight; col++) {
                this.towerState[row * GC.MapWidth + col] = 0;
            }
        }
    },
    /* 初始化工具面板 */
    initToolPanel: function () {
        this.toolPanel = new ToolPanelLayer();
        this.addChild(this.toolPanel, 1);
    },
    /* 加载地图，获取相应参数并初始化 */
    loadMap: function () {
        var map = new cc.TMXTiledMap("res/map/" + this.gm.getCurMapName());
        this.addChild(map);

        trace(map.x, map.y, map.width, map.height);
        var mapBg = map.getLayer("bg");
        mapBg.attr({
            x: GC.w_mid,
            y: GC.h_mid,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var mapObjs = map.getObjectGroup("obj");

        this.map = map;
        this.bgLayer = mapBg;
        this.posArray = mapObjs;
    },
    /* 修改偏移量，初始化坐标点*/
    updatePosArray: function () {
        var offset = (this.map.getContentSize().width - GC.w) / 2;
        trace("偏移量", offset);
        var posArray = new Array();
        var posObjs = this.posArray.getObjects();
        for (var i in posObjs) {
            var pos = cc.p(posObjs[i].x - offset, posObjs[i].y);
            //trace("各点位置", pos.x, pos.y);
            posArray.push(pos);
        }
        this.gm.setPosArray(posArray);

        this.offset = offset;
    },
    /* 处理游戏逻辑 */
    update: function () {
        this.collisionDetection();
        this.clearStage();
    },
    addTouchListener: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            target: this,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
    },
    onTouchBegan: function (touch, event) {

    },
    onTouchMoved: function (touch, event) {

    },
    onTouchEnded: function (touch, event) {

    },
    /* 碰撞检测，即射程与敌人交叠则攻击，此处范围先作为矩形存在,后面可以将射程属性化 */
    collisionDetection: function () {
        var bulletArray = this.gm.getBulletArray();
        var enemyArray = this.gm.getEnemyArray();

        if (bulletArray.length == 0 || enemyArray.length == 0)
            return;

        //获取弹药信息，包括射击源与射程
        for (var i = 0; i < bulletArray.length; i++) {
            var bullet = bulletArray[i];
            //转换为世界坐标
            var bulletPos = bullet.getParent().convertToWorldSpace(bullet.getPosition());
            var bulletRange = cc.rect(bulletPos.x - bullet.getContentSize().width / 2, bulletPos.y - bullet.getContentSize().height / 2, bullet.getContentSize().width, bullet.getContentSize().height);
        }

        //获取敌人信息，活动范围
        for (var i = 0; i < enemyArray.length; i++) {
            var enemy = enemyArray[i];
            var enemyRange = cc.rect(enemy.getPositionX() - enemy.getContentSize().width / 2,
                enemy.getPositionY() - enemy.getContentSize().height / 2,
                enemy.getContentSize().width,
                enemy.getContentSize().height);
        }

        //敌人在射程内，just beat it!
        if (cc.rectIntersectsRect(bulletRange, enemyRange)) {
            enemy.onHurt(bullet.getAttackValue());//敌人受伤回调
            bullet.setIsDie(true);//子弹失效
        }
    },
    /* 清扫战场，包括清理失效弹药与已挂敌人 */
    clearStage: function () {
        var enemyArray = this.gm.getEnemyArray();

        for (var i = 0; i < enemyArray.length; i++) {
            var enemy = enemyArray[i];
            if (enemy) {
                enemyArray.splice(i, 1); //删除当前一项
                enemy.removeFromParent();
            }
        }
    }
});
