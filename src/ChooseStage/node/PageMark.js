/**
 * Created by XTER on 2015/11/20.
 */

var PageMark = cc.Node.extend({
    normalImage: null,  //常态图
    selectedImage: null, //选中图
    dir: null,   //方向
    count: null,//数量
    space: null,//间隔
    mark: null,//标记实例
    markPos: [],//标记坐标，用于替换
    ctor: function (data) {
        this._super();
        this.loadConfig(data);
        this.init();
        this.focusMark();
        return true;
    },
    /* 传入必要参数 */
    loadConfig: function (data) {
        this.normalImage = data.normalImage;
        this.selectedImage = data.selectedImage;
        this.dir = data.dir || GC.DIR_HORIZONTAL;
        this.count = data.count;
        this.space = data.space;
    },
    /* 根据算法排列位置 */
    init: function () {
        var markSprite = new cc.Sprite(this.normalImage);

        startX = -(this.count - 1) / 2 * (this.space + markSprite.width);

        for (var i = 0; i < this.count; i++) {
            var x = startX + i * (markSprite.width + this.space);
            var pos = cc.p(x, 0);
            this.markPos.push(pos);
            trace("x", x);
            var mark = new cc.Sprite(this.normalImage);
            mark.attr({
                x: x,
                y: 0
            });
            this.addChild(mark);
        }
    },
    /* 替换当前选中的图标 */
    focusMark: function () {
        this.mark = new cc.Sprite(this.selectedImage);
        this.addChild(this.mark);
        this.mark.setPosition(this.markPos[0]);
    },
    /* 提供改变当前页标记的接口 */
    changMark: function (currentIndex) {
        this.mark.setPosition(this.markPos[currentIndex]);
    }
});