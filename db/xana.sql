-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: xana
-- Generation Time: Feb 11, 2022 at 07:51 AM
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
  `type` varchar(500) NOT NULL,
  `test_image` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reportUrl` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `custom_report`
--

INSERT INTO `custom_report` (`id`, `first_name`, `last_name`, `dob`, `email`, `passport`, `sample_date`, `sample_time`, `result_date`, `result_time`, `order_id`, `result`, `test_name`, `test_manufacturer`, `test_authorization`, `test_description`, `type`, `test_image`, `created_at`, `updated_at`, `reportUrl`) VALUES
(2, 'beenish', 'Khan', '2022-02-03T13:44:35.197Z', 'beenishkhan603@gmail.com', '1231231231231', '2022-02-03T13:44:35.197Z', '00:00', '2022-02-03T13:44:35.197Z', '00:00', '123456789012', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-01-31 13:46:36', '2022-01-31 13:46:36', 'https://xana-bucket.s3.amazonaws.com/reports/2.pdf'),
(3, 'Mohammed Kamran ', 'Butt', '1960-05-03T23:00:00.000Z', 'chuchujani@hotmail.com', '121663990', '2022-02-03T10:34:29.131Z', '10:00', '2022-02-03T10:34:29.131Z', '10:35', 'XM1200210000', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-02 10:37:24', '2022-02-02 10:37:24', 'https://xana-bucket.s3.amazonaws.com/reports/3.pdf'),
(4, 'Mohammed Kamran ', 'Butt', '1960-05-03T23:00:00.000Z', 'samples@xanamedtec.com', '121663990', '2022-02-03T10:40:16.076Z', '10:00', '2022-02-03T10:40:16.076Z', '10:35', 'XM1200210000', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-02 10:44:24', '2022-02-02 10:44:24', 'https://xana-bucket.s3.amazonaws.com/reports/4.pdf'),
(5, 'beenish', 'Khan', '2022-02-03T10:58:09.770Z', 'beenishkhan603@gmail.com', '44335e5edt5', '2022-02-03T10:58:09.770Z', '00:00', '2022-02-03T10:58:09.770Z', '00:00', 'XANAM3928472', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-02 10:58:34', '2022-02-02 10:58:34', 'https://xana-bucket.s3.amazonaws.com/reports/5.pdf'),
(6, 'beenish', 'Khan', '2022-02-03T11:22:01.519Z', 'beenishkhan603@gmail.com', '12312312312312', '2022-02-03T11:22:01.519Z', '00:00', '2022-02-03T11:22:01.519Z', '00:00', '123456789012', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-02 11:22:43', '2022-02-02 11:22:43', 'https://xana-bucket.s3.amazonaws.com/reports/6.pdf'),
(7, 'beenish', 'Khan', '2022-02-02T11:23:40.969Z', 'beenishkhan603@gmail.com', '12312312312312', '2022-02-02T11:23:40.969Z', '00:00', '2022-02-03T11:23:40.969Z', '00:00', '123456789012', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-02 11:24:07', '2022-02-02 11:24:07', 'https://xana-bucket.s3.amazonaws.com/reports/7.pdf'),
(8, 'beenish', 'Khan', '2022-02-01T19:00:00.000Z', 'beenishkhan603@gmail.com', '12312312312312', '2022-02-01T19:00:00.000Z', '00:00', '2022-01-31T19:00:00.000Z', '00:00', '123456789012', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-02 11:30:46', '2022-02-02 11:30:46', 'https://xana-bucket.s3.amazonaws.com/reports/8.pdf'),
(9, 'aliyah', 'khan', '2002-03-09T00:00:00.000Z', 'samples@xanamedtec.com', '193847292', '2022-02-03T10:42:51.827Z', '10:00', '2022-02-03T10:42:51.827Z', '10:40', 'xm83kshdkshs', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 10:44:26', '2022-02-03 10:44:26', 'undefined'),
(10, 'aliyah', 'khan', '2002-03-09T00:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-03T10:44:47.637Z', '10:00', '2022-02-03T10:44:47.637Z', '10:40', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 10:45:34', '2022-02-03 10:45:34', 'undefined'),
(11, 'aliyah', 'khan', '2002-03-09T00:00:00.000Z', 'aliyah.khan1@hotmail.co.uk', '3t363654656', '2022-02-03T10:49:14.835Z', '10:00', '2022-02-03T10:49:14.835Z', '10:45', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 10:50:01', '2022-02-03 10:50:01', 'undefined'),
(12, 'sadia', 'ahmed', '2022-02-03T10:52:14.909Z', 'sadia.188@hotmail.co.uk', '3t363654656', '2022-02-03T10:52:14.909Z', '10:00', '2022-02-03T10:52:14.909Z', '10:45', 'dh92839qjsss', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 10:53:03', '2022-02-03 10:53:03', 'undefined'),
(13, 'beenish', 'Khan', '2022-02-03T11:10:49.293Z', 'beenishkhan603@gmail.com', '44335e5edt5', '2022-02-03T11:10:49.293Z', '00:00', '2022-02-03T11:10:49.293Z', '00:00', 'XANAM3928472', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 11:11:11', '2022-02-03 11:11:11', 'undefined'),
(14, 'beenish', 'Khan', '2022-02-01T19:00:00.000Z', 'beenishkhan603@gmail.com', '44335e5edt5', '2022-02-03T11:14:35.336Z', '00:00', '2022-02-03T11:14:35.336Z', '00:00', 'XANAM3928472', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 11:14:59', '2022-02-03 11:14:59', 'undefined'),
(15, 'aliyah', 'khan', '2002-03-09T00:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-03T11:46:02.387Z', '10:00', '2022-02-03T11:46:02.387Z', '10:45', 'XANAM8282944', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 11:46:54', '2022-02-03 11:46:54', 'https://xana-bucket.s3.amazonaws.com/reports/15.pdf'),
(16, 'beenish', 'Khan', '2002-03-08T19:00:00.000Z', 'beenishkhan603@gmail.com', '44335e5edt5', '2022-02-03T11:48:12.349Z', '00:00', '2022-02-03T11:48:12.349Z', '00:00', 'XANAM3928472', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 11:49:50', '2022-02-03 11:49:50', 'https://xana-bucket.s3.amazonaws.com/reports/16.pdf'),
(17, 'aliyah', 'khan', '2002-03-09T00:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-03T11:48:35.422Z', '10:00', '2022-02-03T11:48:35.422Z', '10:45', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 11:51:03', '2022-02-03 11:51:03', 'https://xana-bucket.s3.amazonaws.com/reports/17.pdf'),
(18, 'aliyah', 'khan', '2002-07-07T23:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-03T11:53:54.220Z', '11:55', '2022-02-03T11:53:54.220Z', '12:00', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 12:01:48', '2022-02-03 12:01:48', 'https://xana-bucket.s3.amazonaws.com/reports/18.pdf'),
(19, 'aliyah', 'khan', '2002-08-08T23:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-03T12:02:05.961Z', '00:00', '2022-02-03T12:02:05.961Z', '00:00', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 12:02:44', '2022-02-03 12:02:44', 'https://xana-bucket.s3.amazonaws.com/reports/19.pdf'),
(20, 'aliyah', 'khan', '2002-03-09T00:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-03T12:02:49.862Z', '00:00', '2022-02-03T12:02:49.862Z', '00:00', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 12:03:07', '2022-02-03 12:03:07', 'https://xana-bucket.s3.amazonaws.com/reports/20.pdf'),
(21, 'aliyah', 'khan', '2002-03-19T00:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-03T12:03:28.291Z', '00:00', '2022-02-03T12:03:28.291Z', '00:00', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 12:04:02', '2022-02-03 12:04:02', 'https://xana-bucket.s3.amazonaws.com/reports/21.pdf'),
(22, 'aliyah', 'khan', '2004-03-24T00:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-03T12:04:14.464Z', '00:00', '2022-02-03T12:04:14.464Z', '00:00', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-03 12:04:41', '2022-02-03 12:04:41', 'https://xana-bucket.s3.amazonaws.com/reports/22.pdf'),
(23, 'aliyah', 'khan', '2002-03-09T00:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-04T10:03:53.189Z', '10:00', '2022-02-04T10:03:53.189Z', '10:04', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-04 10:04:26', '2022-02-04 10:04:26', 'https://xana-bucket.s3.amazonaws.com/reports/23.pdf'),
(24, 'beenish', 'Khan', '2002-08-22T18:00:00.000Z', 'beenishkhan603@gmail.com', '44335e5edt5', '2022-02-04T10:05:23.137Z', '00:00', '2022-02-04T10:05:23.137Z', '00:00', 'XANAM3928472', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-04 10:05:47', '2022-02-04 10:05:47', 'https://xana-bucket.s3.amazonaws.com/reports/24.pdf'),
(25, 'beenish', 'Khan', '2002-08-03T18:00:00.000Z', 'beenishkhan603@gmail.com', '44335e5edt5', '2022-02-04T10:05:54.425Z', '00:00', '2022-02-04T10:05:54.425Z', '00:00', 'XANAM3928472', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-04 10:06:15', '2022-02-04 10:06:15', 'https://xana-bucket.s3.amazonaws.com/reports/25.pdf'),
(26, 'beenish', 'Khan', '2004-03-08T19:00:00.000Z', 'beenishkhan603@gmail.com', '44335e5edt5', '2022-02-04T10:07:03.625Z', '00:00', '2022-02-04T10:07:03.625Z', '00:00', 'XANAM3928472', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-04 10:08:10', '2022-02-04 10:08:10', 'https://xana-bucket.s3.amazonaws.com/reports/26.pdf'),
(27, 'aliyah', 'khan', '2002-03-09T00:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-04T10:08:29.041Z', '00:00', '2022-02-04T10:08:29.041Z', '00:00', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-04 10:09:04', '2022-02-04 10:09:04', 'https://xana-bucket.s3.amazonaws.com/reports/27.pdf'),
(28, 'sadia', 'ahmed', '1988-12-13T00:00:00.000Z', 'sadia@xanamedtec.com', '1234567888', '2022-02-06T00:00:00.000Z', '10:58', '2022-02-06T10:57:13.635Z', '11:15', 'XANAM1001789', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-06 10:58:44', '2022-02-06 10:58:44', 'undefined'),
(29, 'sadia', 'ahmed', '2022-02-08T10:33:59.541Z', 'sadia@xanamedtec.com', 'xxxxxxxxxxxxx', '2022-02-08T10:33:59.541Z', '09:00', '2022-02-08T10:33:59.541Z', '09:30', 'XANAM1001789', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-08 10:37:22', '2022-02-08 10:37:22', 'https://xana-bucket.s3.amazonaws.com/reports/29.pdf'),
(30, 'aliyah', 'khan', '2002-03-08T00:00:00.000Z', 'samples@xanamedtec.com', '3t363654656', '2022-02-08T10:39:46.873Z', '10:00', '2022-02-08T10:39:46.873Z', '10:40', 'XANAM1234567', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-08 10:40:16', '2022-02-08 10:40:16', 'https://xana-bucket.s3.amazonaws.com/reports/30.pdf'),
(31, 'Sidra ', 'Iqbal', '1988-07-01T23:00:00.000Z', 'sadia.188@hotmail.co.uk', '555809146', '2022-02-08T00:00:00.000Z', '10:00', '2022-02-08T10:40:07.324Z', '10:20', 'XANAM1200031', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-08 10:49:27', '2022-02-08 10:49:27', 'https://xana-bucket.s3.amazonaws.com/reports/31.pdf'),
(32, 'Louise ', 'Jowett', '1963-06-01T23:00:00.000Z', 'richluisa@hotmail.co.uk', '519081341', '2022-02-08T11:12:14.662Z', '10:55', '2022-02-08T11:12:14.662Z', '11:20', 'XM1200410000', 'Negative', 'Coronavirus Ag Rapid Test Cassette (Swab)', 'Flowflex - Acon Biotech Co. Ltd', 'CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered', 'Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigen by nasopharyngeal swab', 'Pre Travel Lateral Flow', 'null', '2022-02-08 11:20:09', '2022-02-08 11:20:09', 'https://xana-bucket.s3.amazonaws.com/reports/32.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `qr_codes`
--

CREATE TABLE `qr_codes` (
  `id` bigint NOT NULL,
  `qr_code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
  `role_name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
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
  `session_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` bigint NOT NULL,
  `session_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `ip` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `session_id`, `user_id`, `session_token`, `ip`) VALUES
(78, 'kwn5gudp5yb0nzs4mlw', 109, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMDksImlhdCI6MTYzODM0MDIyMiwiZXhwIjoxNjY5ODk3ODIyfQ.cWdXr4YJaF-bBWy9XbFPZtUXRFnUPLyIUti5JCzRq1lLC5QIte8aIU9Hknkoe91Tb236wevvLCIIwcIBYCvpWxCyU4dxuSSl9gfwj4UJfehgg4AsamwRiS6f0jqiqUNRfdIAZyV-PczVRMyNIHNpdWPkyE9mHfSoyybKwEaOnjM', NULL),
(79, 'kwnlkyp2hpl7xb2wqnw', 98, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjo5OCwiaWF0IjoxNjM4MzY3Mjg4LCJleHAiOjE2Njk5MjQ4ODh9.IYLCX_WvIixF9QUhCscpFpO5G9HpHpAXke52v5RGFM5RpP1dZyr8wA-kW7UV9Vh4EF6esS9Nlwu5i8-HZRvHtSfJdXuGDAd2zhJWKnT9l-xtNGJAwkbIJOrG4bHEkaJPLzrBcHoBt1EJcUjR611bQmmwz3cziYCByYPrmn7NykI', NULL),
(84, 'kyy4mb4rolymtseyurg', 115, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMTUsImlhdCI6MTY0MzM1NzQ5MCwiZXhwIjoxNjc0OTE1MDkwfQ.HBu0h-iA3gHoqn1xATNU76gOnudVdoP7U6ym61EvyDdpPFAt6Jvwb2agon2Ep9Mu6bbjcfszMapcLDBad0vcCb_-bgDmR2-3zwte7TSSosTNYQ3ezBA8NSORnIa5WesaLR5vHNA4_EG6DeJ-1EKtxZ0bxnnda6avsfn2MCIrkBU', NULL),
(88, 'kz2ktjvl23eqi9ts676', 120, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMjAsImlhdCI6MTY0MzYyNjU2NywiZXhwIjoxNjc1MTg0MTY3fQ.NxXIbV03MhHttSDSMRM2Hu2XqSl_J8ZulxFzzWVt8THy-nQKtFqIUm3v64d6wCSgyAlfwWnhDs5Rn2EEDkBc9ldgzs2C8e-Pjea7W9ZDE3sKnLOlwWslRKT1dVqZq7vvGCDZP4UNpLmTSXjNGLBlvQjhdT0JD4OxwTqoUqC4zBM', NULL),
(90, 'kz2lwfg0gnn9qlu6zzr', 121, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMjEsImlhdCI6MTY0MzYyODM4MCwiZXhwIjoxNjc1MTg1OTgwfQ.fJwinzkerU-Ve9h6UktHxA-awkWAT6LKLERFUJgoO3AhbIV4ygNgJlPotYvwum2sPK3cYakW-MtgoAa8qSgRcNtHGa0_h26KnS6KeRBk7f5PERW6-0zPOg3BKefTmtmPevkckxbY5EkMJ1qVUtHzgjkkPXjzCbJdurfCK_5dheA', NULL),
(93, 'kzdzr58ithg5zrhn1nk', 112, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMTIsImlhdCI6MTY0NDMxNjc3NywiZXhwIjoxNjc1ODc0Mzc3fQ.dSwuHWMRU2rtOfloN1Hxn_PH-2AhJE9HMYHHZYg94IP6h_qjjLkahCejbshAeloWPZle_5q9dXRHjR1IqdDEjxV4fUngF9dFdGO5EdoQMXh4hLn34-whJgnMrksshvhrOwsuUiwH8_zY1nJlzNq4-zGlrHIp9uhRZbmztyXZ9t4', NULL),
(94, 'kz88rjpb0mxfw8fjjng9', 110, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMTAsImlhdCI6MTY0Mzk2OTExNSwiZXhwIjoxNjc1NTI2NzE1fQ.U2_7XFGJgVKngNE2nfWNhlxtvbs1QoKRiW87KbSSc1H51A4cIr76OuF0WFhCV5uzGCXvXsG1MElIYeXyc6VkIJVC6ACaGngou0IPbDbA7lK6KKja1JVsgzva_LYbEmsLG4eHNfeQXIDq7R4olbj454z_0Qe6vTU9dDXfW4SYsWI', NULL),
(95, 'kzcqgvlndhpor0jbe2p', 123, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMjMsImlhdCI6MTY0NDI0MDcxNSwiZXhwIjoxNjc1Nzk4MzE1fQ.KNzheQdkBmb0Vjfugscui839RHE9xm__pE8QxHOEHjvFfIgqDTqgCz2UtrEmHJxoZDtKiLbrPRQlH9JehWB8OBfMioYGJTqpqLNbdwj1l6tYmXwaY7geeil_hElDe9iynN0UyvWZ_bJ1f1eZHQ2-Jwq0GEM33-7ytx9nkVkJBh0', NULL),
(96, 'kzdzjqnw0z48il2j20fk', 111, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMTEsImlhdCI6MTY0NDMxNjQzMSwiZXhwIjoxNjc1ODc0MDMxfQ.PUZa4GFpbim_c3GhtpB1lAgUrAQLjMphsBZiYlf8i-zJ3vO9etlNe9KPWaCh9wbm_9KE5NBBBu5z6k5VfrtjEVxqVaZyQLOgVQmdaGtTQA3qmEqJIjCAp4aJJzOQu0jPrFrYFXvcWc1OZ0igXt5MRWuyp91Oly3v1Il1sWPNh6M', NULL),
(97, 'kzgky7x72jgxnzax84i', 122, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMjIsImlhdCI6MTY0NDQ3MzMxMSwiZXhwIjoxNjc2MDMwOTExfQ.JJFbt1HxOMj5gGuI8dHhmXCx77NSTNPKhJF3vjpc4gJjp4A3yGVIIf51A_MzF7kozqva3q-1slYULbAjBOW3diNRi-ee7hwjkSQP6lKkdvxOtujD3RPlvucLU1yP6R3ob1jH3RUNFvRuT-dgoKW7jHbzbtxgLuIDez5beHE3iAc', NULL),
(98, 'kzgkts3gzt4h9937qxk', 124, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMjQsImlhdCI6MTY0NDQ3MzEwNCwiZXhwIjoxNjc2MDMwNzA0fQ.WkT08BBHlALCTDQ7ktuW3NWD4FrJ1kk3sUJMJRq83whYblwk1HRjB6AWD07S0MaxZO0XSja2PTjAywKWZpLFeMuisikLuxrSvXVazf6BtLrAOwK2cB0v0JqgdscrG60ck5dwFDqG_n5-ChcyXftISl3yoV-2dWfngpKnSGaSf9M', NULL);

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

--
-- Dumping data for table `test_info`
--

INSERT INTO `test_info` (`id`, `test_name`, `test_manufacturer`, `test_description`, `test_performance`, `test_authorisation`, `date_register`, `date_conduct`, `result`, `userId`, `test_image`, `qr_id`, `video`) VALUES
(413, 'Day 2 Arrival Antigen LFD Test', 'Xana Medtec Ltd', 'Non Red- List Arrival Test for Fully Vaccinated Passengers. Home Self-Test. Instant Booking Reference Number issued by email', '100 % Specificity\n98.0 % Accuracy\n96.1% Sensitivity', 'CE Certificate for Rapid Antigen Self-test kit.\nMHRA certificate (Medicines and Healthcare products Regulatory Agency).\nPublic Health England (PHE) Passed UK Phase3A Evaluation.', '2022-01-26 06:38:41', '2022-01-26 06:38:41', 'Negative', 115, 'https://xana-bucket.s3.amazonaws.com/testImage%2Frn_image_picker_lib_temp_dc83dbe3-f2a1-46af-a5f5-70d19dc6d0cd.jpg', 'COV1080034ACONLFDAG00013014', ''),
(414, 'Pre- Travel Antigen LFD Test', 'Xana Medtec Ltd', 'COVID-19 travel test suitable for flights leaving the UK where an antigen lateral flow test is accepted for entry. Results within 20 mins. Accepted for destinations in UK, EU & USA.', '100 % Specificity\n98.0 % Accuracy\n96.1% Sensitivity', 'CE Certificate for Rapid Antigen Self-test kit.\nMHRA certificate (Medicines and Healthcare products Regulatory Agency).\nPublic Health England (PHE) Passed UK Phase3A Evaluation.', '2022-01-26 06:42:50', '2022-01-26 06:42:50', 'Invalid', 115, 'https://xana-bucket.s3.amazonaws.com/testImage%2Frn_image_picker_lib_temp_08f03073-5a2e-4e5b-87ee-4706bf86e3b7.jpg', 'COV1080034ACONLFDAG00048561', 'https://xana-bucket.s3.amazonaws.com/videos%2F16a160c0-7552-4c3f-9a87-87f5c8718521.mp4'),
(415, 'Day 2 Arrival Antigen LFD Test', 'Xana Medtec Ltd', 'Non Red- List Arrival Test for Fully Vaccinated Passengers. Home Self-Test. Instant Booking Reference Number issued by email', '100 % Specificity\n98.0 % Accuracy\n96.1% Sensitivity', 'CE Certificate for Rapid Antigen Self-test kit.\nMHRA certificate (Medicines and Healthcare products Regulatory Agency).\nPublic Health England (PHE) Passed UK Phase3A Evaluation.', '2022-01-26 07:19:19', '2022-01-26 07:19:19', 'Positive', 115, 'https://xana-bucket.s3.amazonaws.com/testImage%2Frn_image_picker_lib_temp_99e46493-33e5-45a0-8895-f7094a84a097.jpg', 'COV1080034ACONLFDAG00048561', 'https://xana-bucket.s3.amazonaws.com/videos%2Fe246540e-5a05-423d-9a0f-811b644d47c5.mp4'),
(416, 'Pre- Travel Antigen LFD Test', 'Xana Medtec Ltd', 'COVID-19 travel test suitable for flights leaving the UK where an antigen lateral flow test is accepted for entry. Results within 20 mins. Accepted for destinations in UK, EU & USA.', '100 % Specificity\n98.0 % Accuracy\n96.1% Sensitivity', 'CE Certificate for Rapid Antigen Self-test kit.\nMHRA certificate (Medicines and Healthcare products Regulatory Agency).\nPublic Health England (PHE) Passed UK Phase3A Evaluation.', '2022-01-26 07:23:05', '2022-01-26 07:23:05', 'Negative', 115, 'https://xana-bucket.s3.amazonaws.com/testImage%2Frn_image_picker_lib_temp_fcd533dc-4454-4904-97ea-ec05fe43c56f.jpg', 'COV1080034ACONLFDAG00013014', ''),
(417, 'Day 2 Arrival Antigen LFD Test', 'Xana Medtec Ltd', 'Non Red- List Arrival Test for Fully Vaccinated Passengers. Home Self-Test. Instant Booking Reference Number issued by email', '100 % Specificity\n98.0 % Accuracy\n96.1% Sensitivity', 'CE Certificate for Rapid Antigen Self-test kit.\nMHRA certificate (Medicines and Healthcare products Regulatory Agency).\nPublic Health England (PHE) Passed UK Phase3A Evaluation.', '2022-01-28 07:58:27', '2022-01-28 07:58:27', NULL, 115, 'https://xana-bucket.s3.amazonaws.com/testImage%2Frn_image_picker_lib_temp_d77114cf-654a-4dcc-a5fc-4608cb1e946e.jpg', 'COV1080034ACONLFDAG00013014', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `first_name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `middle_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'null',
  `mobile` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'null',
  `passport_number` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `roleId_fk` bigint DEFAULT NULL,
  `address` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'null',
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'null',
  `code` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'null',
  `confirmed` tinyint DEFAULT '0',
  `dob` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `middle_name`, `email`, `mobile`, `passport_number`, `gender`, `company`, `password`, `roleId_fk`, `address`, `image`, `code`, `confirmed`, `dob`) VALUES
(98, 'get', 'setgo', '', 'getsetgo.gsg3@gmail.com', 'null', '0', 'Male ', 'null', '', 1, 'null', 'http://192.168.18.62:5000/uploads/profileImages/test-1638341165535image.png', 'null', 1, '2021-12-01'),
(100, 'Tetsing', 'Account', '', 'wawolav329@terasd.com', '2136458793354', '213767675', 'Female ', 'codistan', '', 1, 'House no g74 FFC township mirpur mathelo,ghotki', 'http://192.168.18.62:5000/uploads/profileImages/test-1638254691299image.png', 'null', 1, '2021-11-30'),
(101, 'waseem', 'khan', NULL, 'mwaseemkha@gmail.com', 'null', NULL, NULL, NULL, 'null', 1, 'null', 'null', 'null', 1, NULL),
(103, 'Ahmed', '', '', 'cetam60992@tinydef.com', '2134997986868', NULL, 'Female ', 'null', '', 1, 'null', 'http://192.168.18.62:5000/uploads/profileImages/test-1638256771871image.png', 'null', 1, '2021-11-30'),
(109, 'syed', 'talha', '', 'syedtalha0305@gmail.com', '546499497', '0', 'Female ', '', '', 1, 'House no 12 street 5 ', 'http://192.168.18.62:5000/uploads/profileImages/test-1638340771915image.png', 'null', 1, '2021-12-01'),
(110, 'Beenish', 'Khan', NULL, 'beenishkhan603@gmail.com', '03046809932', NULL, NULL, NULL, '$2a$12$/aLw9mwK/1LzoJPB3dG1g.5lKYBmudcJz.y90W0pc523/o28WqGyu', 2, 'null', 'null', NULL, 1, NULL),
(111, 'sadia', 'khan', NULL, 'sadia@xanamedtec.com', '03046809932', NULL, NULL, NULL, '$2a$12$CdXweW9tmvi7Q1iLVbD6yedsRjROySQWrN1usRJPnAnhml23qDOZy', 2, 'null', 'null', NULL, 1, NULL),
(112, 'Aliyah', 'Khan', NULL, 'samples@xanamedtec.com', '03046809932', NULL, NULL, NULL, '$2a$12$Xq6KBw63U3IslE3lYmMxBuYQEw2pdL23WrAOS0/nwbQ8nhr.bRj.i', 2, 'null', 'null', NULL, 1, NULL),
(115, '', '', '', 'cejerac778@showbaz.com', '', '', 'Female ', '', '', 1, '', 'https://xana-bucket.s3.amazonaws.com/profileImage%2Fdfe2cf74-5aa6-4395-bc5b-4f4ccead22c7.JPEG', NULL, 1, '2022-01-28'),
(120, 'saqib', 'khan', NULL, 'saqibkhan23@gmail.com', 'null', NULL, NULL, NULL, '', 1, 'null', 'null', 'null', 1, NULL),
(121, 'Saim', 'Danish', NULL, 'saim.danish1@gmail.com', '+92333444555566', NULL, NULL, NULL, '$2a$12$/wwvNo8yX5ubuDQIRiS1teKAuOUgTy7uGMgVhE0h9HOy8Aiug/fny', 1, 'null', 'null', 'null', 1, NULL),
(122, 'FARHANA', 'Aijaz', NULL, 'farhanaaijaz135@gmail.com', '+6228268281', NULL, NULL, NULL, '$2a$12$MWpdKPQUvAIC7eQFDBWeZuc6fqhhQcMpcsH.sNk.zL5cO75hEa9be', 1, 'null', 'null', '7869', 1, NULL),
(123, 'Affan', 'Arshad', NULL, 'affanarshad96@gmail.com', '+923325092209', NULL, NULL, NULL, '$2a$12$/q0KDcuLt7p7qd5jtZzRWevxAM1DWrImK8AXGXIM7Noy4Khc2Nb8y', 1, 'null', 'null', 'null', 1, NULL),
(124, 'Testing', 'Account', NULL, 'farhanaaijaz76@gmail.com', '+627188126728', NULL, NULL, NULL, '$2a$12$Dmirz1DVgHsich5IIHlUMeUdec9wjPwNrHKJEfua7y8ZLUg8.mLWi', 1, 'null', 'null', 'null', 1, NULL);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `test_info`
--
ALTER TABLE `test_info`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=437;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

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
