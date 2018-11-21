// ==UserScript==
// @name         proper media controls
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  scroll for volume, click to pause
// @author       jauhc
// @match        *://*/*.webm
// @grant        none
// @run-at document-idle
// ==/UserScript==

(() => {
    'use strict';
    function MouseWheelHandler(e) {
        // cross-browser wheel delta
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        // scrolling audio adjusting
        var newVolume = vids[0].volume;
        var incrememe = 0.05;

        if (delta > 0 && (vids[0].volume + incrememe) < 1) {
            vids[0].volume += incrememe;
        } else if (delta < 0) {
            if (vids[0].volume - incrememe > 1 || vids[0].volume - incrememe < 0) { // out of bounds check because im bad at maths
                vids[0].volume = 0;
                return;
            }
            vids[0].volume -= incrememe;
        }
        return false;
    }

    var vids = document.getElementsByTagName('video');
    // currently only supports one per page because im too tired to care
    if (vids) {
        vids[0].addEventListener('click', () => {
            vids[0].paused ? vids[0].play() : vids[0].pause(); // holy shit
        }, false);
        vids[0].volume = 0.05; // default to 5% volume

        if (vids[0].addEventListener) {
            // IE9, Chrome, Safari, Opera
            vids[0].addEventListener("mousewheel", MouseWheelHandler, false);
            // Firefox
            vids[0].addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        }
        // IE 6/7/8
        else {
            vids[0].attachEvent("onmousewheel", MouseWheelHandler);
        }
    }
})();
