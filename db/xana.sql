-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: xana
-- Generation Time: Sep 20, 2021 at 08:08 AM
-- Server version: 8.0.24
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xana`
--

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `reportId` bigint NOT NULL,
  `userId` bigint DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `passportNo` bigint DEFAULT NULL,
  `testName` varchar(150) DEFAULT NULL,
  `testManufacturer` varchar(150) DEFAULT NULL,
  `testDescription` varchar(1000) DEFAULT NULL,
  `testPerformance` varchar(1000) DEFAULT NULL,
  `testAuthorization` varchar(45) DEFAULT NULL,
  `sampleDate` date DEFAULT NULL,
  `resultDate` date DEFAULT NULL,
  `result` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`reportId`, `userId`, `firstName`, `lastName`, `dob`, `passportNo`, `testName`, `testManufacturer`, `testDescription`, `testPerformance`, `testAuthorization`, `sampleDate`, `resultDate`, `result`) VALUES
(1, 3, 'Hamza', 'Latif', '2002-01-02', 1812354, 'Sinopharm', 'Xana Companies', '2 doses of sinopharm', 'Test is valid for 6 months', 'Aroynd the globe', '2021-01-01', '2021-01-03', 'negative'),
(2, 3, 'Hamid', 'Ayub', '2001-03-10', 41244521, 'Sinopharm', 'Xana Companies', '2 doses of sinopharm', 'Test is valid for 6 months', 'Aroynd the globe', '2021-02-06', '2021-02-08', 'negative'),
(3, 4, 'Abdul', 'Rafay', '1998-05-17', 87944521, 'Sinopharm', 'Xana Companies', '2 doses of sinopharm', 'Test is valid for 6 months', 'Aroynd the globe', '2021-05-06', '2021-05-08', 'negative'),
(4, 4, 'Abdul', 'Rafay', '1998-05-17', 87944521, 'Sinopharm', 'Xana Companies', '2 doses of sinopharm', 'Test is valid for 6 months', 'Aroynd the globe', '2021-05-06', '2021-05-08', 'negative');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint NOT NULL,
  `role_name` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `test_info`
--

CREATE TABLE `test_info` (
  `id` bigint NOT NULL,
  `test_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `test_manufacturer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `test_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `test_performance` varchar(500) NOT NULL,
  `test_authorisation` varchar(500) NOT NULL,
  `date_register` timestamp NULL DEFAULT NULL,
  `date_conduct` timestamp NULL DEFAULT NULL,
  `result` varchar(250) DEFAULT NULL,
  `userId` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `name` varchar(250) DEFAULT 'null',
  `email` varchar(250) DEFAULT 'null',
  `mobile` varchar(45) DEFAULT 'null',
  `password` varchar(1000) DEFAULT 'null',
  `roleId_fk` bigint DEFAULT NULL,
  `address` varchar(500) DEFAULT 'null',
  `image` varchar(500) DEFAULT 'null',
  `token` varchar(1000) DEFAULT 'null',
  `confirmed` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `password`, `roleId_fk`, `address`, `image`, `token`, `confirmed`) VALUES
(3, 'Salman Ahmed', 'salman123@gmail.com', NULL, NULL, 1, NULL, NULL, NULL, 0),
(4, 'Abdul Rafay', 'rafay@gmail.com', NULL, NULL, 1, NULL, NULL, NULL, 0),
(62, 'get setgo', 'getsetgo.gsg3@gmail.com', 'null', 'null', 1, 'null', 'null', 'null', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_test_pivot`
--

CREATE TABLE `user_test_pivot` (
  `id` bigint NOT NULL,
  `test_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`reportId`),
  ADD KEY `email_idx` (`userId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_info`
--
ALTER TABLE `test_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_idx` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `roleID_FK` (`roleId_fk`);

--
-- Indexes for table `user_test_pivot`
--
ALTER TABLE `user_test_pivot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test_id_fk_idx` (`test_id`),
  ADD KEY `user_id_fk_idx` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `reportId` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `test_info`
--
ALTER TABLE `test_info`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `user_test_pivot`
--
ALTER TABLE `user_test_pivot`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `test_info`
--
ALTER TABLE `test_info`
  ADD CONSTRAINT `id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `roleID_FK` FOREIGN KEY (`roleId_fk`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `user_test_pivot`
--
ALTER TABLE `user_test_pivot`
  ADD CONSTRAINT `test_id_fk` FOREIGN KEY (`test_id`) REFERENCES `test_info` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
