const hexRegEx = /^#[0-9a-f]{3,6}$/i;

/**
 * Checks if a given string is a valid hex code for color.
 * ex. #abc, #
 * @param string
 */
const isHex = function (string) {
    return hexRegEx.test(string);
};

module.exports = {
    hexRegEx,
    isHex
}