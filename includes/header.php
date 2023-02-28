<?php
// class include
require_once 'class/User.php';
// instance
$user = new User();
?>

<header>
    <div class="container">
        <div class="flex">
            <div id="left" class="ordi">
                <img src="img/Logo_onglet.png" alt="">
            </div>

            <?php
            // test si l'utilisateur est connecté
            if (isset($_GET['deconnexion'])) {
                if ($_GET['deconnexion'] == true) {
                    $user->disconnect();
                    header('Location: index.php');
                }
            } else if ($user->isConnected()) {
                $login = $user->getLogin();
            ?>
                <div id='center'>
                    <h3>Bonjour <?= $login ?></h3>
                </div>
            <?php
            } else {
            ?>
                <div id='center'>
                    <h3>Bienvenue sur space clicker</h3>
                </div>
            <?php
            }
            ?>
        </div>
    </div>
</header>