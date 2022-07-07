USE coop_items_db;

INSERT INTO teams (id, name) VALUES ('123', 'Radio 2090');

INSERT INTO users (name, teamId) VALUES ('Henrique', '123'), ('Dodô', '123'), ('Matheus', '123');

INSERT INTO scoreLists (id, teamId, totalScore) VALUES (1, '123', 2), (2, '123', 4), (3, '123', 4), (4, '123', 6);

INSERT INTO scores (scoreListId, teamId, userName, score) VALUES
(1, '123', 'Henrique', 1), (1, '123', 'Dodô', 1), (1, '123', 'Matheus', 0),
(2, '123', 'Henrique', 1), (2, '123', 'Dodô', 3), (2, '123', 'Matheus', 0),
(3, '123', 'Henrique', 1), (3, '123', 'Dodô', 0), (3, '123', 'Matheus', 3),
(4, '123', 'Henrique', 3), (4, '123', 'Matheus', 3);

INSERT INTO items (name, teamId, scoreListId) VALUES
("4 Non Blondes - What's Up", '123', 1),
("The Cure - Fascination Street", '123', 2),
("Dire Straits - Sultans Of Swing", '123', 3),
('Limp Bizkit - My Way', '123', 4);
