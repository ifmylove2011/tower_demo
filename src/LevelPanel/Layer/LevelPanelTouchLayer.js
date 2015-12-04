/**
 * Created by XTER on 2015/12/3.
 * 关卡详情面板可控层
 */

var LevelPanelTouchLayer = cc.Layer.extend({
    panel: null,
    ctor: function () {
        this._super();
        this.addPanelBg();
        this.addPanelButton();
        this.addScoreFlag();
        return true;
    },
    /* 添加面板背景 */
    addPanelBg: function () {
        this.panel = new cc.Sprite("#level_panel.png");
        this.panel.attr({
            x: GC.w_mid,
            y: GC.h_mid
        });
        this.addChild(this.panel);
    },
    /* 添加面板按钮 */
    addPanelButton: function () {
        //进入游戏按钮
        var enterNormal = new cc.Sprite("#btn_enter_pressed.png");
        var enterSelected = new cc.Sprite("#btn_enter_normal.png");
        var enterDisabled = new cc.Sprite("#btn_enter_normal.png");

        var enter = new cc.MenuItemSprite(
            enterNormal,
            enterSelected,
            enterDisabled,
            function () {
                trace("进入关卡了");
                var scene = new GamePlayScene();
                cc.director.runScene(new cc.TransitionCrossFade(GC.TransitionTime, scene));
            }.bind(this)
        );

        //返回按钮
        var backNormal = new cc.Sprite("#btn_back_normal.png");
        var backSelected = new cc.Sprite("#btn_back_pressed.png");
        var backDisabled = new cc.Sprite("#btn_back_normal.png");

        var back = new cc.MenuItemSprite(
            backNormal,
            backSelected,
            backDisabled,
            function () {
                trace("又转来了~~");
                var scene = new ChooseStageScene();
                cc.director.runScene(new cc.TransitionCrossFade(GC.TransitionTime, scene));
            }.bind(this)
        );

        //相对于面板来确定菜单位置
        var menu = new cc.Menu(enter, back);
        var sizePanel = this.panel.getContentSize();
        trace("关卡信息面板大小", sizePanel.width, sizePanel.height);
        menu.attr({
            x: sizePanel.width / 2 - 5,
            y: 20
        });
        menu.alignItemsHorizontallyWithPadding(10);
        this.panel.addChild(menu);
    },
    /* 添加分数标志 */
    addScoreFlag: function () {
        //标志大小及位置
        var sizeFlag = new cc.Sprite("#star_sword_off.png").getContentSize();
        var sizePanel = this.panel.getContentSize();
        var space = sizeFlag.width;
        var flagStartX = sizePanel.width / 4 * 3 - 20;

        for (var i = 0; i < GC.StarNum; i++) {
            var flag = new cc.Sprite("#star_sword_off.png");
            flag.setPosition(flagStartX + space * i * 1.5, sizePanel.height / 3 * 2 + 10);
            this.panel.addChild(flag);
        }
    }
});