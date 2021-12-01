-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: xana
-- Generation Time: Dec 01, 2021 at 02:20 PM
-- Server version: 8.0.26
-- PHP Version: 7.4.20

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
-- Table structure for table `custom_report`
--

CREATE TABLE `custom_report` (
  `id` int NOT NULL,
  `first_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `last_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `dob` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `email` text,
  `passport` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `sample_date` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `sample_time` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `result_date` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `result_time` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `order_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `result` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `test_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `test_manufacturer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `test_authorization` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `test_description` text,
  `test_image` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `qr_codes`
--

CREATE TABLE `qr_codes` (
  `id` bigint NOT NULL,
  `qr_code` text COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `reportId` bigint NOT NULL,
  `userId` bigint DEFAULT NULL,
  `testName` varchar(150) DEFAULT NULL,
  `testManufacturer` varchar(150) DEFAULT NULL,
  `testDescription` varchar(1000) DEFAULT NULL,
  `testPerformance` varchar(1000) DEFAULT NULL,
  `testAuthorization` varchar(45) DEFAULT NULL,
  `sampleDate` date DEFAULT NULL,
  `sampleTime` time DEFAULT NULL,
  `resultDate` date DEFAULT NULL,
  `resultTime` time DEFAULT NULL,
  `result` varchar(45) DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `test_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint NOT NULL,
  `role_name` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int NOT NULL,
  `session_id` text COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` bigint NOT NULL,
  `session_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `ip` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `session_id`, `user_id`, `session_token`, `ip`) VALUES
(78, 'kwn5gudp5yb0nzs4mlw', 109, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMDksImlhdCI6MTYzODM0MDIyMiwiZXhwIjoxNjY5ODk3ODIyfQ.cWdXr4YJaF-bBWy9XbFPZtUXRFnUPLyIUti5JCzRq1lLC5QIte8aIU9Hknkoe91Tb236wevvLCIIwcIBYCvpWxCyU4dxuSSl9gfwj4UJfehgg4AsamwRiS6f0jqiqUNRfdIAZyV-PczVRMyNIHNpdWPkyE9mHfSoyybKwEaOnjM', NULL),
(79, 'kwnlkyp2hpl7xb2wqnw', 98, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjo5OCwiaWF0IjoxNjM4MzY3Mjg4LCJleHAiOjE2Njk5MjQ4ODh9.IYLCX_WvIixF9QUhCscpFpO5G9HpHpAXke52v5RGFM5RpP1dZyr8wA-kW7UV9Vh4EF6esS9Nlwu5i8-HZRvHtSfJdXuGDAd2zhJWKnT9l-xtNGJAwkbIJOrG4bHEkaJPLzrBcHoBt1EJcUjR611bQmmwz3cziYCByYPrmn7NykI', NULL),
(80, 'kwn7qen6lv6hyj5wihl', 102, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMDIsImlhdCI6MTYzODM0NDAyOCwiZXhwIjoxNjY5OTAxNjI4fQ.L0bsHgja6z7HZlIiAnH150Y-A8ns4PysCVlGyaxAlI-aQYT5hgTvz2txkyD_miL4BDp9hvN69gsG2nipLHmx7NlH2dWwsqS6xld0fdEW7a8Q690Dk0c8iMlISzz2CV8feJzu_hZHT1WbSpLDnsWW8WTx25B-mNNio0Ff1x5TRE4', NULL),
(81, 'kwnlqh4o1s8u46tnq7m', 110, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMTAsImlhdCI6MTYzODM2NzU0NSwiZXhwIjoxNjY5OTI1MTQ1fQ.bYYwqjqFa7bGPLNuZl34UKAUy5yZU8gdWvhFXjvoDKZphefcHqdjDvTQYCc4c18A8q9_aUB1vFIflO1S4nG0x_en4SaKeczlrAAnkoY3AWOmbAMJuZm5s3JD_rxQa6wrFadyQANjnJKNlTLNGQH6Z38uMOtXxBOoPeqJvQB76Ww', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `test_info`
--

CREATE TABLE `test_info` (
  `id` bigint NOT NULL,
  `test_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `test_manufacturer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `test_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `test_performance` varchar(500) NOT NULL,
  `test_authorisation` varchar(500) NOT NULL,
  `date_register` timestamp NULL DEFAULT NULL,
  `date_conduct` timestamp NULL DEFAULT NULL,
  `result` varchar(250) DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `test_image` varchar(500) DEFAULT NULL,
  `qr_id` varchar(500) NOT NULL,
  `video` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `first_name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `middle_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(250) COLLATE utf8mb4_general_ci DEFAULT 'null',
  `mobile` varchar(45) COLLATE utf8mb4_general_ci DEFAULT 'null',
  `passport_number` int DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT 'null',
  `roleId_fk` bigint DEFAULT NULL,
  `address` varchar(500) COLLATE utf8mb4_general_ci DEFAULT 'null',
  `image` varchar(500) COLLATE utf8mb4_general_ci DEFAULT 'null',
  `code` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'null',
  `confirmed` tinyint DEFAULT '0',
  `dob` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `middle_name`, `email`, `mobile`, `passport_number`, `gender`, `company`, `password`, `roleId_fk`, `address`, `image`, `code`, `confirmed`, `dob`) VALUES
(3, 'Salman Ahmed', '', NULL, 'salman123@gmail.com', NULL, 0, '', '', NULL, 1, NULL, NULL, NULL, 0, NULL),
(4, 'Abdul Rafay', '', NULL, 'rafay@gmail.com', NULL, 0, '', '', NULL, 1, NULL, NULL, NULL, 0, NULL),
(95, 'Salman', 'Usmani', '', 'salman090898@gmail.com', '', 0, 'null', '', '', 1, '', 'http://35.153.58.173:5000/uploads/profileImages/test-1638039570353image.png', 'null', 1, '2021-11-27'),
(97, 'shan', 'ahdsb', NULL, 'jeefugwepwjjukhlxo@mrvpm.net', '12345678910', NULL, NULL, NULL, 'ababb607febee496edff2895f76343ce', 1, 'null', 'null', NULL, 1, NULL),
(98, 'get', 'setgo', '', 'getsetgo.gsg3@gmail.com', 'null', 0, 'Male ', 'null', '', 1, 'null', 'http://35.153.58.173:5000/uploads/profileImages/test-1638341165535image.png', 'null', 1, '2021-12-01'),
(100, 'Tetsing', 'Account', '', 'wawolav329@terasd.com', '2136458793354', 213767675, 'Female ', 'codistan', '', 1, 'House no g74 FFC township mirpur mathelo,ghotki', 'http://35.153.58.173:5000/uploads/profileImages/test-1638254691299image.png', 'null', 1, '2021-11-30'),
(101, 'waseem', 'khan', NULL, 'mwaseemkha@gmail.com', 'null', NULL, NULL, NULL, 'null', 1, 'null', 'null', 'null', 1, NULL),
(102, 'Testing', 'Account', '', 'farhanaaijaz76@gmail.com', '30254043634', 394808, 'Female ', 'Gjajanxnm', '', 1, 'Hdjdjnz hsis 537  gsjsn', 'http://35.153.58.173:5000/uploads/profileImages/test-1638337557572image.png', NULL, 1, '2016-11-30'),
(103, 'Ahmed', '', '', 'cetam60992@tinydef.com', '2134997986868', NULL, 'Female ', 'null', '', 1, 'null', 'http://35.153.58.173:5000/uploads/profileImages/test-1638256771871image.png', 'null', 1, '2021-11-30'),
(109, 'syed', 'talha', '', 'syedtalha0305@gmail.com', '546499497', 0, 'Female ', '', '', 1, 'House no 12 street 5 ', 'http://35.153.58.173:5000/uploads/profileImages/test-1638340771915image.png', 'null', 1, '2021-12-01'),
(110, 'Beenish', 'Khan', NULL, 'beenishkhan603@gmail.com', '03046809932', NULL, NULL, NULL, '8e3831751f239bd6ce7e49922fb271e8', 2, 'null', 'null', 'null', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_test_pivot`
--

CREATE TABLE `user_test_pivot` (
  `id` bigint NOT NULL,
  `test_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `custom_report`
--
ALTER TABLE `custom_report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qr_codes`
--
ALTER TABLE `qr_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`reportId`),
  ADD KEY `email_idx` (`userId`),
  ADD KEY `testId` (`test_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_fk_f` (`user_id`);

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
-- AUTO_INCREMENT for table `custom_report`
--
ALTER TABLE `custom_report`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `qr_codes`
--
ALTER TABLE `qr_codes`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `test_info`
--
ALTER TABLE `test_info`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=411;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

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
  ADD CONSTRAINT `testId` FOREIGN KEY (`test_id`) REFERENCES `test_info` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `user_id_fk_f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

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