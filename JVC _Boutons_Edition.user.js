// ==UserScript==
// @name         JV.com : Boutons d'édition au dessus de la zone de texte
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Place et centre la barre d'édition au dessus de la zone de texte
// @author       ChatGPT (Newgoblin2 JVC)
// @match        https://www.jeuxvideo.com/forums/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function moveAndCenterButtonsEditor() {
        const risibank = document.querySelector('#risibank-container');
        const buttonsEditor = document.querySelector('.buttonsEditor');

        if (!risibank || !buttonsEditor) return;

        // Déplacement
        risibank.parentNode.insertBefore(buttonsEditor, risibank.nextSibling);

        // Centrage via style inline
        buttonsEditor.style.margin = '10px auto';
        buttonsEditor.style.width = 'fit-content';
    }

    const observer = new MutationObserver(() => {
        if (document.querySelector('#risibank-container') && document.querySelector('.buttonsEditor')) {
            moveAndCenterButtonsEditor();
            observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
