-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2024 at 10:56 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookmyspace`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `tester_required` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `name`, `tester_required`) VALUES
(101, 'Phone', 2),
(102, 'Network', 7),
(104, 'Video Conference', 3),
(105, 'TV', 4),
(106, 'Apple TV', 10),
(107, 'E-white board', 11),
(109, 'Computer', 9),
(110, 'Router', 4),
(111, 'HDMI Cables', 5);

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) UNSIGNED NOT NULL,
  `equipments_booked` varchar(255) DEFAULT NULL,
  `team_id` int(11) UNSIGNED NOT NULL,
  `room_id` int(11) UNSIGNED NOT NULL,
  `booking_date` datetime NOT NULL,
  `checked_in` tinyint(1) UNSIGNED NOT NULL,
  `attendees` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id`, `equipments_booked`, `team_id`, `room_id`, `booking_date`, `checked_in`, `attendees`) VALUES
(20500, 'Phone + Network', 1, 1, '2024-05-14 22:43:05', 1, 5),
(20501, 'CPU', 2, 3, '2024-05-14 22:43:05', 1, 4),
(20502, 'Desktop + Keyboard', 3, 2, '2024-05-14 22:43:51', 1, 6),
(20503, 'Mobile Phone', 3, 2, '2024-05-14 22:43:51', 0, 5),
(20504, 'MacBook', 2, 2, '2024-05-15 12:37:51', 0, 4),
(20505, 'HeadPhone', 1, 3, '2024-05-15 12:37:51', 1, 3),
(20506, 'Network+ E-white board', 1, 3, '2024-05-22 20:39:58', 0, 1),
(20507, 'Apple TV+ Video Conference', 2, 3, '2024-05-22 20:39:58', 0, 1),
(20508, 'Apple TV+ Video Conference', 2, 3, '2024-05-22 20:39:58', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `capacity` tinyint(127) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `name`, `capacity`) VALUES
(1, 'Room A', 10),
(2, 'Room B', 8),
(3, 'Room C', 25),
(4, 'Room D', 15),
(5, 'Room E', 30);

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`) VALUES
(1, 'Team A'),
(2, 'Team B'),
(3, 'Team C'),
(4, 'Team D');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `team_id` int(11) UNSIGNED NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `team_id`, `created_at`, `updated_at`) VALUES
(1, 'Wilson', 'admin', 'wilson@abc.com', 'admin', 1, '2024-05-03', '2024-05-15'),
(2, 'Yahya', 'user', 'yahya@abc.com', 'user', 2, '2024-05-03', '2024-05-15'),
(3, 'Wael', 'user', 'wael@abc.com', 'user', 1, '2024-05-06', '2024-05-15'),
(6, 'Mary', 'Johnson', 'mary@abc.com', 'mary', 1, '2024-05-06', '2024-05-15'),
(7, 'Junu', 'user', 'junu@abc.com', 'user', 2, '2024-05-06', '2024-05-15'),
(8, 'John', 'Smith', 'john@abc.com', 'john', 3, '2024-05-10', '2024-05-15'),
(9, 'David', 'Jones', 'david@abc.com', 'david', 4, '2024-05-10', '2024-05-15'),
(10, 'Linda', 'Brown', 'linda@abc.com', 'linda', 3, '0000-00-00', '2024-05-15'),
(13, 'Sarah', 'Williams', 'sarah@abc.com', 'sarah', 4, '0000-00-00', '2024-05-15'),
(16, 'Joseph', 'Thomas', 'joseph@abc.com', 'joseph', 4, '0000-00-00', '2024-05-15'),
(17, 'Elizabeth', 'Davis', 'elizabeth@abc.com', 'elizabeth', 4, '2024-05-10', '2024-05-15');

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `update_date_trigger` BEFORE UPDATE ON `user` FOR EACH ROW SET NEW.updated_at = CURRENT_TIMESTAMP
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reservation_team_id` (`team_id`),
  ADD KEY `fk_reservation_room_id` (`room_id`) USING BTREE;

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_team_id` (`team_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20509;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `fk_reservation_room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `fk_reservation_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
