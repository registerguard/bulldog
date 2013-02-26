/**
 * @see https://gist.github.com/4704893
 */

/* rgne.ws/N9c4uV, @see rgne.ws/MuCQZI */
if (('ontouchstart' in window) || (window.DocumentTouch && (document instanceof DocumentTouch))) document.documentElement.className = document.documentElement.className.replace(/\bno-touch\b/,'touch');

/* rgne.ws/MuCQZI */
document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/,'js');