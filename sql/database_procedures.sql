USE coop_items_db;

DELIMITER //
DROP PROCEDURE IF EXISTS GetItemToVote //
CREATE PROCEDURE GetItemToVote(arg_teamId VARCHAR(4), arg_userName VARCHAR(20))
BEGIN
SELECT name FROM items a JOIN
(
	SELECT a.scoreListId FROM
	(SELECT DISTINCT scoreListId FROM scores WHERE teamId = arg_teamId) a LEFT JOIN
	(SELECT DISTINCT scoreListId FROM scores WHERE userName = arg_userName AND teamId = arg_teamId) b ON a.scoreListId = b.scoreListId
	WHERE b.scoreListId IS NULL LIMIT 1
) b ON a.scoreListId = b.scoreListId;
END //

DELIMITER //
DROP PROCEDURE IF EXISTS GetTeam //
CREATE PROCEDURE GetTeam(arg_teamId VARCHAR(4))
BEGIN
	SELECT name FROM teams WHERE id=arg_teamId LIMIT 1;
END //

DELIMITER //
DROP PROCEDURE IF EXISTS GetUsers //
CREATE PROCEDURE GetUsers(arg_teamId VARCHAR(4))
BEGIN
	SELECT name FROM users WHERE teamId=arg_teamId;
END //

DELIMITER //
DROP PROCEDURE IF EXISTS GetItems //
CREATE PROCEDURE GetItems(arg_teamId VARCHAR(4))
BEGIN
	SELECT a.name, a.scoreListId, b.totalScore FROM items a INNER JOIN scoreLists b ON a.scoreListId = b.id WHERE a.teamId=arg_teamId;
END //

DELIMITER //
DROP PROCEDURE IF EXISTS GetScores //
CREATE PROCEDURE GetScores(arg_teamId VARCHAR(4))
BEGIN
	SELECT scoreListId, userName, score FROM scores WHERE teamId = arg_teamId;
END //

DELIMITER //
DROP PROCEDURE IF EXISTS AddUserIfNotExists //
CREATE PROCEDURE AddUserIfNotExists(arg_teamId VARCHAR(4), arg_name VARCHAR(20))
BEGIN
	INSERT IGNORE INTO users (name, teamId) VALUES (arg_name, arg_teamId);
END //

DELIMITER //
DROP PROCEDURE IF EXISTS AddItem //
CREATE PROCEDURE AddItem(arg_teamId VARCHAR(4), arg_userName VARCHAR(20), arg_itemName VARCHAR(45))
BEGIN
	INSERT IGNORE INTO scoreLists (id, teamId, totalScore) VALUES (NULL, arg_teamId, 3);
	INSERT IGNORE INTO scores (scoreListId, teamId, userName, score) VALUES (LAST_INSERT_ID(), arg_teamId, arg_userName, 3);
	INSERT IGNORE INTO items (name, teamId, scoreListId) VALUES (arg_itemName, arg_teamId, LAST_INSERT_ID());
END //

DELIMITER //
DROP PROCEDURE IF EXISTS VoteItem //
CREATE PROCEDURE VoteItem(arg_teamId VARCHAR(4), arg_userName VARCHAR(20), arg_itemName VARCHAR(45), arg_score TINYINT)
BEGIN
	SELECT scoreListId FROM items WHERE name = arg_itemName AND teamId = arg_teamId INTO @resultScoreListId;
	INSERT IGNORE INTO scores (scoreListId, teamId, userName, score) VALUES (@resultScoreListId, arg_teamId, arg_userName, arg_score);
    UPDATE scoreLists SET totalScore = totalScore + arg_score WHERE id = @resultScoreListId;
END //

# CALL VoteItem("123", "Henrique", "Steppenwolf - Born To Be Wild", 1);
# CALL AddItem("123", "Matheus", "Steppenwolf - Born To Be Wild");
# CALL GetItemToVote("123","Dodô");
# CALL GetItems("123");
# CALL GetUsers("123");
# CALL GetItems("123");