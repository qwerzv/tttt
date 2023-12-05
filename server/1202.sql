-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: lostarkpvp
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `ClassCode` int NOT NULL,
  `ClassName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ClassCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hit`
--

DROP TABLE IF EXISTS `hit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hit` (
  `HitCode` int NOT NULL,
  `HitName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`HitCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hit`
--

LOCK TABLES `hit` WRITE;
/*!40000 ALTER TABLE `hit` DISABLE KEYS */;
INSERT INTO `hit` VALUES (1,'약경직'),(2,'강경직');
/*!40000 ALTER TABLE `hit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `JobCode` int DEFAULT NULL,
  `JobName` varchar(45) NOT NULL,
  `ClassCode` int DEFAULT NULL,
  PRIMARY KEY (`JobName`),
  KEY `ClassCode` (`ClassCode`),
  CONSTRAINT `job_ibfk_1` FOREIGN KEY (`ClassCode`) REFERENCES `class` (`ClassCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (NULL,'건슬링어',NULL),(NULL,'기공사',NULL),(NULL,'기상술사',NULL),(NULL,'데모닉',NULL),(NULL,'데빌헌터',NULL),(NULL,'도화가',NULL),(NULL,'디스트로이어',NULL),(NULL,'리퍼',NULL),(NULL,'바드',NULL),(NULL,'배틀마스터',NULL),(NULL,'버서커',NULL),(NULL,'블래스터',NULL),(NULL,'블레이드',NULL),(NULL,'서머너',NULL),(NULL,'소서리스',NULL),(NULL,'소울이터',NULL),(NULL,'스카우터',NULL),(NULL,'스트라이커',NULL),(NULL,'슬레이어',NULL),(NULL,'아크라나',NULL),(NULL,'워로드',NULL),(NULL,'인파이터',NULL),(NULL,'창술사',NULL),(NULL,'호크아이',NULL),(NULL,'홀리나이트',NULL);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `Num` int NOT NULL AUTO_INCREMENT,
  `Contents` varchar(500) DEFAULT NULL,
  `Me` varchar(45) DEFAULT NULL,
  `You` varchar(45) DEFAULT NULL,
  `SkillName1` varchar(600) DEFAULT NULL,
  `SkillName2` varchar(45) DEFAULT NULL,
  `SkillName3` varchar(45) DEFAULT NULL,
  `SkillName4` varchar(45) DEFAULT NULL,
  `SkillName5` varchar(45) DEFAULT NULL,
  `id` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Num`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (88,'디스트로이어의[러닝 크래쉬][어스 이터]를[카운터 스피어]로 막는다','워로드','디스트로이어','러닝 크래쉬','어스 이터','카운터 스피어',NULL,NULL,'삭제하지마','asdf'),(92,'디스트로이어의[러닝 크래쉬][어스 이터]를[카운터 스피어]로 막는다','워로드','디스트로이어','러닝 크래쉬','어스 이터','카운터 스피어',NULL,NULL,'심리전고수','aaaa'),(93,'[마운틴 크래쉬][숄더 차지][윈드 블레이드]','버서커','워로드','마운틴 크래쉬','숄더 차지','윈드 블레이드',NULL,NULL,'apple','1111'),(94,'[갈고리 사슬][대쉬 어퍼 파이어][방패 돌진]','워로드','워로드','갈고리 사슬','대쉬 어퍼 파이어','방패 돌진',NULL,NULL,'zzz','1111');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `JobCode` int DEFAULT NULL,
  `SkillName` varchar(45) NOT NULL,
  `SkillEx` varchar(500) DEFAULT NULL,
  `DefHit` varchar(45) DEFAULT NULL,
  `AttHit` varchar(45) DEFAULT NULL,
  `SkillImg` varchar(200) DEFAULT NULL,
  `JobName` varchar(45) DEFAULT NULL,
  `TripodName1` varchar(200) DEFAULT NULL,
  `TripodEx1` varchar(200) DEFAULT NULL,
  `TripodName2` varchar(200) DEFAULT NULL,
  `TripodEx2` varchar(200) DEFAULT NULL,
  `TripodName3` varchar(200) DEFAULT NULL,
  `TripodEx3` varchar(200) DEFAULT NULL,
  `TripodName4` varchar(200) DEFAULT NULL,
  `TripodEx4` varchar(200) DEFAULT NULL,
  `TripodName5` varchar(200) DEFAULT NULL,
  `TripodEx5` varchar(200) DEFAULT NULL,
  `TripodName6` varchar(200) DEFAULT NULL,
  `TripodEx6` varchar(200) DEFAULT NULL,
  `TripodName7` varchar(200) DEFAULT NULL,
  `TripodEx7` varchar(200) DEFAULT NULL,
  `TripodName8` varchar(200) DEFAULT NULL,
  `TripodEx8` varchar(200) DEFAULT NULL,
  `SkillThumb` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`SkillName`),
  KEY `JobCode` (`JobCode`),
  KEY `job_ibfk_1_idx` (`JobName`),
  CONSTRAINT `skill_job` FOREIGN KEY (`JobName`) REFERENCES `job` (`JobName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (NULL,'갈고리 사슬','갈고리 사슬을 길게 뻗어 83의 피해를 주고 적중된 적을 자신의 앞으로 끌어오며 94의 피해를 준다.','','','/images/3-1701531461694.gif','워로드',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/3Tja-1701531461695.png'),(NULL,'대쉬 어퍼 파이어','3m 전진하며 창을 쳐올려 85의 피해를 주고 상대를 공중에 띄운다. 추가 입력을 통해 포격 공격을 하여 337의 피해를 준다.','','','/images/1-1701531352174.gif','워로드',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/1Tja-1701531352176.png'),(NULL,'러닝 크래쉬','홀딩 시 전방으로 질주하여 적에게 부딪혀 7회 걸쳐 총 372 피해를 주고 홀딩 완료 또는 키 입력을 때는 순간 중력에너지가 폭발하며 124의 피해를 주며 적중된 적을 띄워 올린다','','','/images/2-1701530796761.gif','디스트로이어',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/2Tja-1701530796764.png'),(NULL,'마운틴 크래쉬','한 발을 강하게 바닥으로 내리쳐 반경 4m 내의 적에게 198의 [토] 속성 피해를 주고, 3.0초간 지진 상태로 만든다.','','','/images/2-1701531216332.gif','버서커',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/2Tja-1701531216333.png'),(NULL,'방패 돌진','방패로 전방을 방어하며 빠르게 돌진한다. 돌진 공격 중에는 매 타격마다 51의 피해를 준다.','','','/images/2-1701531391021.gif','워로드',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/2Tja-1701531391024.png'),(NULL,'숄더 차지','지정된 방향으로 7m 돌진하며 경로상의 적들에게 총 151의 피해를 준다.','','','/images/1-1701531147796.gif','버서커',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/1Tja-1701531147797.png'),(NULL,'어스 이터','해머를 앞에서 뒤쪽으로 넘기면서 뒤쪽의 땅을 치며 적에게 피해를 285주고, 그대로 해머를 횡으로 휘두르면서 몸 전체를 회전시키면 바위 파편들이 해머에 붙어서 따라온다. 총 3회 회전하며 첫 번째 회전에서는 62의 피해를 두 번째 회전에서는 79의 피해를 세 번째 회전에서는 97의 피해를 준다. 한번 회전할 때마다 해머의 높이가 점점 올라가고, 세 번째 회전한 뒤 그대로 전방을 내려치면 바위 파편이 뒤따르면서 341의 피해를 준다.','','','/images/4-1701530974490.gif','디스트로이어',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/4Tja-1701530974493.png'),(NULL,'윈드 블레이드','	대검을 휘두르며 이동하면서 583의 피해를 준다. 이동 중 모험가 및 일반 몬스터와 충돌이 무시된다.','','','/images/4-1701531294924.gif','버서커',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/4-1701531294925.png'),(NULL,'인듀어 페인','제자리에서 포효하면 주변 반경 6m 내의 적들에게 494의 피해를 준다. 스킬 사용 시 4초 동안 피격이상에 면역되고 받는 피해 15% 감소하며, 특정 보스 등급 이상에게 피격 시 발생하는 페널티 게이지가 50%감소한다. 공격 적중 시 중력 코어 3개를 획득한다.','','','/images/5-1701531016498.gif','디스트로이어',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/5Tja-1701531016501.png'),(NULL,'점핑 스매쉬','크게 도약하여 10m 내 지정된 위치를 해머로 내려쳐 321의 피해를 준다. 공격 적중 시 중력 코어 2개를 획득한다.','','','/images/1-1701530749586.gif','디스트로이어',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/1ì¸-1701530749592.png'),(NULL,'카운터 스피어','방패로 전방을 2초간 방어하며, 자신의 최대 생명력의 100% 만큼 적의 공격을 막아낼 수 있다. 이때 1초 안에 적의 공격을 방어하면 강력하게 반격하여 767의 피해를 주고 날려버린다.','','','/images/4-1701531494686.gif','워로드',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/4-1701531494688.png'),(NULL,'템페스트 슬래쉬','지정한 방향으로 약 4m가량 돌진하며 대검을 휘둘러 적에게 184의 피해를 주고 공중으로 띄운다. 콤보 입력 시 검을 쥐고 회전하여 129, 129의 피해를 준 후 295의 피해를 주며 내려찍는다.','','','/images/3-1701531260716.gif','버서커',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/3-1701531260719.png'),(NULL,'파워 숄더','몸을 움츠리고 전방으로 해머를 앞세워 5m 가량 돌진하며 4회 걸쳐 총 81 피해를 준다. 이후 콤보 입력 시 두 손으로 해머를 들어 올리며 239 피해를 주며 적중된 적을 띄워 ','','','/images/3-1701530878393.gif','디스트로이어',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/3Tja-1701530878396.png');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tripod`
--

DROP TABLE IF EXISTS `tripod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tripod` (
  `TripodCode` int NOT NULL,
  `SkillName` varchar(45) NOT NULL,
  `TripodName` varchar(45) DEFAULT NULL,
  `TripodEx` varchar(500) DEFAULT NULL,
  `TripodOX` int DEFAULT NULL,
  PRIMARY KEY (`TripodCode`,`SkillName`),
  KEY `tripod_ibfk_1_idx` (`SkillName`),
  CONSTRAINT `tripod_ibfk_1` FOREIGN KEY (`SkillName`) REFERENCES `skill` (`SkillName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tripod`
--

LOCK TABLES `tripod` WRITE;
/*!40000 ALTER TABLE `tripod` DISABLE KEYS */;
/*!40000 ALTER TABLE `tripod` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-03  2:07:14
