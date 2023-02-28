<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clicker</title>
    <link rel="stylesheet" href="site.css">
    <link rel="icon" type="images/png" sizes="64x64" href="img/Logo_onglet.png" />
    <script src="scripts/jquery-3.6.3.min.js"></script>
    <script src="scripts/clicker.js"></script>
</head>

<body id="pageClicker">

    <!-- Header -->
    <?php
    // class include
    require_once 'class/User.php';
    // instance
    session_start();
    $user = new User();
    // if not connected go to index.php
    if (!$user->isConnected()) {
        header('Location: index.php');
    }
    require_once 'includes/header.php';
    ?>
    <!-- /Header -->

    <!-- Main -->
    <main>
        <section class="centrage">
            <button id="deco">Déconnexion</button>
            <section id="score">
                <!-- partie multiplicateur -->
                <p>Multiplicateur : &times;<span id="scoreMultiplier">1</span></p>
                <p>Fragments : <span id="scoreValue">0</span></p>
                <p>Mineurs: <span id="scoreIdle">0</span>/s</p>
            </section>
            <section id="clicker">
                <button id="clickerButton"><img src="img/asteroid.png" alt=""></button>
            </section>
            <section id="shop">
                <!-- section multiplicateur -->
                <section class="shopItem">
                    <h3 class="name">Multiplicateur</h3>
                    <p>Coût : <span class="cost">10</span></p>
                    <p>Gain : &times;<span class="gain">2</span></p>
                    <button class="buyMultiplier">Acheter</button>
                </section>
                <!-- section mineur -->
                <section class="shopItem">
                    <h3 class="name">Mineur (pioche)</h3>
                    <p>Coût : <span class="cost">10</span></p>
                    <p>Gain : <span class="gain">1</span>/s</p>
                    <button class="buy">Acheter</button>
                </section>
                <section class="shopItem">
                    <h3 class="name">Mineur (marteau-piqueur)</h3>
                    <p>Coût : <span class="cost">100</span></p>
                    <p>Gain : <span class="gain">3</span>/s</p>
                    <button class="buy">Acheter</button>
                </section>
                <section class="shopItem">
                    <h3 class="name">Mineur (foreuse individuelle)</h3>
                    <p>Coût : <span class="cost">1000</span></p>
                    <p>Gain : <span class="gain">15</span>/s</p>
                    <button class="buy">Acheter</button>
                </section>
                <section class="shopItem">
                    <h3 class="name">Foreuse (fer)</h3>
                    <p>Coût : <span class="cost">10000</span></p>
                    <p>Gain : <span class="gain">50</span>/s</p>
                    <button class="buy">Acheter</button>
                </section>
                <section class="shopItem">
                    <h3 class="name">Foreuse (carbonne)</h3>
                    <p>Coût : <span class="cost">100000</span></p>
                    <p>Gain : <span class="gain">100</span>/s</p>
                    <button class="buy">Acheter</button>
                </section>
                <section class="shopItem">
                    <h3 class="name">Foreuse (diamant)</h3>
                    <p>Coût : <span class="cost">1000000</span></p>
                    <p>Gain : <span class="gain">500</span>/s</p>
                    <button class="buy">Acheter</button>
                </section>
            </section>
            <button id="reset">reset</button>
        </section>
    </main>
    <!-- /Main -->

    <!-- Footer -->
    <?php require_once 'includes/footer.php'; ?>
    <!-- /Footer -->

</body>

</html>