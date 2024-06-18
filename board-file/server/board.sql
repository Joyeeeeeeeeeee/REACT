CREATE `board` (
    `no` int NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(80) NOT NULL,
    `writer` VARCHAR(80) NOT NULL DEFAULT '0',
    `content` TEXT NOT NULL DEFAULT '0',
    `reg_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `upd_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `views` int NULL DEFAULT 0,
    PRIMARY KEY (`no`)
)

SELECT * FROM board;

CREATE TABLE `todo` (
  `no` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `status` int DEFAULT '0',
  `reg_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `upd_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`no`)
) COMMENT='할일';

