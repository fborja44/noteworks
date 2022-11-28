let hexRegEx = /^#[0-9a-f]{3,6}$/i;

/**
 * Checks if a given string is a valid hex code for color.
 * ex. #abc, #
 * @param string
 */
let isHex = function (string) {
    return hexRegEx.test(string);
};

console.log(isHex("#AAA"));

module.exports = {
    hexRegEx,
    isHex
}