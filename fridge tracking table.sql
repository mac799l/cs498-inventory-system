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

CREATE TABLE `Fridge Tracker` (
  `FID` int(15) NOT NULL, --ID of Fridge
  `Last/Current Owner` int(12) NULL, --Last Person to use the fridge
  `Assigned School` int(4)  NULL, --The school id it was last assigned to (can be null for new fridges)
  `Location` varchar(30) NOT NULL, --The building it is currently in
 -- `Last Worker to Move` varchar(15) NOT NULL,
  `Date Moved` DATE  NULL, --When it was moved to the location
  `Dorm` varchar(50)  NULL, --If in Dorm what Dorm is it
  `Dorm Room` varchar(5) NULL,
  `Condition` ENUM('Clean', 'Dirty')  NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Stores the information of where fridges should be found';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
