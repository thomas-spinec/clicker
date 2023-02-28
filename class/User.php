<?php
// Création de la classe

class User
{
    /* Propriétés */
    private $id;
    private $login;
    private $password;
    private $bdd;

    /* Constructeur */
    public function __construct()
    {
        // connection à la BDD avec PDO
        // en local ////////////////////
        $servername = 'localhost';
        $dbname = 'clicker';
        $db_username = 'root';
        $db_password = '';

        // en ligne ///////////////////
        // $servername = 'localhost';
        // $dbname = 'thomas-spinec_clicker';
        // $db_username = 'adminbdd';
        // $db_password = 'basededonnees';


        // essaie de connexion
        try {
            $this->bdd = new PDO("mysql:host=$servername;dbname=$dbname; charset=utf8", $db_username, $db_password);

            // On définit le mode d'erreur de PDO sur Exception
            $this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Connexion réussie"; 
            $this->bdd->exec("set names utf8");
        }
        // si erreur, on capture les exceptions, s'il y en a une on affiche les infos
        catch (PDOException $e) {
            echo "Echec de la connexion : " . $e->getMessage();
            exit;
        }


        // Vérification de la connexion (profil)
        if (isset($_SESSION['user'])) {
            $this->id = $_SESSION['user']['id'];
            $this->login = $_SESSION['user']['login'];
            $this->password = $_SESSION['user']['password'];
        }
    }

    /* Getter */
    public function getId()
    {
        return $this->id;
    }

    public function getLogin()
    {
        return $this->login;
    }

    /* Méthodes */
    // Enregistrement
    public function register($login, $password)
    {

        // htmlspecialchars pour les paramètres
        $login = htmlspecialchars($login);
        $password = htmlspecialchars($password);
        $password = password_hash($password, PASSWORD_DEFAULT);

        // requête pour ajouter l'utilisateur dans la base de données
        $requete = "INSERT INTO utilisateurs (login, password) VALUES (:login, :password)";

        // préparation de la requête
        $insert = $this->bdd->prepare($requete);

        // exécution de la requête avec liaison des paramètres

        $insert->execute(array(
            ':login' => $login,
            ':password' => $password,
        ));

        // création de la ligne correspondante dans la table comptes
        $requete = "INSERT INTO comptes (id_utilisateur) VALUES (:id_utilisateur)";

        // préparation de la requête
        $insert2 = $this->bdd->prepare($requete);

        // exécution de la requête avec liaison des paramètres
        $insert2->execute(array(
            ':id_utilisateur' => $this->bdd->lastInsertId(),
        ));


        echo "ok"; // inscription réussie

        // fermer la connexion
        $this->bdd = null;
    }

    // Connexion
    public function connect($login, $password)
    {

        // requête
        $requete = "SELECT * FROM utilisateurs where login = :login";

        // préparation de la requête
        $select = $this->bdd->prepare($requete);

        // htmlspecialchars pour les paramètres
        $login = htmlspecialchars($login);
        $password = htmlspecialchars($password);

        // récupération du mot de passe avec ASSOC
        $select->execute(array(':login' => $login));
        $fetch_assoc = $select->fetch(PDO::FETCH_ASSOC);
        $password_hash = $fetch_assoc['password'];

        if (password_verify($password, $password_hash)) {
            // récupération des données pour les attribuer aux attributs
            $this->id = $fetch_assoc['id'];
            $this->login = $fetch_assoc['login'];
            $this->password = $fetch_assoc['password'];

            $_SESSION['user'] = [
                'id' => $fetch_assoc['id'],
                'login' => $fetch_assoc['login'],
                'password' => $fetch_assoc['password'],
            ];
            // connexion réussie

            $error = "ok";
            echo $error;
        } else {
            $error = "incorrect";
            echo $error; // mot de passe incorrect
        }

        // fermer la connexion
        $this->bdd = null;
    }

    // Déconnexion
    public function disconnect()
    {
        // verifier la connexion
        if ($this->isConnected()) {
            // rendre les attributs null
            $this->id = null;
            $this->login = null;
            $this->password = null;

            // détruire la session
            session_unset();
            session_destroy();
        } else {
            $error = "Vous n'êtes pas connecté";
            return $error; // vous n'êtes pas connecté
        }
    }

    // Vérification de la connexion
    public function isConnected()
    {
        if ($this->id !== null && $this->login !== null && $this->password !== null) {
            return true; // utilisateur connecté
        } else {
            return false; // utilisateur non connecté
        }
    }

    // Utilisateur déjà existant?
    public function isUserExist($login)
    {
        // requête pour vérifier que le login choisi n'est pas déjà utilisé
        $requete = "SELECT * FROM utilisateurs where login = :login";

        // préparation de la requête
        $select = $this->bdd->prepare($requete);

        // htmlspecialchars pour les paramètres
        $login = htmlspecialchars($login);

        // exécution de la requête avec liaison des paramètres
        $select->execute(array(':login' => $login));

        // récupération du tableau
        $fetch_all = $select->fetchAll();

        if (count($fetch_all) === 0) { // login disponible
            $reponse = "dispo";
            echo $reponse; // login disponible
        } else {
            $reponse = "indispo";
            echo $reponse; // login indisponible
        }
    }

    // sauvegarde de la partie
    public function save($score, $idle, $multiplier, $shop)
    {
        $requete = "UPDATE comptes SET score = :score, idle = :idle, multiplier = :multiplier, shop = :shop WHERE id_utilisateur = :id";

        // préparation de la requête
        $update = $this->bdd->prepare($requete);

        // htmlspecialchars pour les paramètres
        $score = htmlspecialchars($score);
        $idle = htmlspecialchars($idle);
        $multiplier = htmlspecialchars($multiplier);
        $shop = htmlspecialchars($shop, ENT_NOQUOTES);

        // exécution de la requête avec liaison des paramètres
        $update->execute(array(
            ':score' => $score,
            ':idle' => $idle,
            ':multiplier' => $multiplier,
            ':shop' => $shop,
            ':id' => $this->id,
        ));

        // fermer la connexion
        $this->bdd = null;

        echo "ok"; // sauvegarde réussie
    }

    // récupération de la partie
    public function load()
    {
        // requête
        $requete = "SELECT * FROM comptes where id_utilisateur = :id";

        // préparation de la requête
        $select = $this->bdd->prepare($requete);

        // exécution de la requête avec liaison des paramètres
        $select->execute(array(':id' => $this->id));

        // récupération du tableau
        $fetch_assoc = $select->fetch(PDO::FETCH_ASSOC);

        // fermer la connexion
        $this->bdd = null;

        return $fetch_assoc;
    }

    // reset 
    public function reset()
    {
        // requête
        $requete = "UPDATE comptes SET score = null, idle = null, multiplier = null, shop = null WHERE id_utilisateur = :id";

        // préparation de la requête
        $update = $this->bdd->prepare($requete);

        // exécution de la requête avec liaison des paramètres
        $update->execute(array(':id' => $this->id));

        // fermer la connexion
        $this->bdd = null;

        echo "ok"; // reset réussi
    }
}
