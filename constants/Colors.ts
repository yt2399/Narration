//彩色
const tintColorLight = "#2f95dc";
//纯白黑暗模式高亮区域
const tintColorDark = "#fff";

//二级背景色
const secondaryDark = "#111111";
const secondaryLight = "#f9f9f9";

//三级背景色
const threeLevelDark = "#282828";
const threeLevelLight = "#f8f9fa";
export default {
  light: {
    text: "#000",
    background: "#fff",
    secondaryBack: secondaryLight,
    threeLevelBack: threeLevelLight,
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    line:"#f6f6f6"
  },
  dark: {
    text: "#fff",
    background: "#000",
    secondaryBack: secondaryDark,
    threeLevelBack: threeLevelDark,
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    line:"#242424"
  },
  emojiDark: {
    backdrop: "#16161888",
    knob: "#766dfc",
    container: "#282829",
    header: "#fff",
    skinTonesContainer: "#252427",
    category: {
      icon: "#766dfc",
      iconActive: "#fff",
      container: "#252427",
      containerActive: "#766dfc",
    },
  },
};
