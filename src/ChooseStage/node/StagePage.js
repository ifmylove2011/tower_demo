/**
 * Created by XTER on 2015/11/20.
 * 关卡选择页面，可滑动页
 */

var StagePage = cc.Node.extend({
    bgName: null,
    page: 0,
    stageBg: null,
    ctor: function (bgName, page) {
        this._super();
        this.loadConfig(bgName, page);
        this.loadBg();
        this.addStageItems();
        return true;
    },
    loadConfig: function (bgName, page) {
        this.bgName = bgName;
        this.page = page;
    },
    loadBg: function () {
        trace(this.bgName);

        var bg = new cc.Sprite(this.bgName);
        bg.attr({
            x: GC.w_mid,
            y: GC.h_mid
        });
        this.addChild(bg);
        this.stageBg = bg;
    },
    /* 添加关卡 */
    addStageItems: function () {
        //trace("stage.width", this.stageBg.width, "stage.height", this.stageBg.height, "stage.x", this.stageBg.x, "stage.y", this.stageBg.y);
        //关卡图标自己的大小
        var size = new cc.Sprite("#stage_locked.png").getContentSize();
        //距离窗口的距离（外）,关卡图标之间的间隔暂定为自身大小的一半（注意别算反了)
        var marginX = (GC.w - (size.width + size.width / 2) * GC.StageItemCol) / 2 + size.width / 2;
        var marginY = (GC.h - (size.height + size.height / 2) * GC.StageItemRow) / 2 + size.height / 2;
        //创建存储关卡菜单的数组
        var menuStageItem = [];
        //根据计算得出每个关卡图标的位置
        for (var i = 0; i < GC.StageItemRow; i++) {
            for (var j = 0; j < GC.StageItemCol; j++) {
                var x = marginX + size.width / 4 + j * (size.width + size.width / 2);
                //默认是从下往上排的，因而作一下处理
                var y = marginY + size.height / 4 + (GC.StageItemRow - 1 - i) * (size.height + size.height / 2);

                var stageItemNormal = new cc.Sprite("#stage_normal.png");
                var stageItemSelected = new cc.Sprite("#stage_unlocked.png");
                var stageItemDisable = new cc.Sprite("#stage_locked.png");
                //定菜单项
                var stageItem = new cc.MenuItemSprite(
                    stageItemNormal,
                    stageItemSelected,
                    stageItemDisable,
                    this.onGameStart,
                    this
                );

                menuStageItem.push(stageItem);
                stageItem.attr({
                    x: x,
                    y: y
                });

                //当前是几关，给个标记
                var tag = i * GC.StageItemCol + j + this.page * GC.StageItemRow * GC.StageItemCol;
                stageItem.setTag(tag);

                //判断是否打通关了
                var levelStr = cc.sys.localStorage.getItem("levelMax");
                var levelNum = levelStr ? parseInt(levelStr) : 0;
                if (!levelStr) {
                    cc.sys.localStorage.setItem("levelMax", 0);
                }
                if (levelNum < tag) {
                    stageItem.setEnabled(false);
                }
            }
        }

        var menu = new cc.Menu(menuStageItem);
        menu.attr({
            x: 0,
            y: 0
        });
        this.addChild(menu);
    },
    /* 加载游戏场景 */
    onGameStart: function () {
        trace("start");
    }
});