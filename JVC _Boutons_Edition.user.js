// ==UserScript==
// @name         JV.com : Boutons d'édition au dessus de la zone de texte
// @namespace    https://www.jeuxvideo.com/
// @version      2.2
// @description  Place et centre la barre d'édition au dessus de la zone de texte
// @author       ChatGPT, Newgoblin2, StrangerFruit, Shiho-Miyano
// @match        https://www.jeuxvideo.com/forums/*
// @match        https://www.jeuxvideo.com/messages-prives/*
// @icon         https://www.jeuxvideo.com/favicon.ico
// @license      MIT
// @grant        none
// @downloadURL  https://github.com/VayneHunters/jvc_boutons_edition/raw/main/JVC%20_Boutons_Edition.user.js
// @updateURL    https://github.com/VayneHunters/jvc_boutons_edition/raw/main/JVC%20_Boutons_Edition.user.js
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    let debounceTimer = null;

    function moveButtonsEditor() {
        //Remontage du bloc en entier Sinon on perd le bouton
        const buttonsEditor = document.querySelector('.messageEditor__buttonEdit');

        const buttonEdit = document.querySelector('.buttonsEditor');
        const risibank = document.querySelector('#risibank-container');

        //Detection_MP
        let textarea
        if (window.location.href.indexOf("jeuxvideo.com/messages-prives/") > -1) {
            textarea = document.querySelector('#message');
        } else {
            textarea = document.querySelector('#message_topic');
        }

        if (!buttonsEditor || !textarea) return;

        //Switch Barre bas CSS
        buttonsEditor.style.borderTop = 'none';
        buttonsEditor.style.borderBottom = '0.0625rem solid var(--jv-border-color)';

        // Centrage
        buttonEdit.style.margin = 'auto';
        buttonEdit.style.width = 'fit-content';

        // Vérifie si le déplacement est vraiment nécessaire
        const isUnderRisi = risibank && risibank.nextSibling === buttonsEditor;
        const isAboveTextarea = !risibank && textarea.previousSibling === buttonsEditor;

        if (isUnderRisi || isAboveTextarea) return;

        // Déplacement intelligent (sans remove, pour garder les boutons actifs)
        if (risibank && !isUnderRisi) {
            risibank.parentNode.insertBefore(buttonsEditor, risibank.nextSibling);
        } else if (!risibank && !isAboveTextarea) {
            textarea.parentNode.insertBefore(buttonsEditor, textarea);
        }
    }

    function debouncedMove() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            moveButtonsEditor();
        }, 200); // délai pour laisser RisiBank manipuler ses éléments avant
    }

    function init() {
        const editor = document.querySelector('.buttonsEditor');

        //Detection_MP
        let textarea
        if (window.location.href.indexOf("jeuxvideo.com/messages-prives/") > -1) {
            textarea = document.querySelector('#message');
        } else {
            textarea = document.querySelector('#message_topic');
        }

        if (!editor || !textarea) {
            setTimeout(init, 300);
            return;
        }

        moveButtonsEditor();

        // Observer les mutations DOM dans l'éditeur (notamment quand on clique sur le bouton RisiBank)
        let container
        if (window.location.href.indexOf("jeuxvideo.com/messages-prives/") > -1) {
            container = document.querySelector('.jv-editor')
        } else {
            container = document.querySelector('#forums-post-message-editor');
        }

        if (container) {
            const observer = new MutationObserver(debouncedMove);
            observer.observe(container, {
                childList: true,
                subtree: true,
            });
        }
    }

    init();
})();
