/**
 * Created by XTER on 2015/12/2.
 * 大家好，我是GM
 */

var GameManager = (function () {

    function gameManager() {
        // 敌人只数
        this.enemyArray = [];
        // 敌人波数
        this.groupArray = [];
        // 弹药数
        this.bulletArray = [];
        // 移动点数
        this.pointArray = [];
        // 当前[背景]
        this.curBgName = "";
        // 当前[地图]
        this.curMapName = "";
        // 当前[金钱]
        this.curMoney = 0;
        // 当前[关卡]
        this.curLevel = 0;
        // 当前[血量]
        this.curHp = 10;
        // 多少波敌人
        this.groupNum = 0;
        // 当前配置文件
        this.curLevelFile = "";
        // 下一配置文件
        this.nextLevelFile = "";
        // 是否添加完毕
        this.isAddFinished = false;

        this.clear = function () {
            this.groupArray = [];
            this.enemyArray = [];
            this.bulletArray = [];
            this.pointArray = [];
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


        this.getPointArray = function () {
            return this.pointArray;
        };
        this.setPointArray = function (pointArray) {
            this.pointArray = pointArray;
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

    //实例容器
    var instance;

    var single = {
        name: 'GameManager',
        //获取实例的方法
        //返回Singleton的实例
        getInstance: function () {
            if (instance === undefined) {
                instance = new gameManager();
            }
            return instance;
        }
    };
    return single;
})();