-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: xana
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `reportId` bigint NOT NULL AUTO_INCREMENT,
  `orderId` bigint DEFAULT NULL,
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
  `result` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`reportId`),
  KEY `email_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,3,'Hamza','Latif','2002-01-02',1812354,'Sinopharm','Xana Companies','2 doses of sinopharm','Test is valid for 6 months','Aroynd the globe','2021-01-01','2021-01-03','negative'),(2,1,3,'Hamid','Ayub','2001-03-10',41244521,'Sinopharm','Xana Companies','2 doses of sinopharm','Test is valid for 6 months','Aroynd the globe','2021-02-06','2021-02-08','negative'),(3,1,4,'Abdul','Rafay','1998-05-17',87944521,'Sinopharm','Xana Companies','2 doses of sinopharm','Test is valid for 6 months','Aroynd the globe','2021-05-06','2021-05-08','negative');
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
-- Table structure for table `test_info`
--

DROP TABLE IF EXISTS `test_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `testName` varchar(150) DEFAULT NULL,
  `dateRegister` timestamp NULL DEFAULT NULL,
  `dateConduct` timestamp NULL DEFAULT NULL,
  `dateManufacture` timestamp NULL DEFAULT NULL,
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
  `name` varchar(250) DEFAULT 'null',
  `email` varchar(250) DEFAULT 'null',
  `mobile` varchar(45) DEFAULT 'null',
  `password` varchar(1000) DEFAULT 'null',
  `roleId_fk` bigint DEFAULT NULL,
  `address` varchar(500) DEFAULT 'null',
  `image` varchar(500) DEFAULT 'null',
  `token` varchar(1000) DEFAULT 'null',
  `confirmed` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Salman Ahmed','salman123@gmail.com',NULL,NULL,1,NULL,NULL,NULL,0),(4,'Abdul Rafay','rafay@gmail.com',NULL,NULL,1,NULL,NULL,NULL,0),(6,'Haris Sohail','harishsohail@gmail.com',NULL,NULL,1,NULL,NULL,NULL,0),(15,'Haris Sohail','harissohail@gmail.com',NULL,NULL,1,NULL,NULL,NULL,0),(16,'Ammar Junaid','ammar@gmail.com',NULL,NULL,1,NULL,NULL,NULL,0),(19,'Sawaira Waheed','sawi@gmail.com',NULL,NULL,1,NULL,NULL,NULL,0),(21,'Sania','sania@gmail.com',NULL,NULL,1,NULL,NULL,NULL,0),(31,'Sajid','sajid@gma1il.com',NULL,NULL,1,NULL,NULL,NULL,0),(46,'Hamid Ayub','hamidayb123@gmail.com','03046809932','$2b$10$kO9tOtxOfSKhjSOpgv4cfecetiMtbKodDoLld95dFyPySM21MpIJW',1,'null','null','null',1),(47,'Hamid Ayub','hamidayb1211@gmail.com','03046809932','$2b$10$sqJJwMcK1Z.WmdOsWFisNefWCg/XmlnadjLSuE9H6PS71q/xalhZ2',1,'null','null','null',0),(55,'pitagow521','hebatey315@stvbz.com','03046809932','$2b$10$e01Rrj5ZNlGwYseqi3X6YO5H7UqGFIIXUEvPHdfBT7maKjaHGLOra',1,'null','null',NULL,1),(56,'Ali ','Ali@gmail.com','03331234567','$2b$10$a3agPIU43iT3iEpcryWwkeyWgdfUpvLL698oaZv7qI4RHM0htpYU6',1,'null','null','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTYsImVtYWlsIjoiQWxpQGdtYWlsLmNvbSIsImlhdCI6MTYzMTY5MTgzMCwiZXhwIjoxNjMxNjk1NDMwfQ.NiQtU1MR95mnbwlStZ1oY4yI7PvrdAP4laWb-KNuFz4',0),(57,'Saim Danish','saim.danish1@gmail.com','03035867647','$2b$10$rlNZTsIEu1WSSVfjuqsWj.nNRnm40wEKmhQsO4yh3D.d3woY5dKmq',1,'null','null',NULL,1),(59,'liyev99542','liyev99542@shensufu.com','03046809932','$2b$10$wl7STh2.EMgisMwBW5/ycOaV1GARPaDcoJu1jI3X.VNN5LDYGpQz2',1,'null','null',NULL,1),(60,'Farhana Aijaz','farhanaaijaz76@gmail.com','03025404559','$2b$10$6iDfXODXRRBMPd8vroGjaeTMpmzbJUg5Pu13lCO4DE642pXFPAJiK',1,'null','null','null',1),(61,'Farhana','xonan19774@rerunway.com','03025404559','$2b$10$l9/pOIDledEzKd2PrpS./eewS3kGVDqrcuzil85rpp.UuDEZjFvvK',1,'null','null','null',1);
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

-- Dump completed on 2021-09-16 12:24:30
