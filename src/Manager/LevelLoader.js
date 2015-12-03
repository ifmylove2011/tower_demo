/**
 * Created by XTER on 2015/11/29.
 * 载入关卡信息
 */

var LevelLoader = cc.Class.extend({
    level: null,
    resource: null,
    ctor: function (level) {
        this.loadPlist(level);
        this.loadLevelInfo();
    },
    /* 加载配置文件 */
    loadPlist: function (level) {
        var loader = this;
        var plist = "res/level/level_info_" + level + ".plist";

        //可批量加载
        cc.loader.load([plist], function (err, results) {
            if (err) {
                cc.error("并没有载入 %s, %s .", plist);
                return;
            }
            loader.levelInfo = results[0].level_info;
            loader.resource = results[0].level_resource;
        });
    },
    /* 初始化游戏数据 */
    loadLevelInfo: function () {
        //还是用单例靠谱
        var instance = GameManager.getInstance();
        instance.clear();

        //取出各种配置数据
        var curBgName = this.resource.bg_image;
        var curMapName = this.resource.tile_map;
        var curMoney = parseInt(this.levelInfo.sum_money);
        var curLevelPlist = this.levelInfo.curlevel;
        var nextLevelPlist = this.levelInfo.nextlevel;
        var group = this.levelInfo.level_group;

        var groupNum = 0;
        for (var i in group) {
            groupNum++;
        }

        instance.curBgName = curBgName;
        instance.curMapName = curMapName;
        instance.curMoney = curMoney;
        instance.curLevelFile = curLevelPlist;
        instance.nextLevelFile = nextLevelPlist;
        instance.groupNum = groupNum;

        //创建敌人
        for (var i = 0; i < groupNum; i++) {
            var enemyInfo = group[i + 1 + ""];
            var enemy1Num = parseInt(enemyInfo.type_1_num);

            var enemy1Hp = parseInt(enemyInfo.type_1_hp);
            var enemy2Num = parseInt(enemyInfo.type_2_num);
            var enemy2Hp = parseInt(enemyInfo.type_2_hp);
            var enemy3Num = parseInt(enemyInfo.type_3_num);
            var enemy3Hp = parseInt(enemyInfo.type_3_hp);

            var groupEnemy = new EnemyGroup(enemy1Num, enemy1Hp, enemy2Num, enemy2Hp, enemy3Num, enemy3Hp);
            instance.groupArray.push(groupEnemy);

            trace("======== 加载敌人信息=========");
            trace("enemy1Num", enemy1Num);
            trace("enemy1Hp", enemy1Hp);
            trace("enemy2Num", enemy2Num);
            trace("enemy2Hp", enemy2Hp);
            trace("enemy3Num", enemy3Num);
            trace("enemy3Hp", enemy3Hp);
        }

        trace("======== 加载配置=========");
        trace("curBgName", curBgName);
        trace("curMapName", curMapName);
        trace("curMoney", curMoney);
        trace("curLevelPlist", curLevelPlist);
        trace("nextLevelPlist", nextLevelPlist);
        trace("groupNum", groupNum);

    }
});