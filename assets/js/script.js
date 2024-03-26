let x = 0;
let y = 0;
let image = document.querySelector("img");
let imageBouton = document.querySelector("clique");
let score = 0;
let affScore = document.querySelector(`#score`);
let loop;
let totalSecondes = 12;
let affTime = document.querySelector("#temps");
let audio = new Audio("./assets/sounds/miaou.wav");

timer();
//Fonction du jeu
function gagne(element) {
  if (totalSecondes == 0) {
    affScore.innerHTML = `Votre score est de ${score}`;
  } else {
    audio.play();
    console.log(element);
    score++;
    x = randomize(0, 100);
    y = randomize(0, 100);
    image.style.top = x + "%";
    image.style.left = y + "%";
    rapid();
    console.log(score);
    affScore.innerHTML = `Votre score est de ${score}`;
  }
}

//Deplacement de l'image
function niveau(vitesse) {
  console.log((vitesse * 0.2) / 1000);
  image.style.transition = `${(vitesse * 0.2) / 1000}s`;
  clearInterval(loop);
  loop = setInterval(() => {
    x = randomize(0, 85);
    y = randomize(0, 85);
    image.style.top = x + "%";
    image.style.left = y + "%";
  }, vitesse);
}
niveau(1000);

//Vitesse de deplacement de l'image en fonction du score
function rapid() {
  if (score >= 3 && score <= 5) {
    niveau(800);
  } else if (score >= 6 && score <= 9) {
    niveau(600);
  } else if (score >= 10 && score <= 14) {
    niveau(400);
  } else if (score >= 15 && score <= 19) {
    niveau(200);
  } else if (score >= 20 && score <= 25) {
    niveau(100);
  }
}

//Chrono
function timer() {
  let timerInterval = setInterval(() => {
    totalSecondes--;
    document.querySelector("#temps").textContent = totalSecondes;
    affTime.innerHTML = `Temps ${totalSecondes}`;
    if (totalSecondes === 0) {
      clearInterval(timerInterval);
      clearInterval(loop);
      document.querySelector("#rejoue").classList.remove("hidden");
      document.querySelector(".jeu").classList.add("hidden");
      document.querySelector("#intro").classList.add("hidden");
    }
  }, 1000);
}

//Rejouer le jeu
function playAgain() {
  score = 0;
  totalSecondes = 120;
  affScore.innerHTML = score;
  affTime.innerHTML = totalSecondes;
  timer();
  document.querySelector(".jeu").classList.remove("hidden");
  document.querySelector("#rejoue").classList.add("hidden");
  document.querySelector("#intro").classList.remove("hidden");
  clearInterval(loop);
  niveau(1000);
}

function randomize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
