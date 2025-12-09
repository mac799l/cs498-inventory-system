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

CREATE TABLE `Service` (
  `SID` int(10) NOT NULL COMMENT 'SERVICE ID',
  `SNO` int(4) NOT NULL COMMENT 'School Number',
  `UID` int(12) NOT NULL,
  `WID` int(12) NOT NULL DEFAULT 0,
  `Type of Service` ENUM('Pickup','Maintenance' ,'Delivery') NOT NULL,
  `Request Date` DATE NOT NULL,
  `Service Date` DATE NULL,
  `Deadline Date` DATE NULL COMMENT 'Some schools have deadlines we need to meet',
  `Condition` ENUM('Clean', 'Dirty') NULL,
  `Preferred Times` JSON NULL COMMENT 'The times the student would prefer',
  `Notes` varchar(250),
  `Status` ENUM('In Progress', 'Completed')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Fridge Information Specific to a School';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
