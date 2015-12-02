var res = {
    Global_Bg_png:"res/global_bg.png",
    Global_Bg_Grass_jpg:"res/global_bg_grass.jpg",
    Menu_Main_Start_png:"res/menu_main_start.png",
    Mini_Xingkai_CH_fnt:"res/font/mini_CH.fnt",
    Game_Title_png:"res/game_title.png",

    Choose_Stage_plist:"res/choose_stage.plist",
    Choose_Stage_png:"res/choose_stage.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

g_resources.push("res/level/level_info_0.plist");