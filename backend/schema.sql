-- Create sequence for users table
CREATE SEQUENCE users_id_seq START WITH 1 INCREMENT BY 1;

-- Create users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY DEFAULT nextval('users_id_seq'),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Create sequence for userlists table
CREATE SEQUENCE userlists_id_seq START WITH 1 INCREMENT BY 1;

-- Create userlists table
CREATE TABLE userlists (
    id INTEGER PRIMARY KEY DEFAULT nextval('userlists_id_seq'),
    user_id INTEGER,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create sequence for plants table
CREATE SEQUENCE plants_id_seq START WITH 1 INCREMENT BY 1;

-- Create plants table
CREATE TABLE plants (
    id INTEGER PRIMARY KEY DEFAULT nextval('plants_id_seq'),
    common_name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL,
    watering VARCHAR(255) NOT NULL,
    sunlight VARCHAR(255) NOT NULL,
    description TEXT,
    zoning VARCHAR(255) NOT NULL,
    icon_path VARCHAR(255) NOT NULL
);

-- Create sequence for listplants table
CREATE SEQUENCE listplants_id_seq START WITH 1 INCREMENT BY 1;

-- Create listplants table
CREATE TABLE listplants (
    id INTEGER PRIMARY KEY DEFAULT nextval('listplants_id_seq'),
    list_id INTEGER,
    plant_id INTEGER,
    FOREIGN KEY (list_id) REFERENCES userlists(id) ON DELETE CASCADE,
    FOREIGN KEY (plant_id) REFERENCES plants(id)
);
