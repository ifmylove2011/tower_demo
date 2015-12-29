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
        this.schedule(this.addEnemy,1);
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
        trace("地图宽度",this.map.getContentSize().width,"窗口宽度",GC.w,"偏移量", offset);
        var posArray = new Array();
        var posObjs = this.posArray.getObjects();
        for (var i in posObjs) {
            var pos = cc.p(posObjs[i].x -offset, posObjs[i].y);
            trace("各点位置", pos.x, pos.y);
            posArray.push(pos);
        }
        this.gm.setPosArray(posArray);

        this.offset = offset;
        GC.offset = offset;
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
                enemy=new ThiefEnemy();
                maxHp = groupEnemy.type1Hp;
                groupEnemy.type1Num--;
            } else if (groupEnemy.type2Num > 0) {
                enemy=new PirateEnemy();
                maxHp = groupEnemy.type2Hp;
                groupEnemy.type2Num--;
            } else if (groupEnemy.type3Num > 0) {
                enemy=new BanditEnemy();
                maxHp = groupEnemy.type3Hp;
                groupEnemy.type3Num--;
            } else {
                trace("clear");
            }

            //说好的音效！~

            this.addChild(enemy);

            this.gm.getEnemyArray().push(enemy);
            enemy.setAttackSucceedCallback(this.enemyPass.bind(this));
            enemy.setMaxHp(maxHp);
        } else {
            this.curGroupIndex++;

            //工具条显示变动
            if (this.curGroupIndex < groupArray.length) {
                var label = this.toolPanel.getGroupIndexLabel();
                label.setString((this.curGroupIndex + 1) + " ");
            }

            //敌人添加完毕
            if (this.curGroupIndex == groupArray.length - 1) {
                this.gm.setIsAddFinished(true);
                this.unschedule(this.addEnemy);
            }
        }

    },
    /* 添加塔 */
    addTower: function (type, pos) {
        var tower = null;
        switch (type) {
            case "arrow":
                tower = new ArrowTower();
                break;
            case "attack":
                tower = new AttackTower();
                break;
            case "screen":
                tower = new ScreenTower;
                break;
            default :
                tower = new ArrowTower();
                break;
        }

        //没钱
        if(this.gm.getCurMoney()<tower.getMoney()){
            var noMoney = new cc.Sprite("#gp_noMoney.png");
            noMoney.setPosition(pos);
            this.addChild(noMoney);
            this.scheduleOnce(function(){
                this.removeChild(noMoney);
            }, 0.5);
            tower = null;
            return;
        }

        // 建塔，扣钱
        this.addChild(tower);
        tower.setPosition(pos);
        this.toolPanel.onMinusMoney(tower.getMoney());

        //标明地块的索引序列
        var matrixCoord = this.convertToMatrixCoord(pos);
        var matrixIndex = parseInt(matrixCoord.y * GC.MapWidth + matrixCoord.x);
        this.towerState[matrixIndex] = 1;
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

        //面板已经展开则创建塔，否则尝试创建面板
        if (target.towerPanel && target.towerPanel.selectedTowerName !== "") {
            var selectedName = target.towerPanel.selectedTowerName;
            target.addTower(selectedName, target.towerPanel.getPosition());
            target.removeChild(target.towerPanel);
            target.towerPanel = null;
        } else {
            if (target.towerPanel) {
                target.towerPanel.removeFromParent();
                target.towerPanel = null;
            }
            var location = touch.getLocation();

            trace("点击的位置",location.x,location.y);

            target.onCanShowPanel(location);
        }
        return true;
    },
    onTouchMoved: function (touch, event) {

    },
    onTouchEnded: function (touch, event) {

    },
    /* 检测是否可以显示面板 */
    onCanShowPanel: function (pos) {
        var towerCoord = this.convertTotileCoord(pos);
        // tiledMap中的每一个瓦片来，都有一个全局标识量GID，GID范围从正整数1开始到瓦片地图中瓦片的总量
        var gid = this.bgLayer.getTileGIDAt(towerCoord); //地图坐标gid
        // 获取出来的瓦片地图
        var tileTemp =this.map.getPropertiesForGID(gid);

        // 当前触摸的[点]转为【地图[数组]坐标】
        // TODO 地图【数组】起点(0, 0)在左【下】角
        var matrixCoord = this.convertToMatrixCoord(pos);
        // 数组索引
        var matrixIndex = parseInt(matrixCoord.y * GC.MapWidth + matrixCoord.x);
        var touchVaule = 0;
        if (tileTemp != null){ //假如不能触摸
            touchVaule = tileTemp.canTouch;
        }
        var tileWidth = this.map.getContentSize().width / this.map.getMapSize().width;
        var tileHeight = this.map.getContentSize().height / this.map.getMapSize().height;

        var towerPos = cc.p((towerCoord.x * tileWidth) + tileWidth / 2 - this.offset,
            this.map.getContentSize().height - (towerCoord.y * tileHeight) - tileHeight/2);

        if (touchVaule == 1 && this.towerState[matrixIndex] == 0){
            this.addTowerChoosePanel(towerPos);
        }else{
            var tips = new cc.Sprite("#gp_no.png");
            tips.setPosition(towerPos);
            this.addChild(tips);
            this.scheduleOnce(function(){
                this.removeChild(tips);
            }, 1);
        }
    },
    addTowerChoosePanel:function(pos){
        this.towerPanel = new TowerPanel();
        this.addChild(this.towerPanel);
        this.towerPanel.setPosition(pos);
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
            var bulletRange = cc.rect(
                bulletPos.x - bullet.getContentSize().width / 2,
                bulletPos.y - bullet.getContentSize().height / 2,
                bullet.getContentSize().width,
                bullet.getContentSize().height);

            //获取敌人信息，活动范围
            for (var j = 0; j < enemyArray.length;j++) {
                var enemy = enemyArray[j];
                var enemyRange = cc.rect(
                    enemy.getPositionX() - enemy.getContentSize().width / 2,
                    enemy.getPositionY() - enemy.getContentSize().height / 2,
                    enemy.getContentSize().width,
                    enemy.getContentSize().height);

                //敌人在射程内，just beat it!
                if (cc.rectIntersectsRect(bulletRange, enemyRange)) {
                    enemy.onHurt(bullet.getAttackValue());//敌人受伤回调
                    bullet.setIsDie(true);//子弹失效
                }
            }
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
    },
    convertTotileCoord : function(pos){
        var x = (pos.x + this.offset)/ this.map.getContentSize().width * this.map.getMapSize().width;
        var y = this.map.getMapSize().height- pos.y / this.map.getContentSize().height * this.map.getMapSize().height;

        trace("this.map.getContentSize()", this.map.getContentSize().height);   // 1536 * 864
        trace("this.map.getMapSize()", this.map.getMapSize().height);           // 16 * 9
        return cc.p(parseInt(x), parseInt(y));
    },
    convertToMatrixCoord : function(pos){
        var x = (pos.x + this.offset) / this.map.getContentSize().width * this.map.getMapSize().width;
        var y = pos.y / this.map.getContentSize().height * this.map.getMapSize().height;
        return cc.p(parseInt(x), parseInt(y));
    }
});
