/* Color Code definitions
------------------------------------------------------------------------------*/
export const COLOR = {
  BLACK: "black",
  BLACK_HOVER: "#151515",

  WHITE: "white",
  WHITE_HOVER: "#ededed",

  GREY: "#b4b4b4",
  GREY_LIGHT: "#D2D2D2",
  GREY_DARK: "#828282",
  GREY_DARK_DARK: "#6C6C6C",
  GREY_DARK_LIGHT: "#9F9F9F",

  RED: "#eb5757",
  RED_DARK: "#D83939",
  RED_LIGHT: "#F66F6F",

  ORANGE: "#f2994a",
  ORANGE_DARK: "#E47E34",
  ORANGE_LIGHT: "#FFAE66",

  YELLOW: "#f2c94c",
  YELLOW_DARK: "#F2AC42",
  YELLOW_LIGHT: "#FFD965",

  GREEN: "#27ae60",
  GREEN_DARK: "#238C66",
  GREEN_LIGHT: "#46CB7E",

  BLUE: "#2f80ed",
  BLUE_DARK: "#3564C0",
  BLUE_LIGHT: "#4C98FE",

  PURPLE: "#bb6bd9",
  PURPLE_DARK: "#AF2DC5",
  PURPLE_LIGHT: "#D78CF3",

  PINK: "#f035a5",
  PINK_DARK: "#C81A82",
  PINK_LIGHT: "#FC62BE",

  CYAN: "#31C6DA",
  CYAN_DARK: "#31A4C8",
  CYAN_LIGHT: "#6DE4F4",

  LEMON: "#FAFF00",
  LEMON_DARK: "#E2DA08",
  LEMON_LIGHT: "#FDFF96",

  LIME: "#58D744",
  LIME_DARK: "#41B02F",
  LIME_LIGHT: "#8EF17E",
};

/**
 * TODO: Change subheader text colors for Lemon and Lime
 */
/**
 * Function to determine alternate light color.
 * @param color Primary color hex value
 * @returns Alternate light color hex value
 */
export const findLightColor = (color: string) => {
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

/**
 * Function to determine alternate dark color.
 * @param color Primary color hex value
 * @returns Alternate dark color hex value
 */
export const findDarkColor = (color: string) => {
  let color_dark;
  switch (color) {
    case COLOR.RED:
      color_dark = COLOR.RED_DARK;
      break;
    case COLOR.ORANGE:
      color_dark = COLOR.ORANGE_DARK;
      break;
    case COLOR.YELLOW:
      color_dark = COLOR.YELLOW_DARK;
      break;
    case COLOR.GREEN:
      color_dark = COLOR.GREEN_DARK;
      break;
    case COLOR.BLUE:
      color_dark = COLOR.BLUE_DARK;
      break;
    case COLOR.PURPLE:
      color_dark = COLOR.PURPLE_DARK;
      break;
    case COLOR.PINK:
      color_dark = COLOR.PINK_DARK;
      break;
    case COLOR.CYAN:
      color_dark = COLOR.CYAN_DARK;
      break;
    case COLOR.LEMON:
      color_dark = COLOR.LEMON_DARK;
      break;
    case COLOR.LIME:
      color_dark = COLOR.LIME_DARK;
      break;
    case COLOR.GREY:
      color_dark = COLOR.GREY_DARK;
      break;
    case COLOR.GREY_DARK:
      color_dark = COLOR.GREY_DARK_DARK;
      break;
    default:
      color_dark = COLOR.GREY_DARK;
      break;
  }
  return color_dark;
};
