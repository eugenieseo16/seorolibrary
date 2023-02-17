CREATE DATABASE  IF NOT EXISTS `seoro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `seoro`;
-- MariaDB dump 10.19  Distrib 10.10.2-MariaDB, for Win64 (AMD64)
--
-- Host: i8A209.p.ssafy.io    Database: seoro
-- ------------------------------------------------------
-- Server version	10.3.37-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Member`
--

DROP TABLE IF EXISTS `Member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Member` (
  `memberId` bigint(20) NOT NULL AUTO_INCREMENT,
  `loginType` varchar(255) DEFAULT NULL,
  `memberDongCode` varchar(255) DEFAULT NULL,
  `memberEmail` varchar(255) NOT NULL,
  `memberGenre` bigint(20) DEFAULT NULL,
  `memberName` varchar(255) NOT NULL,
  `memberPassword` varchar(255) NOT NULL,
  `memberProfile` varchar(255) DEFAULT NULL,
  `memberScore` int(11) DEFAULT NULL,
  `withdrawalDate` date DEFAULT NULL,
  PRIMARY KEY (`memberId`),
  UNIQUE KEY `UK_9ctii7xyte7vlof4u3q0mveqj` (`memberEmail`),
  UNIQUE KEY `UK_sklim8fgrtuq5t8mtkk6gts9e` (`memberName`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 11:35:01
