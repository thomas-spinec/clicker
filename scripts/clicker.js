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
  let names = document.querySelectorAll(".name");
  let costs = document.querySelectorAll(".cost");
  let gains = document.querySelectorAll(".gain");
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
    // récupération du score passif en transformant en int et en arrondissant à 2 chiffres après la virgule
    // gain.toFixed(2)
    let temp = parseFloat(localStorage.getItem("idle"));

    idle.innerHTML = temp.toFixed(2);
  }

  // Fonction de stockage du shop en local storage (en json)
  function saveShop() {
    let items = {};

    //boucle permettant de sauvegarder chaque item (avec pour clés "name", "prix", "gain") et de les mettres dans items
    for (let i = 0; i < names.length; i++) {
      let name = names[i].textContent;
      let cost = costs[i].textContent;
      let gain = gains[i].textContent;

      let item = {};
      item.name = name;
      item.prix = cost;
      item.gain = gain;

      items[i] = item;
    }
    localStorage.setItem("shop", JSON.stringify(items));
  }

  // Fonction de chargement du shop en local storage (en json)
  function loadShop() {
    let shopItems = document.querySelectorAll(".shopItem");
    shopItems = JSON.parse(localStorage.getItem("shop"));
    // boucle permettant de charger chaque item
    for (let i = 0; i < names.length; i++) {
      names[i].textContent = shopItems[i].name;
      costs[i].textContent = shopItems[i].prix;
      gains[i].textContent = shopItems[i].gain;
    }
  }

  // Fonction d'achat d'un item
  function buyItem(btn) {
    // récupération de l'item
    let item = btn.parentNode;
    // récupération du prix de l'item
    let price = item.querySelector(".cost").innerHTML;
    // transformation du prix en int
    price = parseInt(price);
    // transformation du score en int
    let coin = parseInt(score.textContent);
    // vérification du score
    if (coin >= price) {
      // décrémentation du score
      score.textContent -= price;
      // récupération du gain de score passif
      let gain = item.querySelector(".gain").innerHTML;
      // incrémentation du score passif
      gain = parseFloat(gain);
      idle.innerHTML = parseInt(idle.innerHTML) + parseFloat(gain.toFixed(2));
      // incrémentation du prix de l'item
      price = parseInt(price) * 1.15;
      item.querySelector(".cost").innerHTML = Math.round(price);
      // incrémentation du gain de score passif
      gain = gain * 1.15;
      item.querySelector(".gain").innerHTML = gain.toFixed(2);

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
    clicker.classList.toggle("anim");
    setTimeout(function () {
      clicker.classList.toggle("anim");
    }, 100);
  });

  // click sur un item du shop, lancement de la fonction si le target possède la classe "buy"
  shopSection.addEventListener("click", function (e) {
    if (e.target.classList.contains("buy")) {
      buyItem(e.target);
    }
  });
  /////////////////////////////////////////
});
