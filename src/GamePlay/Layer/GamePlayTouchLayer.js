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
        this.isGamePass();
        this.addTouchListener();
        this.schedule(this.addEnemy);
        this.scheduleUpdate();
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
    /* 添加敌人 */
    addEnemy: function () {
        var groupArray = this.gm.getGroupArray();
        var groupEnemy = groupArray[this.curGroupIndex];

        var enemy = null;

        //在levelloader中载入的数据EnemyGroup
        if (groupEnemy.enemySum > 0) {
            groupEnemy.enemySum--;
            var maxHp = 0;

            if (groupEnemy.type1Num > 0) {
                maxHp = groupEnemy.type1Hp;
                groupEnemy.type1Num--;
            } else if (groupEnemy.type2Num > 0) {
                maxHp = groupEnemy.type2Hp;
                groupEnemy.type2Num--;
            } else if (groupEnemy.type3Num > 0) {
                maxHp = groupEnemy.type3Hp;
                groupEnemy.type3Num--;
            } else {
                trace("clear");
            }

            this.addChild(enemy);

            this.gm.getEnemyArray().push(enemy);
            enemy.setAttackSucceedCallback(this.enemyPass.bind(this));
            enemy.setMaxHp(maxHp);
        } else {
            this.curGroupIndex++;

            //工具条显示变动
            if(this.curGroupIndex<groupArray.length){
                var label = this.toolPanel.getGroupIndexLabel();
                label.setString((this.curGroupIndex+1)+" ");
            }

            //敌人添加完毕
            if(this.curGroupIndex==groupArray.length-1){
                this.gm.setIsAddFinished(true);
                this.unschedule(this.addEnemy);
            }
        }

    },
    /* 处理游戏逻辑 */
    update: function () {
        this.collisionDetection();
        this.clearStage();
    },
    /* 添加触摸监听器 */
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
    /* 触摸判定--建塔 */
    onTouchBegan: function (touch, event) {
        var target = this.target;

        if(target.towerPanel&&target.towerPanel.selectedTowerName==""){
            
        }

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
        //清理失效敌人
        var enemyArray = this.gm.getEnemyArray();

        for (var i = 0; i < enemyArray.length; i++) {
            var enemy = enemyArray[i];
            if (enemy.isDie) {
                enemyArray.splice(i, 1); //删除当前一项
                enemy.removeFromParent();
                //加钱
                this.toolPanel.onAddMoney(enemy.getMoney());
                //判断是否通过
                this.isGamePass();
            }
        }

        //清理失效子弹
        var bulletArray = this.gm.getBulletArray();

        for (var i = 0; i < bulletArray.length; i++) {
            var bullet = bulletArray[i];
            if (bullet.isDie) {
                bullet.removeFromParent();
                bulletArray.splice(i, 1);
            }
        }
    },
    /* 敌人到点终点了 */
    enemyPass: function () {
        var enemyArray = this.gm.getEnemyArray();

        //将敌人从组中移除
        for (var i = 0; i < enemyArray.length; i++) {
            var enemy = enemyArray[i];
            if (enemy.isSucceed) {
                this.removeChild(enemy);
                enemyArray.splice(i, 1);
            }
        }

        //敌人到达终点引起的反应（回调）
        this.toolPanel.onMinusHp(1);

        var curHp = this.gm.getCurHp();
        if (curHp <= 0) {
            this.gm.clear();
            var scene = new GameOverScene();
            cc.director.runScene(new cc.TransitionCrossFade(GC.TransitionTime, scene));
        } else {
            this.isGamePass();
        }
    },
    /* 判断是否过关 */
    isGamePass: function () {
        if (this.curGroupIndex == this.gm.getGroupArray().length - 1 && this.gm.getIsAddFinished() && this.gm.getEnemyArray().length == 0) {
            this.gm.clear();
            this.onGamePass();
            return;
        }
    },
    /* 过关 */
    onGamePass: function () {
        cc.eventManager.removeAllListeners();

        var levelStr = cc.sys.localStorage.getItem("levelMax");
        var curLevel = parseInt(levelStr);
        if (curLevel == this.gm.getCurLevel()) {
            var nextLevel = curLevel + 1;
            cc.sys.localStorage.setItem("levelMax", nextLevel);
        }

        var layer = new GamePassLayer();
        this.addChild(layer, 10);
    }
});
