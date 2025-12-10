-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2025 at 05:44 AM
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
-- Database: `testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `fridge_tracker`
--

CREATE TABLE `fridge_tracker` (
  `FID` int(11) NOT NULL COMMENT 'ID of Fridge',
  `Owner` int(11) DEFAULT NULL COMMENT 'Current Owner of Fridge, can be null if in storage',
  `School` int(11) DEFAULT NULL COMMENT 'The school id it was last assigned to (can be null for new fridges)',
  `Location` varchar(30) NOT NULL COMMENT 'The building it is currently in',
  `Moved` date NOT NULL DEFAULT curdate() COMMENT 'When it was moved to the location',
  `Room` varchar(5) DEFAULT NULL COMMENT 'The Room number',
  `Status` enum('Clean','Dirty') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Stores the information of where fridges should be found ** Can add this to table later on ^Last Worker to Move` varchar(15) NOT NULL^';

--
-- Dumping data for table `fridge_tracker`
--

INSERT INTO `fridge_tracker` (`FID`, `Owner`, `School`, `Location`, `Moved`, `Room`, `Status`) VALUES
(1, NULL, NULL, 'Warehouse', '0000-00-00', NULL, 'Clean'),
(2, NULL, NULL, 'Warehouse', '0000-00-00', NULL, 'Clean'),
(3, NULL, NULL, 'Warehouse', '0000-00-00', NULL, 'Clean'),
(4, NULL, NULL, 'Warehouse', '0000-00-00', NULL, 'Clean'),
(5, NULL, NULL, 'Warehouse', '0000-00-00', NULL, 'Clean'),
(6, NULL, NULL, 'Warehouse', '0000-00-00', NULL, 'Clean');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fridge_tracker`
--
ALTER TABLE `fridge_tracker`
  ADD PRIMARY KEY (`FID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fridge_tracker`
--
ALTER TABLE `fridge_tracker`
  MODIFY `FID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID of Fridge', AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
