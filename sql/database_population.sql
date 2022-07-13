USE coop_items_db;

INSERT INTO teams (id, name) VALUES ('123', 'Radio 2090');

INSERT INTO users (name, teamId) VALUES ('Henrique', '123'), ('Dodô', '123'), ('Matheus', '123');

INSERT INTO scoreLists (id, teamId, totalScore) VALUES
(1, '123', 2), (2, '123', 4), (3, '123', 4), (4, '123', 3), (5, '123', 4),
(6, '123', 6), (7, '123', 5), (8, '123', 7), (9, '123', 3), (10, '123', 7),
(11, '123', 9), (12, '123', 9), (13, '123', 5), (14, '123', 6), (15, '123', 6),
(16, '123', 3), (17, '123', 3), (18, '123', 3), (19, '123', 3), (20, '123', 3),
(21, '123', 3), (22, '123', 3), (23, '123', 3), (24, '123', 3);

INSERT INTO scores (scoreListId, teamId, userName, score) VALUES
(1, '123', 'Henrique', 1), (1, '123', 'Dodô', 1), 	(1, '123', 'Matheus', 0),
(2, '123', 'Henrique', 1), (2, '123', 'Dodô', 3), 	(2, '123', 'Matheus', 0),
(3, '123', 'Henrique', 1), (3, '123', 'Dodô', 0), 	(3, '123', 'Matheus', 3),
(4, '123', 'Henrique', 3), (4, '123', 'Dodô', 0), 	(4, '123', 'Matheus', 0),
(5, '123', 'Henrique', 1), (5, '123', 'Dodô', 0), 	(5, '123', 'Matheus', 3),
(6, '123', 'Henrique', 3), (6, '123', 'Dodô', 0), 	(6, '123', 'Matheus', 3),
(7, '123', 'Henrique', 1), (7, '123', 'Dodô', 3), 	(7, '123', 'Matheus', 1),
(8, '123', 'Henrique', 3), (8, '123', 'Dodô', 3), 	(8, '123', 'Matheus', 1),
(9, '123', 'Henrique', 1), (9, '123', 'Dodô', 1), 	(9, '123', 'Matheus', 1),
(10, '123', 'Henrique', 1), (10, '123', 'Dodô', 3), (10, '123', 'Matheus', 3),
(11, '123', 'Henrique', 3), (11, '123', 'Dodô', 3), (11, '123', 'Matheus', 3),
(12, '123', 'Henrique', 3), (12, '123', 'Dodô', 3), (12, '123', 'Matheus', 3),
(13, '123', 'Henrique', 1), (13, '123', 'Dodô', 1), (13, '123', 'Matheus', 3),
(14, '123', 'Henrique', 3), 						(14, '123', 'Matheus', 3),
(15, '123', 'Henrique', 3), 						(15, '123', 'Matheus', 3),
(16, '123', 'Henrique', 3), (17, '123', 'Henrique', 3), (18, '123', 'Henrique', 3),
(19, '123', 'Henrique', 3), (20, '123', 'Henrique', 3), (21, '123', 'Henrique', 3),
(22, '123', 'Henrique', 3), (23, '123', 'Henrique', 3), (24, '123', 'Henrique', 3);

INSERT INTO items (name, teamId, scoreListId) VALUES
("4 Non Blondes - What's Up", '123', 1),
('The Cure - Fascination Street', '123', 2),
('Dire Straits - Sultans Of Swing', '123', 3),
('Placebo - The Bitter End', '123', 4),
('Steppenwolf - Born To Be Wild', '123', 5),
("RHCP - Can't Stop", '123', 6),
('Alice In Chains - Man In The Box', '123', 7),
('Alice In Chains - Would?', '123', 8),
('Nirvana - Come As You Are', '123', 9),
('Nirvana - The Man Who Sold The World', '123', 10),
('Foo Fighters - Everlong', '123', 11),
('Pearl Jam - Alive', '123', 12),
('Deep Purple - Smoke On The Water', '123', 13),
('Limp Bizkit - My Way', '123', 14),
('Soundgarden - Black hole sun', '123', 15),
('Green Day - Basket Case', '123', 16),
('Depeche Mode - Enjoy The Silence', '123', 17),
('Pearl Jam - Jeremy', '123', 18),
('Pearl Jam - Better Man', '123', 19),
("Oasis - Don't Go Away", '123', 20),
("Oasis - Don't Look Back In Anger", '123', 21),
('The Strokes - Reptilla', '123', 22),
('Millencolin - No Cigar', '123', 23),
('Silverchair - Freak', '123', 23);

SELECT table_schema, SUM((data_length+index_length)/1024) AS "Size in Kb" FROM information_schema.tables GROUP BY table_schema;
