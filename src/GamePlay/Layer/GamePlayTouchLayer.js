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
        //this.updatePosArray();
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

        trace(map.x,map.y,map.width,map.height);
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
    /* 修改偏移量，更新坐标点*/
    updatePosArray: function () {
        var offset = (this.map.getContentSize().width - GC.w) / 2;
        trace("偏移量", offset);
        var posArray = new Array();
        var posObjs = this.posArray.getObjects();
        for (var i in posObjs) {
            var pos = cc.p(posObjs[i].x - offset, posObjs[i].y);
            trace("各点位置", pos.x,pos.y);
            posArray.push(pos);
        }
        this.gm.setPosArray(posArray);

        this.offset = offset;
    },
    /* 处理游戏逻辑 */
    update: function () {

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

    }
});
