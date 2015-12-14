/**
 * Created by XTER on 2015/12/14.
 * 打通了~~
 */

var GamePassLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.addPanel();
        this.addMenu();
        return true;
    },
    addPanel: function () {
        var panel = new cc.Sprite("#gp_gamePass.png");
        panel.attr({
            x: GC.w_mid,
            y: GC.h_mid
        });
        this.addChild(panel);
    },
    addMenu: function () {
        //下一关按钮
        var btnNextNormal = new cc.Sprite(res.Btn_Next_png);
        var btnNextSelected = new cc.Sprite(res.Btn_Next_png);
        var btnNextDisable = new cc.Sprite(res.Btn_Next_png);

        var nextMenuItem = new cc.MenuItemSprite(
            btnNextNormal,
            btnNextSelected,
            btnNextDisable,
            function () {
                var levelStr = cc.sys.localStorage.getItem("levelMax");
                var nextLevel = parseInt(levelStr + 1);
                new LevelLoader(nextLevel);

                var scene = new GamePlayScene();
                cc.director.runScene(new cc.TransitionCrossFade(GC.TransitionTime, scene));
            }.bind(this)
        );

        //返回按钮
        var btnBackNormal = new cc.Sprite(res.Btn_Back_png);
        var btnBackSelected = new cc.Sprite(res.Btn_Back_png);
        var btnBackDisable = new cc.Sprite(res.Btn_Back_png);

        var backMenuItem = new cc.MenuItemSprite(
            btnBackNormal,
            btnBackSelected,
            btnBackDisable,
            function () {
                var scene = new ChooseStageScene();
                cc.director.runScene(new cc.TransitionCrossFade(GC.TransitionTime, scene));
            }.bind(this)
        );

        var menu = new cc.Menu(nextMenuItem, backMenuItem);
        menu.attr({
            x: GC.w_mid,
            y: GC.h_mid - 200
        });
        this.addChild(menu);
        menu.alignItemsHorizontallyWithPadding(20);
    }
});
