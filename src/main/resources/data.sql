-- SQLINES DEMO FOR MYSQL

-- ------------------------------------------------------
-- Server version 5.5.5-10.3.39-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment` (
  `equipment_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `purchase_url` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`equipment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `journal`
--

DROP TABLE IF EXISTS `journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `journal` (
  `journal_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `equipment_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `purchased_date` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`journal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `journal_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `article_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL UNIQUE,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `content` text,
  `category_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`article_id`),
  KEY `FK_article_category` (`category_id`),
  CONSTRAINT `FK_article_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `category` (`name`, `slug`, `description`) VALUES
('Camping', 'camping', '캠핑과 관련된 다양한 정보와 팁을 제공합니다.');

INSERT INTO article (slug, title, author, description, content, category_id, created_at, updated_at) VALUES
('beginner-camping-guide', '초보 캠퍼를 위한 완벽 가이드', '캠핑마스터', '캠핑을 처음 시작하는 분들을 위한 필수 장비, 준비물, 그리고 안전 수칙을 담은 가이드입니다.', '캠핑은 자연 속에서 휴식을 취하고 새로운 경험을 할 수 있는 멋진 활동입니다. 하지만 처음 시작하는 초보 캠퍼들에게는 무엇부터 준비해야 할지 막막하게 느껴질 수 있습니다. 이 가이드에서는 텐트, 침낭, 코펠 등 필수 캠핑 장비부터 캠핑장 선택 요령, 그리고 안전하고 즐거운 캠핑을 위한 팁까지, 초보 캠퍼가 알아야 할 모든 것을 자세히 알려드립니다. 자연과 함께하는 잊지 못할 추억을 만들어 보세요!', (SELECT category_id FROM category WHERE slug = 'camping'), NOW(), NOW());

INSERT INTO article (slug, title, author, description, content, category_id, created_at, updated_at) VALUES
('easy-camping-recipes', '캠핑 요리의 모든 것: 쉽고 맛있는 레시피 5가지', '요리하는 캠퍼', '캠핑장에서 간편하게 만들 수 있는 맛있고 특별한 요리 레시피 5가지를 소개합니다. 자연 속에서 미식의 즐거움을 경험하세요!', '캠핑의 꽃은 역시 맛있는 음식이죠! 복잡한 준비 없이도 캠핑의 분위기를 한껏 살려줄 수 있는 쉽고 맛있는 레시피 5가지를 준비했습니다. 바비큐, 찌개, 볶음밥, 그리고 특별한 디저트까지, 다양한 메뉴로 캠핑의 밤을 더욱 풍성하게 만들어 보세요. 간단한 재료와 조리법으로 누구나 쉽게 따라 할 수 있습니다. 캠핑장에서의 식사가 단순한 끼니가 아닌, 특별한 추억이 될 수 있도록 도와드립니다.', (SELECT category_id FROM category WHERE slug = 'camping'), NOW(), NOW());

INSERT INTO article (slug, title, author, description, content, category_id, created_at, updated_at) VALUES
('eco-friendly-camping-tips', '지속 가능한 캠핑을 위한 친환경 팁', '그린 캠퍼', '아름다운 자연을 보호하며 캠핑을 즐기기 위한 친환경 실천 방법들을 알아봅니다. 우리 모두 지속 가능한 캠핑 문화를 만들어가요.', '캠핑은 자연을 만끽하는 활동이지만, 동시에 자연에 영향을 줄 수도 있습니다. 지속 가능한 캠핑은 우리가 사랑하는 자연을 다음 세대에게도 물려주기 위한 중요한 실천입니다. 이 글에서는 쓰레기 줄이기, 친환경 세제 사용, 불 피우기 주의사항 등 환경을 보호하면서 캠핑을 즐길 수 있는 다양한 팁을 제공합니다. 작은 실천들이 모여 큰 변화를 만들 수 있습니다. 우리 모두 책임감 있는 캠퍼가 되어 아름다운 자연을 지켜나가요.', (SELECT category_id FROM category WHERE slug = 'camping'), NOW(), NOW());

INSERT INTO article (slug, title, author, description, content, category_id, created_at, updated_at) VALUES
('tent-selection-guide', '나에게 딱 맞는 텐트 고르기: 완벽 가이드', '텐트 전문가', '수많은 텐트 종류 속에서 어떤 텐트를 선택해야 할지 막막하신가요? 캠핑 스타일, 인원, 계절, 예산에 맞춰 최적의 텐트를 선택하는 방법을 알려드립니다.', '텐트는 캠핑의 가장 기본이 되는 장비이자, 자연 속 나의 집입니다. 따라서 어떤 텐트를 선택하느냐가 캠핑의 전체적인 만족도를 좌우할 수 있습니다. 이 가이드에서는 돔 텐트, 터널형 텐트, 티피 텐트 등 다양한 텐트의 종류와 각각의 장단점을 비교 분석하고, 나의 캠핑 스타일에 맞는 텐트를 고르는 노하우를 공유합니다. 또한, 텐트의 재질, 방수 기능, 설치 편의성 등 구매 전 반드시 확인해야 할 체크리스트와 예산별 추천 제품까지, 텐트 선택에 대한 모든 궁금증을 해결해 드립니다.', (SELECT category_id FROM category WHERE slug = 'camping'), NOW(), NOW());

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-23  2:40:23
