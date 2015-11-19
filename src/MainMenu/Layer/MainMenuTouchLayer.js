/**
 * Created by XTER on 2015/11/19.
 */

var MainMenuTouchLayer = cc.Layer.extend({
    title: null,
    btnStart: null,
    ctor: function () {
        this._super();
        this.addTitle();
        this.addMenu();
    },
    addTitle: function () {
        this.title = new cc.LabelBMFont("浩劫", res.Mini_Xingkai_CH_fnt);
        this.title.attr({
            x: GC.w_mid,
            y: GC.h_mid,
            scale: 4,
            color: cc.color.RED
        });
        this.addChild(this.title, 2);
        //标题动作
        var move = cc.moveBy(0.5, cc.p(20));
        var action = cc.sequence(move, move.reverse()).repeatForever();
        //titleLabel.runAction(action);
    },
    addMenu: function () {
        var btnStartNormal = new cc.Sprite(res.Menu_Main_Start_png);
        var btnStartSelected = new cc.Sprite(res.Menu_Main_Start_png);
        var btnStartDisable = new cc.Sprite(res.Menu_Main_Start_png);

        var menuStart = new cc.MenuItemSprite(
            btnStartNormal,
            btnStartSelected,
            btnStartDisable,
            function () {
                trace("点击了开始");
            }
        );
        //菜单所在位置
        var menu = new cc.Menu(menuStart);
        menu.attr({
            x: GC.w_mid,
            y: this.title.y -100
        });
        this.addChild(menu);

    }

});