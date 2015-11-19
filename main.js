cc.game.onStart = function () {

    // Retina(视网膜)显示屏适配
    cc.view.enableRetina(false);
    // html5 viewPort属性
    cc.view.adjustViewPort(true);
    // 设置画面尺寸及适配规则
    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT);
    // 是否跟随浏览器变化
    cc.view.resizeWithBrowserSize(true);
    cc.director.setContentScaleFactor(1536 / 1280);

    //必要的常量赋值
    GC.winSize = cc.winSize;
    GC.w = GC.winSize.width;
    GC.h = GC.winSize.height;
    GC.w_mid = GC.w / 2;
    GC.h_mid = GC.h / 2;

    // 载入资源
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MainMenuScene());
    }, this);
};
//全局通用LOG函数
var trace = function () {
    cc.log(Array.prototype.join.call(arguments, ","));
};
cc.game.run();