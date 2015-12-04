cc.game.onStart = function () {

    // Retina草果屏优化（视网膜屏）
    cc.view.enableRetina(false);
    // html5 自动适应
    cc.view.adjustViewPort(true);
    // 适应大小方式
    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT);
    // 在浏览器中自动重绘大小
    cc.view.resizeWithBrowserSize(true);
    cc.director.setContentScaleFactor(1536 / 1280);

    //全局参数赋值
    GC.winSize = cc.winSize;
    GC.w = GC.winSize.width;
    GC.h = GC.winSize.height;
    GC.w_mid = GC.w / 2;
    GC.h_mid = GC.h / 2;

    // 初次载入背景层，预加载资源
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MainMenuScene());
    }, this);
};
//全局Log函数
var trace = function () {
    cc.log(Array.prototype.join.call(arguments, ","));
};
cc.game.run();