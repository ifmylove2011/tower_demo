/**
 * Created by XTER on 2015/12/23.
 * 创建塔的面板
 */

var TowerPanel = cc.Layer.extend({
    listener: null,
    selectedTowerName:"",
    ctor: function () {
        this._super();
        this.addTouchListener();
        this.showTowerList();
        return true;
    },
    /* 添加触摸监听器 */
    addTouchListener: function () {
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,//因为要继续监听
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });

    },
    /* 显示可创建的塔 */
    showTowerList:function(){
        var tower = new cc.Sprite("#gp_towerPos.png");
        tower.attr({
            x:0,
            y:0
        });
        this.addChild(tower);

        var arrowTower = new cc.Sprite("#gp_arrowTowerInfo.png");
        arrowTower.attr({
            _name:"arrow",
            x:-tower.getContentSize().width,
            y:tower.getContentSize().height / 2,
            anchorX:0.5,
            anchorY:0
        });
        this.addChild(arrowTower);
        cc.eventManager.addListener(this.listener, arrowTower);

        var attackTower = new cc.Sprite("#gp_attackTowerInfo.png");
        attackTower.attr({
            _name:"attack",
            x:0,
            y:tower.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0
        });
        this.addChild(attackTower);
        cc.eventManager.addListener(this.listener.clone(), attackTower);

        var multiDirTower = new cc.Sprite("#gp_multiDirTowerInfo.png");
        multiDirTower.attr({
            _name:"multiDir",
            x:tower.getContentSize().width,
            y:tower.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0
        });
        this.addChild(multiDirTower);
        cc.eventManager.addListener(this.listener.clone(), multiDirTower);
    },
    onTouchBegan:function(touch,event){
        var target = event.getCurrentTarget();
        var localTouch= target.convertToNodeSpace(touch.getLocation());
        var size= target.getContentSize();
        var rect = cc.rect(0,0,size.width,size.height);
        if(!(cc.rectContainsPoint(rect,localTouch))){
            return false;
        }

        target.parent.selectedTowerName = target.getName();

        return true;
    },
    onTouchMoved:function(){
        var target = this.target;
    },
    onTouchEnded:function(){
        var target = this.target;
    },
    /* 获取点选的名 */
    getSelectedTowerName:function(){
        return this.selectedTowerName;
    }
});