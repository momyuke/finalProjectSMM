-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: smm
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employeeId` varchar(36) NOT NULL,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) NOT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `photos` varchar(255) DEFAULT NULL,
  `phone` varchar(13) NOT NULL,
  `familyName` varchar(45) DEFAULT NULL,
  `familyNumber` varchar(15) DEFAULT NULL,
  `bloodType` enum('A','B','O','AB') DEFAULT NULL,
  `hiredDate` date DEFAULT NULL,
  `deptId` int NOT NULL,
  `status` enum('Active','Inactive') DEFAULT NULL,
  PRIMARY KEY (`employeeId`),
  KEY `phone_index` (`phone`),
  KEY `deptId_index` (`deptId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('1','Ridwan','Apa',NULL,NULL,'9871232187',NULL,NULL,'O','2020-03-02',1,'Active'),('c54f9860-6b13-11ea-8e16-3dd56eccb0cf','Teguh','Triprasetya',NULL,NULL,'0897213123',NULL,NULL,'O','2020-03-02',1,'Inactive'),('d1783c50-6b13-11ea-8e16-3dd56eccb0cf','Adella','Fitria',NULL,NULL,'0897213123',NULL,NULL,'O','2020-03-02',1,'Active'),('d70cea80-6b13-11ea-8e16-3dd56eccb0cf','Rafly','SMM',NULL,NULL,'0897213123',NULL,NULL,'O','2020-03-02',1,'Inactive'),('e98f5e30-6b0f-11ea-ad53-a7f87add0823','Ronny','Sugianto',NULL,NULL,'0897213123',NULL,NULL,'O','2020-03-02',1,'Active');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-08 23:07:28
