<?php
session_start();
// appel de la classe User
require_once 'class/User.php';
// instance de la classe User
$user = new User();

// sauvegarde de la partie
if (isset($_POST['save'])) {
    $score = (int)$_POST['score'];
    $idle = (int)$_POST['idle'];
    $multiplier = (int)$_POST['multiplier'];
    if (isset($_POST['shop'])) {
        $shop = $_POST['shop'];
    } else {
        $shop = null;
    }
    $user->save($score, $idle, $multiplier, $shop);
}

// récupération de la partie
if (isset($_GET['col'])) {
    $game = $user->load();
    echo json_encode($game);
}
