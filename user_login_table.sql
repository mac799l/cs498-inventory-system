-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2025 at 07:34 PM
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
-- Table structure for table `user login table`
--

CREATE TABLE `user login table` (
  `First Name` varchar(25) NOT NULL,
  `Last Name` varchar(25)
  `Email` varchar(60) NOT NULL,
  `Phone Number` varchar(14) NOT NULL,
  `UID` int(12) NOT NULL,
  `School ID` int(4) NOT NULL,
  `Dorm` varchar(50) NOT NULL,
  `Room` varchar(10) NOT NULL,
  `Role` varchar(8) CHECK (`Role` IN ('Worker', 'Student', 'Liaison', 'Campus Housing')),
  `Hash` int(35) NOT NULL COMMENT 'Hash of Users Password'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Login Table to verify User Information';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
