"use strict";
let r;
let g;
let b;

let mode;

const firstRow = `<div id="r1" class="row d-flex justify-content-center">
<div id="s1" class="square rounded"></div>
<div id="s2" class="square rounded"></div>
<div id="s3" class="square rounded"></div>
</div>`;
const secondRow = `<div id="r2" class="row d-flex justify-content-center">
<div id="s4" class="square rounded"></div>
<div id="s5" class="square rounded"></div>
<div id="s6" class="square rounded"></div>
</div>`;

const randomNumber = (n) => {
    return Math.floor(Math.random() * n);
};

const showColorNum = () => {
    r = randomNumber(256);
    g = randomNumber(256);
    b = randomNumber(256);
    $("#color-numbers").text(`RGB (${r}, ${g}, ${b})`);
};

const hardMode = () => {
    mode = "hard";

    showColorNum();

    $("#cont").prepend(firstRow);
    $("#cont").append(secondRow);

    const answer = randomNumber(6) + 1;
    $(`#s${answer}`).css("background-color", `rgb(${r}, ${g}, ${b})`);

    for (let s = 1; s < 7; s++) {
        if (s === answer) {
            continue;
        }

        const r2 = randomNumber(256);
        const g2 = randomNumber(256);
        const b2 = randomNumber(256);
        if (r === r2 && g === g2 && b === b2) {
            break;
        }
        $(`#s${s}`).css("background-color", `rgb(${r2}, ${g2}, ${b2})`);
    }
};

//Starts here

hardMode();

//jQuery
$("#new-colors").click(() => showColorNum());
