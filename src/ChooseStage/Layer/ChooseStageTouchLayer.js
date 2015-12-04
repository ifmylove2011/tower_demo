/**
 * Created by XTER on 2015/11/19.
 * 选择关卡的可触发层（操作层）
 */

var ChooseStageTouchLayer = cc.Layer.extend({
    mark: null,
    ctor: function () {
        this._super();
        this.addPageView();
        this.addPageMark();
        return true;
    },
    /* 添加页面视图 */
    addPageView: function () {
        //创建【页】
        var page = new ccui.PageView();
        this.addChild(page);
        page.setTouchEnabled(true);
        page.setContentSize(GC.winSize);
        page.addEventListener(this.onPageEvent, this);

        //将内容添入【页】中
        for (var i = 0; i < GC.StagePageCount; i++) {
            var stagePage = new StagePage("#choose_stage_bg_" + i % 3 + ".png", i);
            var layout = new ccui.Layout();
            //layout.setContentSize(cc.size(GC.w_mid,GC.h_mid));
            layout.setContentSize(GC.winSize);
            layout.addChild(stagePage);
            page.addPage(layout);
        }
    },
    /* 添加页标 */
    addPageMark: function () {
        var mark = new PageMark({
            normalImage: "#page_other.png",
            selectedImage: "#page_current.png",
            dir: GC.DIR_HORIZONTAL,
            count: GC.StagePageCount,
            space: 20
        });
        mark.attr({
            x: GC.w_mid,
            y: 60
        });
        this.addChild(mark);
        this.mark = mark;
    },
    /* 滑动页面触发 */
    onPageEvent: function (sender, type) {
        switch (type) {
            case ccui.PageView.EVENT_TURNING:
                var currentIndex = sender.getCurPageIndex().valueOf();
                trace(sender.getCurPageIndex());
                this.mark.changMark(currentIndex);
                break;
            default:
                break;
        }

    }
});