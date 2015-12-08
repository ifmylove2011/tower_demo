var res = {
    Global_Bg_png: "res/global_bg.png",
    Global_Bg_Star_Shower_png:"res/bg_star_shower.png",
    Menu_Main_Start_png: "res/menu_main_start.png",
    Mini_Xingkai_CH_fnt: "res/font/mini_CH.fnt",
    Game_Title_png: "res/game_title.png",

    Choose_Stage_plist: "res/choose_stage.plist",
    Choose_Stage_png: "res/choose_stage.png",

    Level_Panel_plist: "res/level_panel.plist",
    Level_Panel_png: "res/level_panel.png",

    GamePlay_Info_plist: "res/GamePlay_Info.plist",
    GamePlay_Info_png: "res/GamePlay_Info.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

g_resources.push("res/level/level_info_0.plist");
g_resources.push("res/map/map_0.tmx");
g_resources.push("res/map/map_1.tmx");
g_resources.push("res/map/tiles.png");
g_resources.push("res/map/tiles_40dpi.png");
