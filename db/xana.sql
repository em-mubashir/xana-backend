CREATE DATABASE  IF NOT EXISTS `xana` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `xana`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: xana
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `qr_codes`
--

DROP TABLE IF EXISTS `qr_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qr_codes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `qr_code` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr_codes`
--

LOCK TABLES `qr_codes` WRITE;
/*!40000 ALTER TABLE `qr_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `qr_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `reportId` bigint NOT NULL AUTO_INCREMENT,
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
  `sampleTime` time DEFAULT NULL,
  `resultDate` date DEFAULT NULL,
  `resultTime` time DEFAULT NULL,
  `result` varchar(45) DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`reportId`),
  KEY `email_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,3,'Hamza','Latif','2002-01-02',1812354,'Sinopharm','Xana Companies','2 doses of sinopharm','Test is valid for 6 months','Aroynd the globe','2021-01-01',NULL,'2021-01-03',NULL,'negative',''),(2,3,'Hamid','Ayub','2001-03-10',41244521,'Sinopharm','Xana Companies','2 doses of sinopharm','Test is valid for 6 months','Aroynd the globe','2021-02-06',NULL,'2021-02-08',NULL,'negative',''),(3,4,'Abdul','Rafay','1998-05-17',87944521,'Sinopharm','Xana Companies','2 doses of sinopharm','Test is valid for 6 months','Aroynd the globe','2021-05-06',NULL,'2021-05-08',NULL,'negative',''),(4,4,'Abdul','Rafay','1998-05-17',87944521,'Sinopharm','Xana Companies','2 doses of sinopharm','Test is valid for 6 months','Aroynd the globe','2021-05-06',NULL,'2021-05-08',NULL,'negative','');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` text NOT NULL,
  `user_id` bigint NOT NULL,
  `session_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ip` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_fk_f` (`user_id`),
  CONSTRAINT `user_id_fk_f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (59,'kurzqljjeprmsygyoqj',3,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjozLCJpYXQiOjE2MzQyNzkzNjYsImV4cCI6MTY2NTgzNjk2Nn0.JDp-PIdtrHtyPJIYhvm4Sw0xZ1YdTYKhFmk2-wlpSDQS7xj4OqB8HCFQMAl4w2WbHDAENEN5hz3fDwdYkfk4fb56ygLDar0Ytyj6y0B0mqcQm3FaITU6E4TrvlHYLBUIQRyw3xX4FXY8aCS3W-Dk0HpCeMw7hlupk3BYu8hb_qI',NULL);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_info`
--

DROP TABLE IF EXISTS `test_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `test_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `test_manufacturer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `test_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `test_performance` varchar(500) NOT NULL,
  `test_authorisation` varchar(500) NOT NULL,
  `date_register` timestamp NULL DEFAULT NULL,
  `date_conduct` timestamp NULL DEFAULT NULL,
  `result` varchar(250) DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`userId`),
  CONSTRAINT `id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_info`
--

LOCK TABLES `test_info` WRITE;
/*!40000 ALTER TABLE `test_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_test_pivot`
--

DROP TABLE IF EXISTS `user_test_pivot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_test_pivot` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `test_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `test_id_fk_idx` (`test_id`),
  KEY `user_id_fk_idx` (`user_id`),
  CONSTRAINT `test_id_fk` FOREIGN KEY (`test_id`) REFERENCES `test_info` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_test_pivot`
--

LOCK TABLES `user_test_pivot` WRITE;
/*!40000 ALTER TABLE `user_test_pivot` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_test_pivot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(250) DEFAULT 'null',
  `mobile` varchar(45) DEFAULT 'null',
  `password` varchar(1000) DEFAULT 'null',
  `roleId_fk` bigint DEFAULT NULL,
  `address` varchar(500) DEFAULT 'null',
  `image` varchar(500) DEFAULT 'null',
  `code` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'null',
  `confirmed` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `roleID_FK` (`roleId_fk`),
  CONSTRAINT `roleID_FK` FOREIGN KEY (`roleId_fk`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Salman Ahmed','',NULL,'salman123@gmail.com',NULL,NULL,1,NULL,NULL,NULL,0),(4,'Abdul Rafay','',NULL,'rafay@gmail.com',NULL,NULL,1,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-16 14:16:31
