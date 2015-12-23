/**
 * Created by XTER on 2015/12/22.
 * 游戏结束触控层
 */

var GameOverTouchLayer = cc.Layer.extend({
    failedPanel:null,
    ctor: function () {
        this._super();
        this.addFailedPanel();
        this.addAction();
        return true;
    },
    /* 添加背景面板 */
    addFailedPanel:function(){
        var panel = new cc.Sprite(res.Bg_GameOver_png);
        panel.attr({
            x:GC.w_mid,
            y:GC.h_mid
        });
        this.addChild(panel);

        this.failedPanel = panel;
    },
    /* 添加动作特效 */
    addAction:function(){
        var action = cc.moveTo(0.8, cc.p(GC.w2, GC.h2));
        this.failedPanel.runAction(action.easing(cc.easeElasticOut()));
    }
});
