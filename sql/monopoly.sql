-- This SQL script builds a monopoly database, deleting any pre-existing version.
--
-- @author kvlinden
-- @version Summer, 2015
-- edited by Sam Visser 2024
--

-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS PlayerGame CASCADE;
DROP TABLE IF EXISTS Game CASCADE;
DROP TABLE IF EXISTS Player CASCADE;

DROP TABLE IF EXISTS PlayerProperties CASCADE;
DROP TABLE IF EXISTS Property CASCADE;
DROP TABLE IF EXISTS PlayerPosition CASCADE;

-- Create the schema.
CREATE TABLE Game (
	ID integer PRIMARY KEY,
	time timestamp
	);

CREATE TABLE Player (
	ID integer PRIMARY KEY, 
	emailAddress varchar(50) NOT NULL,
	name varchar(50)
	);

CREATE TABLE PlayerGame (
	gameID integer REFERENCES Game(ID), 
	playerID integer REFERENCES Player(ID),
	score integer
	);

-- Schema extension
CREATE TABLE Property (
    ID integer PRIMARY KEY,
    propName varchar(50) NOT NULL,
    cost integer,
    rent integer,
    houseCost integer,
    hotelCost integer
);

CREATE TABLE PlayerProperties (
    playerID integer REFERENCES Player(ID),
    gameID integer REFERENCES Game(ID),
    propertyID integer REFERENCES Property(ID),
    houses integer DEFAULT 0,
    hotels integer DEFAULT 0,
    PRIMARY KEY (playerID, gameID, propertyID)
);

CREATE TABLE PlayerPosition (
    playerID integer REFERENCES Player(ID),
    gameID integer REFERENCES Game(ID),
    currentPosition integer CHECK (currentPosition BETWEEN 1 AND 40), 
    cash integer DEFAULT 1500, -- 1500 is what you start with in a new monopoly game
    PRIMARY KEY (playerID, gameID)
);

-- Allow users to select data from the tables.
GRANT SELECT ON Game TO PUBLIC;
GRANT SELECT ON Player TO PUBLIC;
GRANT SELECT ON PlayerGame TO PUBLIC;
GRANT SELECT ON Property TO PUBLIC;
GRANT SELECT ON PlayerProperties TO PUBLIC;
GRANT SELECT ON PlayerPosition TO PUBLIC;

-- Add sample records.
INSERT INTO Game VALUES (1, '2006-06-27 08:00:00');
INSERT INTO Game VALUES (2, '2006-06-28 13:20:00');
INSERT INTO Game VALUES (3, '2006-06-29 18:41:00');

INSERT INTO Player(ID, emailAddress) VALUES (1, 'me@calvin.edu');
INSERT INTO Player VALUES (2, 'king@gmail.edu', 'The King');
INSERT INTO Player VALUES (3, 'dog@gmail.edu', 'Dogbreath');

INSERT INTO PlayerGame VALUES (1, 1, 0.00);
INSERT INTO PlayerGame VALUES (1, 2, 0.00);
INSERT INTO PlayerGame VALUES (1, 3, 2350.00);
INSERT INTO PlayerGame VALUES (2, 1, 1000.00);
INSERT INTO PlayerGame VALUES (2, 2, 0.00);
INSERT INTO PlayerGame VALUES (2, 3, 500.00);
INSERT INTO PlayerGame VALUES (3, 2, 0.00);
INSERT INTO PlayerGame VALUES (3, 3, 5500.00);

-- insert extension
INSERT INTO Property VALUES (1, 'Boardwalk', 400, 50, 200, 100);
INSERT INTO Property VALUES (2, 'Park Place', 350, 35, 175, 100);

INSERT INTO PlayerPosition VALUES (1, 1, 1, 1500); -- Player 1 
INSERT INTO PlayerPosition VALUES (2, 1, 5, 1400); -- Player 2 

INSERT INTO PlayerProperties VALUES (1, 1, 1, 2, 0); -- Player 1 owns 'Boardwalk' with 2 houses in Game 1
INSERT INTO PlayerProperties VALUES (2, 1, 2, 0, 1); -- Player 2 owns 'Park Place' with 1 hotel in Game 1