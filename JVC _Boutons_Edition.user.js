// ==UserScript==
// @name         JV.com : Boutons d'édition au dessus de la zone de texte
// @namespace    https://www.jeuxvideo.com/
// @version      2.3
// @description  Place et centre la barre d'édition au dessus de la zone de texte
// @author       ChatGPT, Newgoblin2, StrangerFruit, Shiho-Miyano (fix du bouton risibank + passage du code en CSS, grand merci à lui pour son aide, la majorité du code est de lui désormais)
// @match        https://www.jeuxvideo.com/forums/*
// @match        https://www.jeuxvideo.com/messages-prives/*
// @icon         https://www.jeuxvideo.com/favicon.ico
// @license      MIT
// @grant        none
// @downloadURL  https://github.com/VayneHunters/jvc_boutons_edition/raw/main/JVC%20_Boutons_Edition.user.js
// @updateURL    https://github.com/VayneHunters/jvc_boutons_edition/raw/main/JVC%20_Boutons_Edition.user.js
// @run-at       document-start
// ==/UserScript==




function moveButtonsEditor() {
    const styleboutonlayout = document.createElement('style');
    styleboutonlayout.id = 'fix-message-editor-style';
    styleboutonlayout.type = 'text/css';
    styleboutonlayout.innerHTML = `
    /*Definir en grid pour l'ordre*/
    .messageEditor__containerEdit {
        display: grid
    }

    /*Switch Barre bas CSS*/
    .messageEditor__buttonEdit {
        border-top: none;
        border-bottom: 0.0625rem solid var(--jv-border-color);
        order: 1;
    }

    /*Switch bloc en bas*/
    #message_topic,
    #message {
        order: 2;
    }

    /* Centrage */
    .messageEditor__buttonEdit .buttonsEditor {
        margin: auto;
        width: fit-content;
    }
    `;
    document.head.appendChild(styleboutonlayout);
}


moveButtonsEditor();
