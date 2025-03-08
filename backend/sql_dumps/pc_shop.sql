-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.41 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for pc_shop
DROP DATABASE IF EXISTS `pc_shop`;
CREATE DATABASE IF NOT EXISTS `pc_shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pc_shop`;

-- Dumping structure for table pc_shop.product
DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category` enum('cpu','motherboard','gpu','ram','storage','power_supply','case','cooling') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table pc_shop.product: ~43 rows (approximately)
INSERT INTO `product` (`product_id`, `name`, `category`, `price`, `description`, `image_url`) VALUES
	(1, 'AMD Ryzen 9 7900X', 'cpu', 399.99, 'AMD Ryzen 9 7900X is a powerful gaming and streaming desktop processor that comes with 12 CPU cores, 24 threads & a base clock speed of 4.7GHz.', 'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-9-7900x.jpg'),
	(2, 'AMD Ryzen 9 7900', 'cpu', 359.99, 'AMD Ryzen 9 7900 is a powerful gaming and streaming desktop processor that comes with 12 CPU cores, 24 threads & a base clock speed of 3.7GHz.', 'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-9-7900x.jpg'),
	(3, 'AMD Ryzen 5 7600X', 'cpu', 229.99, 'AMD Ryzen 5 7600X comes with 6 CPU cores, & a base clock speed of 4.7GHz.', 'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-5-7600x.jpg'),
	(4, 'AMD Ryzen 5 7600', 'cpu', 199.99, 'AMD Ryzen 5 7600 comes with 6 CPU cores and 12 threads', 'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-5-7600x.jpg'),
	(5, 'AMD Ryzen 7 7700', 'cpu', 299.99, 'AMD Ryzen 5 7700 comes with 6 CPU cores and 12 threads', 'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-7-7700.jpg'),
	(6, 'AMD Ryzen 7 7800X3D', 'cpu', 419.99, 'Whatever the setting, whatever the resolution, lead your team to victory with this incredible gaming processor. Plus, enjoy the benefits of next-gen AMD 3D V-Cache™ technology for low latency and even more game performance.', 'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-7-7800x3d.jpg'),
	(7, 'Intel Core i5-14500', 'cpu', 199.99, 'The Intel Core i5-14500 is a desktop processor with 14 cores, launched in January 2024. It is part of the Core i5 lineup, using the Raptor Lake Refresh architecture with Socket 1700. Intel Hyper-Threading technology is available and effectly doubles the core-count of the P-Cores, to a total of 20 threads. ', 'https://m.media-amazon.com/images/I/61LuKyXGbKL.jpg'),
	(8, 'Intel Core i7-14700F', 'cpu', 249.99, 'The Intel Core i7-14700F is a desktop processor with 20 cores, launched in January 2024. It is part of the Core i7 lineup, using the Raptor Lake Refresh architecture with Socket 1700. Intel Hyper-Threading technology is available and effectly doubles the core-count of the P-Cores, to a total of 28 threads.', 'https://m.media-amazon.com/images/I/51EL514uLrL.jpg'),
	(9, 'Intel Core i9-14900K', 'cpu', 429.99, 'The Intel Core i9-14900K is a desktop processor with 24 cores, launched in October 2023. It is part of the Core i9 lineup, using the Raptor Lake Refresh architecture with Socket 1700. Intel Hyper-Threading technology is available and effectly doubles the core-count of the P-Cores, to a total of 32 threads. ', 'https://img.gigatron.rs/img/products/large/image653107fddb1a6.jpg'),
	(10, 'MSI MPG B850 EDGE TI WIFI', 'motherboard', 299.99, NULL, 'https://www.itsvet.com/f/22/000/000/004/855/1242_1.jpg'),
	(11, 'ASRock B650 STEEL LEGEND WIFI', 'motherboard', 199.99, NULL, 'https://www.itsvet.com/f/22/000/000/004/746/1242_1.jpg'),
	(12, 'Gigabyte B650E AORUS STEALTH ICE', 'motherboard', 189.99, NULL, 'https://www.itsvet.com/f/22/000/000/004/781/1242_1.jpg'),
	(13, 'MSI MAG B760 TOMAHAWK WIFI', 'motherboard', 219.99, NULL, 'https://www.itsvet.com/f/22/000/000/004/506/1242_1.jpg'),
	(14, 'Asus Rog Strix Z790-A Gaming', 'motherboard', 349.99, NULL, 'https://www.itsvet.com/f/22/000/000/004/670/1242_1.jpg'),
	(15, 'Asus ROG MAXIMUS Z790 DARK HERO', 'motherboard', 599.99, NULL, 'https://www.itsvet.com/f/22/000/000/004/648/1242_1.jpg'),
	(16, 'NZXT Kraken 360 RGB ', 'cooling', 199.99, NULL, 'https://www.itsvet.com/f/24/000/000/003/136/1244_1.jpg'),
	(17, 'Corsair iCUE LINK Titan 240 ', 'cooling', 159.99, NULL, 'https://www.itsvet.com/f/24/000/000/003/371/1244_1.jpg'),
	(18, 'Arctic Liquid Freezer III 360 White', 'cooling', 109.99, NULL, 'https://www.itsvet.com/f/24/000/000/003/337/1244_1.jpg'),
	(19, 'Arctic Freezer 36 A-RGB', 'cooling', 29.99, NULL, 'https://www.itsvet.com/f/24/000/000/003/286/1244_1.jpg'),
	(20, 'Kingston FURY Kit 32GB DDR4', 'ram', 54.99, NULL, 'https://www.itsvet.com/f/71/000/000/004/953/1246_1.jpg'),
	(21, 'Kingston FURY RGB 16GB DDR5', 'ram', 69.99, NULL, 'https://www.itsvet.com/f/71/000/000/005/122/1246_1.jpg'),
	(22, 'Corsair Vengeance Kit 16GB DDR4', 'ram', 44.99, NULL, 'https://www.itsvet.com/f/71/000/000/004/435/1246_1.jpg'),
	(23, 'NZXT H7 Elite', 'case', 149.99, NULL, 'https://www.itsvet.com/f/21/000/000/003/930/1241_1.jpg'),
	(24, 'NZXT H5 Flow RGB', 'case', 109.99, NULL, 'https://www.itsvet.com/f/21/000/000/004/383/1241_1.jpg'),
	(25, 'Be Quiet LIGHT BASE 900 FX', 'case', 199.99, NULL, 'https://www.itsvet.com/f/21/000/000/004/337/1241_1.jpg'),
	(26, 'Corsair 3500X White', 'case', 79.99, NULL, 'https://www.itsvet.com/f/21/000/000/004/317/1241_1.jpg'),
	(27, 'FSP CMT195A', 'case', 39.99, NULL, 'https://www.itsvet.com/f/21/000/000/004/216/1241_1.jpg'),
	(28, 'Asus ROG Strix 1000W 80+ Gold', 'power_supply', 199.99, NULL, 'https://www.itsvet.com/f/57/000/000/001/833/1283_1.jpg'),
	(29, 'NZXT 850WGold ', 'power_supply', 169.99, NULL, 'https://www.itsvet.com/f/57/000/000/002/309/1283_1.jpg'),
	(30, 'Seasonic Focus GX ATX 3.1 1000W', 'power_supply', 229.99, NULL, 'https://www.itsvet.com/f/57/000/000/002/312/1283_1.jpg'),
	(31, 'Seasonic G12 GM 650W', 'power_supply', 89.99, NULL, 'https://www.itsvet.com/f/57/000/000/002/315/1283_1.jpg'),
	(32, 'Cooler Master GX3 850W GOLD', 'power_supply', 149.99, NULL, 'https://www.itsvet.com/f/57/000/000/002/212/1283_1.jpg'),
	(33, 'Gigabyte RTX 5080 AERO OC 16GB', 'gpu', 1999.99, NULL, 'https://www.itsvet.com/f/25/000/000/006/752/1245_1.jpg'),
	(34, 'Sapphire RX 7900 XT Nitro+ 20GB', 'gpu', 999.99, NULL, 'https://www.itsvet.com/f/25/000/000/006/261/1245_1.jpg'),
	(35, 'MSI RTX 4070 SUPER 12G', 'gpu', 699.99, NULL, 'https://www.itsvet.com/f/25/000/000/006/583/1245_1.jpg'),
	(36, 'Sapphire RX7700XT Nitro+ 12GB', 'gpu', 459.99, NULL, 'https://www.itsvet.com/f/25/000/000/006/396/1245_1.jpg'),
	(37, 'Asus ROG ASTRALRTX5090 32G', 'gpu', 3999.99, NULL, 'https://www.monitor.rs/uploads_static/1000x1000/83017_25112193153.png'),
	(38, 'Kingston KC3000 1TB', 'storage', 89.99, NULL, 'https://www.itsvet.com/f/40/000/000/005/617/1264_1.jpg'),
	(39, 'Kingston KC3000 2TB', 'storage', 149.99, NULL, 'https://www.itsvet.com/f/40/000/000/005/618/1264_1.jpg'),
	(40, 'Samsung 980 Series 512GB', 'storage', 49.99, NULL, 'https://www.itsvet.com/f/40/000/000/005/430/1264_1.jpg'),
	(41, 'Samsung 990 EVO Plus 1TB', 'storage', 99.99, NULL, 'https://www.itsvet.com/f/40/000/000/006/507/1264_1.jpg'),
	(42, 'Samsung 980 PRO 2TB', 'storage', 159.99, NULL, 'https://www.itsvet.com/f/40/000/000/005/392/1264_1.jpg'),
	(43, 'Crucial T705 1TB GEN5', 'storage', 199.99, NULL, 'https://www.itsvet.com/f/40/000/000/006/479/1264_1.jpg');

-- Dumping structure for table pc_shop.review
DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `review_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `rating` int unsigned NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `fk_review_product_id` (`product_id`),
  KEY `fk_review_user_id` (`user_id`),
  CONSTRAINT `fk_review_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_review_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table pc_shop.review: ~3 rows (approximately)
INSERT INTO `review` (`review_id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`) VALUES
	(1, 2, 1, 4, 'Very fast desktop CPU, but needs great water cooler', '2025-02-25 12:14:53'),
	(2, 3, 2, 5, 'Best power efficient processor', '2025-02-25 14:55:16'),
	(3, 3, 1, 5, 'Powerful streaming desktop CPU', '2025-02-25 15:00:12');

-- Dumping structure for table pc_shop.transaction
DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `transaction_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `total_price` decimal(10,2) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`transaction_id`),
  KEY `fk_transaction_user_id` (`user_id`),
  CONSTRAINT `fk_transaction_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table pc_shop.transaction: ~5 rows (approximately)
INSERT INTO `transaction` (`transaction_id`, `user_id`, `total_price`, `created_at`) VALUES
	(1, 2, 589.98, '2025-02-24 20:47:47'),
	(2, 2, 399.99, '2025-02-24 21:05:49'),
	(3, 3, 199.99, '2025-02-24 21:20:06'),
	(4, 3, 359.99, '2025-02-24 21:27:09'),
	(5, 3, 399.99, '2025-02-25 12:41:42');

-- Dumping structure for table pc_shop.transaction_product
DROP TABLE IF EXISTS `transaction_product`;
CREATE TABLE IF NOT EXISTS `transaction_product` (
  `transaction_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`transaction_id`,`product_id`),
  KEY `fk_transaction_product_product_id` (`product_id`),
  CONSTRAINT `fk_transaction_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_transaction_product_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table pc_shop.transaction_product: ~6 rows (approximately)
INSERT INTO `transaction_product` (`transaction_id`, `product_id`, `quantity`) VALUES
	(1, 2, 1),
	(1, 3, 1),
	(2, 1, 1),
	(3, 7, 1),
	(4, 2, 1),
	(5, 1, 1);

-- Dumping structure for table pc_shop.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `balance` decimal(10,2) unsigned DEFAULT NULL,
  `role` enum('customer','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'customer',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_username` (`username`),
  UNIQUE KEY `uq_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table pc_shop.user: ~3 rows (approximately)
INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `full_name`, `balance`, `role`) VALUES
	(1, 'johndoe', 'johndoe@gmail.com', '$2b$10$UjMVNf2wG9kzfLTDWb.3MeGiBZ/q87FgmBw8ckXYNQGdUli3bCroC', 'John Doe', NULL, 'admin'),
	(2, 'janesmith', 'janesmith@gmail.com', '$2b$10$UJ40j3xtDC3VlnOePxlsH.YblL2Z7CMBRzz2VFxlFkgzdrZW9q4Hu', 'Jane Smith', 600.01, 'customer'),
	(3, 'bobwhite', 'bobwhite@gmail.com', '$2b$10$0pywux48q/AIOu2elrtZt.XzrJpaJlwSG0yXHAZihXIVJZL3/lJJe', 'Bob White', 1040.03, 'customer');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
