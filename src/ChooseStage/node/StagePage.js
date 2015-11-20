/**
 * Created by XTER on 2015/11/20.
 */

var StagePage = cc.Node.extend({
    bgName:null,
    stage:0,
    stageBg:null,
    ctor:function(bgName,stage){
        this._super();
        this.loadConfig(bgName,stage);
        this.loadBg();
        return true;
    },
    loadConfig:function(bgName,stage){
        this.bgName=bgName;
        this.stage=stage;
    },
    loadBg:function(){
        trace(this.bgName);

        var bg = new cc.Sprite(this.bgName);
        bg.attr({
            x:GC.w_mid,
            y:GC.h_mid
        });
        this.addChild(bg);
        this.stageBg = bg;
    }
});