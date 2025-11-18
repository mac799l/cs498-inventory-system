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
  `Last Name` varchar(25),
  `Email` varchar(60) UNIQUE NOT NULL,
  `Phone Number` varchar(14) NOT NULL,
  `UID` int(12) UNIQUE AUTO_INCREMENT NOT NULL,
  `School ID` int(4) NULL,
  `Dorm` varchar(50) NULL,
  `Room` varchar(10) NULL,
  `Role` varchar(20) CHECK (`Role` IN ('Worker', 'Student', 'Liaison', 'Campus Housing')),
  `Hash` varchar(60) NOT NULL COMMENT 'Hash of Users Password'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Login Table to verify User Information';
COMMIT;

INSERT INTO `user login table`
(`First Name`, `Last Name`, `Email`, `Phone Number`, `School ID`, `Dorm`, `Room`, `Role`, `Hash`)
VALUES
('Request', 'Test', 'request@school.edu', '000-000-0000', 1001, 'Woodland Glen IV', 231, 'Student', '$2a$10$zc3i/EKIl.AuXj5O1kSjVeyOF1IHtzO/sGmssiz7VKPzI0UKbU5Se');

COMMIT;
/* Type in the email for Request Test and the password is password */;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
 /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
 /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
