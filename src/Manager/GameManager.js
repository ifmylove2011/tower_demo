/**
 * Created by XTER on 2015/12/2.
 * 大家好，我是GM
 */

var GameManager = (function () {

    function gameManager() {
        // 【敌人数量】数组
        this.enemyArray = [];
        // 【敌人波数】数组
        this.groupArray = [];
        // 【弹药数量】数组
        this.bulletArray = [];
        // 【移动点】数组
        this.posArray = [];
        // 当前【背景】
        this.curBgName = "";
        // 当前【地图】
        this.curMapName = "";
        // 当前【金钱】
        this.curMoney = 0;
        // 当前【关卡】
        this.curLevel = 0;
        // 当前【血量】
        this.curHp = 10;
        // 【敌人波数】
        this.groupNum = 0;
        // 当前【关卡配置】
        this.curLevelFile = "";
        // 下一【关卡配置】
        this.nextLevelFile = "";
        // 是否【加载完毕】
        this.isAddFinished = false;

        // 重置【游戏数据】
        this.clear = function () {
            this.groupArray = [];
            this.enemyArray = [];
            this.bulletArray = [];
            this.posArray = [];
        };

        this.getGroupArray = function () {
            return this.groupArray;
        };
        this.setGroupArray = function (groupArray) {
            this.groupVArray = groupArray;
        };

        this.getEnemyArray = function () {
            return this.enemyArray;
        };
        this.setEnemyArray = function (enemyArray) {
            this.enemyArray = enemyArray;
        };

        this.getBulletArray = function () {
            return this.bulletArray;
        };
        this.setBulletArray = function (bulletArray) {
            this.bulletArray = bulletArray;
        };


        this.getPosArray = function () {
            return this.posArray;
        };
        this.setPosArray = function (posArray) {
            this.posArray = posArray;
        };


        this.getCurBgName = function () {
            return this.curBgName;
        };
        this.setCurBgName = function (curBgName) {
            this.curBgName = curBgName;
        };

        this.getCurMapName = function () {
            return this.curMapName;
        };
        this.setCurMapName = function (curMapName) {
            this.curMapName = curMapName;
        };

        this.getCurMoney = function () {
            return this.curMoney;
        };
        this.setCurMoney = function (curMoney) {
            this.curMoney = curMoney;
        };

        this.getCurHp = function () {
            return this.curHp;
        };
        this.setCurHp = function (hp) {
            this.curHp = hp;
        };

        this.getGroupNum = function () {
            return this.groupNum;
        };
        this.setGroupNum = function (groupNum) {
            this.groupNum = groupNum;
        };

        this.getCurLevelFile = function () {
            return this.curLevelFile;
        };
        this.setCurLevelFile = function (curLevelFile) {
            this.curLevelFile = curLevelFile;
        };

        this.getNextLevelFile = function () {
            return this.nextLevelFile;
        };
        this.setNextLevelFile = function (nextLevelFile) {
            this.nextLevelFile = nextLevelFile;
        };

        this.getIsAddFinished = function () {
            return this.isAddFinished;
        };
        this.setIsAddFinished = function (isAddFinished) {
            this.isAddFinished = isAddFinished;
        };
        this.getCurLevel = function () {
            return this.curLevel;
        };
        this.setCurLevel = function (level) {
            this.curLevel = level;
        };
    }

    //使用单例模式管理
    var instance;

    var single = {
        name: 'GameManager',
        getInstance: function () {
            if (instance === undefined) {
                instance = new gameManager();
            }
            return instance;
        }
    };
    return single;
})();