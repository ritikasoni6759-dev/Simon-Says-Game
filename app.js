let gameseq = [];
let userseq = [];
let btnArr = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highscore = 0;
let h2 = document.querySelector("h2");
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;
    levelup();
  }
});

function btnflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function usersflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelup() {
  userseq = [];
  level++;
  highscore = max(highscore, level);
  h2.innerText = `Level ${level}`;

  let random = Math.floor(Math.random() * 4);
  let rancol = btnArr[random];
  let rbtn = document.querySelector(`.${rancol}`);

  gameseq.push(rancol);
  console.log(gameseq);
  btnflash(rbtn);
}

function checkAns(idx) {
  if (userseq[idx] == gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> & Highest score is <b>${highscore}</b> <br>Press any key to start `;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    reset();
  }
}

function btnPress() {
  let button = this;
  usersflash(button);

  usercol = button.getAttribute("id");
  userseq.push(usercol);

  checkAns(userseq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (btn of allbtn) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}

function max(a, b) {
  if (a > b) return a;
  else return b;
}
