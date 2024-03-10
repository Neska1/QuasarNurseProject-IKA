-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 10 mars 2024 à 11:27
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nursecaredb`
--

-- --------------------------------------------------------

--
-- Structure de la table `bon_observation`
--

DROP TABLE IF EXISTS `bon_observation`;
CREATE TABLE IF NOT EXISTS `bon_observation` (
  `id_bon` int NOT NULL AUTO_INCREMENT,
  `note` int DEFAULT NULL,
  `commentaire` text,
  `id_prestation` int NOT NULL,
  `stagiaire` int NOT NULL,
  PRIMARY KEY (`id_bon`),
  UNIQUE KEY `Id_Prestation` (`id_prestation`),
  KEY `Id_Personnel` (`stagiaire`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `catalogue_prestation`
--

DROP TABLE IF EXISTS `catalogue_prestation`;
CREATE TABLE IF NOT EXISTS `catalogue_prestation` (
  `id_catalogue` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(200) DEFAULT NULL,
  `prix` decimal(15,2) DEFAULT NULL,
  `id_categorie` int NOT NULL,
  PRIMARY KEY (`id_catalogue`),
  KEY `Id_Categories_cat` (`id_categorie`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `catalogue_prestation`
--

INSERT INTO `catalogue_prestation` (`id_catalogue`, `libelle`, `prix`, `id_categorie`) VALUES
(1, 'Pose / retrait d’une attelle ', '15.00', 1),
(2, 'Nettoyage d’une plaie ', '12.00', 1),
(3, 'Changement d’un pansement', '17.00', 1),
(4, 'Remise en place d’une\r\narticulation', '13.00', 1),
(5, 'Toilette du patient', '22.00', 1),
(6, 'Prise de sang ', '19.00', 2),
(7, 'Prise d’échantillon buccal', '24.00', 2),
(8, 'Prise d’autres échantillons', '27.00', 2),
(9, 'Evaluation Sevrage Alcoolisme', '19.00', 3),
(10, 'Evaluation Sevrage Tabagisme', '19.00', 3),
(11, 'Evaluation Psychologique\r\nDépression', '19.00', 3),
(12, 'Evaluation Psychologique\r\nTroubles de l’alimentation', '19.00', 3);

-- --------------------------------------------------------

--
-- Structure de la table `categories_catalogue`
--

DROP TABLE IF EXISTS `categories_catalogue`;
CREATE TABLE IF NOT EXISTS `categories_catalogue` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories_catalogue`
--

INSERT INTO `categories_catalogue` (`id_categorie`, `libelle`) VALUES
(1, 'Actes de soin'),
(2, 'Actes d\'analyse'),
(3, 'Actes préventifs');

-- --------------------------------------------------------

--
-- Structure de la table `etat_intervention`
--

DROP TABLE IF EXISTS `etat_intervention`;
CREATE TABLE IF NOT EXISTS `etat_intervention` (
  `id_etat` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(100) NOT NULL,
  PRIMARY KEY (`id_etat`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `etat_intervention`
--

INSERT INTO `etat_intervention` (`id_etat`, `libelle`) VALUES
(1, 'A faire'),
(2, 'Terminé'),
(4, 'En attente');

-- --------------------------------------------------------

--
-- Structure de la table `intervention`
--

DROP TABLE IF EXISTS `intervention`;
CREATE TABLE IF NOT EXISTS `intervention` (
  `id_intervention` int NOT NULL AUTO_INCREMENT,
  `date_heure` datetime DEFAULT NULL,
  `id_facture` int DEFAULT NULL,
  `date_facturation` date DEFAULT NULL,
  `date_paiement` date DEFAULT NULL,
  `id_patient` int NOT NULL,
  `id_personnel` int DEFAULT NULL,
  `id_etat` int NOT NULL,
  `prevision` date DEFAULT NULL,
  PRIMARY KEY (`id_intervention`),
  KEY `Id_Patient` (`id_patient`),
  KEY `Id_Personnel` (`id_personnel`),
  KEY `fk_etat_intervention` (`id_etat`)
) ENGINE=MyISAM AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `intervention`
--

INSERT INTO `intervention` (`id_intervention`, `date_heure`, `id_facture`, `date_facturation`, `date_paiement`, `id_patient`, `id_personnel`, `id_etat`, `prevision`) VALUES
(116, '2024-03-09 22:03:02', NULL, NULL, NULL, 1, 1, 2, NULL),
(122, '2024-03-10 11:22:04', NULL, NULL, NULL, 1, 1, 1, NULL),
(121, '2024-03-10 11:21:36', NULL, NULL, NULL, 12, 1, 4, NULL),
(105, '2024-02-20 00:00:00', NULL, NULL, NULL, 1, 1, 2, NULL),
(104, '2024-02-29 00:00:00', NULL, NULL, NULL, 12, 1, 1, NULL),
(103, '2024-02-28 00:00:00', NULL, NULL, NULL, 48, 1, 1, NULL),
(119, '2024-03-10 00:25:10', NULL, NULL, NULL, 48, 1, 2, NULL),
(120, '2024-03-23 00:00:00', NULL, NULL, NULL, 2, 3, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `id_patient` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `date_naissance` date NOT NULL,
  `rue` varchar(250) NOT NULL,
  `ville` varchar(150) NOT NULL,
  `code_postal` varchar(20) NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id_patient`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`id_patient`, `nom`, `prenom`, `date_naissance`, `rue`, `ville`, `code_postal`, `email`) VALUES
(1, 'Rose', 'Emilie', '1940-02-03', '6 Rue Ampère', 'Labège', '31670', 'emilie@rose.fr'),
(2, 'Sanchez', 'Xavier', '1946-04-09', '36 Rte de Bayonne', 'Toulouse', '31000', ''),
(4, 'Rita', 'KA', '1985-05-07', '17 rue de la croix', 'Aubergenville', '78000', ''),
(48, 'Marcel', 'Boris', '2024-02-14', '89 Rue des Shtroumpf', 'Toulouse', '31000', ''),
(12, 'Mumtaz', 'Dajaj', '1956-03-07', '20 Rue Ampère', 'Labège', '31670', '');

-- --------------------------------------------------------

--
-- Structure de la table `personnel`
--

DROP TABLE IF EXISTS `personnel`;
CREATE TABLE IF NOT EXISTS `personnel` (
  `id_personnel` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(120) DEFAULT NULL,
  `prenom` varchar(120) DEFAULT NULL,
  `id_role` int NOT NULL,
  PRIMARY KEY (`id_personnel`),
  KEY `Id_Roles` (`id_role`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `personnel`
--

INSERT INTO `personnel` (`id_personnel`, `nom`, `prenom`, `id_role`) VALUES
(1, 'Rodriguez', 'Helene', 1),
(2, 'Thomson', 'Alexander George', 2),
(3, 'Cadbury', 'Tray', 1),
(4, 'Ikups', 'Naya', 3),
(5, 'Nably', 'Lucie', 1);

-- --------------------------------------------------------

--
-- Structure de la table `prestation`
--

DROP TABLE IF EXISTS `prestation`;
CREATE TABLE IF NOT EXISTS `prestation` (
  `id_prestation` int NOT NULL AUTO_INCREMENT,
  `id_intervention` int DEFAULT NULL,
  `id_catalogue` int NOT NULL,
  PRIMARY KEY (`id_prestation`),
  KEY `Id_Intervention` (`id_intervention`),
  KEY `Id_Catalogue` (`id_catalogue`)
) ENGINE=MyISAM AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `prestation`
--

INSERT INTO `prestation` (`id_prestation`, `id_intervention`, `id_catalogue`) VALUES
(57, 105, 11),
(56, 105, 5),
(55, 105, 4),
(54, 104, 3),
(53, 104, 2),
(52, 103, 8),
(73, 119, 9),
(77, 122, 9),
(69, 116, 9),
(76, 121, 5),
(72, 119, 8),
(75, 120, 5),
(74, 120, 8);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_role` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id_role`, `libelle`) VALUES
(1, 'soignant'),
(2, 'administrateur'),
(3, 'administration');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `email` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PasswordHash` varchar(80) DEFAULT NULL,
  `id_personnel` int DEFAULT NULL,
  PRIMARY KEY (`email`),
  KEY `Id_Personnel` (`id_personnel`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`email`, `PasswordHash`, `id_personnel`) VALUES
('test3@dur.fr', '$2b$10$Ts8yAvwmyRLDwHmAr/w1CedVNRqKb82sC0lIrvOJ5QSz8G9y8l9Vq', 2),
('test@dur.fr', '$2b$10$6WCY83fdCOBMF7au1jD7b.CF4pxuLCrJOVbrKKHcw2tcgQw5ilUtu', 1),
('test4@dur.fr', '$2b$10$QQN4TzIeTi02vzN90g6G0.A8KC/9Rfu5Ty22S3A3igX0lSYzFfvtG', 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
