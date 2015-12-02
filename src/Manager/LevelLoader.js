/**
 * Created by XTER on 2015/11/29.
 */

var LevelLoader = cc.Class.extend({
    level: null,
    resource: null,
    ctor: function (level) {
        this.loadPlist(level);
        this.loadLevelInfo();
    },
    loadPlist: function (level) {
        var loader = this;
        var plist = "res/level/level_info_" + level + ".plist";

        //可批量加载
        cc.loader.load([plist], function (err, results) {
            if (err) {
                cc.error("Failed to load %s, %s .", plist);
                return;
            }
            loader.levelInfo = results[0].level_info;
            loader.resource = results[0].level_resource;
        });
    },
    //初始化游戏数据
    loadLevelInfo: function () {

        var instance = GameManager.getInstance();
        instance.clear();

        var curBgName = this.resource.bg_image;
        var curMapName = this.resource.tile_map;
        var curMoney = parseInt(this.levelInfo.sum_money);
        var curLevelPlist = this.levelInfo.curlevel;
        var nextLevelPlist = this.levelInfo.nextlevel;
        var group = this.levelInfo.level_group;

        var groupNum = 0;
        for(var i in group){
            groupNum++;
        }

        instance.curBgName = curBgName;
        instance.curMapName = curMapName;
        instance.curMoney = curMoney;
        instance.curLevelFile = curLevelPlist;
        instance.nextLevelFile = nextLevelPlist;
        instance.groupNum = groupNum;

        trace("======== 加载配置=========");
        trace("curBgName",curBgName);
        trace("curMapName",curMapName);
        trace("curMoney",curMoney);
        trace("curLevelPlist",curLevelPlist);
        trace("nextLevelPlist",nextLevelPlist);
        trace("groupNum",groupNum);

        //创建敌人
    }
});