// attente du chargement du DOM
window.addEventListener("DOMContentLoaded", function () {
  /////////////////////////////////////////
  //   récupération des éléments
  // Score
  let scoreSection = document.querySelector("#score");
  let score = document.querySelector("#scoreValue");
  let idle = document.querySelector("#scoreIdle");

  // Clicker
  let clickerSection = document.querySelector("#clicker");
  let clicker = document.querySelector("#clickerButton");

  // Shop
  let shopSection = document.querySelector("#shop");
  /////////////////////////////////////////

  /////////////////////////////////////////
  //   création des fonctions
  // Fonction d'incrémentation du score au click
  function incrementScore() {
    score.textContent = parseInt(score.textContent) + 1;
  }

  // Fonction d'incrémentation du score passif
  function incrementIdle() {
    score.textContent =
      parseInt(score.textContent) + parseInt(idle.textContent);
  }

  // Fonction de sauvegarde du score (passif et non) en local storage
  function saveScore() {
    localStorage.setItem("score", score.textContent);
    localStorage.setItem("idle", idle.textContent);
  }

  // Fonction de chargement du score (passif et non) en local storage
  function loadScore() {
    // récupération du score non passif en transformant en int et en arrondissant à l'entier
    let int = parseInt(localStorage.getItem("score"));
    score.innerHTML = Math.round(int);
    // récupération du score passif en transformant en int et en arrondissant au chiffre après la virgule
    idle.innerHTML = Math.round(parseInt(localStorage.getItem("idle")));
  }

  // Fonction de stockage du shop en local storage (en json)
  function saveShop() {
    localStorage.setItem("shop", JSON.stringify(shopSection));
  }

  // Fonction de chargement du shop en local storage (en json)
  function loadShop() {
    shopSection = JSON.parse(localStorage.getItem("shop"));
  }

  // Fonction d'achat d'un item
  function buyItem(score, btn) {
    // récupération de l'item
    let item = btn.parentNode;
    // récupération du prix de l'item
    let price = item.querySelector(".cost").innerHTML;
    // vérification du score
    if (score >= price) {
      // décrémentation du score
      score -= price;
      // récupération du gain de score passif
      let gain = item.querySelector(".gain").innerHTML;
      // incrémentation du score passif
      idle.innerHTML = parseInt(idle.innerHTML) + parseInt(gain);
      // incrémentation du prix de l'item
      price = parseInt(price) * 1.15;
      item.querySelector(".cost").innerHTML = Math.round(price);
      // incrémentation du gain de score passif
      gain = parseInt(gain) * 1.15;
      item.querySelector(".gain").innerHTML = Math.round(gain);

      // sauvegarde du score et du shop
      saveScore();
      saveShop();
    } else {
      alert("Pas assez de fragments !");
    }
  }

  /////////////////////////////////////////

  /////////////////////////////////////////
  //   Fonctions au démarrage et toutes les secondes

  // chargement du score s'il n'est pas vide
  if (localStorage.getItem("score") !== null) {
    loadScore();
  }
  // chargement du shop s'il n'est pas vide
  if (localStorage.getItem("shop") !== null) {
    loadShop();
  }
  // incrémentation du score passif toutes les secondes
  setInterval(incrementIdle, 1000);
  // sauvegarde du score toutes les secondes
  setInterval(saveScore, 1000);

  /////////////////////////////////////////

  /////////////////////////////////////////
  //   gestion des évènements
  // click sur le clicker
  clicker.addEventListener("click", function (e) {
    incrementScore();
  });
  // click sur un item du shop, lancement de la fonction si le target possède la classe "buy"
  shopSection.addEventListener("click", function (e) {
    if (e.target.classList.contains("buy")) {
      buyItem(score.innerHTML, e.target);
    }
  });
  /////////////////////////////////////////
});
