cc.game.onStart = function () {

    // Retina(����Ĥ)��ʾ������
    cc.view.enableRetina(false);
    // html5 viewPort����
    cc.view.adjustViewPort(true);
    // ���û���ߴ缰�������
    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT);
    // �Ƿ����������仯
    cc.view.resizeWithBrowserSize(true);
    cc.director.setContentScaleFactor(1536 / 1280);

    //��Ҫ�ĳ�����ֵ
    GC.winSize = cc.winSize;
    GC.w = GC.winSize.width;
    GC.h = GC.winSize.height;
    GC.w_mid = GC.w / 2;
    GC.h_mid = GC.h / 2;

    // ������Դ
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MainMenuScene());
    }, this);
};
//ȫ��ͨ��LOG����
var trace = function () {
    cc.log(Array.prototype.join.call(arguments, ","));
};
cc.game.run();