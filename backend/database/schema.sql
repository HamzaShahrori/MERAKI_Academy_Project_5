 DROP DATABASE codeWarriors;
CREATE DATABASE codeWarriors;

USE codeWarriors;


CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    country VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE cases (
    id INT AUTO_INCREMENT NOT NULL,
    category VARCHAR(255),
    case_image VARCHAR(255),
    title VARCHAR(255),
    case_description VARCHAR(255),
    TheAmountRequired INT,
    donations INT,
    donor INT,
    FOREIGN KEY(donor) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE donation(
id INT AUTO_INCREMENT NOT NULL,
IBAN VARCHAR(255),
amount INT,
case_id INT,
FOREIGN KEY (case_id) REFERENCES cases(id),
donor_id INT,
FOREIGN KEY (donor_id) REFERENCES users(id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);

