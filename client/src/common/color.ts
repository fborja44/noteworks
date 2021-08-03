/* Color Code definitions
------------------------------------------------------------------------------*/
export const COLOR = {
  BLACK: "black",
  BLACK_HOVER: "#151515",
  WHITE: "white",
  WHITE_HOVER: "#ededed",
  GREY: "#b4b4b4",
  GREY_DARK: "#828282",
  RED: "#eb5757",
  RED_DARK: "#cf4242",
  ORANGE: "#f2994a",
  ORANGE_DARK: "#e98034",
  YELLOW: "#f2c94c",
  YELLOW_DARK: "#edac2f",
  GREEN: "#27ae60",
  GREEN_DARK: "#2b9843",
  BLUE: "#2f80ed",
  BLUE_DARK: "#2c62cd",
  PURPLE: "#bb6bd9",
  PURPLE_DARK: "#964cc3",
  PINK: "#f035a5",
  CYAN: "#31C6DA",
  LEMON: "#FAFF00",
  LIME: "#58D744",

  /* Light versions */
  GREY_LIGHT: "#D2D2D2",
  GREY_DARK_LIGHT: "#9F9F9F",
  RED_LIGHT: "#F66F6F",
  ORANGE_LIGHT: "#FFAE66",
  YELLOW_LIGHT: "#FFD965",
  GREEN_LIGHT: "#46CB7E",
  BLUE_LIGHT: "#4C98FE",
  PURPLE_LIGHT: "#D78CF3",
  PINK_LIGHT: "#FC62BE",
  CYAN_LIGHT: "#6DE4F4",
  LIME_LIGHT: "#8EF17E",
  LEMON_LIGHT: "#FDFF96",
};

  /**
   * TODO: Change subheader text colors for Lemon and Lime
   */
  /**
   * Function to determine alternate color.
   * @param color Primary color hex value
   * @returns Alternate color hex value
   */
export const findAltColor = (color: string) => {
  let color_light;
  switch (color) {
    case COLOR.RED:
      color_light = COLOR.RED_LIGHT;
      break;
    case COLOR.ORANGE:
      color_light = COLOR.ORANGE_LIGHT;
      break;
    case COLOR.YELLOW:
      color_light = COLOR.YELLOW_LIGHT;
      break;
    case COLOR.GREEN:
      color_light = COLOR.GREEN_LIGHT;
      break;
    case COLOR.BLUE:
      color_light = COLOR.BLUE_LIGHT;
      break;
    case COLOR.PURPLE:
      color_light = COLOR.PURPLE_LIGHT;
      break;
    case COLOR.PINK:
      color_light = COLOR.PINK_LIGHT;
      break;
    case COLOR.CYAN:
      color_light = COLOR.CYAN_LIGHT;
      break;
    case COLOR.LEMON:
      color_light = COLOR.LEMON_LIGHT;
      break;
    case COLOR.LIME:
      color_light = COLOR.LIME_LIGHT;
      break;
    case COLOR.GREY:
      color_light = COLOR.GREY_LIGHT;
      break;
    case COLOR.GREY_DARK:
      color_light = COLOR.GREY_DARK_LIGHT;
      break;
    default:
      color_light = COLOR.GREY_LIGHT;
      break;
  }
  return color_light;
};
