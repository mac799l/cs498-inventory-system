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
-- Table structure for table `Fridge Tracker`
--

CREATE TABLE `Fridge_Tracker` (
  `FID` INT NOT NULL COMMENT'ID of Fridge',
  `Prev` INT NULL COMMENT 'Last Person to use the fridge',
  `School` INT NULL COMMENT'The school id it was last assigned to (can be null for new fridges)',
  `Location` VARCHAR(30) NOT NULL COMMENT'The building it is currently in',
  `Moved` DATE NULL COMMENT'When it was moved to the location',
  `Dorm` VARCHAR(50) NULL COMMENT 'If in Dorm what Dorm is it',
  `Room` VARCHAR(5) NULL COMMENT 'The Room number',
  `Status` ENUM('Clean','Dirty') NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT'Stores the information of where fridges should be found ** Can add this to table later on ^Last Worker to Move` varchar(15) NOT NULL^';
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
