"use strict";
let r;
let g;
let b;

let mode;

let answer;

const firstRow = `
<div id="s1" class="square rounded"></div>
<div id="s2" class="square rounded"></div>
<div id="s3" class="square rounded"></div>
`;
const secondRow = `
<div id="s4" class="square rounded"></div>
<div id="s5" class="square rounded"></div>
<div id="s6" class="square rounded"></div>
`;

const cont = $("#cont");
const easyBtn = $("#easy-btn");
const hardBtn = $("#hard-btn");
const again = $("#again");
const header = $("#header");

const randomNumber = (n) => {
  return Math.floor(Math.random() * n);
};

const showColorNum = () => {
  r = randomNumber(256);
  g = randomNumber(256);
  b = randomNumber(256);
  $("#color-numbers").text(`RGB (${r}, ${g}, ${b})`);
};

const easyAndHard = (rows) => {
  answer = randomNumber(rows) + 1;
  $(`#s${answer}`).css("background-color", `rgb(${r}, ${g}, ${b})`);

  for (let s = 1; s < rows + 1; s++) {
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

const hardMode = () => {
  mode = "hard";

  showColorNum();

  cont.empty();
  cont.prepend(firstRow);
  cont.append(secondRow);

  easyBtn.removeClass("btn-primary disabled");
  hardBtn.removeClass("btn-outline-primary");
  easyBtn.addClass("btn-outline-primary");
  hardBtn.addClass("btn-primary disabled");

  easyAndHard(6);
};

const easyMode = () => {
  mode = "easy";

  showColorNum();

  cont.empty();
  cont.prepend(firstRow);

  easyBtn.removeClass("btn-outline-primary");
  hardBtn.removeClass("btn-primary disabled");
  easyBtn.addClass("btn-primary disabled");
  hardBtn.addClass("btn-outline-primary");

  easyAndHard(3);
};

//Events
$("#new-colors").click(() => {
  header.addClass("bg-primary");

  $(".square").removeClass("pe-none");

  again.fadeOut("slow", () => {
    again.empty();
    again.text("Try Again!");
    again.removeClass("btn-success");
    again.addClass("bg-danger");
  });

  switch (mode) {
    case "easy":
      hardBtn.removeClass("pe-none");
      easyMode();
      break;

    case "hard":
      easyBtn.removeClass("pe-none");
      hardMode();
      break;
    default:
      break;
  }
});

easyBtn.click(() => {
  header.addClass("bg-primary");
  easyMode();
});
hardBtn.click(() => {
  header.addClass("bg-primary");
  hardMode();
});

$("body").on("click", ".square", () => {
  const id = event.target.id;
  if (id === `s${answer}`) {
    const winEvent = (num) => {
      for (let s = 1; s < num + 1; s++) {
        if (s === answer) {
          continue;
        }

        $(`#s${s}`).css("background-color", `rgb(${r}, ${g}, ${b})`);
        $(`#s${s}`).fadeIn("slow");
      }

      again.removeClass("bg-danger");
      again.addClass("btn-success");
      again.empty();
      again.text("Correct!");
      again.fadeIn("slow");

      header.removeClass("bg-primary");
      header.css("background-color", `rgb(${r}, ${g}, ${b})`);

      $(".square").addClass("pe-none");
    };

    switch (mode) {
      case "easy":
        winEvent(3);
        hardBtn.addClass("pe-none");
        break;
      case "hard":
        winEvent(6);
        easyBtn.addClass("pe-none");
        break;
      default:
        break;
    }
  } else {
    again.fadeIn(0);
    again.fadeOut("slow");
    $(`#${id}`).fadeOut("slow");
  }
});

//Code that run at the beginning
again.fadeOut(0);
hardMode();
