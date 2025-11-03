-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2025 at 05:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `School by School`
--

CREATE TABLE `School Service` (
  `UID` int(12) NOT NULL,
  `Username` varchar(18) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Phone Number` varchar(14) NOT NULL,
  `First Name` varchar(15) NOT NULL,
  `Last Name` varchar(30) NOT NULL,
  `Dorm` varchar(50) NOT NULL,
  `Room` varchar(10) NOT NULL,
  `Type of Service` ENUM('Pickup','Maintenance','Deliver') NOT NULL,
  `Date Requested` DATE NOT NULL,
  `Deadline Date` DATE NOT NULL COMMENT 'Some schools have deadlines we need to meet',
  `Condition` ENUM('Clean', 'Dirty') NOT NULL,
  `Notes` varchar(250)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Fridge Information Specific to a School';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
