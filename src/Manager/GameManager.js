/**
 * Created by XTER on 2015/12/2.
 * ��Һã�����GM
 */

var GameManager = (function () {

    function gameManager() {
        // ����ֻ��
        this.enemyArray = [];
        // ���˲���
        this.groupArray = [];
        // ��ҩ��
        this.bulletArray = [];
        // �ƶ�����
        this.pointArray = [];
        // ��ǰ[����]
        this.curBgName = "";
        // ��ǰ[��ͼ]
        this.curMapName = "";
        // ��ǰ[��Ǯ]
        this.curMoney = 0;
        // ��ǰ[�ؿ�]
        this.curLevel = 0;
        // ��ǰ[Ѫ��]
        this.curHp = 10;
        // ���ٲ�����
        this.groupNum = 0;
        // ��ǰ�����ļ�
        this.curLevelFile = "";
        // ��һ�����ļ�
        this.nextLevelFile = "";
        // �Ƿ�������
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

    //ʵ������
    var instance;

    var single = {
        name: 'GameManager',
        //��ȡʵ���ķ���
        //����Singleton��ʵ��
        getInstance: function () {
            if (instance === undefined) {
                instance = new gameManager();
            }
            return instance;
        }
    };
    return single;
})();