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
-- Table structure for table `ChatRoomContent`
--

DROP TABLE IF EXISTS `ChatRoomContent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ChatRoomContent` (
  `chatRoomContentId` bigint(20) NOT NULL AUTO_INCREMENT,
  `time` datetime(6) DEFAULT NULL,
  `chatRoomId` bigint(20) DEFAULT NULL,
  `chatRoomPhotoId` bigint(20) DEFAULT NULL,
  `contentId` bigint(20) DEFAULT NULL,
  `memberId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`chatRoomContentId`),
  KEY `FKdq6av3ni8muk08a24a3i2kgyk` (`chatRoomId`),
  KEY `FKhs0ym01lgwfsdcgnjbh396dyv` (`chatRoomPhotoId`),
  KEY `FK74fm1yvxhkep9qe2r8v3en61o` (`contentId`),
  KEY `FKlbe3kvtw0paal8o0hmumj93ug` (`memberId`),
  CONSTRAINT `FK74fm1yvxhkep9qe2r8v3en61o` FOREIGN KEY (`contentId`) REFERENCES `ContentDetail` (`contentId`),
  CONSTRAINT `FKdq6av3ni8muk08a24a3i2kgyk` FOREIGN KEY (`chatRoomId`) REFERENCES `ChatRoom` (`chatRoomId`),
  CONSTRAINT `FKhs0ym01lgwfsdcgnjbh396dyv` FOREIGN KEY (`chatRoomPhotoId`) REFERENCES `ChatRoomPhoto` (`chatRoomPhotoId`),
  CONSTRAINT `FKlbe3kvtw0paal8o0hmumj93ug` FOREIGN KEY (`memberId`) REFERENCES `Member` (`memberId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 11:35:03
