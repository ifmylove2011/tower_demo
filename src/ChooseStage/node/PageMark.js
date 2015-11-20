/**
 * Created by XTER on 2015/11/20.
 */

var PageMark = cc.Node.extend({
    normalImage:null,
    selectedImage:null,
    dir:null,
    count:null,
    space:null,
    ctor: function (data) {
        this._super();
        this.loadConfig(data);
        return true;
    },
    loadConfig:function(data){
        this.normalImage = data.normalImage;
        this.selectedImage= data.selectedImage;
        this.dir= data.dir||GC.DIR_HORIZONTAL;
        this.count= data.count;
        this.space=data.space;
    },
    init:function(){

    }
});