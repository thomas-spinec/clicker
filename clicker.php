<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clicker</title>
    <link rel="stylesheet" href="site.css">
    <link rel="icon" type="images/png" sizes="64x64" href="img/Logo_onglet.png" />
    <script src="scripts/clicker.js"></script>
</head>

<body>

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
        <section id="score">
            <p>Fragments : <span id="scoreValue">0</span></p>
            <p>Mineurs: <span id="scoreIdle">0</span>/s</p>
        </section>
        <section id="clicker">
            <button id="clickerButton">Cliquez ici</button>
        </section>
        <section id="shop">
            <section class="shopItem">
                <h2 class="name">Mineur (pioche)</h2>
                <p>Coût : <span class="cost">10</span></p>
                <p>Gain : <span class="gain">1</span>/s</p>
                <button class="buy">Acheter</button>
            </section>
            <section class="shopItem">
                <h2 class="name">Mineur (marteau-piqueur)</h2>
                <p>Coût : <span class="cost">100</span></p>
                <p>Gain : <span class="gain">5</span>/s</p>
                <button class="buy">Acheter</button>
            </section>
            <section class="shopItem">
                <h2 class="name">Mineur (foreuse individuelle)</h2>
                <p>Coût : <span class="cost">1000</span></p>
                <p>Gain : <span class="gain">10</span>/s</p>
                <button class="buy">Acheter</button>
            </section>
            <section class="shopItem">
                <h2 class="name">Foreuse (trépan en fer)</h2>
                <p>Coût : <span class="cost">10000</span></p>
                <p>Gain : <span class="gain">50</span>/s</p>
                <button class="buy">Acheter</button>
            </section>
            <section class="shopItem">
                <h2 class="name">Foreuse (trépan fibre de carbonne)</h2>
                <p>Coût : <span class="cost">100000</span></p>
                <p>Gain : <span class="gain">100</span>/s</p>
                <button class="buy">Acheter</button>
            </section>
            <section class="shopItem">
                <h2 class="name">Foreuse (trépan en diamant)</h2>
                <p>Coût : <span class="cost">1000000</span></p>
                <p>Gain : <span class="gain">500</span>/s</p>
                <button class="buy">Acheter</button>
            </section>
        </section>
    </main>
    <!-- /Main -->

    <!-- Footer -->
    <?php require_once 'includes/footer.php'; ?>
    <!-- /Footer -->

</body>

</html>