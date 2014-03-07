-- Initial database schema for analytics.
-- Create the database first by logging into mysql as root, creating the database
-- and switching to the database:
-- # mysql -uroot -p
-- mysql> create database userballot;
-- mysql> use userballot;
-- mysql> create user `userballot`@`localhost` identified by 'UserBallot!';
-- mysql> flush privileges; 
-- Then run the following queries: 

CREATE TABLE `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `ip` VARCHAR(16),
  `city` VARCHAR(100),
  `postal` VARCHAR(25),
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `visits` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `time` DATETIME NOT NULL,
  `site` VARCHAR(20) NOT NULL,
  `os` VARCHAR(50),
  `browser` VARCHAR(50),
  `returning` VARCHAR(5),
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY `visits_fkey_user_id` (`user_id`) REFERENCES `user` (`id`)   ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `answer` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `site` VARCHAR(20) NOT NULL,
  `visit_id` INT(11) NOT NULL,
  `question` VARCHAR(255) NOT NULL,
  `answer` VARCHAR(10) NOT NULL,
  `time` DATETIME NOT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY `answer_fkey_user_id` (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY `answer_fkey_visit_id` (`visit_id`) REFERENCES `visits` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;