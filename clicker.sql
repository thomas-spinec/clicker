-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 28 fév. 2023 à 15:27
-- Version du serveur : 10.6.11-MariaDB-0ubuntu0.22.04.1
-- Version de PHP : 8.1.2-1ubuntu2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `clicker`
--

-- --------------------------------------------------------

--
-- Structure de la table `comptes`
--

CREATE TABLE `comptes` (
  `id` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `idle` int(11) DEFAULT NULL,
  `multiplier` int(11) DEFAULT NULL,
  `shop` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `id_utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comptes`
--

INSERT INTO `comptes` (`id`, `score`, `idle`, `multiplier`, `shop`, `id_utilisateur`) VALUES
(1, 66, 1, 1, '{\"0\":{\"name\":\"Multiplicateur\",\"prix\":\"10\",\"gain\":\"2\"},\"1\":{\"name\":\"Mineur (pioche)\",\"prix\":\"12\",\"gain\":\"1.15\"},\"2\":{\"name\":\"Mineur (marteau-piqueur)\",\"prix\":\"100\",\"gain\":\"3\"},\"3\":{\"name\":\"Mineur (foreuse individuelle)\",\"prix\":\"1000\",\"gain\":\"15\"},\"4\":{\"name\":\"Foreuse (fer)\",\"prix\":\"10000\",\"gain\":\"50\"},\"5\":{\"name\":\"Foreuse (carbonne)\",\"prix\":\"100000\",\"gain\":\"100\"},\"6\":{\"name\":\"Foreuse (diamant)\",\"prix\":\"1000000\",\"gain\":\"500\"}}', 5),
(2, 22, 1, 3, '{\"0\":{\"name\":\"Multiplicateur\",\"prix\":\"40\",\"gain\":\"4\"},\"1\":{\"name\":\"Mineur (pioche)\",\"prix\":\"12\",\"gain\":\"1.15\"},\"2\":{\"name\":\"Mineur (marteau-piqueur)\",\"prix\":\"100\",\"gain\":\"3\"},\"3\":{\"name\":\"Mineur (foreuse individuelle)\",\"prix\":\"1000\",\"gain\":\"15\"},\"4\":{\"name\":\"Foreuse (fer)\",\"prix\":\"10000\",\"gain\":\"50\"},\"5\":{\"name\":\"Foreuse (carbonne)\",\"prix\":\"100000\",\"gain\":\"100\"},\"6\":{\"name\":\"Foreuse (diamant)\",\"prix\":\"1000000\",\"gain\":\"500\"}}', 6),
(3, 0, 0, 1, '', 7);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `login`, `password`) VALUES
(5, 'Tom', '$2y$10$2RBXiuqzxBbGkdpI5.JQleGFz2OfrfT2BYcP0pyDe.FgLIwGV9Rqi'),
(6, 'meyze', '$2y$10$t5KZHwR5vkBE4BkfDG3ld./kMWgQYjVx3mfKR7nQqAQ5IGT/47xn2'),
(7, 'test', '$2y$10$CeredpWRsEi6nwsNup71.OoSN7xGL2vLkog2G0AncR7iK5P1yHSzu');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comptes`
--
ALTER TABLE `comptes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Delete` (`id_utilisateur`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comptes`
--
ALTER TABLE `comptes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comptes`
--
ALTER TABLE `comptes`
  ADD CONSTRAINT `Delete` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
