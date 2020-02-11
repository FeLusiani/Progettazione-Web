-- Progettazione Web 
DROP DATABASE if exists bhm_db; 
CREATE DATABASE bhm_db; 
USE bhm_db; 
-- MySQL dump 10.13  Distrib 5.6.20, for Win32 (x86)
--
-- Host: localhost    Database: bhm_db
-- ------------------------------------------------------
-- Server version	5.6.20

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
-- Table structure for table `schede`
--

DROP TABLE IF EXISTS `schede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schede` (
  `username` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `_LV` int(11) DEFAULT NULL,
  `_FOR` int(11) DEFAULT NULL,
  `_DEX` int(11) DEFAULT NULL,
  `_COS` int(11) DEFAULT NULL,
  `_INT` int(11) DEFAULT NULL,
  `_SAG` int(11) DEFAULT NULL,
  `_CAR` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schede`
--

LOCK TABLES `schede` WRITE;
/*!40000 ALTER TABLE `schede` DISABLE KEYS */;
INSERT INTO `schede` VALUES ('pippo',1,'Alexander Hamilton','Un carismatico e perspicace comandante di polizia, e il marito della dottoressa Schyuler.\n\nQuando qualcuno cerca di contraddire il signor Hamilton, deve superare una prova contrapposta di Carisma.\n\nIn caso di fallimento, Hamilton riesce a convincere il proprio interlocutore.',9,10,8,13,15,11,16),('pippo',2,'Dott. Elizabeth Schyuler','La Dott. Schyuler Ã¨ tra i massimi esperti sulla recente epidemia che ha colpito il Paese.\n\nQuando ispeziona un cadavere, puÃ² eseguire una prova di Intelligenza, CD 12.\nIn caso di successo, riesce ad identificare correttamente il momento e le cause del decesso.',7,7,12,9,17,15,11),('pippo',3,'Mary Schyuler','L\'anziana madre della dottoressa Elizabeth Schuyler.\n\nI suoi hobby sono il ricamo, giocare a bridge con le amiche, e risolvere occasionalmente casi di omicidi avvenuti in circostanze misteriose.\n\nQuando si trova sulla scena di un delitto, Mary puÃ² eseguire una prova di Saggezza, CD 7.\nIn caso di successo, riesce a notare un qualche indizio sul colpevole o sulla vittima.',12,4,6,7,20,19,13),('pippo',4,'Il Jack di Quadri','Un criminale diventato recentemente celebre per una serie di notevoli furti.\n\nNessuno sa quale sia il suo vero nome.\n\nQuando qualcuno prova ad inseguire il Jack di Quadri, deve eseguire una prova contrapposta di Destrezza.\n\nIn caso di fallimento, il Jack di Quadri riesce a seminare il proprio inseguitore.',5,13,17,13,16,9,15),('paperino',6,'Sirio','Un Elfo delle Lande.\n\nAbile nell\'uso della lancia e dell\'arco.\n\nQuando colpisce una creatura con una lancia, questa deve eseguire una prova contrapposta di Forza.\n\nIn caso di fallimento, la creatura colpita viene buttata a terra.',3,12,13,9,13,12,7),('paperino',7,'Lily','Una sacerdotessa della Dea Bendata.\n\nFequenta spesso il porto, dove trova facilmente gente con cui giocare a carte, e magari scommettere qualche soldo.\n\nQuando l\'esito di una situazione Ã¨ determinato dal caso, Lily puÃ² eseguire una prova di Saggezza CD10.\nIn caso di successo, puÃ² decidere qual\'Ã¨ l\'esito dell\'evento.\n\nSe una creatura ha punteggio di Saggezza maggiore di quello di Lily, puÃ² capire se Lily usa questa abilitÃ  semplicemente osservandola.\n',3,8,14,16,12,12,13),('paperino',8,'Baba Yaga - La Strega della Laguna','Girano molti racconti su Baba Yaga, e i viandanti che si dirigono a Nord preferiscono non passare troppo vicino alla Laguna.\n\n- Richiamo dell\'Acqua:\nBaba Yaga puÃ² utilizzare questa abilitÃ  su qualunque creatura che si trovi nella Laguna e a contatto con l\'acqua.\nSe la creatura non supera una prova di Intelligenza con CD 10, deve muoversi verso il centro della Laguna, dove risiede Baba Yaga.',17,5,4,7,16,20,18),('paperino',9,'Iris','La sorella maggiore di Sirio, e un\'abile spadaccina.\n\nCirca una settimana fa, Ã¨ misteriosamente scomparsa.\n\nAlcuni dicono di averla vista dirigersi a Nord, verso la Laguna.',5,15,16,14,10,8,8),('pippo',10,'Robert Hillson, Grande Duca di York','Un amabile e ricco signore di mezza etÃ .\n\nDa tempo non si fa vedere in cittÃ , e passa le sue giornate in una villa nel mezzo della campagna, a curare le sue siepi di rose esotiche e i suoi pavoni colorati.\n\nC\'Ã¨ chi dice, tuttavia, di averlo visto in visita dalla signora Mary Schyuler un paio di settimane fa.',5,11,10,12,8,11,13);
/*!40000 ALTER TABLE `schede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('paperino','paperino','2019-08-25 15:05:33'),('pippo','pippo','2019-08-25 13:26:41');
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

-- Dump completed on 2019-08-31 15:12:11
