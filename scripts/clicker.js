// attente du chargement du DOM
window.addEventListener("DOMContentLoaded", function () {
  /////////////////////////////////////////
  //   récupération des éléments
  // Score
  let scoreSection = document.querySelector("#score");
  let score = document.querySelector("#scoreValue");
  let idle = document.querySelector("#scoreIdle");
  let multiplicateur = document.querySelector("#scoreMultiplier");

  // Clicker
  let clickerSection = document.querySelector("#clicker");
  let clicker = document.querySelector("#clickerButton");

  // Shop
  let shopSection = document.querySelector("#shop");
  let names = document.querySelectorAll(".name");
  let costs = document.querySelectorAll(".cost");
  let gains = document.querySelectorAll(".gain");

  // Reset et déconnexion
  const btnReset = document.querySelector("#reset");
  const btnDisconnect = document.querySelector("#deco");
  /////////////////////////////////////////

  /////////////////////////////////////////
  //   création des fonctions
  // Fonction d'incrémentation du score au click
  function incrementScore() {
    score.textContent =
      parseInt(score.textContent) + parseInt(multiplicateur.textContent);
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
    localStorage.setItem("multiplier", multiplicateur.textContent);
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

    // récupération du multiplicateur en transformant en int
    multiplicateur.innerHTML = parseInt(localStorage.getItem("multiplier"));
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
    let shopItems = JSON.parse(localStorage.getItem("shop"));
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

  // fonction d'achat du multiplicateur
  function buyMultiplier(btn) {
    // récupération du multiplicateur
    let multiplier = btn.parentNode;
    // récupération du prix du multiplicateur
    let price = multiplier.querySelector(".cost").innerHTML;
    // transformation du prix en int
    price = parseInt(price);
    // transformation du score en int
    let coin = parseInt(score.textContent);
    // vérification du score
    if (coin >= price) {
      // décrémentation du score
      score.textContent -= price;
      // récupération du gain de score passif
      let gain = multiplier.querySelector(".gain").innerHTML;
      // incrémentation du multiplicateur
      gain = parseInt(gain);
      multiplicateur.innerHTML = gain;
      // incrémentation du prix du multiplicateur
      price = parseInt(price) * 2;
      multiplier.querySelector(".cost").innerHTML = price;
      // incrémentation du gain de score passif
      gain = gain + 1;
      multiplier.querySelector(".gain").innerHTML = gain;
      // sauvegarde du score et du shop
      saveScore();
      saveShop();
    } else {
      alert("Pas assez de fragments !");
    }
  }

  // Fonction de reset du score
  function resetScore() {
    localStorage.clear();
    score.innerHTML = 0;
    idle.innerHTML = 0;
    multiplicateur.innerHTML = 1;
  }

  // Fonction de sauvegarde du score dans la bdd lorsque le bouton de déconexion est cliqué
  function saveScoreBdd() {
    let scoreValue = score.textContent;
    let idleValue = idle.textContent;
    let multiplierValue = multiplicateur.textContent;

    let data = new FormData();
    data.append("score", scoreValue);
    data.append("idle", idleValue);
    data.append("multiplier", multiplierValue);

    if (localStorage.getItem("shop") !== null) {
      let shopValue = localStorage.getItem("shop");
      data.append("shop", shopValue);
    }
    data.append("save", "ok");
    // fetch vers la page compte.php
    fetch("compte.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.text())
      .then((result) => {
        // trim
        result = result.trim();
        // si le résultat est "ok" alors on supprime le local storage et on redirige vers l'index avec un get "deconnexion=true"
        if (result == "ok") {
          localStorage.clear();
          window.location.href = "index.php?deconnexion=true";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Fonction de chargement du score depuis la bdd
  function loadScoreBdd() {
    // fetch vers compte.php en get
    fetch("compte.php?col=shop")
      .then((response) => response.json())
      .then((result) => {
        // récupération de chaque colonne
        let scoreValue = result.score;
        let idleValue = result.idle;
        let multiplierValue = result.multiplier;
        let shopValue = result.shop;
        // mise de ces valeurs dans le local storage si elles sont bien défini
        if (scoreValue !== null) {
          if (shopValue !== null) {
            localStorage.setItem("score", scoreValue);
            localStorage.setItem("idle", idleValue);
            localStorage.setItem("multiplier", multiplierValue);
            localStorage.setItem("shop", shopValue);
            loadScore();
            loadShop();
          } else {
            localStorage.setItem("score", scoreValue);
            localStorage.setItem("idle", idleValue);
            localStorage.setItem("multiplier", multiplierValue);
            loadScore();
          }
          // lancement de la fonction loadScore
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  /////////////////////////////////////////

  /////////////////////////////////////////
  //   Fonctions au démarrage et toutes les secondes

  // chargement de la partie
  loadScoreBdd();

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
    if (e.target.classList.contains("buyMultiplier")) {
      buyMultiplier(e.target);
    }
  });

  // click sur le bouton reset
  btnReset.addEventListener("click", function (e) {
    // fetch vers compte.php en get
    fetch("compte.php?reset=ok")
      .then((response) => response.text())
      .then((result) => {
        // trim
        result = result.trim();
        if (result == "ok") {
          resetScore();
          // rechargement de page pour la boutique
          location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  // click sur le bouton de déconnexion
  btnDisconnect.addEventListener("click", function (e) {
    console.log("click");
    saveScoreBdd();
  });

  /////////////////////////////////////////
});
